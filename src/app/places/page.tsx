"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  ExternalLink, 
  Coffee, 
  Trees, 
  Library, 
  Utensils, 
  ChevronLeft, 
  ChevronRight,
  Compass,
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

const typeIcons = {
  cafe: Coffee,
  restaurant: Utensils,
  park: Trees,
  museum: Library,
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
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group/gallery">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:scale-105 transition-all opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:scale-105 transition-all opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
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
                i === index ? "bg-white w-3" : "bg-white/40 hover:bg-white/60"
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
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="w-full max-w-3xl mb-16 relative rounded-3xl p-6 md:p-8 bg-white/[0.02] backdrop-blur-lg border border-white/5 overflow-hidden select-none"
          >
            {/* Neon Bloom Light behind the card */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-magenta/[0.03] rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-magenta/10 flex items-center justify-center flex-shrink-0 border border-magenta-dim/20 shadow-neon-sm">
                <Compass className="w-6 h-6 text-magenta" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-lg text-white mb-2 tracking-tight flex items-center justify-center md:justify-start gap-2">
                  <span>{t("places.subtitle") as string}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-ping" />
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed text-balance">
                  {t("places.desc") as string}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Places Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPlaces.map((place, idx) => {
                const Icon = typeIcons[place.type] || MapPin;
                
                return (
                  <motion.div
                    key={place.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative flex flex-col rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 p-5 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                  >
                    {/* Neon Glow Hover Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-magenta/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Interactive Slideshow */}
                    <PlaceGallery images={place.images} name={place.name[locale] || place.name.en} />

                    {/* Place Info */}
                    <div className="flex-grow flex flex-col mt-5">
                      {/* Header: Vibe Badge & Type */}
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[10px] md:text-xs font-semibold tracking-wide text-gray-300">
                          <Icon className="w-3.5 h-3.5 text-magenta" />
                          <span>{place.vibe[locale] || place.vibe.en}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-bold text-xl text-white tracking-tight group-hover:text-magenta transition-colors duration-300 mb-2">
                        {place.name[locale] || place.name.en}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed flex-grow text-balance mb-6">
                        {place.description[locale] || place.description.en}
                      </p>

                      {/* Footer / CTA Actions: Maps Link */}
                      <div className="mt-auto">
                        <a
                          href={place.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-bold text-white tracking-wide hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
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
