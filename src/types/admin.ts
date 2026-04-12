// ---------------------------------------------------------------------------
// Admin dashboard types — mirrors the Prisma schema and Express admin API
// ---------------------------------------------------------------------------

export type UserStatus = "onboarding" | "active" | "paused";
export type OnboardingStep = "consent" | "language" | "conversational" | "completed";
export type Gender = "male" | "female";
export type GenderPreference = "men" | "women" | "both";
export type Language = "en" | "ru" | "uk";

export interface UserProfile {
  height: number | null;
  hobbies: string[];
  partnerPreferences: string | null;
  visualPreferences: unknown | null;
  psychologicalSummary: string | null;
  negativeConstraints: string | null;
  ageRangeMin: number | null;
  ageRangeMax: number | null;
  photos: string[];
}

export interface UserRow {
  id: string;
  telegramId: string;
  firstName: string | null;
  surname: string | null;
  age: number | null;
  gender: Gender | null;
  preference: GenderPreference | null;
  major: string | null;
  language: Language | null;
  status: UserStatus;
  onboardingStep: OnboardingStep;
  universityDomain: string | null;
  email: string | null;
  createdAt: string;
  profile: UserProfile | null;
}

// role: "system" messages are stored but hidden in the UI
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | null;
}

export interface UserDetail extends UserRow {
  messageHistory: ChatMessage[];
}

export interface UsersListResponse {
  data: UserRow[];
  total: number;
  limit: number;
  offset: number;
}
