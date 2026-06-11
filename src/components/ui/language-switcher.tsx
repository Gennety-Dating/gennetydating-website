"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { type Locale, locales, localeNames } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
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
      {/* Ultra-minimalist Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200 cursor-pointer"
        aria-expanded={isOpen}
      >
        <Globe
          className={cn(
            "w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors duration-200",
            isOpen && "text-white/80"
          )}
        />
        <span className="font-mono text-xs font-semibold tracking-wider text-white/60 group-hover:text-white/90 transition-colors duration-200 uppercase">
          {localeNames[locale]}
        </span>
      </button>

      {/* Ultra-minimalist dropdown list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: opensUp ? -6 : 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: opensUp ? -4 : 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute right-0 w-16 max-h-[calc(100vh-6rem)] overflow-hidden rounded-xl bg-[#070708]/96 border border-white/10 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl z-50",
              opensUp ? "bottom-[calc(100%+6px)] origin-bottom-right" : "top-[calc(100%+6px)] origin-top-right",
            )}
          >
            <div className="flex flex-col gap-0.5">
              {locales.map((l: Locale) => (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full h-8 flex items-center justify-center rounded-lg text-xs font-mono tracking-wider font-semibold transition-all duration-200 cursor-pointer",
                    locale === l
                      ? "bg-magenta/15 text-magenta shadow-[0_0_15px_rgba(255,0,255,0.15)]"
                      : "text-white/40 hover:text-white hover:bg-white/[0.05]"
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

