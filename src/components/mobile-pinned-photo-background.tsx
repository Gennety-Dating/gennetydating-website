"use client";

import { useEffect, useState } from "react";

const photoBackgrounds = {
  "how-it-works": {
    image: "/images/matchmaker-works-bg.jpg",
    imageOpacity: 0.55,
    blur: 8,
    bleed: 32,
    overlay: "rgba(17, 17, 17, 0.45)",
  },
  comparison: {
    image: "/images/matchmaker-bg-1.jpg",
    imageOpacity: 0.35,
    blur: 12,
    bleed: 40,
  },
} as const;

type PhotoBackground = keyof typeof photoBackgrounds;

/**
 * iOS Safari darkens the safe area when a sticky viewport-sized image enters a
 * section. Keeping one fixed page-level paint layer avoids that WebKit path
 * while preserving the visual effect of a photo that stays still as content
 * scrolls over it.
 */
export function MobilePinnedPhotoBackground() {
  const [activeBackground, setActiveBackground] = useState<PhotoBackground | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-mobile-photo-background]")
    );

    const syncActiveBackground = () => {
      const activeSection = sections.find((section) => {
        const { bottom, top } = section.getBoundingClientRect();
        return bottom > 0 && top < window.innerHeight;
      });

      setActiveBackground(
        (activeSection?.dataset.mobilePhotoBackground as PhotoBackground | undefined) ?? null
      );
    };

    const observer = new IntersectionObserver(
      syncActiveBackground,
      { threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    syncActiveBackground();
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden md:hidden" aria-hidden="true">
      {(Object.entries(photoBackgrounds) as [PhotoBackground, (typeof photoBackgrounds)[PhotoBackground]][]).map(
        ([name, background]) => (
          <div
            key={name}
            className="absolute inset-0"
            style={{ opacity: activeBackground === name ? 1 : 0 }}
          >
            <div className="absolute inset-0 bg-[#111111]" />
            <div
              className="absolute bg-cover bg-center"
              style={{
                backgroundImage: `url('${background.image}')`,
                opacity: background.imageOpacity,
                inset: `-${background.bleed}px`,
                filter: `blur(${background.blur}px)`,
              }}
            />
            {"overlay" in background && (
              <div className="absolute inset-0" style={{ backgroundColor: background.overlay }} />
            )}
          </div>
        )
      )}
    </div>
  );
}
