export const CONSENT_ACTIONS = ["accepted", "rejected", "partial", "withdrawn"] as const;

export type ConsentAction = (typeof CONSENT_ACTIONS)[number];

export type ConsentJsonValue =
  | string
  | number
  | boolean
  | null
  | ConsentJsonValue[]
  | { [key: string]: ConsentJsonValue };

export type ConsentCategories = Record<string, ConsentJsonValue>;

export interface CookieConsentCategories extends ConsentCategories {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface ConsentRequestPayload {
  action: ConsentAction;
  categories?: ConsentCategories | null;
  sessionId?: string;
  pageUrl?: string;
}

export interface ConsentCache {
  version: string;
  action: ConsentAction;
  categories: ConsentCategories | null;
  sessionId: string;
  createdAt: string;
  pendingSync: boolean;
  serverConsentId?: string;
  syncedAt?: string;
}

export type ConsentApiResponse =
  | {
      success: true;
      id: string;
    }
  | {
      success: false;
      error: string;
    };
