"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";

function getNextThursdayKyiv(): Date {
  const now = new Date();
  // Get current date/time in Kyiv timezone
  const kyivNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Kyiv" })
  );
  const day = kyivNow.getDay(); // 0=Sun … 4=Thu
  let daysUntilThursday = (4 - day + 7) % 7;
  if (daysUntilThursday === 0) {
    const h = kyivNow.getHours();
    if (h >= 18) daysUntilThursday = 7;
  }
  // Build target as Kyiv local values in a "fake-local" Date
  const targetKyiv = new Date(kyivNow);
  targetKyiv.setDate(kyivNow.getDate() + daysUntilThursday);
  targetKyiv.setHours(18, 0, 0, 0);
  // Convert back to real UTC by applying the offset
  const offset = now.getTime() - kyivNow.getTime();
  return new Date(targetKyiv.getTime() + offset);
}

function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", {
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

  useEffect(() => {
    targetRef.current = getNextThursdayKyiv();

    const id = setInterval(() => {
      if (!targetRef.current) return;

      // Reset when timer expires
      if (targetRef.current.getTime() - Date.now() <= 0) {
        targetRef.current = getNextThursdayKyiv();
      }

      setTime(calcTimeLeft(targetRef.current));
      setMatchDay(formatDate(targetRef.current, locale));
    }, 1000);

    return () => clearInterval(id);
  }, [locale]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Timer digits */}
      <div className="flex items-baseline gap-1 font-mono text-3xl min-[375px]:text-4xl md:text-5xl font-bold neon-text tabular-nums">
        <span>{time.days}</span>
        <span className="text-magenta-dim">:</span>
        <span>{time.hours}</span>
        <span className="text-magenta-dim">:</span>
        <span>{time.minutes}</span>
        <span className="text-magenta-dim">:</span>
        <span className="text-2xl min-[375px]:text-3xl md:text-4xl">{time.seconds}</span>
      </div>

      {/* Match day info — renders after first interval tick */}
      {matchDay && (
        <>
          <p className="text-sm text-gray-400">
            {t("countdown.nextMatch")}{" "}
            <span className="text-white font-medium">{matchDay}</span>
          </p>
          <p className="text-sm text-gray-400">
            {t("countdown.joined")}{" "}
            <span className="text-magenta font-semibold neon-text-sm">1,247</span> {t("countdown.students")}
          </p>
        </>
      )}
    </div>
  );
}
