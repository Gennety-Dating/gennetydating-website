import { NextRequest, NextResponse } from "next/server";
import { DECK_STATS_URL, MAX_DECK_BATCH_BYTES, geoHeaders } from "@/lib/deck-stats-server";

export const runtime = "nodejs";

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

/** Receives analytics batches from /deck and forwards them to the deck-stats worker. */
export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) return new NextResponse(null, { status: 403 });
  if (Number(request.headers.get("content-length")) > MAX_DECK_BATCH_BYTES) {
    return new NextResponse(null, { status: 413 });
  }
  const body = await request.text();
  if (body.length === 0 || body.length > MAX_DECK_BATCH_BYTES) return new NextResponse(null, { status: 400 });

  try {
    const upstream = await fetch(`${DECK_STATS_URL}/ingest`, {
      method: "POST",
      headers: { "content-type": "application/json", ...geoHeaders(request.headers) },
      body,
      signal: AbortSignal.timeout(5_000),
      cache: "no-store",
    });
    return new NextResponse(null, { status: upstream.ok ? 204 : upstream.status });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
