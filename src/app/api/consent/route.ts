import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { pgQuery } from "@/lib/postgres";
import { createClient } from "@/utils/supabase/server";
import {
  CONSENT_ACTIONS,
  type ConsentAction,
  type ConsentCategories,
} from "@/types/consent";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 16_384;
const MAX_CATEGORIES_JSON_LENGTH = 4_096;
const MAX_SESSION_ID_LENGTH = 200;
const MAX_PAGE_URL_LENGTH = 2_048;
const MAX_USER_AGENT_LENGTH = 1_024;

interface ValidatedConsentPayload {
  action: ConsentAction;
  categories: ConsentCategories | null;
  sessionId: string | null;
  pageUrl: string | null;
}

type ValidationResult =
  | { ok: true; data: ValidatedConsentPayload }
  | { ok: false; error: string };

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isConsentAction(value: unknown): value is ConsentAction {
  return typeof value === "string" && CONSENT_ACTIONS.includes(value as ConsentAction);
}

function optionalString(
  value: unknown,
  fieldName: string,
  maxLength: number,
): { ok: true; value: string | null } | { ok: false; error: string } {
  if (value === undefined || value === null) return { ok: true, value: null };
  if (typeof value !== "string") return { ok: false, error: `${fieldName} must be a string` };

  const trimmed = value.trim();
  if (!trimmed) return { ok: true, value: null };
  if (trimmed.length > maxLength) return { ok: false, error: `${fieldName} is too long` };

  return { ok: true, value: trimmed };
}

function validatePayload(body: unknown): ValidationResult {
  if (!isObjectRecord(body)) {
    return { ok: false, error: "Payload must be an object" };
  }

  if (!isConsentAction(body.action)) {
    return { ok: false, error: "Invalid action" };
  }

  const categories = body.categories === undefined ? null : body.categories;
  if (categories !== null && !isObjectRecord(categories)) {
    return { ok: false, error: "categories must be an object or null" };
  }

  const categoriesJson = JSON.stringify(categories);
  if (categoriesJson.length > MAX_CATEGORIES_JSON_LENGTH) {
    return { ok: false, error: "categories is too large" };
  }

  const sessionId = optionalString(body.sessionId, "sessionId", MAX_SESSION_ID_LENGTH);
  if (!sessionId.ok) return sessionId;

  const pageUrl = optionalString(body.pageUrl, "pageUrl", MAX_PAGE_URL_LENGTH);
  if (!pageUrl.ok) return pageUrl;

  return {
    ok: true,
    data: {
      action: body.action,
      categories: categories as ConsentCategories | null,
      sessionId: sessionId.value,
      pageUrl: pageUrl.value,
    },
  };
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();
  if (firstForwarded) return firstForwarded;

  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    null
  );
}

function hashIp(rawIp: string | null, salt: string): string | null {
  if (!rawIp) return null;
  return createHash("sha256").update(rawIp + salt).digest("hex");
}

async function getAuthenticatedUserId(): Promise<string | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  ) {
    return null;
  }

  try {
    const cookieStore = await cookies();
    const supabaseAuth = createClient(cookieStore);
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    return user?.id ?? null;
  } catch {
    return null;
  }
}

function isOversizedRequest(request: NextRequest): boolean {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return false;

  const bytes = Number(contentLength);
  return Number.isFinite(bytes) && bytes > MAX_REQUEST_BYTES;
}

function getPgErrorCode(error: unknown): string | undefined {
  if (!isObjectRecord(error)) return undefined;
  return typeof error.code === "string" ? error.code : undefined;
}

export async function POST(request: NextRequest) {
  if (isOversizedRequest(request)) {
    return NextResponse.json(
      { success: false, error: "Payload is too large" },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const validated = validatePayload(body);
  if (!validated.ok) {
    return NextResponse.json({ success: false, error: validated.error }, { status: 400 });
  }

  let policyVersion: string;
  let ipSalt: string;
  try {
    policyVersion = requiredEnv("POLICY_VERSION");
    ipSalt = requiredEnv("CONSENT_IP_SALT");
  } catch {
    return NextResponse.json(
      { success: false, error: "Consent service is not configured" },
      { status: 500 },
    );
  }

  const rawIp = getClientIp(request);
  const ipHash = hashIp(rawIp, ipSalt);
  const userAgent = request.headers.get("user-agent")?.slice(0, MAX_USER_AGENT_LENGTH) ?? null;
  const userId = await getAuthenticatedUserId();

  try {
    const result = await pgQuery<{ id: string }>(
      `
        INSERT INTO public.cookie_consents (
          action,
          policy_version,
          categories,
          ip_hash,
          user_agent,
          user_id,
          session_id,
          page_url
        )
        VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7, $8)
        RETURNING id
      `,
      [
        validated.data.action,
        policyVersion,
        validated.data.categories === null ? null : JSON.stringify(validated.data.categories),
        ipHash,
        userAgent,
        userId,
        validated.data.sessionId,
        validated.data.pageUrl,
      ],
    );

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("Consent DB insert failed", { code: getPgErrorCode(error) });
    return NextResponse.json(
      { success: false, error: "Failed to record consent" },
      { status: 500 },
    );
  }
}
