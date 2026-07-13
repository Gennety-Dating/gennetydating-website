"use client";

import { motion } from "framer-motion";
import { Heading, Highlight } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

import { cn } from "@/lib/utils";

const safetyKeys = [1, 2, 3] as const;

interface SafetyProps {
  showCta?: boolean;
  className?: string;
}

export function Safety({ showCta = true, className }: SafetyProps) {
  const { t } = useLanguage();

  return (
    <section className={cn("py-[120px] px-4 md:px-10 relative overflow-hidden", className)}>
      <Heading as="h2" className="text-center mb-24 tracking-tight">
        {t("safety.title.pre")} {t("safety.title.highlight")}
      </Heading>

      {/* Распределенный пространственный холст (Distributed Ambient Canvas) без рамок */}
      <div className="max-w-5xl mx-auto relative">
        {/* Тончайшая пространственная линия горизонта, связывающая элементы без замыкания в боксы */}
        <div className="absolute inset-x-0 top-20 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {safetyKeys.map((num, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="group relative text-center flex flex-col items-center select-none"
            >
              {/* Свободные интерактивные код-скульптуры без контейнерных границ */}
              <div className="h-40 flex items-center justify-center relative mb-6 w-full">
                {/* Мягкий пространственный ореол, активирующийся при наведении */}
                <div className="absolute w-24 h-24 bg-white/[0.02] group-hover:bg-white/[0.06] rounded-full blur-2xl transition-colors duration-500 pointer-events-none" />

                  {num === 1 && (
                    /* Sleek, unified shield node in white matching the location pin's style */
                    <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      <svg 
                        className="w-14 h-14 text-white relative z-10" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path 
                          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
                          fill="rgba(255,255,255,0.02)" 
                        />
                        <path d="m9 11 2 2 4-4" />
                      </svg>
                    </div>
                  )}

                  {num === 2 && (
                    /* Гравитационная сфера абсолютной приватности */
                    <div className="relative w-24 h-24 rounded-full bg-midnight flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.25)] transition-all duration-500">
                      <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform duration-500" />
                    </div>
                  )}

                  {num === 3 && (
                    /* Свободный пин локации с реактивной тенью */
                    <div className="relative flex flex-col items-center">
                      <div className="transition-transform duration-500 group-hover:-translate-y-2">
                        <svg className="w-14 h-14 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="rgba(255,255,255,0.02)" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                      </div>
                      {/* Тень-отсвет на полу */}
                      <div className="w-6 h-1 bg-white/20 group-hover:bg-white/40 rounded-full mt-3 blur-[1.5px] transition-all duration-500 group-hover:scale-75" />
                    </div>
                  )}
                </div>

                {/* Чистая типографика */}
                <h3 className="font-sans font-bold text-xl text-heading-white mb-3 tracking-tight">
                  {t(`safety.${num}.title` as TranslationKeys)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs text-balance">
                  {t(`safety.${num}.desc` as TranslationKeys)}
                </p>
              </motion.div>
            ))}
        </div>

        {/* Small CTA Button redirecting to /places */}
        {showCta && (
          <div className="mt-16 flex justify-center relative z-10">
            <Button 
              variant="outline" 
              size="sm" 
              href="/places"
              className="cursor-pointer text-xs md:text-sm font-bold tracking-wider border-2 border-white text-white hover:text-black bg-transparent hover:bg-white transition-all duration-300 px-6 py-2.5"
            >
              {t("places.cta")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
