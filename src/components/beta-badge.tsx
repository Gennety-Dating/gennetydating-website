"use client";

// 🟠 BETA-ONLY — tiny "Beta" badge shown only while BETA_MODE is on. Pure
// presentation, no logic — safe to restyle. Renders nothing when BETA_MODE is
// false, and is removed entirely on full purge (see BETA_WEBSITE.md).
import { BETA_MODE } from "@/config/beta";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function BetaBadge({ className }: { className?: string }) {
  const { locale } = useLanguage();
  if (!BETA_MODE) return null;

  const text = (locale === "ru" || locale === "uk") ? "бета" : "beta";

  return (
    <span
      className={cn(
        "inline-flex select-none items-center justify-center rounded-full bg-magenta px-2.5 py-0.5 text-lg md:text-xl font-bold tracking-tight text-white leading-none",
        className,
      )}
    >
      {text}
    </span>
  );
}
