"use client";

import React, { useRef, useState, useEffect, useLayoutEffect, useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Official Master Standard from /Users/pro/Desktop/Message Bubble Standard/
// - R = 28px, r = 18px (for grouped), tailDrop = 13px
// - Single Message: all non-tail corners maintain full corner radius R = 28px
// - Apple Organic Beak (cornerOrganicBeak)
// - 100% Borderless with Ambient Gradient & Soft Air Float Shadow

export type BubblePalette = "white" | "gray" | "cherry" | "dark" | "light";

export interface BrandMessageBubbleProps {
  children: React.ReactNode;
  isOutgoing?: boolean;
  isSingle?: boolean;
  palette?: BubblePalette;
  timestamp?: string;
  status?: "sent" | "delivered" | "read";
  reaction?: {
    emoji: string;
    avatarUrl?: string;
  };
  className?: string;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Calculates continuous G2 Bezier curve path matching master_bubble.svg
 * and official Custom iMessage Bubble standard.
 *
 * When isSingle is true, all non-tail corners retain the full radius R (28px).
 */
export function getCornerBeakPath(
  w: number,
  h: number,
  isOutgoing: boolean,
  isSingle = true,
  r = 28,
  smallR = 18,
  tailDrop = 13
): string {
  // Graceful fallback if not yet measured
  const width = Math.max(w || 260, 76);
  const height = Math.max(h || 54, 40);

  // Proportional clamping so short bubbles maintain smooth curvature
  const effectiveTailDrop = Math.min(tailDrop, Math.max(8, Math.round(height * 0.2)));
  const bodyBottom = height - effectiveTailDrop;
  const maxR = Math.max(12, Math.floor(bodyBottom * 0.48));
  const effectiveR = Math.min(r, maxR);
  const effectiveSmallR = Math.min(smallR, Math.floor(effectiveR * 0.7));

  // Single bubbles have full radius R on all non-tail corners
  const tl = isSingle ? effectiveR : (isOutgoing ? effectiveR : effectiveSmallR);
  const tr = isSingle ? effectiveR : (isOutgoing ? effectiveSmallR : effectiveR);
  const bl = effectiveR;
  const br = effectiveR;

  if (isOutgoing) {
    const bodyRight = width - 5;
    const beakTopY = bodyBottom - Math.min(10, Math.round(effectiveTailDrop * 0.8));
    let p = `M ${tl},0 `;
    p += `L ${bodyRight - tr},0 `;
    p += `C ${(bodyRight - tr * 0.45).toFixed(2)},0 ${bodyRight},${(tr * 0.45).toFixed(2)} ${bodyRight},${tr} `;
    p += `L ${bodyRight},${beakTopY.toFixed(2)} `;
    p += `C ${bodyRight},${(bodyBottom - 3.5).toFixed(2)} ${(width - 0.5).toFixed(2)},${(height - 4.8).toFixed(2)} ${width},${(height - 2).toFixed(2)} `;
    p += `C ${(width + 0.2).toFixed(2)},${(height - 0.5).toFixed(2)} ${(width - 1.2).toFixed(2)},${height} ${(width - 2.5).toFixed(2)},${height} `;
    p += `C ${(width - 9).toFixed(2)},${height} ${(bodyRight - 12).toFixed(2)},${bodyBottom} ${(bodyRight - 24).toFixed(2)},${bodyBottom} `;
    p += `L ${bl},${bodyBottom} `;
    p += `C ${(bl * 0.45).toFixed(2)},${bodyBottom} 0,${(bodyBottom - bl * 0.45).toFixed(2)} 0,${(bodyBottom - bl).toFixed(2)} `;
    p += `L 0,${tl} `;
    p += `C 0,${(tl * 0.45).toFixed(2)} ${(tl * 0.45).toFixed(2)},0 ${tl},0 `;
    p += `Z`;
    return p;
  } else {
    const bodyLeft = 5;
    const beakTopY = bodyBottom - Math.min(10, Math.round(effectiveTailDrop * 0.8));
    let p = `M ${bodyLeft + tl},0 `;
    p += `L ${width - tr},0 `;
    p += `C ${(width - tr * 0.45).toFixed(2)},0 ${width},${(tr * 0.45).toFixed(2)} ${width},${tr} `;
    p += `L ${width},${(bodyBottom - br).toFixed(2)} `;
    p += `C ${width},${(bodyBottom - br * 0.45).toFixed(2)} ${(width - br * 0.45).toFixed(2)},${bodyBottom} ${(width - br).toFixed(2)},${bodyBottom} `;
    p += `L ${(bodyLeft + 24).toFixed(2)},${bodyBottom} `;
    p += `C ${(bodyLeft + 12).toFixed(2)},${bodyBottom} 9,${height} 2.5,${height} `;
    p += `C 1.2,${height} -0.2,${(height - 0.5).toFixed(2)} 0,${(height - 2).toFixed(2)} `;
    p += `C 0.5,${(height - 4.8).toFixed(2)} ${bodyLeft},${(bodyBottom - 3.5).toFixed(2)} ${bodyLeft},${beakTopY.toFixed(2)} `;
    p += `L ${bodyLeft},${tl} `;
    p += `C ${bodyLeft},${(tl * 0.45).toFixed(2)} ${(bodyLeft + tl * 0.45).toFixed(2)},0 ${(bodyLeft + tl).toFixed(2)},0 `;
    p += `Z`;
    return p;
  }
}

export function BrandMessageBubble({
  children,
  isOutgoing = true,
  isSingle = true,
  palette,
  timestamp,
  status = "read",
  reaction,
  className,
}: BrandMessageBubbleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const uniqueId = useId().replace(/:/g, "_");

  // Default palettes: white for incoming, gray for outgoing
  const activePalette: BubblePalette = palette || (isOutgoing ? "gray" : "white");

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      // Use offsetWidth / offsetHeight so CSS transforms like scale() don't distort measurements
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w > 0 && h > 0) {
        setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
      }
    };

    measure();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, []);

  const currentW = size.w || (isOutgoing ? 260 : 300);
  const currentH = size.h || (timestamp ? 80 : 64);
  const pathD = getCornerBeakPath(currentW, currentH, isOutgoing, isSingle);

  const gradId = `grad_${uniqueId}_${activePalette}`;
  const readAccent = activePalette === "cherry" ? "#FBCFE8" : "#38BDF8";
  const defaultCheckColor = "rgba(255, 255, 255, 0.55)";

  const isLightText = activePalette === "gray" || activePalette === "cherry" || activePalette === "dark";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex flex-col select-none",
        "min-w-[110px] max-w-[88%] sm:max-w-[320px] md:max-w-[360px]",
        // Air Float Shadow from the official spec
        "filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.2)]",
        "transition-transform duration-150 active:scale-[0.98]",
        className
      )}
    >
      {/* SVG Canvas with Borderless Ambient Lighting */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox={`0 0 ${currentW} ${currentH}`}
        width={currentW}
        height={currentH}
        aria-hidden="true"
      >
        <defs>
          {activePalette === "white" && (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          )}
          {activePalette === "gray" && (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3a3a3c" />
              <stop offset="100%" stopColor="#3a3a3c" />
            </linearGradient>
          )}
          {activePalette === "cherry" && (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#941D3C" />
              <stop offset="100%" stopColor="#4F0C1E" />
            </linearGradient>
          )}
          {activePalette === "dark" && (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#363638" />
              <stop offset="100%" stopColor="#222224" />
            </linearGradient>
          )}
          {activePalette === "light" && (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E8E8ED" />
            </linearGradient>
          )}
        </defs>
        <path d={pathD} fill={`url(#${gradId})`} stroke="none" />
      </svg>

      {/* Message Content Container — Vertically centered within bubble body */}
      <div
        className={cn(
          "relative z-10 flex flex-col justify-center",
          "pt-[15px] pb-[28px]",
          isOutgoing ? "pl-[24px] pr-[28px]" : "pl-[28px] pr-[24px]",
          isLightText ? "text-white" : "text-black"
        )}
      >
        <div
          className={cn(
            "text-[14px] md:text-[15px] leading-[1.45] tracking-[-0.01em] break-words text-left",
            activePalette === "gray" ? "font-medium" : "font-normal"
          )}
        >
          {children}
        </div>

        {/* Footer Row: Reaction Pill (Left) & Metadata (Right) - rendered only if metadata provided */}
        {(timestamp || reaction) && (
          <div className="flex items-center justify-between gap-3 mt-1.5 min-h-[20px] w-full">
            {/* Reaction Pill */}
            {reaction ? (
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs leading-none shadow-sm",
                  activePalette === "white" ? "bg-black/8 text-black" : "bg-white/12 text-white"
                )}
              >
                <span className="text-[13px] leading-none">{reaction.emoji}</span>
                {reaction.avatarUrl && (
                  <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={reaction.avatarUrl}
                      alt="Reaction user"
                      width={14}
                      height={14}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div />
            )}

            {/* Timestamp & Parallel Checkmarks */}
            {timestamp && (
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 ml-auto text-[11px] font-medium leading-none",
                  isLightText ? "text-white/60" : "text-black/50"
                )}
              >
                <span>{timestamp}</span>
                {isOutgoing && (
                  <span className="inline-flex items-center" aria-label={`Status: ${status}`}>
                    {status === "sent" && (
                      <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path
                          d="M1.5 6L4.5 9L9.5 2"
                          stroke={defaultCheckColor}
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {(status === "delivered" || status === "read") && (
                      <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
                        <path
                          d="M1.5 6L4.5 9L9.5 2"
                          stroke={status === "read" ? readAccent : defaultCheckColor}
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 6L10.5 9L15.5 2"
                          stroke={status === "read" ? readAccent : defaultCheckColor}
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
