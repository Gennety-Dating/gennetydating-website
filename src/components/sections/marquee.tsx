"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const REPEAT_COUNT = 8;

function MarqueeRow({ text }: { text: string }) {
  const items = Array.from({ length: REPEAT_COUNT }, (_, i) => (
    <span key={i} className="flex items-center">
      <span
        className={
          i % 2 === 0
            ? "text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white mx-2 md:mx-4"
            : "text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-magenta neon-text mx-2 md:mx-4"
        }
      >
        {text}
      </span>
      <span className="text-magenta neon-text-sm mx-2 md:mx-4 text-base md:text-2xl" aria-hidden="true">
        ·
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden whitespace-nowrap">
      {/* Single wrapper with 2x content — animate-marquee translates -50% for seamless loop */}
      <div className="flex items-center animate-marquee w-max">
        <div className="flex items-center">{items}</div>
        <div className="flex items-center" aria-hidden="true">{items}</div>
      </div>
    </div>
  );
}

export function Marquee() {
  const { t } = useLanguage();

  return (
    <section className="relative py-[var(--section-y)] overflow-hidden">
      {/* Background image placeholder — full-bleed photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-magenta/5 via-midnight to-midnight" />
      <div className="absolute inset-0 bg-midnight/70" />

      <div className="relative">
        {/* Marquee banner */}
        <MarqueeRow text={t("marquee.text")} />

        {/* Manifesto button — always visible below the marquee */}
        <div className="flex justify-center mt-12 md:mt-16 px-4">
          <Button variant="outline" size="lg" href="#" className="w-full max-w-[360px] md:w-auto">
            {t("marquee.manifesto")}
          </Button>
        </div>
      </div>
    </section>
  );
}
