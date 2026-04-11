import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createServiceClient } from "@/utils/supabase/service";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const VALID_ACTIONS = ["accepted", "rejected", "partial", "withdrawn"] as const;
type ConsentAction = (typeof VALID_ACTIONS)[number];

interface ConsentBody {
  session_id: string;
  policy_version: string;
  action: ConsentAction;
  consents: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  };
}

function hashIp(rawIp: string): string {
  const salt = process.env.CONSENT_IP_SALT;
  if (!salt) throw new Error("Missing CONSENT_IP_SALT");
  return createHash("sha256").update(rawIp + salt).digest("hex");
}

function hashPolicyVersion(version: string): string {
  return createHash("sha256").update(version).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body: ConsentBody = await request.json();

    // Validate required fields
    if (!body.session_id || !body.policy_version || !body.action || !body.consents) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!VALID_ACTIONS.includes(body.action)) {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    // Ensure necessary cookies are always true
    if (!body.consents.necessary) {
      return NextResponse.json(
        { success: false, error: "Necessary cookies must be accepted" },
        { status: 400 }
      );
    }

    // Extract and hash IP — never log raw IP
    const forwarded = request.headers.get("x-forwarded-for");
    const rawIp = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? null;
    const ipHash = rawIp ? hashIp(rawIp) : null;

    // User agent
    const userAgent = request.headers.get("user-agent") ?? null;

    // Country from CDN headers
    const country =
      request.headers.get("cf-ipcountry") ??
      request.headers.get("x-vercel-ip-country") ??
      null;

    // Authenticated user (optional)
    let userId: string | null = null;
    try {
      const cookieStore = await cookies();
      const supabaseAuth = createClient(cookieStore);
      const { data: { user } } = await supabaseAuth.auth.getUser();
      userId = user?.id ?? null;
    } catch {
      // Not authenticated — that's fine
    }

    // Banner text hash
    const bannerTextHash = hashPolicyVersion(body.policy_version);

    // Insert using service role client
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("cookie_consents")
      .insert({
        session_id: body.session_id,
        policy_version: body.policy_version,
        action: body.action,
        consents: body.consents,
        ip_hash: ipHash,
        user_agent: userAgent,
        country: country?.substring(0, 2) ?? null,
        user_id: userId,
        banner_text_hash: bannerTextHash,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Consent insert error:", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to record consent" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, consent_id: data.id });
  } catch (err) {
    console.error("Consent endpoint error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
