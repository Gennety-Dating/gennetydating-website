"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { type Locale, locales, localeNames, localeFlagEmoji } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      {/* Кнопка-таблетка (удлиненная, с текущим языком и стрелочкой вниз) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 h-9 min-w-[84px] px-3.5 rounded-full bg-white/[0.08] border border-white/10 hover:border-white/20 hover:bg-white/[0.12] transition-all duration-300 backdrop-blur-sm cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1.5 font-semibold text-xs text-white tracking-wide">
          <span className="text-sm leading-none">{localeFlagEmoji[locale]}</span>
          <span>{localeNames[locale]}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-gray-400 transition-transform duration-300",
            isOpen ? "rotate-180 text-white" : ""
          )}
        />
      </button>

      {/* Выпадающий список языков с элегантной анимацией */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-32 rounded-2xl bg-[#0a0a0a]/95 border border-white/10 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 overflow-hidden"
          >
            {locales.map((l: Locale) => (
              <button
                key={l}
                onClick={() => {
                  setLocale(l);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer text-left",
                  locale === l
                    ? "bg-magenta/20 text-white font-semibold"
                    : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                <span className="text-sm leading-none">{localeFlagEmoji[l]}</span>
                <span className="flex-1">{localeNames[l]}</span>
                {locale === l && (
                  <div className="w-1.5 h-1.5 rounded-full bg-magenta shadow-neon-sm" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
