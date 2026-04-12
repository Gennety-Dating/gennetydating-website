"use client";

import { Heading, Highlight } from "@/components/ui/typography";
import { ShieldCheck, Eye, Coffee } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

const safetyIcons = [ShieldCheck, Eye, Coffee];
const safetyKeys = [1, 2, 3] as const;

export function Safety() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10">
      <Heading as="h2" className="text-center mb-20">
        {t("safety.title.pre")} <Highlight>{t("safety.title.highlight")}</Highlight>
      </Heading>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {safetyKeys.map((num, i) => {
          const Icon = safetyIcons[i];

          return (
            <div key={num} className="text-center">
              {/* Icon / illustration placeholder */}
              <div className="mx-auto w-32 h-32 mb-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <Icon className="w-12 h-12 text-magenta drop-shadow-neon" />
              </div>

              <h3 className="font-serif text-xl md:text-2xl lowercase tracking-tight text-white mb-3">
                {t(`safety.${num}.title` as TranslationKeys)}
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                {t(`safety.${num}.desc` as TranslationKeys)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
