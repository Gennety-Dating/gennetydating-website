import { createHmac, randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { parseUserAgent, type JoinVisitInput } from "@/lib/join-visit";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 4_096;
const MAX_STRING_LENGTH = 120;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const RATE_LIMIT_SECRET = process.env.RATE_LIMIT_SECRET || randomBytes(32).toString("hex");
const rateLimits = new Map<string, { count: number; resetAt: number }>();

type ValidatedInput = JoinVisitInput;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, maximum = MAX_STRING_LENGTH): string | null {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maximum
    ? value.trim()
    : null;
}

function dimensions(value: unknown): { width: number; height: number } | null {
  if (!isRecord(value)) return null;
  const width = value.width;
  const height = value.height;
  if (!Number.isInteger(width) || !Number.isInteger(height)) return null;
  if (typeof width !== "number" || typeof height !== "number") return null;
  if (width < 1 || width > 20_000 || height < 1 || height > 20_000) return null;
  return { width, height };
}

function validate(body: unknown): ValidatedInput | null {
  if (!isRecord(body)) return null;
  const language = text(body.language);
  const timeZone = body.timeZone === null ? null : text(body.timeZone);
  const viewport = dimensions(body.viewport);
  const screen = dimensions(body.screen);
  const deviceClass = body.deviceClass;
  const rawLanguages = body.languages;

  if (!language || !viewport || !screen) return null;
  if (!Array.isArray(rawLanguages) || rawLanguages.length > 8) return null;
  const languages = rawLanguages.map((item) => text(item, 35));
  if (languages.some((item) => item === null)) return null;
  if (deviceClass !== "mobile" && deviceClass !== "tablet" && deviceClass !== "desktop") return null;

  return {
    language,
    languages: languages as string[],
    timeZone,
    viewport,
    screen,
    deviceClass,
  };
}

function getClientIp(request: NextRequest): string {
  return request.headers.get("cf-connecting-ip")?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function isRateLimited(request: NextRequest): boolean {
  const now = Date.now();
  const key = createHmac("sha256", RATE_LIMIT_SECRET).update(getClientIp(request)).digest("hex");
  const current = rateLimits.get(key);

  if (rateLimits.size > 10_000) {
    for (const [storedKey, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(storedKey);
    }
  }
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function escapeTelegramHtml(value: string): string {
  return value.replace(/[&<>]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[character] ?? character);
}

function formatLocation(request: NextRequest): string {
  const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry");
  const city = request.headers.get("x-vercel-ip-city");
  const region = request.headers.get("x-vercel-ip-country-region");
  const pieces = [city, region, country].filter(Boolean).map((item) => decodeURIComponent(item as string));
  return pieces.length > 0 ? pieces.join(", ") : "Unavailable";
}

function createTelegramMessage(request: NextRequest, visit: ValidatedInput): string {
  const { browser, operatingSystem } = parseUserAgent(request.headers.get("user-agent") ?? "");
  const url = new URL(request.url);
  const values = [
    ["Time", new Date().toISOString()],
    ["Page", `${url.origin}/join`],
    ["Approx. location", formatLocation(request)],
    ["Device", visit.deviceClass],
    ["OS", operatingSystem],
    ["Browser", browser],
    ["Language", visit.language],
    ["Languages", visit.languages.join(", ") || "Unavailable"],
    ["Time zone", visit.timeZone ?? "Unavailable"],
    ["Viewport", `${visit.viewport.width} × ${visit.viewport.height}`],
    ["Screen", `${visit.screen.width} × ${visit.screen.height}`],
  ];

  return ["<b>New Join visit</b>", ...values.map(([label, value]) => `<b>${label}:</b> ${escapeTelegramHtml(value)}`)].join("\n");
}

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (isRateLimited(request)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  if (Number(request.headers.get("content-length")) > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Payload is too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: "Payload is too large" }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const visit = validate(body);
  if (!visit) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const botToken = process.env.TELEGRAM_ALERT_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ALERT_CHAT_ID;
  if (!botToken || !chatId) {
    console.error("Join visit alerts are not configured");
    return NextResponse.json({ error: "Alert service is not configured" }, { status: 503 });
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: createTelegramMessage(request, visit),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(5_000),
      cache: "no-store",
    });
    if (!telegramResponse.ok) throw new Error(`Telegram returned ${telegramResponse.status}`);
  } catch {
    console.error("Join visit Telegram alert failed");
    return NextResponse.json({ error: "Unable to send alert" }, { status: 502 });
  }

  return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
}
