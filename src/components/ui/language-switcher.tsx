"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { type Locale, locales, localeNames } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSwitcherProps {
  menuPlacement?: "top" | "bottom";
  theme?: "light" | "dark";
  isFloating?: boolean;
}

export function LanguageSwitcher({ 
  menuPlacement = "bottom", 
  theme = "dark",
  isFloating = false 
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const isDark = theme === "dark";
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
        className={cn(
          "group flex items-center justify-center rounded-full cursor-pointer select-none bg-transparent active:scale-95 transition-all duration-300",
          isFloating ? "w-12 h-12" : "w-[42px] h-[42px]",
          isDark 
            ? "text-white hover:bg-white/10" 
            : "text-[#111111] border border-[#111111]/30 hover:bg-[#111111]/10"
        )}
        aria-expanded={isOpen}
        aria-label="Change language"
      >
        <svg 
          viewBox="0 0 100 100" 
          className={cn(
            isFloating
              ? "w-7 h-7 fill-none stroke-current transition-all duration-300"
              : "w-[23px] h-[23px] md:w-[27px] md:h-[27px] fill-none stroke-current transition-all duration-300",
            isOpen ? "rotate-12 scale-90" : "group-hover:scale-110"
          )}
          strokeWidth={8} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M 50 35 
                     C 20 0, -10 30, 15 55 
                     C -5 75, 25 100, 48 65 
                     L 52 65 
                     C 75 100, 105 75, 85 55 
                     C 110 30, 80 0, 50 35 
                     Z" />
        </svg>
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
              "absolute w-24 max-h-[calc(100vh-6rem)] overflow-hidden rounded-[22px] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50",
              isDark 
                ? "bg-[#111111]/95 border border-white/10" 
                : "bg-white/95 border border-black/20 shadow-lg",
              opensUp 
                ? "bottom-[calc(100%+8px)] right-0 origin-bottom-right" 
                : "top-[calc(100%+8px)] right-0 origin-top-right",
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
                      ? isDark 
                        ? "bg-white text-[#111111] font-semibold" 
                        : "bg-[#111111] text-white font-semibold"
                      : isDark 
                        ? "text-white/60 hover:text-white hover:bg-white/10" 
                        : "text-black/60 hover:text-black hover:bg-black/5"
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


