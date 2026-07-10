import { cn } from "@/lib/utils";

/* --- BubbleTail ---
   Authentic iMessage-style speech-bubble tail rendered as a self-contained SVG.
   The tail is filled with `currentColor`, so it takes on whatever text color the
   wrapper sets — this makes it fully background-independent (works over the live
   slideshow, patterns, gradients, etc.) with no solid-color mask needed.

   Geometry: the SVG's top-right corner is the attach point that tucks under the
   bubble's bottom corner; the belly hangs down-and-outward and hooks back in,
   giving the characteristic iMessage curl. `side="right"` mirrors it for sent
   bubbles. Position it absolutely against a `relative` bubble. */

interface BubbleTailProps {
  side: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export function BubbleTail({ side, className, style, width = 16, height = 15 }: BubbleTailProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 15"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      style={{
        transform: side === "right" ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      <path
        d="M16 0C16 7.2 13 12.4 3.4 14.8C2.5 15 2 13.9 2.7 13.3C5.4 10.9 6.8 7.6 6.8 3.4V0H16Z"
        fill="currentColor"
      />
    </svg>
  );
}
