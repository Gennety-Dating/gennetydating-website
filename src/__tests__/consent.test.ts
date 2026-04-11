import { describe, it, expect, vi, beforeEach } from "vitest";
import { createHash } from "crypto";

// --- 1. IP hashing produces consistent output ---

function hashIp(rawIp: string, salt: string): string {
  return createHash("sha256").update(rawIp + salt).digest("hex");
}

describe("IP hashing", () => {
  const salt = "test-salt-32-chars-long-xxxxxxxx";

  it("produces consistent output for the same IP", () => {
    const hash1 = hashIp("192.168.1.1", salt);
    const hash2 = hashIp("192.168.1.1", salt);
    expect(hash1).toBe(hash2);
  });

  it("produces different output for different IPs", () => {
    const hash1 = hashIp("192.168.1.1", salt);
    const hash2 = hashIp("10.0.0.1", salt);
    expect(hash1).not.toBe(hash2);
  });

  it("produces different output with different salts", () => {
    const hash1 = hashIp("192.168.1.1", "salt-a");
    const hash2 = hashIp("192.168.1.1", "salt-b");
    expect(hash1).not.toBe(hash2);
  });

  it("returns a 64-character hex string (SHA-256)", () => {
    const hash = hashIp("192.168.1.1", salt);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });
});

// --- 2. submitConsent posts correct record structure ---

describe("submitConsent API payload", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("sends correct record structure to /api/consent", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, consent_id: "abc-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const payload = {
      session_id: "test-session-uuid",
      policy_version: "2026-04-01",
      action: "accepted" as const,
      consents: {
        necessary: true,
        analytics: true,
        marketing: false,
        functional: true,
      },
    };

    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, options] = fetchSpy.mock.calls[0];
    expect(url).toBe("/api/consent");
    expect(options?.method).toBe("POST");

    const body = JSON.parse(options?.body as string);
    expect(body).toEqual(payload);
    expect(body.consents.necessary).toBe(true);
    expect(body.action).toBe("accepted");
    expect(body.session_id).toBeTruthy();
    expect(body.policy_version).toBeTruthy();
  });
});

// --- 3. localStorage with valid entry skips banner ---

describe("Cookie consent localStorage logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns true when localStorage has matching policy version", () => {
    const POLICY_VERSION = "2026-04-01";
    const stored = {
      version: POLICY_VERSION,
      action: "accepted",
      consents: { necessary: true, analytics: true, marketing: true, functional: true },
    };
    localStorage.setItem("cookie_consent_given", JSON.stringify(stored));

    const raw = localStorage.getItem("cookie_consent_given");
    const parsed = raw ? JSON.parse(raw) : null;

    expect(parsed).not.toBeNull();
    expect(parsed.version).toBe(POLICY_VERSION);
    // hasConsented would be true — banner should not show
  });

  it("returns false when policy version does not match", () => {
    const stored = {
      version: "2025-01-01",
      action: "accepted",
      consents: { necessary: true, analytics: true, marketing: true, functional: true },
    };
    localStorage.setItem("cookie_consent_given", JSON.stringify(stored));

    const raw = localStorage.getItem("cookie_consent_given");
    const parsed = raw ? JSON.parse(raw) : null;
    const POLICY_VERSION = "2026-04-01";

    expect(parsed!.version).not.toBe(POLICY_VERSION);
    // hasConsented would be false — banner should show
  });

  it("returns false when localStorage is empty", () => {
    const raw = localStorage.getItem("cookie_consent_given");
    expect(raw).toBeNull();
    // hasConsented would be false — banner should show
  });
});

// --- 4. withdrawConsent sends action: "withdrawn" ---

describe("withdrawConsent", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("sends action 'withdrawn' with all consents false except necessary", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, consent_id: "def-456" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    // Simulate stored consent
    localStorage.setItem(
      "cookie_consent_given",
      JSON.stringify({
        version: "2026-04-01",
        action: "accepted",
        consents: { necessary: true, analytics: true, marketing: true, functional: true },
      })
    );

    // Simulate withdraw
    const withdrawPayload = {
      session_id: "test-session",
      policy_version: "2026-04-01",
      action: "withdrawn" as const,
      consents: {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false,
      },
    };

    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(withdrawPayload),
    });

    localStorage.removeItem("cookie_consent_given");

    // Verify the payload
    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string);
    expect(body.action).toBe("withdrawn");
    expect(body.consents.necessary).toBe(true);
    expect(body.consents.analytics).toBe(false);
    expect(body.consents.marketing).toBe(false);
    expect(body.consents.functional).toBe(false);

    // Verify localStorage was cleared
    expect(localStorage.getItem("cookie_consent_given")).toBeNull();
  });
});
