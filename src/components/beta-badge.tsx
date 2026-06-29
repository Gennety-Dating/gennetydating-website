// 🟠 BETA-ONLY — tiny "Beta" badge shown only while BETA_MODE is on. Pure
// presentation, no logic — safe to restyle. Renders nothing when BETA_MODE is
// false, and is removed entirely on full purge (see BETA_WEBSITE.md).
import { BETA_MODE } from "@/config/beta";
import { cn } from "@/lib/utils";

export function BetaBadge({ className }: { className?: string }) {
  if (!BETA_MODE) return null;

  return (
    <span
      className={cn(
        "font-script text-base md:text-lg text-magenta neon-text-sm select-none tracking-normal -rotate-6 transform -translate-y-1 ml-1.5 font-normal leading-none inline-block",
        className,
      )}
    >
      beta
    </span>
  );
}
