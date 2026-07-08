"use client";

import { Heading } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import { type TranslationKeys } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function OurMission() {
  const { t } = useLanguage();

  return (
    <section
      className="py-[120px] px-4 md:px-10 relative overflow-clip bg-transparent flex flex-col justify-center items-center"
    >
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Title: Bold white text matching all other headers */}
        <div className="text-center mb-16">
          <Heading as="h2">
            {t("mission.title")}
          </Heading>
        </div>

        {/* Text: Two paragraphs in clean minimalist font (sans-serif), larger size, centered, inside a single semi-transparent box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full rounded-[44px] border border-white/10 bg-black/65 backdrop-blur-xl p-10 md:p-14 shadow-[0_24px_80px_rgba(0,0,0,0.95)] text-center flex flex-col gap-6 relative overflow-hidden"
        >
          {/* Minimalist quotation marks */}
          <Quote className="absolute top-6 left-8 text-white/10 w-8 h-8 pointer-events-none" />
          <Quote className="absolute bottom-6 right-8 text-white/10 w-8 h-8 rotate-180 pointer-events-none" />

          <p className="text-base md:text-lg lg:text-xl text-gray-200 font-sans tracking-wide leading-relaxed px-4">
            {t("mission.text1" as TranslationKeys)}
          </p>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 font-sans tracking-wide leading-relaxed px-4">
            {t("mission.text2.part1" as TranslationKeys)} {t("mission.text2.part2" as TranslationKeys)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
