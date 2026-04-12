"use client";

import { Heading, Highlight } from "@/components/ui/typography";
import { BookOpen, Brain, Search } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

const featureIcons = [BookOpen, Brain, Search];
const featureKeys = [1, 2, 3] as const;

export function Matchmaker() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10">
      <Heading as="h2" className="text-center mb-20">
        {t("matchmaker.title.pre")} <Highlight>{t("matchmaker.title.highlight")}</Highlight> {t("matchmaker.title.post")}
      </Heading>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {featureKeys.map((num, i) => {
          const Icon = featureIcons[i];

          return (
            <div key={num} className="text-center">
              {/* Illustration placeholder */}
              <div className="mx-auto w-40 h-40 mb-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <Icon className="w-14 h-14 text-magenta drop-shadow-neon" />
              </div>

              <h3 className="font-serif text-xl md:text-2xl lowercase tracking-tight text-white mb-3">
                {t(`matchmaker.${num}.title` as TranslationKeys)}
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                {t(`matchmaker.${num}.desc` as TranslationKeys)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
