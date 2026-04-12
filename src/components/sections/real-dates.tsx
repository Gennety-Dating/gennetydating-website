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
    <section className="py-[120px] px-4 md:px-10">
      <Heading as="h2" className="text-center mb-20">
        <Highlight>{t("realDates.title.highlight")}</Highlight> {t("realDates.title.rest")}
      </Heading>

      {/* Candid photo grid with sticker overlays */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {metrics.map((metric, i) => (
          <div key={metric.label} className="relative group">
            {/* Placeholder candid photo */}
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl select-none opacity-40" aria-hidden="true">
                  {i === 0 ? "☕" : i === 1 ? "🎉" : "💬"}
                </span>
              </div>
            </div>

            {/* Sticker overlapping the photo */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
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
