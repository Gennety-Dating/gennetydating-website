export type RegistrationLanguage = "en" | "ru" | "uk" | "de" | "pl" | "fr" | "it" | "es";
export type RegistrationPurpose = "join" | "login";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_GENNETY_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3101/v1"
).replace(/\/+$/, "");

async function postJson<T>(path: string, body: object): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(payload.error || "Request failed");
  }

  return payload as T;
}

export function requestRegistrationOtp(email: string): Promise<{ ok: true }> {
  return postJson("/web-registration/otp/request", { email });
}

export interface CompleteRegistrationInput {
  email: string;
  otp: string;
  language: RegistrationLanguage;
  purpose: RegistrationPurpose;
  termsAccepted: true;
  researchOptIn: boolean;
}

export interface CompleteRegistrationResult {
  ok: true;
  telegramUrl: string;
  expiresAt: string;
}

export function completeRegistration(
  input: CompleteRegistrationInput,
): Promise<CompleteRegistrationResult> {
  return postJson("/web-registration/complete", input);
}
