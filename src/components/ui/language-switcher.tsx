"use client";

import { useLanguage } from "@/lib/language-context";
import { type Locale, locales, localeNames } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="relative flex items-center h-9 rounded-full bg-white/[0.08] border border-white/10 p-1 backdrop-blur-sm">
      {/* Animated sliding pill */}
      <div
        className={cn(
          "absolute top-1 h-7 rounded-full bg-magenta/90 shadow-neon-sm transition-all duration-300 ease-out",
          locale === "en" ? "left-1 w-[calc(50%-2px)]" : "left-[calc(50%+1px)] w-[calc(50%-2px)]"
        )}
      />

      {locales.map((l: Locale) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "relative z-10 flex items-center justify-center gap-1.5 px-3 h-7 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 cursor-pointer",
            locale === l
              ? "text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          <span className="text-sm leading-none">
            {l === "en" ? "🇬🇧" : "🇺🇦"}
          </span>
          <span>{localeNames[l]}</span>
        </button>
      ))}
    </div>
  );
}
