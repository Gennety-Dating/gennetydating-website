"use client";

import { motion } from "framer-motion";
import { Heading, Highlight } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";
import { Brain, HeartHandshake, Radar } from "lucide-react";

const featureKeys = [1, 2, 3] as const;

export function Matchmaker() {
  const { t } = useLanguage();

  const getIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Brain className="w-12 h-12 text-magenta drop-shadow-[0_0_15px_rgba(255,0,255,0.6)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />;
      case 2:
        return <HeartHandshake className="w-12 h-12 text-magenta drop-shadow-[0_0_15px_rgba(255,0,255,0.6)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />;
      case 3:
        return <Radar className="w-12 h-12 text-magenta drop-shadow-[0_0_15px_rgba(255,0,255,0.6)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-[120px] px-4 md:px-10 relative overflow-hidden">
      <Heading as="h2" className="text-center mb-24 tracking-tight">
        {t("matchmaker.title.pre")} <Highlight>{t("matchmaker.title.highlight")}</Highlight> {t("matchmaker.title.post")}
      </Heading>

      {/* Безрамочная распределенная структура (Distributed Ambient Canvas) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
        {featureKeys.map((num, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col items-center text-center p-6 rounded-3xl transition-all duration-500 hover:bg-magenta/[0.02]"
          >
            {/* Мягкая подсветка негативного пространства, активируемая при наведении */}
            <div className="absolute w-32 h-32 bg-magenta/0 group-hover:bg-magenta/10 rounded-full blur-2xl transition-all duration-700 pointer-events-none" />

            {/* Изолированная векторная скульптура без контейнерных границ */}
            <div className="mb-8 relative flex items-center justify-center">
              {getIcon(num)}
            </div>

            {/* Тонкая направляющая горизонталь (Spatial Horizon) для архитектурного ритма */}
            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-magenta/40 to-transparent mb-6 transition-all duration-500 group-hover:w-16 group-hover:via-magenta" />

            {/* Симметрично отцентрированная типографика */}
            <div className="relative z-10">
              <h3 className="font-sans font-bold text-xl text-white mb-4 tracking-tight">
                {t(`matchmaker.${num}.title` as TranslationKeys)}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto text-balance">
                {t(`matchmaker.${num}.desc` as TranslationKeys)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
