import { POLICY_VERSION } from "@/constants/consent";
import {
  CONSENT_ACTIONS,
  type ConsentAction,
  type ConsentApiResponse,
  type ConsentCache,
  type ConsentCategories,
  type ConsentRequestPayload,
} from "@/types/consent";

export const LS_SESSION_KEY = "cookie_consent_session_id";
export const LS_CONSENT_KEY = "cookie_consent_given";
export const CONSENT_EVENT = "cookie-consent-changed";
export const CONSENT_CACHE_TTL_MS = 180 * 24 * 60 * 60 * 1000;

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function getBrowserPageUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.href;
}

function dispatchConsentChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

function generateSessionId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isConsentAction(value: unknown): value is ConsentAction {
  return typeof value === "string" && CONSENT_ACTIONS.includes(value as ConsentAction);
}

export function getSessionId(storage: Storage | null = getBrowserStorage()): string {
  if (!storage) return "";

  const existing = storage.getItem(LS_SESSION_KEY);
  if (existing) return existing;

  const id = generateSessionId();
  storage.setItem(LS_SESSION_KEY, id);
  return id;
}

export function readConsentCache(storage: Storage | null = getBrowserStorage()): ConsentCache | null {
  if (!storage) return null;

  try {
    const raw = storage.getItem(LS_CONSENT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    return isConsentCache(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsentCache(
  cache: ConsentCache,
  storage: Storage | null = getBrowserStorage(),
): void {
  if (!storage) return;
  storage.setItem(LS_CONSENT_KEY, JSON.stringify(cache));
}

export function createConsentCache(
  action: ConsentAction,
  categories: ConsentCategories | null,
  sessionId: string,
  createdAt = new Date().toISOString(),
): ConsentCache {
  return {
    version: POLICY_VERSION,
    action,
    categories,
    sessionId,
    createdAt,
    pendingSync: true,
  };
}

export function isConsentCache(value: unknown): value is ConsentCache {
  if (!isObjectRecord(value)) return false;

  return (
    typeof value.version === "string" &&
    isConsentAction(value.action) &&
    (isObjectRecord(value.categories) || value.categories === null) &&
    typeof value.sessionId === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.pendingSync === "boolean" &&
    (value.serverConsentId === undefined || typeof value.serverConsentId === "string") &&
    (value.syncedAt === undefined || typeof value.syncedAt === "string")
  );
}

export function isConsentCacheUsable(
  cache: ConsentCache | null,
  version = POLICY_VERSION,
  nowMs = Date.now(),
): cache is ConsentCache {
  if (!cache || cache.version !== version) return false;

  const createdAtMs = Date.parse(cache.createdAt);
  if (!Number.isFinite(createdAtMs)) return false;

  return nowMs - createdAtMs <= CONSENT_CACHE_TTL_MS;
}

export async function syncConsentCache(
  cache: ConsentCache,
  {
    fetchImpl = globalThis.fetch,
    storage = getBrowserStorage(),
    pageUrl = getBrowserPageUrl(),
    syncedAt = new Date().toISOString(),
  }: {
    fetchImpl?: FetchLike;
    storage?: Storage | null;
    pageUrl?: string;
    syncedAt?: string;
  } = {},
): Promise<ConsentCache> {
  if (!cache.pendingSync || !fetchImpl) return cache;

  const payload: ConsentRequestPayload = {
    action: cache.action,
    categories: cache.categories,
    sessionId: cache.sessionId,
    pageUrl,
  };

  try {
    const response = await fetchImpl("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (!response.ok) return cache;

    const body = (await response.json().catch(() => null)) as ConsentApiResponse | null;
    if (!body?.success || typeof body.id !== "string") return cache;

    const syncedCache: ConsentCache = {
      ...cache,
      pendingSync: false,
      serverConsentId: body.id,
      syncedAt,
    };

    writeConsentCache(syncedCache, storage);
    dispatchConsentChange();

    return syncedCache;
  } catch {
    return cache;
  }
}
