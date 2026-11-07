// Server-side helpers for the /deck analytics proxy.

/** Cloudflare worker that stores deck analytics (workers/deck-stats). */
export const DECK_STATS_URL = process.env.DECK_STATS_URL || "https://gennety-deck-stats.glebw2008.workers.dev";

export const MAX_DECK_BATCH_BYTES = 32_768;

/** Location hints Vercel attaches to each request; forwarded so the worker sees the visitor, not Vercel. */
export function geoHeaders(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  const map: Array<[string, string]> = [
    ["x-vercel-ip-country", "x-geo-country"],
    ["x-vercel-ip-country-region", "x-geo-region"],
    ["x-vercel-ip-city", "x-geo-city"],
  ];
  for (const [from, to] of map) {
    const value = headers.get(from);
    if (value) out[to] = value.slice(0, 120);
  }
  const ua = headers.get("user-agent");
  if (ua) out["x-client-ua"] = ua.slice(0, 400);
  return out;
}
