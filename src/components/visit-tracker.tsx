"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import type { VisitPage } from "@/lib/join-visit";

const VISIT_MARKER_PREFIX = "gennety_visit_reported_";

type VisitPayload = {
  page: VisitPage;
  language: string;
  languages: string[];
  timeZone: string | null;
  viewport: { width: number; height: number };
  screen: { width: number; height: number };
  deviceClass: "mobile" | "tablet" | "desktop";
};

function getDeviceClass(width: number): VisitPayload["deviceClass"] {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function createPayload(page: VisitPage): VisitPayload {
  const screenWidth = window.screen?.width ?? window.innerWidth;
  const screenHeight = window.screen?.height ?? window.innerHeight;

  return {
    page,
    language: navigator.language || "unknown",
    languages: navigator.languages ? [...navigator.languages].slice(0, 8) : [],
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    screen: { width: screenWidth, height: screenHeight },
    deviceClass: getDeviceClass(screenWidth),
  };
}

/**
 * Reports a single visit to the given page after analytics consent is present.
 * It deliberately does not request browser geolocation or create a device fingerprint.
 */
export function VisitTracker({ page }: { page: VisitPage }) {
  const { currentConsents, isLoading } = useCookieConsent();
  const attempted = useRef(false);

  useEffect(() => {
    if (isLoading || !currentConsents?.analytics || attempted.current) return;
    const marker = `${VISIT_MARKER_PREFIX}${page}`;
    if (window.sessionStorage.getItem(marker)) return;

    attempted.current = true;
    const payload = createPayload(page);

    void fetch("/api/join-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).then((response) => {
      if (response.ok) {
        window.sessionStorage.setItem(marker, "1");
      }
    }).catch(() => {
      // Analytics must never affect the page experience.
    });
  }, [currentConsents?.analytics, isLoading, page]);

  return null;
}
