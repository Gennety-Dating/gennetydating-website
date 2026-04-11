import { cn } from "@/lib/utils";

/* --- Sticker ---
   Physical paper sticker aesthetic with color variants
   and slight rotation for the scrapbook look. */

type StickerColor = "magenta" | "gold" | "sky";

interface StickerProps {
  children: React.ReactNode;
  color?: StickerColor;
  rotation?: number;
  className?: string;
}

const colorStyles: Record<StickerColor, string> = {
  magenta: "bg-magenta text-white shadow-neon-sm",
  gold: "bg-amber-400 text-midnight",
  sky: "bg-sky-400 text-midnight",
};

export function Sticker({
  children,
  color = "magenta",
  rotation = -3,
  className,
}: StickerProps) {
  return (
    <div
      className={cn(
        "inline-block px-5 py-3 rounded-sm font-bold text-lg shadow-lg select-none",
        colorStyles[color],
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}
