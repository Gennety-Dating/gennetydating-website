import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.ADMIN_API_BASE_URL ?? "http://localhost:3100";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const key = process.env.ADMIN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Admin API not configured" }, { status: 503 });
  }

  const { id } = await params;

  try {
    const upstream = await fetch(`${BASE}/admin/users/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    const data: unknown = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json({ error: "Failed to reach admin API" }, { status: 502 });
  }
}
