"use client";

import { metrics } from "@/lib/data";
import { Heading, Highlight } from "@/components/ui/typography";
import { Sticker } from "@/components/ui/sticker";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

const rotations = [-4, 3, -2];
const metricKeys: TranslationKeys[] = ["metric.1", "metric.2", "metric.3"];

export function RealDates() {
  const { t } = useLanguage();

  return (
    <section className="py-[var(--section-y)] px-4 md:px-10">
      <Heading as="h2" className="text-center mb-12 md:mb-20">
        <Highlight>{t("realDates.title.highlight")}</Highlight> {t("realDates.title.rest")}
      </Heading>

      {/* Candid photo grid with sticker overlays
          Mobile: 1 col | iPad portrait (md): 2 col | Desktop (lg): 3 col
          pb-10 reserves space so absolute stickers are never clipped */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {metrics.map((metric, i) => (
          <div key={metric.label} className="relative group pb-10">
            {/* Placeholder candid photo */}
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl select-none opacity-40" aria-hidden="true">
                  {i === 0 ? "☕" : i === 1 ? "🎉" : "💬"}
                </span>
              </div>
            </div>

            {/* Sticker — sits within the pb-10 reserved space */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <Sticker color={metric.color} rotation={rotations[i]}>
                {t(metricKeys[i])}
              </Sticker>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
