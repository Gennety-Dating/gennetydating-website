"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";

function getNextThursday(): Date {
  const now = new Date();
  const day = now.getDay(); // 0=Sun … 4=Thu
  let daysUntilThursday = (4 - day + 7) % 7;
  if (daysUntilThursday === 0) {
    const target = new Date(now);
    target.setHours(19, 0, 0, 0);
    if (now >= target) daysUntilThursday = 7;
  }
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilThursday);
  next.setHours(19, 0, 0, 0);
  return next;
}

function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

interface TimeLeft {
  hours: string;
  minutes: string;
  seconds: string;
  ms: string;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((diff % 1000) / 10);

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    ms: String(milliseconds).padStart(2, "0"),
  };
}

export function CountdownTimer() {
  const { t, locale } = useLanguage();
  const targetRef = useRef<Date | null>(null);
  const [time, setTime] = useState<TimeLeft>({
    hours: "00",
    minutes: "00",
    seconds: "00",
    ms: "00",
  });
  const [matchDay, setMatchDay] = useState("");

  useEffect(() => {
    targetRef.current = getNextThursday();

    const id = setInterval(() => {
      if (!targetRef.current) return;
      const left = calcTimeLeft(targetRef.current);
      setTime(left);
      setMatchDay(formatDate(targetRef.current, locale));

      if (
        left.hours === "00" &&
        left.minutes === "00" &&
        left.seconds === "00" &&
        left.ms === "00"
      ) {
        targetRef.current = getNextThursday();
      }
    }, 50);

    return () => clearInterval(id);
  }, [locale]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Timer digits */}
      <div className="flex items-baseline gap-1 font-mono text-4xl md:text-5xl font-bold neon-text tabular-nums">
        <span>{time.hours}</span>
        <span className="text-magenta-dim">:</span>
        <span>{time.minutes}</span>
        <span className="text-magenta-dim">:</span>
        <span>{time.seconds}</span>
        <span className="text-magenta-dim">:</span>
        <span className="text-3xl md:text-4xl">{time.ms}</span>
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
