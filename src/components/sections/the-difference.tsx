"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

    // Mark action to trigger exit animation
    setActiveCards((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      updated[0] = { ...updated[0], action: direction };
      return updated;
    });

    setTimeout(() => {
      setActiveCards((prev) => {
        // Prevent race condition if the stack was reset/changed
        if (prev.length === 0 || prev[0].uniqueId !== topCard.uniqueId) {
          setIsProcessingSwipe(false);
          return prev;
        }
        const [, ...rest] = prev;
        setIsProcessingSwipe(false);
        return rest;
      });
    }, 300); // 300ms matches Framer Motion's exit duration
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
            <div className="relative w-full max-w-[320px] aspect-[571/1024] flex items-center justify-center select-none z-10">
              {/* Retro Phone Frame */}
              <Image
                src="/images/retro-phone-new.png"
                alt="Retro Phone Frame"
                fill
                sizes="320px"
                className="pointer-events-none z-20 object-contain"
                priority
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
                  <AnimatePresence>
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
                            willChange: "transform, opacity",
                          }}
                          initial={{ scale: 0.92, y: -20, opacity: 0 }}
                          animate={{
                            scale: stackIndex === 0 ? 1 : stackIndex === 1 ? 0.96 : 0.92,
                            y: stackIndex === 0 ? 0 : stackIndex === 1 ? -6 : -12,
                            rotate: stackIndex === 0 ? 0 : stackIndex === 1 ? -1.5 : 1.5,
                            opacity: stackIndex === 2 ? 0.4 : 1,
                          }}
                          exit={{
                            x: profile.action === "like" ? 300 : profile.action === "nope" ? -300 : 0,
                            y: profile.action === "superlike" ? -300 : 0,
                            rotate: profile.action === "like" ? 25 : profile.action === "nope" ? -25 : 0,
                            opacity: 0,
                          }}
                          transition={
                            isTop && profile.action
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
                              sizes="220px"
                              priority={isTop}
                              className="object-cover pointer-events-none brightness-[0.55] saturate-[0.45] contrast-[0.9] transition-all duration-300"
                            />
                            {/* Dark Vignette Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 pointer-events-none" />
                          </div>

                          {/* Profile text info at bottom (compact layout) */}
                          <div className="relative z-20 text-left space-y-1.5 select-none w-full px-2.5 pb-2.5 pt-6">
                            {/* Details Stack */}
                            <div className="space-y-0.5 pointer-events-none">
                              {/* Name, Age, Verified badge */}
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="font-sans font-extrabold text-sm text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                                  {t(profile.nameKey)}
                                </span>
                                <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-white text-black shadow-md flex-shrink-0">
                                  <Check className="w-2 h-2 stroke-[4]" />
                                </span>
                              </div>

                              {/* College and Distance */}
                              <div className="flex flex-col gap-0.5 text-[8.5px] text-gray-300 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                <div className="flex items-center gap-1 leading-none">
                                  <GraduationCap className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />
                                  <span className="truncate">{t(profile.collegeKey)}</span>
                                </div>
                                <div className="flex items-center gap-1 leading-none">
                                  <MapPin className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />
                                  <span>{t("difference.tinder.distance")}</span>
                                </div>
                              </div>

                              {/* Bio description */}
                              <p className="text-gray-200 text-[8.5px] font-medium leading-tight line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                {t(profile.bioKey)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>


          {/* RIGHT COLUMN: Overlapping Polaroids Collage */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold font-sans text-heading-white">
                {t("difference.doThis")}
              </h3>
            </div>

            {/* Overlapping Polaroids Container */}
            <div className="relative w-full max-w-[380px] h-[500px] sm:h-[580px] select-none z-10">
              {/* Photo 1: Mia (Top-Left) */}
              <motion.div
                className="absolute w-[58%] aspect-[819/1024] cursor-pointer shadow-xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ left: "2%", top: "4%" }}
                initial={{ rotate: -8, scale: 0.95, opacity: 0 }}
                animate={{ rotate: -8, scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: -2, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/images/do-this-mia.jpg"
                  alt="Match Mia"
                  fill
                  sizes="220px"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Photo 2: Girls 1 (Top-Right) */}
              <motion.div
                className="absolute w-[58%] aspect-[819/1024] cursor-pointer shadow-xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ right: "-8%", top: "12%" }}
                initial={{ rotate: 6, scale: 0.95, opacity: 0 }}
                animate={{ rotate: 6, scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: 2, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/images/do-this-girls-1.jpg"
                  alt="Verified Date"
                  fill
                  sizes="220px"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Photo 3: Boys 1 (Middle-Center) */}
              <motion.div
                className="absolute w-[54%] aspect-[819/1024] cursor-pointer shadow-xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ left: "23%", top: "25%" }}
                initial={{ rotate: -3, scale: 0.95, opacity: 0 }}
                animate={{ rotate: -3, scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                className="absolute w-[56%] aspect-[819/1024] cursor-pointer shadow-xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10"
                style={{ left: "-3%", bottom: "2%" }}
                initial={{ rotate: -6, scale: 0.95, opacity: 0 }}
                animate={{ rotate: -6, scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: -1, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                className="absolute w-[58%] aspect-[819/1024] cursor-pointer shadow-2xl rounded-[8px] overflow-hidden bg-white/5 border border-white/10 z-30"
                style={{ right: "-4%", bottom: "-2%" }}
                initial={{ rotate: 4, scale: 0.95, opacity: 0 }}
                animate={{ rotate: 4, scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.06, zIndex: 40, rotate: 1, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
