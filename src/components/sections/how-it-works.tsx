"use client";

import { motion } from "framer-motion";
import { Heading, Highlight } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

const stepKeys = [1, 2, 3, 4] as const;

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10 relative overflow-hidden">
      <Heading as="h2" className="text-center mb-24 tracking-tight">
        {t("howItWorks.title")} <Highlight>{t("howItWorks.highlight")}</Highlight>
      </Heading>

      {/* Пространственная безрамочная сцена: Горизонтальный поток (Distributed Layout) */}
      <div className="max-w-6xl mx-auto relative">
        {/* Анимированная линия прогрессии (Loading/Progression Beam) */}
        <div className="relative h-[2px] w-full bg-white/[0.03] rounded-full mb-16 overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-magenta to-magenta shadow-[0_0_15px_rgba(139,37,59,0.8)]"
          />
        </div>

        {/* Сетка шагов: выстраивается горизонтально на md+ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {stepKeys.map((num, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0.25, filter: "brightness(0.5) blur(2px)" }}
              whileInView={{ opacity: 1, filter: "brightness(1) blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.55 + 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-full"
            >
              {/* Статичные нативные иллюстрации кодом (фиксированная высота гарантирует единый уровень для заголовков) */}
              <div className="h-32 w-full flex items-center justify-center relative mb-8">
                {/* Мягкое пространственное свечение на фоне */}
                <div className="absolute w-20 h-20 bg-magenta/[0.03] rounded-full blur-xl pointer-events-none" />

                {num === 1 && (
                  /* Слияние сфер: Парящие в чистом пространстве формы */
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="absolute -left-2 w-16 h-16 rounded-full bg-magenta/20 backdrop-blur-md" />
                    <div className="absolute -right-2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md" />
                  </div>
                )}

                {num === 2 && (
                  /* Силуэт карты дропа без жестких обводок */
                  <div className="relative w-16 h-24 rounded-xl bg-white/[0.03] backdrop-blur-md flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="w-2 h-2 rounded-full bg-magenta shadow-[0_0_12px_rgba(139,37,59,1)]" />
                  </div>
                )}

                {num === 3 && (
                  /* Схождение линий (Точка контакта) */
                  <div className="relative w-28 h-16 flex items-center justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 60" fill="none">
                      <path d="M10 10 Q50 50 90 10" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                      <path d="M10 50 Q50 10 90 50" stroke="rgba(208,173,252,0.4)" strokeWidth="1.5" />
                      <circle cx="50" cy="30" r="3.5" fill="#d0adfc" className="shadow-[0_0_10px_rgba(208,173,252,0.8)]" />
                    </svg>
                  </div>
                )}

                {num === 4 && (
                  /* Искра: Свободный минималистичный символ */
                  <div className="relative flex items-center justify-center">
                    <svg className="w-12 h-12 text-magenta/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="rgba(208,173,252,0.1)" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Отцентрированный текст ровно под символом на единой высоте */}
              <div className="text-center flex flex-col items-center w-full px-2">
                <h3 className="font-sans font-bold text-lg md:text-xl text-white mb-3 tracking-tight text-center">
                  {t(`step.${num}.title` as TranslationKeys)}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed text-balance text-center max-w-[240px]">
                  {t(`step.${num}.desc` as TranslationKeys)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
