"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Coffee, 
  ChevronLeft, 
  ChevronRight,
  Compass
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { datePlaces, type DatePlace } from "@/lib/data";
import { Heading, Highlight } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mini-Gallery Sub-component for teaser
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

export function DatePlaces() {
  const { t, locale } = useLanguage();

  // Get exactly 2 high-profile highlight locations (1 Warsaw, 1 Kyiv)
  const teaserPlaces = [
    datePlaces.find((p) => p.id === "warsaw-charlotte"),
    datePlaces.find((p) => p.id === "kyiv-milk-bar")
  ].filter(Boolean) as DatePlace[];

  return (
    <section className="py-[120px] px-4 md:px-10 relative overflow-hidden">
      {/* Title */}
      <Heading as="h2" className="text-center mb-16 tracking-tight">
        {t("places.title.pre") as string} <Highlight>{t("places.title.highlight") as string}</Highlight>
      </Heading>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
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

        {/* Highlight Teaser Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {teaserPlaces.map((place) => (
            <div
              key={place.id}
              className="group relative flex flex-col rounded-3xl bg-white/[0.02] border border-white/5 p-5 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              {/* Slideshow */}
              <PlaceGallery images={place.images} name={place.name[locale] || place.name.en} />

              {/* Info */}
              <div className="flex-grow flex flex-col mt-5">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[10px] md:text-xs font-semibold tracking-wide text-gray-300">
                    <Coffee className="w-3.5 h-3.5 text-magenta" />
                    <span>{place.vibe[locale] || place.vibe.en}</span>
                  </div>
                  
                  {/* City Label badge */}
                  <span className="text-[10px] uppercase font-bold tracking-wider text-magenta/80">
                    {place.city === "warsaw" ? (locale === "ru" || locale === "uk" ? "Варшава" : "Warsaw") : (locale === "ru" ? "Киев" : locale === "uk" ? "Київ" : "Kyiv")}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-xl text-white tracking-tight group-hover:text-magenta transition-colors duration-300 mb-2">
                  {place.name[locale] || place.name.en}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed flex-grow text-balance mb-2">
                  {place.description[locale] || place.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action to view the full catalog page */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="solid"
            size="md"
            href="/places"
            className="cursor-pointer font-bold shadow-neon-sm hover:shadow-neon"
          >
            {t("places.view_all") as string}
          </Button>
        </div>
      </div>
    </section>
  );
}
