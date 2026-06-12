"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { useLanguage } from "@/lib/language-context";
import { datePlaces } from "@/lib/data";
import { Heading, Highlight } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// City Name Translations
const cityNames = {
  en: { warsaw: "Warsaw", kyiv: "Kyiv" },
  uk: { warsaw: "Варшава", kyiv: "Київ" },
  ru: { warsaw: "Варшава", kyiv: "Киев" },
  de: { warsaw: "Warschau", kyiv: "Kiew" },
  pl: { warsaw: "Warszawa", kyiv: "Kijów" },
};

// Back to Home Translations
const backTexts = {
  en: "Back to Home",
  uk: "Назад на головну",
  ru: "Назад на главную",
  de: "Zurück zur Startseite",
  pl: "Powrót do strony głównej",
};

// Mini-Gallery Sub-component
interface PlaceGalleryProps {
  images: string[];
  name: string;
}

function PlaceGallery({ images, name }: PlaceGalleryProps) {
  const [index, setIndex] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group/gallery border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      {/* Active Image */}
      <div className="absolute inset-0 bg-neutral-900">
        <Image
          src={images[index]}
          alt={`${name} gallery image ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/gallery:scale-105"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:scale-105 transition-all opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:scale-105 transition-all opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Pagination Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex(i);
              }}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                i === index ? "bg-white w-3.5 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/30 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PlacesPage() {
  const { t, locale } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<"warsaw" | "kyiv">("warsaw");

  const filteredPlaces = datePlaces.filter((p) => p.city === selectedCity);
  const currentCityNames = cityNames[locale] || cityNames.en;
  const backText = backTexts[locale] || backTexts.en;

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

        {/* Title */}
        <Heading as="h2" className="text-center mb-16 tracking-tight">
          {t("places.title.pre") as string} <Highlight>{t("places.title.highlight") as string}</Highlight>
        </Heading>

        <div className="flex flex-col items-center">
          
          {/* City Toggle & Interactive Buttons */}
          <div className="w-full max-w-md mb-12 flex flex-col items-center">
            <p className="text-gray-400 text-xs md:text-sm tracking-wider font-semibold uppercase mb-4 text-center">
              {t("places.cta") as string}
            </p>
            
            {/* Borderless tab switcher in liquid glass style */}
            <div className="relative p-1 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/5 flex w-full max-w-[280px]">
              
              {/* Warsaw Button */}
              <button
                type="button"
                onClick={() => setSelectedCity("warsaw")}
                className={cn(
                  "relative z-10 w-1/2 py-2 text-sm font-semibold tracking-wide rounded-full transition-colors cursor-pointer outline-none",
                  selectedCity === "warsaw" ? "text-white" : "text-gray-500 hover:text-white/80"
                )}
              >
                {selectedCity === "warsaw" && (
                  <motion.div
                    layoutId="activeCityTab"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-magenta-dark/40 to-magenta-dark/25 border border-magenta-dim/30 rounded-full z-[-1]"
                  />
                )}
                {currentCityNames.warsaw}
              </button>

              {/* Kyiv Button */}
              <button
                type="button"
                onClick={() => setSelectedCity("kyiv")}
                className={cn(
                  "relative z-10 w-1/2 py-2 text-sm font-semibold tracking-wide rounded-full transition-colors cursor-pointer outline-none",
                  selectedCity === "kyiv" ? "text-white" : "text-gray-500 hover:text-white/80"
                )}
              >
                {selectedCity === "kyiv" && (
                  <motion.div
                    layoutId="activeCityTab"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-magenta-dark/40 to-magenta-dark/25 border border-magenta-dim/30 rounded-full z-[-1]"
                  />
                )}
                {currentCityNames.kyiv}
              </button>
            </div>
          </div>

          {/* Explain Card: "These Places" (Informational Block) */}
          <div className="w-full max-w-2xl mb-16 rounded-2xl p-6 bg-[#0c0c0e] border border-white/[0.06] text-center select-none">
            <h4 className="font-sans font-bold text-base text-white mb-2 tracking-tight">
              {t("places.subtitle") as string}
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto text-balance">
              {t("places.desc") as string}
            </p>
          </div>

          {/* Places Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPlaces.map((place, idx) => {
                return (
                  <motion.div
                    key={place.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative flex flex-col rounded-3xl bg-[#0c0c0e] border border-white/[0.08] p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)]"
                  >
                    {/* Interactive Slideshow */}
                    <PlaceGallery images={place.images} name={place.name[locale] || place.name.en} />

                    {/* Place Info */}
                    <div className="flex-grow flex flex-col mt-5">
                      {/* Title */}
                      <h3 className="font-sans font-extrabold text-lg md:text-xl text-white tracking-tight leading-tight mb-2 transition-colors duration-300">
                        {place.name[locale] || place.name.en}
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 text-xs md:text-sm leading-relaxed flex-grow text-balance mb-6 font-medium">
                        {place.description[locale] || place.description.en}
                      </p>

                      {/* Footer / CTA Actions: Maps Link */}
                      <div className="mt-auto">
                        <a
                          href={place.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-bold text-white tracking-wide hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer"
                        >
                          <span>Google Maps</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
