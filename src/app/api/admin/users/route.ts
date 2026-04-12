import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.ADMIN_API_BASE_URL ?? "http://localhost:3100";

export async function GET(request: NextRequest) {
  const key = process.env.ADMIN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Admin API not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "20";
  const offset = searchParams.get("offset") ?? "0";

  try {
    const upstream = await fetch(
      `${BASE}/admin/users?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`,
      {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      }
    );
    const data: unknown = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json({ error: "Failed to reach admin API" }, { status: 502 });
  }
}
