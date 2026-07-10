"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heading, Highlight } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import { type TranslationKeys } from "@/lib/i18n";
import { BubbleTail } from "@/components/ui/bubble-tail";
import { Sparkles, MapPin, Calendar, Flame, Check, RotateCcw, X, Star, Heart, GraduationCap, ChevronLeft, MoreHorizontal, Paperclip, Mic, CheckCheck, Mars, Venus, Zap } from "lucide-react";

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

// Telegram messages interface
interface Message {
  id: number;
  sender: "bot" | "user" | "ticket";
  textKey?: TranslationKeys;
}


const messageTimeline: Message[] = [
  { id: 1, sender: "bot", textKey: "difference.chat.msg1" },
  { id: 2, sender: "user", textKey: "difference.chat.msg2" },
  { id: 3, sender: "bot", textKey: "difference.chat.msg3" },
  { id: 4, sender: "user", textKey: "difference.chat.msg4" },
  { id: 5, sender: "bot", textKey: "difference.chat.msg5" },
  { id: 6, sender: "bot", textKey: "difference.chat.msg6" },
  { id: 7, sender: "ticket" },
];

export function TheDifference() {
  const { t } = useLanguage();

  const tickerText = t("difference.status.ticker");
  const [tickerTitle, tickerSubtitle] = tickerText.includes("|")
    ? tickerText.split("|").map(s => s.trim())
    : ["Agent Active", tickerText];

  const [chatMatchGender, setChatMatchGender] = useState<"man" | "woman">("man");

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
  const [history, setHistory] = useState<ActiveProfile[]>([]);
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
      setActiveCards(list);
      setHistory([]);
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
        const [_, ...rest] = prev;
        setHistory((h) => [...h.slice(-9), topCard]);
        setIsProcessingSwipe(false);
        return rest;
      });
    }, 300); // 300ms matches Framer Motion's exit duration
  };

  const handleRewind = () => {
    if (history.length === 0 || isProcessingSwipe) return;
    setIsProcessingSwipe(true);

    const lastCard = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));

    setActiveCards((prev) => {
      setIsProcessingSwipe(false);
      return [
        {
          ...lastCard,
          action: undefined,
        },
        ...prev,
      ];
    });
  };

  const handleDepartComplete = () => {
    // Handled in swipeTopCard timeout
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
  }, [activeCards, isProcessingSwipe]);

  // --- Telegram Bot Mockup Logic ---
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatMessages([]);
    setIsTyping(false);

    let timelineIndex = 0;
    let activeTimeout: NodeJS.Timeout | null = null;
    let loopTimeout: NodeJS.Timeout | null = null;

    const playNextMessage = () => {
      if (timelineIndex >= messageTimeline.length) {
        // Conversation finished, pause then restart loop
        loopTimeout = setTimeout(() => {
          setChatMatchGender((prevGender) => (prevGender === "man" ? "woman" : "man"));
        }, 10000);
        return;
      }

      const nextMsg = messageTimeline[timelineIndex];

      // Bots/Tickets have a typing delay, user sends faster
      const typingDelay = nextMsg.sender === "bot" ? 1800 : nextMsg.sender === "ticket" ? 1200 : 1000;
      
      if (nextMsg.sender === "bot" || nextMsg.sender === "ticket") {
        setIsTyping(true);
      }

      activeTimeout = setTimeout(() => {
        setIsTyping(false);
        setChatMessages((prev) => [...prev, nextMsg]);
        timelineIndex++;

        // Schedule next message
        activeTimeout = setTimeout(playNextMessage, 1200);
      }, typingDelay);
    };

    // Start chat loop
    const initialDelay = setTimeout(playNextMessage, 1000);

    return () => {
      clearTimeout(initialDelay);
      if (activeTimeout) clearTimeout(activeTimeout);
      if (loopTimeout) clearTimeout(loopTimeout);
    };
  }, [chatMatchGender, t]);

  // Auto scroll chat container internally
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, isTyping]);

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

            {/* Tinder Stack Container */}
            <div className="relative w-full max-w-[360px] h-[620px] flex items-center justify-center select-none z-10">
              <AnimatePresence>
                {activeCards.slice(0, 3).reverse().map((profile, index, arr) => {
                  const stackIndex = arr.length - 1 - index;
                  const isTop = stackIndex === 0;

                  return (
                    <motion.div
                      key={profile.uniqueId}
                      className="absolute inset-0 bg-[#0d0d0d] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col justify-end"
                      style={{
                        transformOrigin: "bottom center",
                        zIndex: 3 - stackIndex,
                        willChange: "transform, opacity",
                      }}
                      initial={{ scale: 0.92, y: -20, opacity: 0 }}
                      animate={{
                        scale: stackIndex === 0 ? 1 : stackIndex === 1 ? 0.96 : 0.92,
                        y: stackIndex === 0 ? 0 : stackIndex === 1 ? -12 : -24,
                        rotate: stackIndex === 0 ? 0 : stackIndex === 1 ? -1.5 : 1.5,
                        opacity: stackIndex === 2 ? 0.4 : 1,
                      }}
                      exit={{
                        x: profile.action === "like" ? 480 : profile.action === "nope" ? -480 : 0,
                        y: profile.action === "superlike" ? -650 : 0,
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
                          sizes="360px"
                          priority={isTop}
                          className="object-cover pointer-events-none brightness-[0.55] saturate-[0.45] contrast-[0.9] transition-all duration-300"
                        />
                        {/* Dark Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 pointer-events-none" />
                      </div>

                      {/* Top Stories-like pagination lines */}
                      <div className="absolute top-3 inset-x-3 z-30 flex gap-1 px-1 opacity-60">
                        {Array.from({ length: 6 }).map((_, idx) => (
                          <div 
                            key={idx}
                            className={`h-1 flex-1 rounded-full ${profile.id === idx + 1 ? 'bg-white' : 'bg-white/30'}`} 
                          />
                        ))}
                      </div>

                      {/* Profile text info and buttons at bottom */}
                      <div className="relative z-20 text-left space-y-3 select-none w-full px-5 pb-5 pt-16">
                        {/* Details Stack */}
                        <div className="space-y-1.5 pointer-events-none">
                          {/* Name, Age, Verified badge */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-sans font-extrabold text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              {t(profile.nameKey)}
                            </span>
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-black shadow-md flex-shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                            </span>
                          </div>

                          {/* College and Distance */}
                          <div className="flex flex-col gap-0.5 text-xs text-gray-300 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            <div className="flex items-center gap-1.5">
                              <GraduationCap className="w-4 h-4 text-gray-400" />
                              <span>{t(profile.collegeKey)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gray-400" />
                              <span>{t("difference.tinder.distance")}</span>
                            </div>
                          </div>

                          {/* Bio description */}
                          <p className="text-gray-200 text-sm font-medium leading-snug line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {t(profile.bioKey)}
                          </p>

                          {/* Interests Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {profile.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-bold text-white bg-black/40 border border-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm grayscale"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons Row (Only interactive on top card) */}
                        <div className={`flex items-center justify-center gap-2 sm:gap-3 pt-2 ${isTop ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-40'}`}>
                          {/* Rewind Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRewind();
                            }}
                            disabled={history.length === 0}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400 hover:bg-gray-500/20 hover:shadow-[0_0_15px_rgba(156,163,175,0.2)] active:scale-95 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none backdrop-blur-sm"
                            aria-label="Rewind"
                          >
                            <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                          </button>

                          {/* Nope Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              swipeTopCard("nope");
                            }}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400 hover:bg-gray-500/20 hover:shadow-[0_0_15px_rgba(156,163,175,0.2)] active:scale-95 transition-all duration-200 backdrop-blur-sm"
                            aria-label="Nope"
                          >
                            <X className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[3]" />
                          </button>

                          {/* Super Like Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              swipeTopCard("superlike");
                            }}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400 hover:bg-gray-500/20 hover:shadow-[0_0_15px_rgba(156,163,175,0.2)] active:scale-95 transition-all duration-200 backdrop-blur-sm"
                            aria-label="Super Like"
                          >
                            <Star className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-gray-400/5 stroke-[2.5]" />
                          </button>

                          {/* Like Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              swipeTopCard("like");
                            }}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400 hover:bg-gray-500/20 hover:shadow-[0_0_15px_rgba(156,163,175,0.2)] active:scale-95 transition-all duration-200 backdrop-blur-sm"
                            aria-label="Like"
                          >
                            <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-gray-400/5 stroke-[2.5]" />
                          </button>

                          {/* Boost Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Visual click feedback
                            }}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400 hover:bg-gray-500/20 hover:shadow-[0_0_15px_rgba(156,163,175,0.2)] active:scale-95 transition-all duration-200 backdrop-blur-sm"
                            aria-label="Boost"
                          >
                            <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-gray-400/5 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>


          {/* RIGHT COLUMN: Gennety Bot Mockup */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold font-sans text-heading-white">
                {t("difference.doThis")}
              </h3>
            </div>

            {/* Chatbot Telegram Frame */}
            <div className="w-full max-w-[400px] h-[620px] bg-[#0e1621] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
              
              {/* Floating Header (Subtle Liquid Glass) */}
              <div className="absolute top-3 inset-x-3 bg-[#182533]/35 backdrop-blur-xl border border-white/5 rounded-2xl p-2 px-3 flex items-center justify-between z-20 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2">
                  <button className="text-[#5288c1] hover:bg-white/5 p-1 rounded-full transition-colors cursor-pointer">
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center shadow-sm overflow-hidden relative">
                      <Image
                        src="/images/butterfly-favicon.svg"
                        alt="Gennety Mascot"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-heading-white flex items-center gap-1 leading-none">
                        Gennety Bot
                        <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-[#5288c1] text-white flex-shrink-0">
                          <Check className="w-2 h-2 stroke-[3.5]" />
                        </span>
                      </h4>
                      <span className="text-[10px] text-[#708499] font-medium mt-0.5 block">
                        bot
                      </span>
                    </div>
                  </div>
                </div>
                <button className="hover:bg-white/5 p-2 rounded-full transition-colors cursor-pointer">
                  <MoreHorizontal className="w-5 h-5 text-[#708499]" />
                </button>
              </div>

              {/* Message History area */}
              <div 
                ref={chatContainerRef} 
                className="absolute inset-0 p-4 overflow-y-auto space-y-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none z-10 pt-20 pb-20"
              >
                <div className="text-center w-full my-2">
                  <span className="bg-black/20 text-[#708499] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    Today
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {chatMessages.map((msg) => {
                    if (msg.sender === "ticket") {
                      return (
                        <motion.div
                          key={`msg-${msg.id}`}
                          initial={{ opacity: 0, scale: 0.9, transformOrigin: "bottom left" }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                          className="flex flex-col gap-2 py-2"
                        >
                          {/* 1. Verification text bubble (Frameless & Translucent) */}
                          <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#182533]/50 border-none px-3.5 py-2.5 text-[12.5px] leading-snug relative shadow-sm text-left backdrop-blur-sm">
                            <span className="text-[#ffffff]">
                              {t("difference.chat.ticket.verification")}
                            </span>
                            <div className="flex items-center gap-0.5 justify-end mt-1 text-[#708499]">
                              <span className="text-[9px] font-medium leading-none">22:42</span>
                            </div>
                            <BubbleTail
                              side="left"
                              className="absolute"
                              style={{ color: "#131d2a", left: "-5px", bottom: "0px" }}
                            />
                          </div>

                           {/* 2. Photo Grid bubble (Frameless & Translucent) */}
                           <div className="relative w-full max-w-[300px] bg-[#182533]/50 border-none rounded-2xl rounded-tl-sm overflow-hidden shadow-sm flex flex-col backdrop-blur-sm">
                             <div className="grid grid-cols-2 gap-1 p-1">
                               <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/20">
                                 <Image
                                   src={chatMatchGender === "woman" ? "/images/dan-1.jpg" : "/images/tinder-woman-1.jpg"}
                                   alt={chatMatchGender === "woman" ? "Den" : "Sofia"}
                                   fill
                                   sizes="150px"
                                   className="object-cover pointer-events-none"
                                 />
                               </div>
                               <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/20">
                                 <Image
                                   src={chatMatchGender === "woman" ? "/images/tinder-woman-1.jpg" : "/images/dan-1.jpg"}
                                   alt={chatMatchGender === "woman" ? "Sofia" : "Den"}
                                   fill
                                   sizes="150px"
                                   className="object-cover pointer-events-none"
                                 />
                               </div>
                             </div>
                             <div className="px-3 pb-2.5 pt-1 text-left relative">
                               <p className="text-[13px] font-bold text-white">
                                 {chatMatchGender === "woman" ? t("difference.chat.ticket.name") : t("difference.chat.ticket.name.female")}
                               </p>
                               <p className="text-[11px] text-[#5288c1] font-semibold flex items-center gap-1 mt-0.5">
                                 <Check className="w-3.5 h-3.5 stroke-[3.5]" /> {t("difference.chat.ticket.verified")}
                               </p>
                               <span className="absolute bottom-1.5 right-2 text-[9px] text-[#708499] font-medium">22:42</span>
                             </div>
                           </div>
 
                           {/* 3. Synergy bubble (Frameless & Translucent) */}
                           <div className="relative w-full max-w-[300px] bg-[#182533]/50 border-none rounded-2xl rounded-tl-sm pt-3 px-3.5 pb-2 shadow-md text-left flex flex-col gap-1.5 backdrop-blur-sm">
                             <div className="text-[12px] font-bold text-white flex items-start gap-1.5 leading-snug">
                               <span className="text-base leading-none">💎</span>
                               <span>
                                 {chatMatchGender === "woman" ? t("difference.chat.ticket.synergy") : t("difference.chat.ticket.synergy.female")}
                               </span>
                             </div>
                             <p className="text-[11.5px] text-[#cdd7e0] leading-normal pl-5">
                               {chatMatchGender === "woman" ? t("difference.chat.ticket.synergyDesc") : t("difference.chat.ticket.synergyDesc.female")}
                             </p>
                            <div className="text-[11px] text-white font-semibold flex items-center gap-1 pl-5 mt-0.5">
                              <span className="text-xs leading-none">⌛</span>
                              <span>{t("difference.chat.ticket.timeRemaining")}</span>
                            </div>
                            <span className="absolute bottom-1.5 right-2.5 text-[9px] text-[#708499] font-medium">22:42</span>
                          </div>

                          {/* 4. Action Buttons (Frameless & Sleek) */}
                          <div className="w-full max-w-[300px] flex flex-col gap-1.5 mt-0.5">
                            <div className="grid grid-cols-2 gap-1.5">
                              <button className="py-2.5 px-3 bg-[#31b14a]/80 hover:bg-[#31b14a]/90 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer border-none">
                                <span className="text-xs leading-none">✨</span> {t("difference.chat.ticket.accept")}
                              </button>
                              <button className="py-2.5 px-3 bg-[#b13138]/80 hover:bg-[#b13138]/90 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer border-none">
                                <span className="text-xs leading-none">❌</span> {t("difference.chat.ticket.pass")}
                              </button>
                            </div>
                            <button className="w-full py-2 bg-white/5 hover:bg-white/10 active:scale-[0.98] border-none text-white/70 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer">
                              <span className="text-xs leading-none">🚨</span> {t("difference.chat.ticket.report")}
                            </button>
                          </div>
                        </motion.div>
                      );
                    }

                    const isBot = msg.sender === "bot";
                    return (
                      <motion.div
                        key={`msg-${msg.id}`}
                        initial={{ opacity: 0, scale: 0.9, transformOrigin: isBot ? "bottom left" : "bottom right" }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                        className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug relative border-none shadow-sm text-left backdrop-blur-sm ${
                            isBot
                              ? "bg-[#182533]/50 text-white rounded-bl-md"
                              : "bg-[#2b5278]/55 text-white rounded-br-md"
                          }`}
                        >
                          <span className="break-words">{msg.textKey ? t(msg.textKey) : ""}</span>
                          <div className={`flex items-center gap-0.5 justify-end mt-1 ${isBot ? 'text-[#708499]' : 'text-white/60'}`}>
                            <span className="text-[9px] font-medium leading-none">22:42</span>
                            {!isBot && <CheckCheck className="w-3.5 h-3.5 text-[#549df2]" />}
                          </div>
                          <BubbleTail
                            side={isBot ? "left" : "right"}
                            className="absolute"
                            style={
                              isBot
                                ? { color: "#131d2a", left: "-5px", bottom: "0px" }
                                : { color: "#1e3751", right: "-5px", bottom: "0px" }
                            }
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Typing Indicator (Frameless, Rounded-Full, Subtle Glass) */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, transformOrigin: "bottom left" }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-[#182533]/40 backdrop-blur-md text-[#708499] rounded-full px-4 py-2 flex gap-1.5 items-center border-none shadow-none h-[32px]">
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]" style={{ animationDelay: "-0.32s" }} />
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]" style={{ animationDelay: "-0.16s" }} />
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Floating Footer (Subtle Liquid Glass) */}
              <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 z-20">
                {/* Telegram Menu Button (Transparent Blue Liquid Glass, borderless) */}
                <button className="w-10 h-10 rounded-full bg-[#5288c1]/50 backdrop-blur-xl flex items-center justify-center text-white/90 shadow-md active:scale-95 transition-all cursor-pointer border-none">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                  </svg>
                </button>

                {/* Message Input Pill (Transparent Liquid Glass, borderless) */}
                <div className="flex-1 flex items-center bg-[#182533]/35 backdrop-blur-xl border border-white/5 rounded-full px-3.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  <button className="text-[#708499] hover:text-white transition-colors p-1 cursor-pointer">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 px-2">
                    <span className="text-sm text-[#708499] select-none block text-left">Write a message...</span>
                  </div>
                  <button className="text-[#708499] hover:text-white transition-colors p-1 cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  </button>
                </div>

                {/* Mic Button (Transparent Liquid Glass) */}
                <button className="w-10 h-10 rounded-full bg-[#182533]/35 backdrop-blur-xl border border-white/5 flex items-center justify-center text-[#708499] hover:text-white shadow-md active:scale-95 transition-all cursor-pointer">
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Main Value Proposition Copy under components */}
        <div className="max-w-3xl mx-auto mt-16 text-center text-gray-400 text-base md:text-lg leading-relaxed px-4">
          <p>{t("difference.description")}</p>
        </div>
      </div>

      {/* Bottom wavy edge (Postage Stamp Wavy Bottom Edge) */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stamp-teeth-bottom" width="37" height="15" patternUnits="userSpaceOnUse">
            <path d="M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z" fill="#050505" />
          </pattern>
        </defs>
        <rect width="100%" height="15" fill="url(#stamp-teeth-bottom)" />
      </svg>
    </section>
  );
}
