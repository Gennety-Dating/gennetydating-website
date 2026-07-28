"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const JOIN_VISIT_MARKER = "gennety_join_visit_reported";

type JoinVisitPayload = {
  language: string;
  languages: string[];
  timeZone: string | null;
  viewport: { width: number; height: number };
  screen: { width: number; height: number };
  deviceClass: "mobile" | "tablet" | "desktop";
};

function getDeviceClass(width: number): JoinVisitPayload["deviceClass"] {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function createPayload(): JoinVisitPayload {
  const screenWidth = window.screen?.width ?? window.innerWidth;
  const screenHeight = window.screen?.height ?? window.innerHeight;

  return {
    language: navigator.language || "unknown",
    languages: navigator.languages ? [...navigator.languages].slice(0, 8) : [],
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    screen: { width: screenWidth, height: screenHeight },
    deviceClass: getDeviceClass(screenWidth),
  };
}

/**
 * Reports a single Join-page visit after analytics consent is present.
 * It deliberately does not request browser geolocation or create a device fingerprint.
 */
export function JoinVisitTracker() {
  const { currentConsents, isLoading } = useCookieConsent();
  const attempted = useRef(false);

  useEffect(() => {
    if (isLoading || !currentConsents?.analytics || attempted.current) return;
    if (window.sessionStorage.getItem(JOIN_VISIT_MARKER)) return;

    attempted.current = true;
    const payload = createPayload();

    void fetch("/api/join-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).then((response) => {
      if (response.ok) {
        window.sessionStorage.setItem(JOIN_VISIT_MARKER, "1");
      }
    }).catch(() => {
      // Analytics must never affect the Join experience.
    });
  }, [currentConsents?.analytics, isLoading]);

  return null;
}
