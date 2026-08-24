"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CITIES } from "@/lib/cities";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface CityRouletteProps {
  selectedCityId: string;
  onCityChange: (cityId: string) => void;
  className?: string;
}

const ITEM_HEIGHT = 44; // Vertical spacing base in px
const RADIUS = 140; // 3D cylinder radius
const ANGLE_STEP = 24; // Degrees per item slot
const FRICTION = 0.93; // Velocity decay per frame at 60fps
const SPRING_STIFFNESS = 190;
const SPRING_DAMPING = 24;

export function CityRoulette({
  selectedCityId,
  onCityChange,
  className,
}: CityRouletteProps) {
  const { locale } = useLanguage();
  const totalCities = CITIES.length;

  const initialIndex = Math.max(
    0,
    CITIES.findIndex((c) => c.id === selectedCityId)
  );

  // Position is continuous floating point index
  const [position, setPosition] = useState<number>(initialIndex);

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

  useEffect(() => {
    selectedCityIdRef.current = selectedCityId;
  }, [selectedCityId]);

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

  // Smooth spring to specific target slot (e.g. click item or arrow key)
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
      velocityRef.current = Math.max(-45, Math.min(45, velocityRef.current + impulse));

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
        velocityRef.current = Math.max(-45, Math.min(45, velSlotsPerSec * 0.85));
      }
    }

    runPhysicsLoop();
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    runPhysicsLoop();
  };

  // Keyboard controls (Arrow Up / Down)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      springToSlot(Math.round(positionRef.current) - 1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      springToSlot(Math.round(positionRef.current) + 1);
    }
  };

  // Render visible slots in a 3D cylinder
  const centerInt = Math.floor(position);
  const visibleSlotOffsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center select-none py-2 my-2 focus:outline-none",
        className
      )}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="City selector wheel"
    >
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
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 12%, black 32%, black 68%, rgba(0,0,0,0.35) 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 12%, black 32%, black 68%, rgba(0,0,0,0.35) 88%, transparent 100%)",
        }}
        className="relative w-full max-w-sm h-[210px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-none bg-transparent"
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

            return (
              <div
                key={`${slotIndex}-${actualIndex}`}
                onClick={(e) => {
                  if (absDist > 0.3) {
                    e.stopPropagation();
                    springToSlot(slotIndex);
                  }
                }}
                className={cn(
                  "absolute flex items-center justify-center cursor-pointer will-change-transform",
                  isCenter ? "z-20" : "z-10"
                )}
                style={{
                  transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                  opacity,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={cn(
                    "px-7 py-2.5 md:px-8 md:py-2.5 rounded-full text-xs md:text-sm tracking-wider uppercase font-bold transition-[background-color,color,box-shadow,border-color] duration-150 select-none whitespace-nowrap",
                    isCenter
                      ? "bg-white text-midnight shadow-[0_4px_25px_rgba(255,255,255,0.28)] ring-1 ring-white/70"
                      : "bg-white/[0.03] text-white/40 hover:text-white/80 hover:bg-white/[0.08] backdrop-blur-sm border border-transparent"
                  )}
                >
                  {cityName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

