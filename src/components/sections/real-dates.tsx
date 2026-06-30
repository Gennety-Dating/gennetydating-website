"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { metrics } from "@/lib/data";
import { Heading, Highlight } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const metricKeys: TranslationKeys[] = ["metric.1", "metric.2", "metric.3"];

// Файлы для создания пространственной сцены свиданий
const sceneImages = [
  "/images/aquarium-date.jpg",
  "/images/chips-date.jpg",
  "/images/step4-pizza.jpg"
];

export function RealDates() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10 relative overflow-hidden">
      <Heading as="h2" className="text-center mb-20 tracking-tight">
        <Highlight>{t("realDates.title.highlight")}</Highlight> {t("realDates.title.rest")}
      </Heading>

      {/* Безрамочная пространственная сцена */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl select-none"
          >
            {/* Нативное фоновое изображение сцены с плавным растворением краев в темноту */}
            <div className="absolute inset-0 bg-midnight">
              <Image 
                src={sceneImages[i]} 
                alt={`Spatial scene representation ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 ease-out group-hover:scale-105"
              />
              {/* Мягкая виньетка, стирающая границы контейнера */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-midnight/20 via-transparent to-midnight/20 pointer-events-none" />
            </div>

            {/* Встроенный безрамочный бейдж (Native floating BG), парящий в пространстве */}
            <div className="absolute inset-x-6 bottom-8 z-10 flex justify-center">
              <motion.div 
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="w-full max-w-[260px] p-5 rounded-2xl bg-black/40 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-center relative transition-all duration-500 group-hover:bg-black/50"
              >
                {/* Значение метрики с нативным свечением */}
                <span className={cn(
                  "font-sans font-bold text-xl md:text-2xl tracking-tight block mb-1",
                  metric.color === "magenta" && "text-magenta drop-shadow-[0_0_15px_rgba(139,37,59,0.5)]",
                  metric.color === "gold" && "text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]",
                  metric.color === "sky" && "text-sky-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                )}>
                  {t(metricKeys[i])}
                </span>

                {/* Подпись метрики (для сохранения контекста в случае отсутствия перевода) */}
                <span className="text-[11px] md:text-xs text-gray-400 tracking-wide font-medium block">
                  {i === 0 ? "Arranged & Confirmed" : i === 1 ? "Satisfaction Rate" : "Want Second Date"}
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
