"use client";

import { useEffect, useRef } from "react";
import styles from "./butterflies.module.css";
import { cn } from "@/lib/utils";

interface Butterfly {
  id: number;
  /** position across the hero (allows the --size custom property) */
  style: React.CSSProperties & Record<`--${string}`, string>;
  /** drift path animation */
  drift: string;
  /** wing-flap speed class */
  flap: string;
}

/**
 * Butterflies spread freely across the whole upper part of the hero.
 * Each one drifts along its own path and flaps its wings. The central
 * logo / headline / polaroid zone is intentionally left clear.
 */
const butterflies: Butterfly[] = [
  { id: 1, style: { left: "6%",  top: "14%", "--size": "54px" }, drift: styles.driftA, flap: styles.flapSlow },
  { id: 2, style: { left: "20%", top: "40%", "--size": "38px" }, drift: styles.driftB, flap: styles.flapFast },
  { id: 3, style: { left: "14%", top: "64%", "--size": "46px" }, drift: styles.driftC, flap: styles.flapMed },
  { id: 4, style: { left: "30%", top: "9%",  "--size": "34px" }, drift: styles.driftA, flap: styles.flapMed },
  { id: 5, style: { right: "9%",  top: "12%", "--size": "52px" }, drift: styles.driftB, flap: styles.flapSlow },
  { id: 6, style: { right: "5%",  top: "44%", "--size": "36px" }, drift: styles.driftA, flap: styles.flapFast },
  { id: 7, style: { right: "20%", top: "64%", "--size": "46px" }, drift: styles.driftC, flap: styles.flapMed },
  { id: 8, style: { right: "30%", top: "8%",  "--size": "34px" }, drift: styles.driftB, flap: styles.flapFast },
];

export function Butterflies() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const opacity = Math.max(0, 1 - window.scrollY / 400);
      container.style.opacity = opacity.toString();
      container.style.display = opacity <= 0 ? "none" : "block";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container} aria-hidden="true">
      {butterflies.map((b) => (
        <div key={b.id} className={cn(styles.butterfly, b.drift)} style={b.style}>
          <div className={cn(styles.flapper, b.flap)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/butterfly.webp"
              alt=""
              className={styles.img}
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
