"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";

const REPEAT_COUNT = 8;

function MarqueeRow({ text }: { text: string }) {
  // Build items: alternating white / magenta-neon
  const items = Array.from({ length: REPEAT_COUNT }, (_, i) => (
    <span key={i} className="flex items-center">
      <span
        className={
          i % 2 === 0
            ? "text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mx-2 md:mx-4"
            : "text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-magenta mx-2 md:mx-4"
        }
      >
        {text}
      </span>
      <span className="text-magenta mx-2 md:mx-4 text-xl md:text-2xl" aria-hidden="true">
        ·
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden whitespace-nowrap">
      {/* Single wrapper with 2x content — animate-marquee translates -50% for seamless loop */}
      <div className="flex items-center animate-marquee w-max">
        <div className="flex items-center">{items}</div>
        <div className="flex items-center">{items}</div>
      </div>
    </div>
  );
}

export function Marquee() {
  const { t } = useLanguage();

  return (
    <section className="relative py-[120px] overflow-hidden">
      {/* Background image placeholder — full-bleed photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-magenta/5 via-midnight to-midnight" />
      <div className="absolute inset-0 bg-midnight/70" />

      <div className="relative">
        {/* Marquee banner */}
        <MarqueeRow text={t("marquee.text")} />

        {/* Manifesto button */}
        <div className="flex justify-center mt-16">
          <Link href="/thesis">
            <Button variant="outline" size="lg">
              {t("marquee.manifesto")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
