"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES } from "@/lib/cities";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface CityRouletteProps {
  selectedCityId: string;
  onCityChange: (cityId: string) => void;
  className?: string;
}

const ITEM_HEIGHT = 38; // Vertical spacing base in px
const RADIUS = 115; // 3D cylinder radius
const ANGLE_STEP = 20; // Degrees per item slot
const FRICTION = 0.93; // Velocity decay per frame at 60fps
const SPRING_STIFFNESS = 190;
const SPRING_DAMPING = 24;

/**
 * Custom Magnifying Glass icon flipped in the opposite direction (handle pointing down-left)
 * with a 4-pointed sparkle star placed beside it and rotated diagonally.
 */
export function SearchSparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-4 h-4", className)}
      aria-hidden="true"
    >
      {/* Magnifying Glass Lens */}
      <circle
        cx="15"
        cy="13"
        r="5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Magnifying Glass Handle (pointing down-left) */}
      <path
        d="M11.2 16.8L5.5 22.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* 4-pointed Star / Sparkle placed at top-left, rotated 45° diagonally */}
      <path
        d="M7 2.2Q7 6.5 11.3 6.5Q7 6.5 7 10.8Q7 6.5 2.7 6.5Q7 6.5 7 2.2Z"
        transform="rotate(45 7 6.5)"
        fill="currentColor"
      />
    </svg>
  );
}

export function CityRoulette({
  selectedCityId,
  onCityChange,
  className,
}: CityRouletteProps) {
  const { locale, t } = useLanguage();
  const totalCities = CITIES.length;

  const initialIndex = Math.max(
    0,
    CITIES.findIndex((c) => c.id === selectedCityId)
  );

  // Position is continuous floating point index
  const [position, setPosition] = useState<number>(initialIndex);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const positionRef = useRef<number>(initialIndex);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);
  const startYRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(initialIndex);
  const dragPointsRef = useRef<Array<{ y: number; time: number }>>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const selectedCityIdRef = useRef<string>(selectedCityId);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    selectedCityIdRef.current = selectedCityId;
  }, [selectedCityId]);

  // Focus search input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Notify parent of city change when nearest index changes
  const checkCityChange = useCallback(
    (pos: number) => {
      const nearestIndex = Math.round(pos);
      const actualIndex =
        ((nearestIndex % totalCities) + totalCities) % totalCities;
      const city = CITIES[actualIndex];
      if (city && city.id !== selectedCityIdRef.current) {
        selectedCityIdRef.current = city.id;
        onCityChange(city.id);
      }
    },
    [totalCities, onCityChange]
  );

  // Physics animation loop (momentum + spring snap)
  const runPhysicsLoop = useCallback(() => {
    const animate = (time: number) => {
      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = time;
      }
      const dt = Math.min((time - lastFrameTimeRef.current) / 1000, 0.064);
      lastFrameTimeRef.current = time;

      if (isDraggingRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      let pos = positionRef.current;
      let vel = velocityRef.current;

      // High velocity momentum phase
      if (Math.abs(vel) > 0.8) {
        pos += vel * dt;
        vel *= Math.pow(FRICTION, dt * 60);
      } else {
        // Settling / spring snap phase to nearest integer index
        const target = Math.round(pos);
        const displacement = target - pos;
        const springForce = displacement * SPRING_STIFFNESS;
        const dampingForce = -vel * SPRING_DAMPING;
        const accel = springForce + dampingForce;

        vel += accel * dt;
        pos += vel * dt;

        // Check if settled
        if (Math.abs(displacement) < 0.001 && Math.abs(vel) < 0.005) {
          pos = target;
          vel = 0;
          positionRef.current = pos;
          velocityRef.current = 0;
          setPosition(pos);
          checkCityChange(pos);
          isInteractingRef.current = false;
          animFrameRef.current = null;
          lastFrameTimeRef.current = 0;
          return;
        }
      }

      positionRef.current = pos;
      velocityRef.current = vel;
      setPosition(pos);
      checkCityChange(pos);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    if (animFrameRef.current === null) {
      lastFrameTimeRef.current = 0;
      animFrameRef.current = requestAnimationFrame(animate);
    }
  }, [checkCityChange]);

  // Sync external selectedCityId changes
  useEffect(() => {
    if (isInteractingRef.current) return;
    const currentActual =
      ((Math.round(positionRef.current) % totalCities) + totalCities) %
      totalCities;
    const targetActual = CITIES.findIndex((c) => c.id === selectedCityId);

    if (targetActual !== -1 && targetActual !== currentActual) {
      let diff = targetActual - currentActual;
      if (diff > totalCities / 2) diff -= totalCities;
      if (diff < -totalCities / 2) diff += totalCities;
      const targetPos = Math.round(positionRef.current) + diff;

      // Smoothly spring to target
      velocityRef.current = 0;
      positionRef.current = targetPos;
      setPosition(targetPos);
    }
  }, [selectedCityId, totalCities]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Smooth spring to specific target slot (e.g. click item or search result)
  const springToSlot = useCallback(
    (targetSlot: number) => {
      isInteractingRef.current = true;
      const diff = targetSlot - positionRef.current;
      velocityRef.current = diff * 8;
      runPhysicsLoop();
    },
    [runPhysicsLoop]
  );

  // Wheel / Trackpad handling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelTimeout: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      isInteractingRef.current = true;

      // Convert deltaY to continuous velocity impulse
      const impulse = (e.deltaY / ITEM_HEIGHT) * 6.5;
      velocityRef.current = Math.max(
        -45,
        Math.min(45, velocityRef.current + impulse)
      );

      runPhysicsLoop();

      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        // Let spring settle naturally
      }, 150);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [runPhysicsLoop]);

  // Pointer / Touch drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    isInteractingRef.current = true;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    dragStartPosRef.current = positionRef.current;
    velocityRef.current = 0;

    const now = performance.now();
    dragPointsRef.current = [{ y: e.clientY, time: now }];

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - startYRef.current;
    const newPos = dragStartPosRef.current - deltaY / ITEM_HEIGHT;

    positionRef.current = newPos;
    setPosition(newPos);
    checkCityChange(newPos);

    const now = performance.now();
    dragPointsRef.current.push({ y: e.clientY, time: now });
    dragPointsRef.current = dragPointsRef.current.filter(
      (p) => now - p.time < 120
    );
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Compute release velocity from recent drag points
    const pts = dragPointsRef.current;
    if (pts.length >= 2) {
      const first = pts[0];
      const last = pts[pts.length - 1];
      const dt = (last.time - first.time) / 1000;
      if (dt > 0.008) {
        const dy = last.y - first.y;
        const velPxPerSec = -dy / dt;
        const velSlotsPerSec = velPxPerSec / ITEM_HEIGHT;
        velocityRef.current = Math.max(
          -45,
          Math.min(45, velSlotsPerSec * 0.85)
        );
      }
    }

    runPhysicsLoop();
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    runPhysicsLoop();
  };

  // Keyboard controls on the roulette (Arrow Up / Down)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      springToSlot(Math.round(positionRef.current) - 1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      springToSlot(Math.round(positionRef.current) + 1);
    }
  };

  // City Search Filter (searches across all translations and current language)
  const query = searchQuery.trim().toLowerCase();
  const filteredCities = CITIES.filter((city) => {
    if (!query) return true;
    const currentLocaleName = (city.name[locale] || "").toLowerCase();
    if (currentLocaleName.includes(query)) return true;
    return Object.values(city.name).some((name) =>
      name.toLowerCase().includes(query)
    );
  });

  // Select city from search
  const selectCity = useCallback(
    (cityId: string) => {
      const targetActual = CITIES.findIndex((c) => c.id === cityId);
      if (targetActual !== -1) {
        const currentActual =
          ((Math.round(positionRef.current) % totalCities) + totalCities) %
          totalCities;
        let diff = targetActual - currentActual;
        if (diff > totalCities / 2) diff -= totalCities;
        if (diff < -totalCities / 2) diff += totalCities;
        const targetSlot = Math.round(positionRef.current) + diff;

        springToSlot(targetSlot);
        onCityChange(cityId);
      }
      setIsSearchOpen(false);
      setSearchQuery("");
    },
    [totalCities, springToSlot, onCityChange]
  );

  // Search input keyboard handling (Esc, Arrow keys, Enter)
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsSearchOpen(false);
      setSearchQuery("");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredCities.length > 0) {
        setHighlightedIndex((prev) => (prev + 1) % filteredCities.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredCities.length > 0) {
        setHighlightedIndex(
          (prev) => (prev - 1 + filteredCities.length) % filteredCities.length
        );
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCities[highlightedIndex]) {
        selectCity(filteredCities[highlightedIndex].id);
      } else if (filteredCities.length > 0) {
        selectCity(filteredCities[0].id);
      }
    }
  };

  // Render visible slots in a 3D cylinder
  const centerInt = Math.floor(position);
  const visibleSlotOffsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center select-none py-0 my-0 focus:outline-none",
        className
      )}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="City selector wheel"
    >
      <div className="relative flex items-center justify-center">
        {/* 3D Roulette Cylinder Window */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{
            perspective: "1000px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, black 28%, black 72%, rgba(0,0,0,0.3) 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, black 28%, black 72%, rgba(0,0,0,0.3) 90%, transparent 100%)",
          }}
          className="relative w-44 md:w-48 h-[170px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-none bg-transparent"
        >
          {/* 3D Cylinder Container */}
          <div className="relative w-full h-full flex items-center justify-center preserve-3d pointer-events-auto">
            {visibleSlotOffsets.map((offset) => {
              const slotIndex = centerInt + offset;
              const dist = slotIndex - position;
              const absDist = Math.abs(dist);

              if (absDist > 3.8) return null;

              const actualIndex =
                ((slotIndex % totalCities) + totalCities) % totalCities;
              const city = CITIES[actualIndex];
              const cityName = city.name[locale] || city.name.en;

              // 3D Geometry calculations
              const angle = dist * ANGLE_STEP;
              const angleRad = (angle * Math.PI) / 180;

              const translateY = Math.sin(angleRad) * RADIUS;
              const translateZ = (Math.cos(angleRad) - 1) * RADIUS;
              const rotateX = -angle;

              const isCenter = absDist < 0.45;
              const scale = Math.max(0.76, 1.05 - absDist * 0.08);
              const opacity = Math.max(0, Math.cos(angleRad) ** 2.2);
              const zIndex = Math.round(100 - absDist * 10);

              return (
                <div
                  key={`${slotIndex}-${actualIndex}`}
                  onClick={(e) => {
                    if (absDist > 0.3) {
                      e.stopPropagation();
                      springToSlot(slotIndex);
                    }
                  }}
                  className="absolute flex items-center justify-center cursor-pointer will-change-transform"
                  style={{
                    transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={cn(
                      "h-8 md:h-9 px-5 md:px-6 inline-flex items-center justify-center rounded-full text-xs md:text-sm tracking-wider uppercase font-bold transition-[background-color,color,box-shadow,border-color] duration-150 select-none whitespace-nowrap leading-none",
                      isCenter
                        ? "bg-white text-midnight shadow-[0_4px_25px_rgba(255,255,255,0.28)] ring-1 ring-white/70"
                        : "bg-white/[0.04] text-white/40 hover:text-white/80 hover:bg-white/[0.09] backdrop-blur-sm border border-transparent"
                    )}
                  >
                    <span className="inline-block translate-y-[0.5px] md:translate-y-[1px] leading-none select-none">
                      {cityName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Button with Magnifying Glass + 4-pointed Star (shifted 10px left & 15px up) */}
        <button
          type="button"
          onClick={() => {
            setIsSearchOpen(true);
            setHighlightedIndex(0);
          }}
          className="absolute right-[9px] sm:right-[5px] md:-right-[3px] top-1/2 -translate-y-[calc(50%+53px)] p-1.5 text-white/60 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 z-20 group cursor-pointer focus:outline-none"
          title={t("places.search.buttonTitle")}
          aria-label={t("places.search.buttonTitle")}
        >
          <SearchSparkleIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 text-white/70 group-hover:text-white transition-colors duration-150" />
        </button>
      </div>

      {/* Search Modal Dialogue */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-24 sm:pt-4 bg-black/75 backdrop-blur-md"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm bg-[#08080a]/95 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-4 backdrop-blur-2xl text-left overflow-hidden border-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Minimalist Top Panel: Rounded Input */}
              <div className="pb-2.5">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setHighlightedIndex(0);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder={t("places.search.placeholder")}
                  className="w-full bg-transparent text-white placeholder-white/35 text-xs sm:text-sm font-medium tracking-wide px-4 py-2.5 rounded-full border-2 border-white/25 focus:border-white/70 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 caret-white transition-all"
                  style={{ outline: "none", boxShadow: "none" }}
                />
              </div>

              {/* Minimalist & Borderless Filtered Cities List (expanded to fit +3 more slots) */}
              <div className="max-h-[375px] overflow-y-auto flex flex-col gap-0.5 pt-1 pr-0.5 scrollbar-none">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, idx) => {
                    const isSelected = city.id === selectedCityId;
                    const isHighlighted = idx === highlightedIndex;
                    const cityName = city.name[locale] || city.name.en;
                    const secondaryName =
                      locale !== "en" && city.name.en !== cityName
                        ? city.name.en
                        : null;

                    return (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => selectCity(city.id)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={cn(
                          "w-full px-3.5 py-2 rounded-full flex items-center justify-between text-left transition-colors duration-150 group cursor-pointer border-0 bg-transparent",
                          isHighlighted
                            ? "bg-white/[0.14] text-white"
                            : isSelected
                            ? "text-white bg-white/[0.07]"
                            : "text-white/50 hover:text-white hover:bg-white/[0.12]"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-1.5 h-1.5 flex items-center justify-center shrink-0">
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                            )}
                          </div>
                          <div className="truncate flex items-baseline gap-1.5">
                            <span
                              className={cn(
                                "text-xs sm:text-sm tracking-wider uppercase font-bold transition-colors",
                                isSelected
                                  ? "text-white"
                                  : "text-white/70 group-hover:text-white"
                              )}
                            >
                              {cityName}
                            </span>
                            {secondaryName && (
                              <span className="text-[11px] text-white/30 font-normal lowercase tracking-normal">
                                {secondaryName}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center">
                          {city.hasPlaces ? (
                            <span className="text-[10px] tracking-widest uppercase font-mono text-white/80 font-medium">
                              {t("places.search.activePlaces")}
                            </span>
                          ) : (
                            <span className="text-[10px] tracking-widest uppercase font-mono text-white/25">
                              {t("places.search.comingSoon")}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-6 text-center text-white/30 text-xs tracking-wider uppercase font-mono">
                    {t("places.search.notFound")}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

