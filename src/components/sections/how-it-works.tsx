"use client";

import { Heading, Highlight } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { MessageSquare, Camera, CalendarDays, PartyPopper } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

const stepIcons = [MessageSquare, Camera, CalendarDays, PartyPopper];
const stepKeys = [1, 2, 3, 4] as const;

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10">
      <Heading as="h2" className="text-center mb-20">
        {t("howItWorks.title")} <Highlight>{t("howItWorks.highlight")}</Highlight>
      </Heading>

      <div className="max-w-5xl mx-auto flex flex-col gap-24">
        {stepKeys.map((num, i) => {
          const Icon = stepIcons[i];
          const isEven = i % 2 === 1;

          return (
            <div
              key={num}
              className={cn(
                "flex flex-col md:flex-row items-center gap-10 md:gap-16",
                isEven && "md:flex-row-reverse"
              )}
            >
              {/* Illustration placeholder */}
              <div className="flex-shrink-0 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]">
                <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-magenta drop-shadow-neon" />
              </div>

              {/* Text content */}
              <div
                className={cn(
                  "flex-1 text-center md:text-left",
                  isEven && "md:text-right"
                )}
              >
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-magenta text-magenta font-bold text-lg mb-4 shadow-neon-sm">
                  {num}
                </div>

                <h3 className="font-serif text-2xl md:text-3xl lowercase tracking-tight text-white mb-3">
                  {t(`step.${num}.title` as TranslationKeys)}
                </h3>

                <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
                  {t(`step.${num}.desc` as TranslationKeys)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
