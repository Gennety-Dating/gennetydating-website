"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { useLanguage } from "@/lib/language-context";
import { Heading, Highlight } from "@/components/ui/typography";

// Back to Home Translations
const backTexts = {
  en: "Back to Home",
  uk: "Назад на головну",
  ru: "Назад на главную",
  de: "Zurück zur Startseite",
  pl: "Powrót do strony głównej",
};

// Localized Subtitle Translations for "soon"
const soonSubtitles = {
  en: "curating venues...",
  uk: "добір локацій...",
  ru: "подбор локаций...",
  de: "orte werden ausgewählt...",
  pl: "wybór miejsc...",
};

export default function PlacesPage() {
  const { t, locale } = useLanguage();
  const backText = backTexts[locale] || backTexts.en;
  const soonSubtitle = soonSubtitles[locale] || soonSubtitles.en;

  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans relative overflow-hidden">
      {/* Blurred background image */}
      <div 
        className="fixed inset-0 bg-[url('/images/places-bg.jpg')] bg-cover bg-center pointer-events-none filter blur-[6px] opacity-55 z-0 scale-110" 
        aria-hidden="true"
      />
      {/* Edge blending gradients */}
      <div className="fixed inset-x-0 top-0 h-32 bg-gradient-to-b from-midnight to-transparent pointer-events-none z-0" />
      <div className="fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midnight to-transparent pointer-events-none z-0" />

      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-4 md:px-10 max-w-5xl mx-auto w-full flex flex-col justify-start relative z-10">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 self-start group text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{backText}</span>
        </Link>

        {/* Header Title */}
        <Heading as="h2" className="text-center mb-8 tracking-tight">
          {t("places.title.pre") as string} <Highlight>{t("places.title.highlight") as string}</Highlight>
        </Heading>

        {/* Centerpiece "Soon" Announcement */}
        <div className="flex-grow flex flex-col items-center justify-center py-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center relative select-none"
          >
            {/* Ambient Electric Magenta Glow */}
            <div className="absolute inset-0 bg-electric-magenta/10 rounded-full blur-3xl scale-150 opacity-40 pointer-events-none" />
            
            {/* Soon text in lowercase editorial serif with neon bloom text shadow */}
            <motion.h1
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="font-serif text-8xl md:text-[10rem] text-white tracking-[0.25em] pl-[0.25em] drop-shadow-neon-electric lowercase leading-none"
            >
              soon
            </motion.h1>
            
            {/* Localized handwritten script subtitle */}
            <motion.p
              animate={{
                y: [0, -4, 0],
                rotate: [-3, -1, -3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="font-script text-4xl md:text-5xl text-electric-magenta drop-shadow-neon-electric-sm mt-8 select-none leading-none"
            >
              {soonSubtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
