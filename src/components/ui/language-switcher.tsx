"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { type Locale, locales, localeNames } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Globe, ChevronDown } from "lucide-react";
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
      {/* Liquid Glass Capsule Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 h-9 px-3.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-white/[0.1] hover:border-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-expanded={isOpen}
      >
        <Globe
          className={cn(
            "w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors duration-300",
            isOpen && "text-white"
          )}
        />
        <span className="font-mono text-xs font-semibold tracking-wider text-white/70 group-hover:text-white transition-colors duration-300 uppercase">
          {localeNames[locale]}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-white/30 group-hover:text-white/50 transition-transform duration-300",
            isOpen ? "rotate-180 text-white/80" : ""
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
              "absolute right-0 w-20 max-h-[calc(100vh-6rem)] overflow-hidden rounded-2xl bg-black/50 border border-white/10 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl z-50",
              opensUp ? "bottom-[calc(100%+8px)] origin-bottom-right" : "top-[calc(100%+8px)] origin-top-right",
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
                    "w-full h-8 flex items-center justify-center rounded-xl text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer",
                    locale === l
                      ? "bg-white/[0.08] text-white font-bold"
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

