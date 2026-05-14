"use client";

import { motion } from "framer-motion";
import { Heading, Highlight } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

const featureKeys = [1, 2, 3] as const;

export function Matchmaker() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10 relative">
      <Heading as="h2" className="text-center mb-20 tracking-tight">
        {t("matchmaker.title.pre")} <Highlight>{t("matchmaker.title.highlight")}</Highlight> {t("matchmaker.title.post")}
      </Heading>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureKeys.map((num, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="relative group rounded-2xl p-8 overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl"
          >
            {/* Размытое «жидкое» пятно на фоне для эффекта преломления */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-magenta/15 rounded-full blur-2xl group-hover:bg-magenta/25 group-hover:scale-150 transition-all duration-700 pointer-events-none" />

            {/* Элегантная фоновая нумерация */}
            <div className="absolute bottom-2 right-4 text-8xl font-serif font-bold text-white/[0.03] select-none pointer-events-none">
              0{num}
            </div>

            {/* Контент */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Минималистичный индикатор вместо ИИ-иконки */}
              <div className="w-2 h-2 rounded-full bg-magenta mb-8 shadow-[0_0_8px_rgba(208,173,252,0.8)]" />

              <div>
                <h3 className="font-sans font-bold text-xl text-white mb-3 tracking-tight">
                  {t(`matchmaker.${num}.title` as TranslationKeys)}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed text-balance">
                  {t(`matchmaker.${num}.desc` as TranslationKeys)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
