"use client";

import { useEffect, useRef } from "react";
import { deckTracker } from "@/lib/deck-tracker";
import styles from "./deck.module.css";

const REF_PATTERN = /^[a-z0-9][a-z0-9-]{0,47}$/;

/**
 * Page frame for /deck: starts analytics, watches which section is on screen
 * and records clicks on anything marked with data-track.
 */
export function DeckShell({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("r")?.toLowerCase() ?? null;
    deckTracker.start(raw && REF_PATTERN.test(raw) ? raw : null);

    const element = root.current;
    if (!element) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.deckSection;
        if (!id) continue;
        // Share of the viewport this section covers, so tall sections are not penalised.
        const covered = entry.intersectionRect.height / Math.max(1, window.innerHeight);
        deckTracker.sectionVisibility(id, entry.isIntersecting ? covered : 0);
      }
    }, { threshold: thresholds });
    element.querySelectorAll<HTMLElement>("[data-deck-section]").forEach((section) => observer.observe(section));

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      const name = target.dataset.track ?? "";
      deckTracker.track(target.dataset.event ?? "click", name);
    };
    const onCopy = () => {
      const text = window.getSelection()?.toString() ?? "";
      if (text.includes("@gennety.com")) deckTracker.track("copy_email", "selection");
    };
    element.addEventListener("click", onClick);
    document.addEventListener("copy", onCopy);
    return () => {
      observer.disconnect();
      element.removeEventListener("click", onClick);
      document.removeEventListener("copy", onCopy);
    };
  }, []);

  return (
    <div ref={root} className={styles.page}>
      {children}
    </div>
  );
}
