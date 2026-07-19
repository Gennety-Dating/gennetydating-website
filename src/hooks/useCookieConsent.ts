"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CONSENT_EVENT,
  OPEN_CONSENT_PREFERENCES_EVENT,
  createConsentCache,
  getSessionId,
  isConsentCacheUsable,
  readConsentCache,
  syncConsentCache,
  writeConsentCache,
} from "@/lib/consent-cache";
import type { CookieConsentCategories } from "@/types/consent";

export type ConsentChoices = CookieConsentCategories;

function normalizeChoices(categories: unknown): ConsentChoices | null {
  if (typeof categories !== "object" || categories === null || Array.isArray(categories)) {
    return null;
  }

  const record = categories as Record<string, unknown>;

  return {
    necessary: true,
    analytics: record.analytics === true,
    marketing: record.marketing === true,
    functional: record.functional === true,
  };
}

export function useCookieConsent() {
  const [hasConsented, setHasConsented] = useState<boolean>(true); // default true to avoid flash
  const [currentConsents, setCurrentConsents] = useState<ConsentChoices | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function refresh() {
      const stored = readConsentCache();
      if (isConsentCacheUsable(stored)) {
        setHasConsented(true);
        setCurrentConsents(normalizeChoices(stored.categories));
      } else {
        setHasConsented(false);
        setCurrentConsents(null);
      }
    }

    refresh();
    getSessionId();
    queueMicrotask(() => setIsLoading(false));

    const stored = readConsentCache();
    if (isConsentCacheUsable(stored) && stored.pendingSync) {
      void syncConsentCache(stored);
    }

    window.addEventListener(CONSENT_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CONSENT_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const submitConsent = useCallback(
    async (
      action: "accepted" | "rejected" | "partial" | "withdrawn",
      categories: ConsentChoices
    ) => {
      const sessionId = getSessionId();
      const cache = createConsentCache(action, categories, sessionId);

      // Persist locally and dismiss banner immediately. Database sync is best-effort.
      writeConsentCache(cache);
      setHasConsented(true);
      setCurrentConsents(categories);
      window.dispatchEvent(new Event(CONSENT_EVENT));

      void syncConsentCache(cache);
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
    const cache = createConsentCache("withdrawn", allFalse, sessionId);

    writeConsentCache(cache);
    setHasConsented(true);
    setCurrentConsents(allFalse);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    void syncConsentCache(cache);
  }, []);

  const openPreferences = useCallback(() => {
    window.dispatchEvent(new Event(OPEN_CONSENT_PREFERENCES_EVENT));
  }, []);

  return {
    hasConsented,
    currentConsents,
    isLoading,
    submitConsent,
    withdrawConsent,
    openPreferences,
  };
}
