"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heading } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

const stepKeys = [1, 2, 3, 4] as const;

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10 relative overflow-hidden">
      <Heading as="h2" className="text-center mb-24 tracking-tight text-heading-white">
        {t("howItWorks.title")} {t("howItWorks.highlight")}
      </Heading>

      {/* Пространственная безрамочная сцена: Вертикальный лестничный (Staggered Layout) поток */}
      <div className="max-w-4xl mx-auto relative flex flex-col gap-12 md:gap-0">
        {stepKeys.map((num, i) => {
          const isEven = num % 2 === 0;
          return (
            <motion.div
              key={num}
              initial={{ opacity: 0.25, filter: "brightness(0.5) blur(2px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "brightness(1) blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className={`relative flex flex-col select-none w-full md:w-[46%] items-center md:items-start text-center md:text-left ${
                isEven ? "self-end md:-mt-24" : "self-start"
              } ${
                i > 0 && !isEven ? "md:-mt-24" : ""
              }`}
            >
              {/* Номер и Заголовок с описанием */}
              <div className="flex flex-col items-center md:items-start mb-4 w-full">
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start w-full">
                  {/* Вертикальный овальный бейдж для цифры */}
                  <span className="shrink-0 flex items-center justify-center w-8 h-10 bg-black border-2 border-magenta text-magenta font-mono font-bold text-lg rounded-full select-none">
                    {num}
                  </span>
                  <h3 className="font-sans font-bold text-2xl md:text-3xl text-heading-white tracking-tight whitespace-nowrap">
                    {t(`step.${num}.title` as TranslationKeys)}
                  </h3>
                </div>
                <p className={`text-gray-400 text-xs md:text-sm leading-relaxed ${
                  num === 2 ? "max-w-[380px]" : "whitespace-nowrap"
                }`}>
                  {t(`step.${num}.desc` as TranslationKeys)}
                </p>
              </div>

              {/* Изображение шага с эффектом scrapbook-поворота */}
              <div className={`relative w-full aspect-square flex items-center justify-center bg-transparent transform transition-all duration-500 hover:scale-[1.03] ${
                num === 1 ? "max-w-[320px] rotate-1 hover:rotate-2" :
                num === 2 ? "max-w-[365px] -translate-x-[15px] translate-y-[5px] -rotate-2 hover:-rotate-1" :
                num === 3 ? "max-w-[282px] translate-x-[5px] -translate-y-[5px] rotate-2 hover:rotate-3" :
                "max-w-[270px] rotate-[5deg] hover:rotate-[7deg] mt-10"
              }`}>
                {/* Мягкое свечение сзади */}
                <div className="absolute w-36 h-36 bg-magenta/[0.04] rounded-full blur-2xl pointer-events-none" />
                
                <Image
                  src={
                    num === 1
                      ? "/images/how-it-works-1-final.png"
                      : num === 2
                      ? "/images/website how it works section.png"
                      : num === 3
                      ? "/images/how-it-works-3-user.png"
                      : num === 4
                      ? "/images/how-it-works-4-new.png"
                      : `/images/how-it-works-${num}.png`
                  }
                  alt={t(`step.${num}.title` as TranslationKeys)}
                  width={365}
                  height={365}
                  className="w-full h-full object-contain select-none drop-shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
