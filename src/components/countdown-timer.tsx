"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import type { Locale } from "@/lib/i18n";

const dateLocales: Record<Locale, string> = {
  en: "en-US",
  uk: "uk-UA",
  ru: "ru-RU",
  de: "de-DE",
  pl: "pl-PL",
  fr: "fr-FR",
  it: "it-IT",
  es: "es-ES",
};

function getNextDailyDropKyiv(): Date {
  const now = new Date();
  // Extract Kyiv date/time parts safely using Intl (works in all browsers, DST-safe)
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((p) => [p.type, p.value])
  );
  const kyivYear = Number(parts.year);
  const kyivMonth = Number(parts.month) - 1;
  const kyivDay = Number(parts.day);
  const kyivHour = Number(parts.hour === "24" ? "0" : parts.hour);
  const kyivMinute = Number(parts.minute);
  const kyivSecond = Number(parts.second);

  // Build a "fake-local" Date using Kyiv values
  const kyivNow = new Date(kyivYear, kyivMonth, kyivDay, kyivHour, kyivMinute, kyivSecond);
  
  const targetKyiv = new Date(kyivNow);
  // If current Kyiv time is 18:00:00 or later, target next day's 18:00
  if (kyivHour >= 18) {
    targetKyiv.setDate(kyivNow.getDate() + 1);
  }
  targetKyiv.setHours(18, 0, 0, 0);

  // Convert back to real UTC by applying the offset
  const offset = now.getTime() - kyivNow.getTime();
  return new Date(targetKyiv.getTime() + offset);
}

function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(dateLocales[locale], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function CountdownTimer() {
  const { t, locale } = useLanguage();
  const targetRef = useRef<Date | null>(null);
  const [time, setTime] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [matchDay, setMatchDay] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    targetRef.current = getNextDailyDropKyiv();

    const updateCountdown = () => {
      if (!targetRef.current) return;

      // Reset when timer expires
      if (targetRef.current.getTime() - Date.now() <= 0) {
        targetRef.current = getNextDailyDropKyiv();
      }

      setTime(calcTimeLeft(targetRef.current));
      setMatchDay(formatDate(targetRef.current, locale));
      setIsReady(true);
    };

    updateCountdown();
    const id = setInterval(updateCountdown, 1000);

    return () => clearInterval(id);
  }, [locale]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Option 1: Clean Classic Line */}
      <div className={`flex items-center gap-3 sm:gap-4 md:gap-5 select-none py-1.5 transition-opacity duration-200 ${isReady ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col items-center">
          <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-magenta tracking-tight tabular-nums">
            {time.days}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-1">
            {t("countdown.d")}
          </span>
        </div>
        <span className="text-magenta/30 font-light text-xl sm:text-2xl md:text-3xl -translate-y-2.5">:</span>
        <div className="flex flex-col items-center">
          <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-magenta tracking-tight tabular-nums">
            {time.hours}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-1">
            {t("countdown.h")}
          </span>
        </div>
        <span className="text-magenta/30 font-light text-xl sm:text-2xl md:text-3xl -translate-y-2.5">:</span>
        <div className="flex flex-col items-center">
          <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-magenta tracking-tight tabular-nums">
            {time.minutes}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-1">
            {t("countdown.m")}
          </span>
        </div>
        <span className="text-magenta/30 font-light text-xl sm:text-2xl md:text-3xl -translate-y-2.5">:</span>
        <div className="flex flex-col items-center">
          <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-magenta tracking-tight tabular-nums">
            {time.seconds}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-1">
            {t("countdown.s")}
          </span>
        </div>
      </div>

      <p
        className={`min-h-5 text-sm text-gray-400 mt-1 ${matchDay ? "visible" : "invisible"}`}
      >
        {t("countdown.nextMatch")}{" "}
        <span className="text-heading-white font-semibold">{matchDay || "Placeholder"}</span>
      </p>
    </div>
  );
}
