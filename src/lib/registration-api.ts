/**
 * The bot speaks five languages; the site speaks eight. A French visitor reads
 * the landing page in French but is onboarded in one of these — so the picker
 * only ever offers what the bot can actually hold a conversation in. Anything
 * else is rejected by the API with "Invalid language".
 */
export type RegistrationLanguage = "en" | "ru" | "uk" | "de" | "pl";
export type RegistrationPurpose = "join" | "login";

/**
 * Registration v2 sign-up fork.
 *
 * - `student` — university email, OTP-verified here, plus the dating city.
 *   Telegram then picks up at the theme picker.
 * - `general` — phone. The number is deliberately NOT taken on the web: it is
 *   only trustworthy when Telegram itself vouches for it through the one-tap
 *   contact share. The site records the *choice*; the bot runs the real gate.
 */
export type RegistrationTrack = "student" | "general";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_GENNETY_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3101/v1"
).replace(/\/+$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
  });

  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) throw new Error(payload.error || "Request failed");
  return payload as T;
}

function postJson<T>(path: string, body: object): Promise<T> {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) });
}

export function requestRegistrationOtp(email: string): Promise<{ ok: true }> {
  return postJson("/web-registration/otp/request", { email });
}

/** The dating city — where the user wants matches, not a home address. */
export interface RegistrationCity {
  label: string;
  homeCity: string;
  homeCountryCode: string;
  homeCityKey: string;
  homePlaceId: string | null;
  latitude: number;
  longitude: number;
}

export function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<{ results: RegistrationCity[] }> {
  return request(`/web-registration/city/search?q=${encodeURIComponent(query)}`, { signal });
}

export function resolveCity(
  latitude: number,
  longitude: number,
): Promise<{ city: RegistrationCity }> {
  return postJson("/web-registration/city/resolve", { latitude, longitude });
}

interface CompleteRegistrationBase {
  language: RegistrationLanguage;
  purpose: RegistrationPurpose;
  termsAccepted: true;
  researchOptIn: boolean;
}

export type CompleteRegistrationInput = CompleteRegistrationBase &
  ({ track: "student"; email: string; otp: string; city: RegistrationCity } | { track: "general" });

export interface CompleteRegistrationResult {
  ok: true;
  telegramUrl: string;
  expiresAt: string;
}

export function completeRegistration(
  input: CompleteRegistrationInput,
): Promise<CompleteRegistrationResult> {
  const body =
    input.track === "student"
      ? {
          track: "student",
          email: input.email,
          otp: input.otp,
          language: input.language,
          purpose: input.purpose,
          termsAccepted: input.termsAccepted,
          researchOptIn: input.researchOptIn,
          // Flattened on purpose: the API validates these with the very same
          // payload validator the Mini App's city gate uses.
          homeCity: input.city.homeCity,
          homeCountryCode: input.city.homeCountryCode,
          homeCityKey: input.city.homeCityKey,
          homePlaceId: input.city.homePlaceId,
          latitude: input.city.latitude,
          longitude: input.city.longitude,
        }
      : {
          track: "general",
          language: input.language,
          purpose: input.purpose,
          termsAccepted: input.termsAccepted,
          researchOptIn: input.researchOptIn,
        };

  return postJson("/web-registration/complete", body);
}
