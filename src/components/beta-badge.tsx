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
        "inline-flex select-none items-center rounded-full border border-magenta/50 bg-magenta/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-magenta",
        className,
      )}
    >
      Beta
    </span>
  );
}
