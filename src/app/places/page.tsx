"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { useLanguage } from "@/lib/language-context";
import { datePlaces } from "@/lib/data";
import { cn } from "@/lib/utils";

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

const cityNames = {
  en: { kyiv: "Kyiv", warsaw: "Warsaw" },
  uk: { kyiv: "Київ", warsaw: "Варшава" },
  ru: { kyiv: "Киев", warsaw: "Варшава" },
  de: { kyiv: "Kiew", warsaw: "Warschau" },
  pl: { kyiv: "Kijów", warsaw: "Warszawa" },
  fr: { kyiv: "Kyiv", warsaw: "Varsovie" },
  it: { kyiv: "Kyiv", warsaw: "Varsavia" },
  es: { kyiv: "Kyiv", warsaw: "Varsovia" },
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
  const [selectedCity, setSelectedCity] = useState<"kyiv" | "warsaw">("kyiv");
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gennety-liked-places");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [];
  });
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
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 self-start group text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{backText}</span>
        </Link>

        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-magenta/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 lowercase">
            {t("places.title.pre")}{" "}
            <span className="inline-flex items-center justify-center text-center leading-none bg-white text-midnight px-5 py-2.5 rounded-full font-script text-3xl md:text-4xl lg:text-5xl select-none align-middle md:ml-2">
              {t("places.title.highlight")}
            </span>
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-balance">
            {t("places.desc")}
          </p>
        </div>

        {/* City Filter Switcher */}
        <div className="flex justify-center gap-4 mb-12">
          {(["kyiv", "warsaw"] as const).map((city) => {
            const isActive = selectedCity === city;
            const name = cityNames[locale]?.[city] || cityNames.en[city];
            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer uppercase",
                  isActive
                    ? "bg-white text-midnight shadow-lg"
                    : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place, index) => {
            const hasImage = place.images && place.images.length > 0;
            const name = place.name[locale] || place.name.en;
            const description = place.description[locale] || place.description.en;

            return (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1c1c1e] hover:bg-[#252528] transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
              >
                <div className="flex flex-col">
                  {/* Card Header Image / Gradient */}
                  <div className="relative h-60 w-full overflow-hidden bg-black/20">
                    {hasImage ? (
                      <img
                        src={place.images[0]}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Premium minimal gradient fallback with grain */
                      <div className="relative h-full w-full bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center overflow-hidden">
                        <span className="font-sans text-lg tracking-widest font-semibold text-white/10 group-hover:text-white/20 transition-colors duration-300 select-none uppercase">
                          {name}
                        </span>
                      </div>
                    )}
                    
                    {/* Premium Badge (Top Left) */}
                    {place.isPremium && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 text-white">
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
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(place.id);
                      }}
                      className={cn(
                        "absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer select-none backdrop-blur-md",
                        place.isLikedByUser
                          ? "bg-magenta text-white shadow-lg"
                          : "bg-black/50 text-gray-300 hover:text-white hover:bg-black/70"
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
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] py-2 text-xs font-bold text-white transition-all duration-300 cursor-pointer group/btn"
                  >
                    <span>{mapsButtonTexts[locale] || mapsButtonTexts.en}</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
          {selectedCity === "warsaw" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: filteredPlaces.length * 0.05 }}
              className="flex items-center justify-center min-h-[350px] rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-6 text-center select-none"
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
