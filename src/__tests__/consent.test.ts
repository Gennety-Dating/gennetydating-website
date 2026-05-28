import { createHash } from "crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_CACHE_TTL_MS,
  LS_CONSENT_KEY,
  createConsentCache,
  isConsentCacheUsable,
  readConsentCache,
  syncConsentCache,
  writeConsentCache,
} from "@/lib/consent-cache";
import { POLICY_VERSION } from "@/constants/consent";
import type { CookieConsentCategories } from "@/types/consent";

function hashIp(rawIp: string, salt: string): string {
  return createHash("sha256").update(rawIp + salt).digest("hex");
}

const acceptedCategories: CookieConsentCategories = {
  necessary: true,
  analytics: true,
  marketing: false,
  functional: true,
};

describe("IP hashing", () => {
  const salt = "test-salt-32-chars-long-xxxxxxxx";

  it("produces consistent output for the same IP", () => {
    const hash1 = hashIp("192.168.1.1", salt);
    const hash2 = hashIp("192.168.1.1", salt);
    expect(hash1).toBe(hash2);
  });

  it("does not expose a reversible raw IP value", () => {
    const hash = hashIp("192.168.1.1", salt);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(hash).not.toContain("192.168.1.1");
  });

  it("changes when the salt changes", () => {
    const hash1 = hashIp("192.168.1.1", "salt-a");
    const hash2 = hashIp("192.168.1.1", "salt-b");
    expect(hash1).not.toBe(hash2);
  });
});

describe("cookie consent UX cache", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("stores the required cache fields with pendingSync=true", () => {
    const cache = createConsentCache(
      "accepted",
      acceptedCategories,
      "test-session",
      "2026-05-20T00:00:00.000Z",
    );

    writeConsentCache(cache);

    const stored = readConsentCache();
    expect(stored).toEqual({
      version: POLICY_VERSION,
      action: "accepted",
      categories: acceptedCategories,
      sessionId: "test-session",
      createdAt: "2026-05-20T00:00:00.000Z",
      pendingSync: true,
    });
  });

  it("accepts only matching, unexpired policy-version cache", () => {
    const now = Date.parse("2026-05-20T00:00:00.000Z");
    const fresh = createConsentCache(
      "accepted",
      acceptedCategories,
      "test-session",
      new Date(now - CONSENT_CACHE_TTL_MS + 1_000).toISOString(),
    );
    const expired = createConsentCache(
      "accepted",
      acceptedCategories,
      "test-session",
      new Date(now - CONSENT_CACHE_TTL_MS - 1_000).toISOString(),
    );

    expect(isConsentCacheUsable(fresh, POLICY_VERSION, now)).toBe(true);
    expect(isConsentCacheUsable(expired, POLICY_VERSION, now)).toBe(false);
    expect(isConsentCacheUsable({ ...fresh, version: "2025-01-01" }, POLICY_VERSION, now)).toBe(
      false,
    );
  });

  it("returns null for the legacy pre-Neon cache shape", () => {
    localStorage.setItem(
      LS_CONSENT_KEY,
      JSON.stringify({
        version: POLICY_VERSION,
        action: "accepted",
        consents: acceptedCategories,
      }),
    );

    expect(readConsentCache()).toBeNull();
  });
});

describe("cookie consent sync", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("sends the Neon consent payload and marks cache as synced on success", async () => {
    const cache = createConsentCache(
      "partial",
      acceptedCategories,
      "test-session",
      "2026-05-20T00:00:00.000Z",
    );
    writeConsentCache(cache);

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, id: "server-id-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const synced = await syncConsentCache(cache, {
      fetchImpl: fetchMock,
      pageUrl: "https://gennety.example/privacy",
      syncedAt: "2026-05-20T00:01:00.000Z",
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/consent");
    expect(options?.method).toBe("POST");

    const body = JSON.parse(options?.body as string);
    expect(body).toEqual({
      action: "partial",
      categories: acceptedCategories,
      sessionId: "test-session",
      pageUrl: "https://gennety.example/privacy",
    });
    expect(body.policy_version).toBeUndefined();
    expect(body.session_id).toBeUndefined();

    expect(synced.pendingSync).toBe(false);
    expect(synced.serverConsentId).toBe("server-id-123");
    expect(synced.syncedAt).toBe("2026-05-20T00:01:00.000Z");
    expect(readConsentCache()).toEqual(synced);
  });

  it("keeps pendingSync=true when the API request fails", async () => {
    const cache = createConsentCache("rejected", acceptedCategories, "test-session");
    writeConsentCache(cache);

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: false, error: "Failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const synced = await syncConsentCache(cache, { fetchImpl: fetchMock });

    expect(synced.pendingSync).toBe(true);
    expect(readConsentCache()).toEqual(cache);
  });
});
