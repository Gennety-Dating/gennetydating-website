"use client";

import { useState, useEffect, useCallback } from "react";
import { POLICY_VERSION } from "@/constants/consent";

export interface ConsentChoices {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface StoredConsent {
  version: string;
  action: string;
  consents: ConsentChoices;
}

const LS_SESSION_KEY = "cookie_consent_session_id";
const LS_CONSENT_KEY = "cookie_consent_given";

function generateUUID(): string {
  return crypto.randomUUID();
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(LS_SESSION_KEY);
  if (!id) {
    id = generateUUID();
    localStorage.setItem(LS_SESSION_KEY, id);
  }
  return id;
}

function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  const [hasConsented, setHasConsented] = useState<boolean>(true); // default true to avoid flash
  const [currentConsents, setCurrentConsents] = useState<ConsentChoices | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored && stored.version === POLICY_VERSION) {
      setHasConsented(true);
      setCurrentConsents(stored.consents);
    } else {
      setHasConsented(false);
      setCurrentConsents(null);
    }
    // Ensure session ID exists
    getSessionId();
    setIsLoading(false);
  }, []);

  const submitConsent = useCallback(
    async (
      action: "accepted" | "rejected" | "partial" | "withdrawn",
      consents: ConsentChoices
    ) => {
      const sessionId = getSessionId();

      const res = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          policy_version: POLICY_VERSION,
          action,
          consents,
        }),
      });

      if (!res.ok) {
        console.error("Failed to submit consent");
        return;
      }

      const stored: StoredConsent = {
        version: POLICY_VERSION,
        action,
        consents,
      };
      localStorage.setItem(LS_CONSENT_KEY, JSON.stringify(stored));
      setHasConsented(true);
      setCurrentConsents(consents);
    },
    []
  );

  const withdrawConsent = useCallback(async () => {
    const allFalse: ConsentChoices = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    const sessionId = getSessionId();

    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        policy_version: POLICY_VERSION,
        action: "withdrawn",
        consents: allFalse,
      }),
    });

    localStorage.removeItem(LS_CONSENT_KEY);
    setHasConsented(false);
    setCurrentConsents(null);
  }, []);

  return {
    hasConsented,
    currentConsents,
    isLoading,
    submitConsent,
    withdrawConsent,
  };
}
