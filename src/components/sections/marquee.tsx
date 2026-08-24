"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const CREDITS = [
  { role: "Product Visionary & Concept Creator", name: "sverkaus labs" },
  { role: "Creative Director", name: "sverkaus labs" },
  { role: "Lead Experience Designer", name: "sverkaus labs" },
  { role: "Brand Architect & Identity Strategist", name: "sverkaus labs" },
  { role: "Chief Narrative & Storytelling Lead", name: "sverkaus labs" },
  { role: "Head of Product Design", name: "sverkaus labs" },
  { role: "AI Matchmaking Experience Architect", name: "sverkaus labs" },
  { role: "Art Director & Visual Stylist", name: "sverkaus labs" },
  { role: "Principal Interaction Designer", name: "sverkaus labs" },
  { role: "Sound & Atmosphere Curator", name: "sverkaus labs" },
  { role: "UX Research & Human Psychology Lead", name: "sverkaus labs" },
  { role: "Design Systems & Token Architecture", name: "sverkaus labs" },
  { role: "Motion Graphics & Visual FX Lead", name: "sverkaus labs" },
  { role: "Content Strategy & Copywriting Lead", name: "sverkaus labs" },
  { role: "Cultural & Social Dynamics Researcher", name: "sverkaus labs" },
  { role: "Product Strategy & Roadmap Lead", name: "sverkaus labs" },
  { role: "Aesthetic & Spatial Experience Lead", name: "sverkaus labs" },
  { role: "Brand Campaign & Comms Strategist", name: "sverkaus labs" },
  { role: "Digital Experience Craftsman", name: "sverkaus labs" },
  { role: "Creative Technology Lead", name: "sverkaus labs" },
  { role: "Lead Product Architect", name: "sverkaus labs" },
  { role: "Interface Design Engineer", name: "sverkaus labs" },
  { role: "Frontend Architecture Lead", name: "sverkaus labs" },
  { role: "AI Logic & Matching Models Engineer", name: "sverkaus labs" },
  { role: "Core Systems & Security Architect", name: "sverkaus labs" },
  { role: "Performance & Optimization Specialist", name: "sverkaus labs" },
  { role: "Experience Quality & Curation Lead", name: "sverkaus labs" },
  { role: "Launch & Ecosystem Strategy Lead", name: "sverkaus labs" },
  { role: "Community Atmosphere Architect", name: "sverkaus labs" },
  { role: "Executive Producer", name: "sverkaus labs" },
];

export function Marquee() {
  const { t } = useLanguage();

  // Duplicate list for infinite seamless vertical loop
  const creditsList = [...CREDITS, ...CREDITS];

  return (
    <section className="relative pt-16 pb-20 md:pt-20 md:pb-24 overflow-hidden bg-transparent">
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Film Credits Container with Top & Bottom Soft Fade Masks */}
        <div
          className="h-[260px] md:h-[280px] max-w-xl mx-auto overflow-hidden relative select-none translate-x-[20px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex flex-col"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {creditsList.map((credit, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 sm:gap-8 items-center py-2.5 px-2"
              >
                <span className="text-[11px] sm:text-xs font-medium tracking-wider uppercase text-gray-400 text-right">
                  {credit.role}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white text-left">
                  {credit.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Manifesto button shifted ~25px lower */}
        <div className="flex justify-center mt-20 md:mt-24 relative z-10">
          <Button
            variant="outline"
            href="/thesis"
            className="min-h-0 py-2.5 px-8 text-base tracking-wide transition-colors"
          >
            {t("marquee.manifesto")}
          </Button>
        </div>
      </div>
    </section>
  );
}
