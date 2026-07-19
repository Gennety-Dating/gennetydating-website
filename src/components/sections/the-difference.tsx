"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heading, Highlight } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import { type TranslationKeys } from "@/lib/i18n";
import { MapPin, Check, GraduationCap } from "lucide-react";

// Tinder profiles data structure
interface Profile {
  id: number;
  image: string;
  nameKey: TranslationKeys;
  bioKey: TranslationKeys;
  collegeKey: TranslationKeys;
  action?: "like" | "nope" | "superlike";
  tags: string[];
}

interface ActiveProfile extends Profile {
  uniqueId: string;
  // Set only once the card has actually been swiped. Every profile already ships
  // with a default `action` in its data, so `action` alone cannot tell us whether
  // a card should be flying off — this flag can.
  swiped?: boolean;
}

const womenProfiles: Profile[] = [
  {
    id: 1,
    image: "/images/tinder-woman-1.jpg",
    nameKey: "difference.tinder.profile1.name",
    bioKey: "difference.tinder.profile1.bio",
    collegeKey: "difference.tinder.profile1.college",
    action: "like",
    tags: ["🎵 Music", "☕ Coffee", "💿 Vinyl"],
  },
  {
    id: 2,
    image: "/images/tinder-woman-2.jpg",
    nameKey: "difference.tinder.profile2.name",
    bioKey: "difference.tinder.profile2.bio",
    collegeKey: "difference.tinder.profile2.college",
    action: "nope",
    tags: ["🚗 Travel", "🍵 Matcha", "🏃‍♀️ Running"],
  },
  {
    id: 3,
    image: "/images/tinder-woman-3.jpg",
    nameKey: "difference.tinder.profile3.name",
    bioKey: "difference.tinder.profile3.bio",
    collegeKey: "difference.tinder.profile3.college",
    action: "like",
    tags: ["🎾 Tennis", "🎸 Rock", "🍻 Gigs"],
  },
  {
    id: 4,
    image: "/images/tinder-woman-4.jpg",
    nameKey: "difference.tinder.profile4.name",
    bioKey: "difference.tinder.profile4.bio",
    collegeKey: "difference.tinder.profile4.college",
    action: "nope",
    tags: ["🎨 Art", "📸 Photo", "📚 Study"],
  },
  {
    id: 5,
    image: "/images/tinder-woman-5.jpg",
    nameKey: "difference.tinder.profile5.name",
    bioKey: "difference.tinder.profile5.bio",
    collegeKey: "difference.tinder.profile5.college",
    action: "superlike",
    tags: ["🎨 Art", "🏛️ Museums", "📸 Photo"],
  },
  {
    id: 6,
    image: "/images/tinder-woman-6.jpg",
    nameKey: "difference.tinder.profile6.name",
    bioKey: "difference.tinder.profile6.bio",
    collegeKey: "difference.tinder.profile6.college",
    action: "like",
    tags: ["📸 Photo", "🎸 Guitar", "☕ Coffee"],
  },
];

const menProfiles: Profile[] = [
  {
    id: 1,
    image: "/images/tinder-man-1.jpg",
    nameKey: "difference.tinder.man1.name",
    bioKey: "difference.tinder.man1.bio",
    collegeKey: "difference.tinder.man1.college",
    action: "like",
    tags: ["🎧 Electronic", "☕ Coffee", "🚶‍♂️ Night walks"],
  },
  {
    id: 2,
    image: "/images/tinder-man-2.jpg",
    nameKey: "difference.tinder.man2.name",
    bioKey: "difference.tinder.man2.bio",
    collegeKey: "difference.tinder.man2.college",
    action: "nope",
    tags: ["📸 Analog", "🎬 Indie films", "🗺️ Explore"],
  },
  {
    id: 3,
    image: "/images/tinder-man-3.png",
    nameKey: "difference.tinder.man3.name",
    bioKey: "difference.tinder.man3.bio",
    collegeKey: "difference.tinder.man3.college",
    action: "like",
    tags: ["🏋️‍♂️ Gym", "🎾 Tennis", "🚗 Trips"],
  },
  {
    id: 4,
    image: "/images/tinder-man-4.png",
    nameKey: "difference.tinder.man4.name",
    bioKey: "difference.tinder.man4.bio",
    collegeKey: "difference.tinder.man4.college",
    action: "nope",
    tags: ["💿 Vinyl", "🎸 Guitar", "☕ Coffee"],
  },
  {
    id: 5,
    image: "/images/tinder-man-5.jpg",
    nameKey: "difference.tinder.man5.name",
    bioKey: "difference.tinder.man5.bio",
    collegeKey: "difference.tinder.man5.college",
    action: "superlike",
    tags: ["🏛️ Architecture", "🌲 Hiking", "💬 Talks"],
  },
  {
    id: 6,
    image: "/images/tinder-man-6.jpg",
    nameKey: "difference.tinder.man6.name",
    bioKey: "difference.tinder.man6.bio",
    collegeKey: "difference.tinder.man6.college",
    action: "like",
    tags: ["📚 Books", "🍂 Park walks", "💬 Philosophy"],
  },
];



export function TheDifference() {
  const { t } = useLanguage();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveCard(null);
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // --- Tinder Swiping Logic (AnimatePresence list with alternating profiles) ---
  const [activeCards, setActiveCards] = useState<ActiveProfile[]>(() => {
    const list: ActiveProfile[] = [];
    const maxLength = Math.max(womenProfiles.length, menProfiles.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < womenProfiles.length) {
        list.push({
          ...womenProfiles[i],
          uniqueId: `${womenProfiles[i].id}-woman`,
        });
      }
      if (i < menProfiles.length) {
        list.push({
          ...menProfiles[i],
          uniqueId: `${menProfiles[i].id}-man`,
        });
      }
    }
    return list;
  });
  const [isProcessingSwipe, setIsProcessingSwipe] = useState(false);

  // Monitor when the stack becomes empty, and reload the alternating stack to loop infinitely
  useEffect(() => {
    if (activeCards.length === 0 && !isProcessingSwipe) {
      const list: ActiveProfile[] = [];
      const maxLength = Math.max(womenProfiles.length, menProfiles.length);
      for (let i = 0; i < maxLength; i++) {
        if (i < womenProfiles.length) {
          list.push({
            ...womenProfiles[i],
            uniqueId: `${womenProfiles[i].id}-woman-${Date.now()}`,
          });
        }
        if (i < menProfiles.length) {
          list.push({
            ...menProfiles[i],
            uniqueId: `${menProfiles[i].id}-man-${Date.now()}`,
          });
        }
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveCards(list);
    }
  }, [activeCards, isProcessingSwipe]);

  const swipeTopCard = (direction: "like" | "nope" | "superlike") => {
    if (isProcessingSwipe || activeCards.length === 0) return;
    setIsProcessingSwipe(true);

    const topCard = activeCards[0];

    // Mark the card as swiped. This drives the fly-off through `animate` (which
    // always runs) rather than relying on AnimatePresence's `exit` firing on
    // unmount — the latter silently skipped, making cards snap out instantly.
    setActiveCards((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      updated[0] = { ...updated[0], action: direction, swiped: true };
      return updated;
    });

    setTimeout(() => {
      // Keep this updater PURE. Calling setIsProcessingSwipe inside it (as it was
      // before) is an impure update that React's concurrent renderer can replay
      // or drop — which occasionally left isProcessingSwipe stuck `true`,
      // deadlocking both the auto-swipe timer and the stack reload, so the cards
      // stopped flipping after a while. Reset the flag separately, after.
      setActiveCards((prev) => {
        // Prevent race condition if the stack was reset/changed
        if (prev.length === 0 || prev[0].uniqueId !== topCard.uniqueId) {
          return prev;
        }
        const [, ...rest] = prev;
        return rest;
      });
      setIsProcessingSwipe(false);
      // Remove only after the 0.35s fly-off has finished. The old 300ms cut the
      // animation short (its comment claimed they matched — they never did).
    }, 360);
  };

  // Auto-swipe timer
  useEffect(() => {
    if (activeCards.length === 0 || isProcessingSwipe) return;

    const timer = setTimeout(() => {
      // Use activeCards.length to determine the strict alternating sequence.
      // Even length (12, 10, 8, 6, 4, 2) -> "nope" (Left)
      // Odd length (11, 9, 7, 5, 3, 1) -> "like" (Right)
      const direction = activeCards.length % 2 === 0 ? "nope" : "like";
      swipeTopCard(direction);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCards, isProcessingSwipe]);



  return (
    <section className="py-[120px] px-4 md:px-10 relative overflow-hidden bg-transparent">
      {/* Decorative neon gradient overlays */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-magenta/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <Heading as="h2" className="text-center mb-16 tracking-tight">
          <Highlight>{t("difference.title.highlight")}</Highlight> {t("difference.title.rest")}
        </Heading>


        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* LEFT COLUMN: Tinder Mockup */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold font-sans text-gray-400/90">
                {t("difference.insteadOfThis")}
              </h3>
            </div>

            {/* Tinder Stack Container inside Retro Phone */}
            <div className="relative w-full max-w-[380px] aspect-[571/1024] flex items-center justify-center select-none z-10 my-auto">
              {/* Retro Phone Frame */}
              <Image
                src="/images/retro-phone-new.png"
                alt="Retro Phone Frame"
                fill
                sizes="380px"
                className="pointer-events-none z-20 object-contain"
              />

              {/* Screen Area */}
              <div 
                className="absolute overflow-hidden rounded-[10px] bg-black"
                style={{
                  left: "26.09%",
                  width: "47.11%",
                  top: "22.85%",
                  height: "33.98%",
                  zIndex: 10
                }}
              >
                <div className="relative w-full h-full">
                    {activeCards.slice(0, 3).reverse().map((profile, index, arr) => {
                       const stackIndex = arr.length - 1 - index;
                       const isTop = stackIndex === 0;

                       return (
                        <motion.div
                          key={profile.uniqueId}
                          className="absolute inset-0 bg-[#0d0d0d] rounded-[10px] overflow-hidden flex flex-col justify-end"
                          style={{
                            transformOrigin: "bottom center",
                            zIndex: 3 - stackIndex,
                          }}
                          /* Skip the mount animation for cards that are already
                             in the stack — this was the main flickering culprit.
                             AnimatePresence re-mounted cards when the reversed
                             array shifted, replaying opacity:0 → 1.  Without
                             AnimatePresence we no longer need `initial` at all;
                             setting it to `false` tells Framer Motion to render
                             the card at its `animate` target immediately. */
                          initial={false}
                          animate={
                            isTop && profile.swiped
                              ? {
                                  x: profile.action === "like" ? 300 : profile.action === "nope" ? -300 : 0,
                                  y: profile.action === "superlike" ? -300 : 0,
                                  rotate: profile.action === "like" ? 25 : profile.action === "nope" ? -25 : 0,
                                  opacity: 0,
                                }
                              : {
                                  x: 0,
                                  y: stackIndex === 0 ? 0 : stackIndex === 1 ? -6 : -12,
                                  scale: stackIndex === 0 ? 1 : stackIndex === 1 ? 0.96 : 0.92,
                                  rotate: stackIndex === 0 ? 0 : stackIndex === 1 ? -1.5 : 1.5,
                                  opacity: stackIndex === 2 ? 0.4 : 1,
                                }
                          }
                          transition={
                            isTop && profile.swiped
                              ? {
                                  type: "tween",
                                  ease: [0.32, 0, 0.67, 0],
                                  duration: 0.35,
                                }
                              : {
                                  type: "spring",
                                  stiffness: 110,
                                  damping: 22,
                                }
                          }
                        >
                          {/* Portrait Image */}
                          <div className="absolute inset-0 w-full h-full bg-[#050505]">
                            <Image
                              src={profile.image}
                              alt="Student profile"
                              fill
                              sizes="260px"
                              className="object-cover pointer-events-none brightness-[0.55] saturate-[0.45] contrast-[0.9] transition-all duration-300"
                            />
                            {/* Dark Vignette Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 pointer-events-none" />
                          </div>

                          {/* Profile text info at bottom (compact layout) */}
                          <div className="relative z-20 text-left space-y-1.5 select-none w-full px-3 pb-3 pt-7">
                            {/* Details Stack */}
                            <div className="space-y-0.5 pointer-events-none">
                              {/* Name, Age, Verified badge */}
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="font-sans font-extrabold text-[15px] text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                                  {t(profile.nameKey)}
                                </span>
                                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white text-black shadow-md flex-shrink-0">
                                  <Check className="w-2.5 h-2.5 stroke-[4]" />
                                </span>
                              </div>

                              {/* College and Distance */}
                              <div className="flex flex-col gap-0.5 text-[10px] text-gray-300 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                <div className="flex items-center gap-1 leading-none">
                                  <GraduationCap className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                  <span className="truncate">{t(profile.collegeKey)}</span>
                                </div>
                                <div className="flex items-center gap-1 leading-none">
                                  <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                  <span>{t("difference.tinder.distance")}</span>
                                </div>
                              </div>

                              {/* Bio description */}
                              <p className="text-gray-200 text-[10px] font-medium leading-tight line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                {t(profile.bioKey)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>


          {/* RIGHT COLUMN: Overlapping Polaroids Collage */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold font-sans text-heading-white">
                {t("difference.doThis")}
              </h3>
            </div>

            {/* Overlapping Polaroids Container */}
            <div className="relative w-full max-w-[380px] h-[500px] sm:h-[580px] select-none z-10 my-auto">
              {/* Photo 1: Mia (Top-Left) */}
              <motion.div
                role="button"
                tabIndex={0}
                aria-label="Show Mia match card"
                className="absolute w-[58%] aspect-[819/1024] cursor-pointer shadow-xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ left: "2%", top: "4%" }}
                initial={{ rotate: -8, scale: 0.95, opacity: 0 }}
                animate={{
                  rotate: activeCard === "mia" ? -2 : -8,
                  scale: activeCard === "mia" ? 1.06 : 1,
                  y: activeCard === "mia" ? -8 : 0,
                  zIndex: activeCard === "mia" ? 40 : 10,
                  opacity: 1,
                }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: -2, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCard(prev => prev === "mia" ? null : "mia");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveCard(prev => prev === "mia" ? null : "mia");
                  }
                }}
              >
                <Image
                  src="/images/do-this-mia.jpg"
                  alt="Match Mia"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </motion.div>

              {/* Photo 2: Girls 1 (Top-Right) */}
              <motion.div
                role="button"
                tabIndex={0}
                aria-label="Show verified date card"
                className="absolute w-[58%] aspect-[819/1024] cursor-pointer shadow-xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ right: "-8%", top: "12%" }}
                initial={{ rotate: 6, scale: 0.95, opacity: 0 }}
                animate={{
                  rotate: activeCard === "girls1" ? 2 : 6,
                  scale: activeCard === "girls1" ? 1.06 : 1,
                  y: activeCard === "girls1" ? -8 : 0,
                  zIndex: activeCard === "girls1" ? 40 : 10,
                  opacity: 1,
                }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: 2, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCard(prev => prev === "girls1" ? null : "girls1");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveCard(prev => prev === "girls1" ? null : "girls1");
                  }
                }}
              >
                <Image
                  src="/images/do-this-girls-1.jpg"
                  alt="Verified Date"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </motion.div>

              {/* Photo 3: Boys 1 (Middle-Center) */}
              <motion.div
                role="button"
                tabIndex={0}
                aria-label="Show verified date card"
                className="absolute w-[54%] aspect-[819/1024] cursor-pointer shadow-xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ left: "23%", top: "25%" }}
                initial={{ rotate: -3, scale: 0.95, opacity: 0 }}
                animate={{
                  rotate: activeCard === "boys1" ? 0 : -3,
                  scale: activeCard === "boys1" ? 1.06 : 1,
                  y: activeCard === "boys1" ? -8 : 0,
                  zIndex: activeCard === "boys1" ? 40 : 10,
                  opacity: 1,
                }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCard(prev => prev === "boys1" ? null : "boys1");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveCard(prev => prev === "boys1" ? null : "boys1");
                  }
                }}
              >
                <Image
                  src="/images/do-this-boys-1.jpg"
                  alt="Verified Date"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </motion.div>

              {/* Photo 4: Girls 2 (Bottom-Left) */}
              <motion.div
                role="button"
                tabIndex={0}
                aria-label="Show verified date card"
                className="absolute w-[56%] aspect-[819/1024] cursor-pointer shadow-xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ left: "-3%", bottom: "2%" }}
                initial={{ rotate: -6, scale: 0.95, opacity: 0 }}
                animate={{
                  rotate: activeCard === "girls2" ? -1 : -6,
                  scale: activeCard === "girls2" ? 1.06 : 1,
                  y: activeCard === "girls2" ? -8 : 0,
                  zIndex: activeCard === "girls2" ? 40 : 10,
                  opacity: 1,
                }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: -1, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCard(prev => prev === "girls2" ? null : "girls2");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveCard(prev => prev === "girls2" ? null : "girls2");
                  }
                }}
              >
                <Image
                  src="/images/do-this-girls-2.jpg"
                  alt="Verified Date"
                  fill
                  sizes="210px"
                  className="object-cover"
                />
              </motion.div>

              {/* Photo 5: Adrian (Bottom-Right) - default z-30 */}
              <motion.div
                role="button"
                tabIndex={0}
                aria-label="Show Adrian match card"
                className="absolute w-[58%] aspect-[819/1024] cursor-pointer shadow-2xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ right: "-4%", bottom: "-2%" }}
                initial={{ rotate: 4, scale: 0.95, opacity: 0 }}
                animate={{
                  rotate: activeCard === "adrian" ? 1 : 4,
                  scale: activeCard === "adrian" ? 1.06 : 1,
                  y: activeCard === "adrian" ? -8 : 0,
                  zIndex: activeCard === "adrian" ? 40 : 30,
                  opacity: 1,
                }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: 1, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCard(prev => prev === "adrian" ? null : "adrian");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveCard(prev => prev === "adrian" ? null : "adrian");
                  }
                }}
              >
                <Image
                  src="/images/do-this-adrian.jpg"
                  alt="Match Adrian"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
