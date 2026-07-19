"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const REPEAT_COUNT = 8;

function MarqueeRow({ text }: { text: string }) {
  // Build items: alternating white / magenta-neon
  const items = Array.from({ length: REPEAT_COUNT }, (_, i) => (
    <span
      key={i}
      className={
        i % 2 === 0
          ? "text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mx-4 md:mx-8 py-2"
          : "text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-magenta-readable mx-4 md:mx-8 py-2"
      }
    >
      {text}
    </span>
  ));

  return (
    <div className="overflow-hidden whitespace-nowrap py-2">
      {/* Single wrapper with 2x content — animate-marquee translates -50% for seamless loop */}
      <div className="flex items-center animate-marquee w-max py-1">
        <div className="flex items-center">{items}</div>
        <div className="flex items-center" aria-hidden="true">{items}</div>
      </div>
    </div>
  );
}

export function Marquee() {
  const { t } = useLanguage();

  return (
    <section className="relative py-[140px] overflow-hidden bg-transparent">
      <div className="relative">
        {/* Tape container: tilted and slightly scaled/translated to go beyond screen boundaries */}
        <div className="w-[110%] -left-[5%] relative rotate-[-2deg] bg-[#1A1A1A] py-3 border-y border-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-10">
          <MarqueeRow text={t("marquee.text")} />
        </div>

        {/* Manifesto button */}
        <div className="flex justify-center mt-16 relative z-10">
          <Button variant="outline" size="lg" href="/thesis">
            {t("marquee.manifesto")}
          </Button>
        </div>
      </div>
    </section>
  );
}
