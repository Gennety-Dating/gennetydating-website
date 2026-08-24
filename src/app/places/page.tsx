"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { useLanguage } from "@/lib/language-context";
import { datePlaces } from "@/lib/data";
import { CityRoulette } from "@/components/ui/city-roulette";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Localized UI Translations
const backTexts = {
  en: "Back to Home",
  uk: "Назад на головну",
  ru: "Назад на главную",
  de: "Zurück zur Startseite",
  pl: "Powrót do strony głównej",
  fr: "Retour à l'accueil",
  it: "Torna alla Home",
  es: "Volver al inicio",
};

const mapsButtonTexts = {
  en: "Open in Maps",
  uk: "Відкрити на карті",
  ru: "Открыть на карте",
  de: "In Maps öffnen",
  pl: "Otwórz w Mapach",
  fr: "Ouvrir dans Maps",
  it: "Apri in Maps",
  es: "Abrir en Maps",
};

export default function PlacesPage() {
  const { t, locale } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>("kyiv");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Load liked places from localStorage after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gennety-liked-places");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          queueMicrotask(() => {
            setLikedIds(parsed);
          });
        }
      }
    } catch {
      // ignore invalid data
    }
  }, []);
  const backText = backTexts[locale] || backTexts.en;

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const isLiked = prev.includes(id);
      const updated = isLiked ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("gennety-liked-places", JSON.stringify(updated));
      return updated;
    });
  };

  const placesWithLikesState = useMemo(() => {
    return datePlaces.map((place) => {
      const isLikedByUser = likedIds.includes(place.id);
      return {
        ...place,
        displayLikes: place.likes + (isLikedByUser ? 1 : 0),
        isLikedByUser,
      };
    });
  }, [likedIds]);

  const filteredPlaces = useMemo(() => {
    return placesWithLikesState
      .filter((place) => place.city === selectedCity)
      .sort((a, b) => b.displayLikes - a.displayLikes);
  }, [placesWithLikesState, selectedCity]);

  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans relative overflow-hidden">
      {/* Blurred background image */}
      <div 
        className="fixed -inset-10 bg-[url('/images/places-balloon-mobile.jpg')] md:bg-[url('/images/places-balloon.jpg')] bg-cover bg-center pointer-events-none filter blur-[3px] opacity-55 z-0 scale-110" 
        aria-hidden="true"
      />
      {/* Edge blending gradients */}
      <div className="fixed inset-x-0 top-0 h-32 bg-gradient-to-b from-midnight to-transparent pointer-events-none z-0" />
      <div className="fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midnight to-transparent pointer-events-none z-0" />

      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-4 md:px-10 max-w-6xl mx-auto w-full flex flex-col justify-start relative z-10">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 self-start group text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{backText}</span>
        </Link>

        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-magenta/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 lowercase">
            {t("places.title.pre")}{" "}
            <span className="inline-flex items-center justify-center text-center leading-none bg-white text-midnight px-5 py-2 rounded-full font-script text-3xl md:text-4xl lg:text-5xl select-none align-middle md:ml-2">
              {t("places.title.highlight")}
            </span>
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-balance">
            {t("places.desc")}
          </p>
        </div>

        {/* City Drum Roulette */}
        <div className="mb-6 md:mb-8">
          <CityRoulette
            selectedCityId={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place, index) => {
            const hasImage = place.images && place.images.length > 0;
            const name = place.name[locale] || place.name.en;
            const description = place.description[locale] || place.description.en;
            const isWarsaw = place.city === "warsaw";
            const isComingSoon = place.isComingSoon;

            return (
              <motion.div
                layout
                key={place.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={isMobile ? undefined : { scale: 1.01 }}
                viewport={{ once: true, margin: "80px" }}
                transition={{
                  opacity: { duration: 0.35 },
                  y: { duration: 0.35 },
                  layout: {
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                    mass: 0.8,
                  },
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1c1c1e] hover:bg-[#252528] transition-[background-color,box-shadow] duration-300 hover:shadow-2xl"
              >
                <div className="flex flex-col">
                  {/* Card Header Image / Gradient */}
                  <div className="relative h-60 w-full overflow-hidden bg-black/20">
                    {hasImage ? (
                      <Image
                        src={place.images[0]}
                        alt={name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className={cn(
                          "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                          (isWarsaw || isComingSoon) && "grayscale contrast-[1.1]"
                        )}
                      />
                    ) : (
                      /* Premium minimal gradient fallback with grain */
                      <div className="relative h-full w-full bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center overflow-hidden">
                        <span className="font-sans text-lg tracking-widest font-semibold text-white/10 group-hover:text-white/20 transition-colors duration-300 select-none uppercase">
                          {name}
                        </span>
                      </div>
                    )}

                    {/* Dark overlay for coming soon places */}
                    {isComingSoon && (
                      <div className="absolute inset-0 bg-neutral-950/40 pointer-events-none z-[5]" />
                    )}

                    {/* SOON Overlay Label */}
                    {isComingSoon && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="px-7 py-2 md:px-8 md:py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex items-center justify-center">
                          <span className="font-sans text-xl md:text-2xl font-black tracking-[0.35em] text-white uppercase pl-[0.35em] select-none">
                            SOON
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Premium Badge (Top Left) */}
                    {place.isPremium && !isWarsaw && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#1c1c1e] text-white select-none border-0 outline-none">
                          <svg
                            viewBox="0 0 100 100"
                            className="w-5 h-5 fill-white text-white"
                          >
                            <path d="M 50 35 C 20 0, -10 30, 15 55 C -5 75, 25 100, 48 65 L 52 65 C 75 100, 105 75, 85 55 C 110 30, 80 0, 50 35 Z" />
                          </svg>
                          <span className="text-white/95">
                            premium
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Likes Button (Top Right) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(place.id);
                      }}
                      className={cn(
                        "absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full transition-[background-color,color,transform,box-shadow] duration-300 cursor-pointer select-none active:scale-90 border-0 outline-none focus:outline-none focus-visible:outline-none ring-0",
                        place.isLikedByUser
                          ? "bg-magenta text-white shadow-lg"
                          : "bg-[#1c1c1e] text-gray-300 hover:text-white hover:bg-[#252528]"
                      )}
                    >
                      <Heart
                        className={cn(
                          "w-3 h-3 transition-transform duration-300",
                          place.isLikedByUser ? "fill-white text-white scale-110" : ""
                        )}
                      />
                      <span>{place.displayLikes}</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5 pb-2 flex flex-col">
                    <h3 className="font-sans text-xl font-bold tracking-tight text-white mb-2 leading-tight">
                      {name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-1 line-clamp-3 select-none">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-5 pb-5 pt-0">
                  <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-white/[0.03] hover:bg-white/[0.08] py-3.5 md:py-2 text-sm md:text-xs font-bold text-white transition-all duration-300 cursor-pointer group/btn"
                  >
                    <span>{mapsButtonTexts[locale] || mapsButtonTexts.en}</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
          {selectedCity === "warsaw" && (
            <motion.div
              layout
              key="warsaw-placeholder"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                layout: { type: "spring", stiffness: 350, damping: 30, mass: 0.8 },
              }}
              className="flex items-center justify-center min-h-[350px] rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-6 text-center select-none"
            >
              <span className="text-white/30 text-sm font-sans font-light tracking-wider">
                More places soon
              </span>
            </motion.div>
          )}

          {filteredPlaces.length === 0 && (
            <motion.div
              layout
              key={`${selectedCity}-placeholder`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                layout: { type: "spring", stiffness: 350, damping: 30, mass: 0.8 },
              }}
              className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center min-h-[350px] rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-6 text-center select-none"
            >
              <span className="text-white/30 text-sm font-sans font-light tracking-wider">
                More places soon
              </span>
            </motion.div>
          )}
        </div>

      </div>

      <Footer theme="dark" />
    </main>
  );
}
