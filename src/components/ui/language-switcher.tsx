"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { type Locale, locales, localeNames } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSwitcherProps {
  menuPlacement?: "top" | "bottom";
}

export function LanguageSwitcher({ menuPlacement = "bottom" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const opensUp = menuPlacement === "top";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center justify-center gap-2 rounded-full font-medium cursor-pointer select-none bg-transparent text-white border border-white/60 hover:bg-white/10 active:scale-95 px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm transition-all duration-300"
        aria-expanded={isOpen}
      >
        <span>
          {localeNames[locale]}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-white/60 transition-transform duration-300",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>

      {/* Liquid Glass dropdown list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: opensUp ? -6 : 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: opensUp ? -4 : 4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute left-0 w-full max-h-[calc(100vh-6rem)] overflow-hidden rounded-2xl bg-[#050505]/95 border border-white/60 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50",
              opensUp ? "bottom-[calc(100%+8px)] origin-bottom" : "top-[calc(100%+8px)] origin-top",
            )}
          >
            <div className="flex flex-col gap-1">
              {locales.map((l: Locale) => (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full h-8 flex items-center justify-center rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none",
                    locale === l
                      ? "bg-white text-[#050505] font-semibold"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

