import { NextRequest, NextResponse } from "next/server";
import { DECK_STATS_URL } from "@/lib/deck-stats-server";

export const runtime = "nodejs";

// Token-protected passthrough for /deck/stats. The worker checks the Bearer
// token; this route only keeps the dashboard on the gennety.com origin.
const PATHS = new Set(["stats", "session", "links"]);

async function forward(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("p") ?? "";
  if (!PATHS.has(path)) return NextResponse.json({ error: "not found" }, { status: 404 });
  const authorization = request.headers.get("authorization");
  if (!authorization) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const query = new URLSearchParams(request.nextUrl.searchParams);
  query.delete("p");
  const qs = query.toString();
  try {
    const upstream = await fetch(`${DECK_STATS_URL}/${path}${qs ? `?${qs}` : ""}`, {
      method: request.method,
      headers: { authorization, "content-type": "application/json" },
      body: request.method === "POST" ? await request.text() : undefined,
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    return new NextResponse(await upstream.text(), {
      status: upstream.status,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Stats service is unreachable" }, { status: 502 });
  }
}

export const GET = forward;
export const POST = forward;
export const DELETE = forward;
