"use client";

import { useEffect, useRef } from "react";
import styles from "./butterflies.module.css";
import { cn } from "@/lib/utils";

interface Butterfly {
  id: number;
  /** position across the hero (allows the --size custom property) */
  style: React.CSSProperties & Record<`--${string}`, string>;
  /** roaming flight path */
  drift: string;
  /** wing-flap tempo */
  flap: string;
}

/**
 * Minimal, abstract butterflies (the brand mark silhouette) that flutter
 * freely across the whole upper part of the hero. Each one flaps its wings
 * and glides along its own gentle path. The central logo / headline zone is
 * left clear on purpose.
 */
const butterflies: Butterfly[] = [
  { id: 1, style: { left: "7%",  top: "16%", "--size": "30px" }, drift: styles.driftA, flap: styles.flapSlow },
  { id: 2, style: { left: "19%", top: "42%", "--size": "22px" }, drift: styles.driftC, flap: styles.flapFast },
  { id: 3, style: { left: "13%", top: "66%", "--size": "26px" }, drift: styles.driftB, flap: styles.flapMed },
  { id: 4, style: { left: "31%", top: "10%", "--size": "20px" }, drift: styles.driftD, flap: styles.flapMed },
  { id: 5, style: { right: "8%",  top: "13%", "--size": "30px" }, drift: styles.driftB, flap: styles.flapSlow },
  { id: 6, style: { right: "5%",  top: "46%", "--size": "22px" }, drift: styles.driftA, flap: styles.flapFast },
  { id: 7, style: { right: "19%", top: "66%", "--size": "26px" }, drift: styles.driftD, flap: styles.flapMed },
  { id: 8, style: { right: "31%", top: "9%",  "--size": "20px" }, drift: styles.driftC, flap: styles.flapFast },
];

/** Abstract brand-mark wings, split down the body so each side can flap. */
function ButterflyMark() {
  return (
    <>
      <div className={cn(styles.wing, styles.wingLeft)}>
        <svg viewBox="0 0 50 100" className={styles.svg} aria-hidden="true">
          <path d="M 50 35 C 20 0, -10 30, 15 55 C -5 75, 25 100, 48 65 Z" fill="#8B253B" />
        </svg>
      </div>
      <div className={cn(styles.wing, styles.wingRight)}>
        <svg viewBox="50 0 50 100" className={styles.svg} aria-hidden="true">
          <path d="M 52 65 C 75 100, 105 75, 85 55 C 110 30, 80 0, 50 35 Z" fill="#8B253B" />
        </svg>
      </div>
    </>
  );
}

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
            <ButterflyMark />
          </div>
        </div>
      ))}
    </div>
  );
}
