"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heading, Highlight } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";
import { type TranslationKeys } from "@/lib/i18n";
import { Sparkles, MapPin, Calendar, Flame, Check, RotateCcw, X, Star, Heart, GraduationCap } from "lucide-react";

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

const profiles: Profile[] = [
  {
    id: 1,
    image: "/images/tinder-photo-1.jpg",
    nameKey: "difference.tinder.profile1.name",
    bioKey: "difference.tinder.profile1.bio",
    collegeKey: "difference.tinder.profile1.college",
    action: "like",
    tags: ["🎵 Music", "☕ Coffee", "💿 Vinyl"],
  },
  {
    id: 2,
    image: "/images/tinder-photo-2.jpg",
    nameKey: "difference.tinder.profile2.name",
    bioKey: "difference.tinder.profile2.bio",
    collegeKey: "difference.tinder.profile2.college",
    action: "nope",
    tags: ["🚗 Travel", "🍵 Matcha", "🏃‍♀️ Running"],
  },
  {
    id: 3,
    image: "/images/tinder-photo-3.jpg",
    nameKey: "difference.tinder.profile3.name",
    bioKey: "difference.tinder.profile3.bio",
    collegeKey: "difference.tinder.profile3.college",
    action: "like",
    tags: ["🎾 Tennis", "🎸 Rock", "🍻 Gigs"],
  },
  {
    id: 4,
    image: "/images/tinder-photo-4.jpg",
    nameKey: "difference.tinder.profile4.name",
    bioKey: "difference.tinder.profile4.bio",
    collegeKey: "difference.tinder.profile4.college",
    action: "nope",
    tags: ["💻 Coding", "☕ Coffee", "📚 Study"],
  },
  {
    id: 5,
    image: "/images/tinder-photo-5.jpg",
    nameKey: "difference.tinder.profile5.name",
    bioKey: "difference.tinder.profile5.bio",
    collegeKey: "difference.tinder.profile5.college",
    action: "superlike",
    tags: ["🎨 Art", "🏛️ Museums", "📸 Photo"],
  },
];

// Telegram messages interface
interface Message {
  id: number;
  sender: "bot" | "user" | "ticket";
  textKey?: TranslationKeys;
}

interface ActiveProfile extends Profile {
  uniqueId: string;
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

  // --- Tinder Swiping Logic (AnimatePresence list) ---
  const [activeCards, setActiveCards] = useState<ActiveProfile[]>([]);
  const [history, setHistory] = useState<ActiveProfile[]>([]);
  const [isProcessingSwipe, setIsProcessingSwipe] = useState(false);
  const nextIndexRef = useRef(0);

  useEffect(() => {
    const initial: ActiveProfile[] = [];
    for (let i = 0; i < profiles.length; i++) {
      const proto = profiles[i % profiles.length];
      initial.push({
        ...proto,
        uniqueId: `${proto.id}-${i}`,
      });
      nextIndexRef.current++;
    }
    setActiveCards(initial);
  }, []);

  const swipeTopCard = (direction: "like" | "nope" | "superlike") => {
    if (isProcessingSwipe || activeCards.length === 0) return;
    setIsProcessingSwipe(true);

    // 1. Update the top card's action to animate exit correctly
    setActiveCards((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      updated[0] = { ...updated[0], action: direction };
      return updated;
    });

    // 2. Remove the card and add a new one at the bottom
    setTimeout(() => {
      setActiveCards((prev) => {
        if (prev.length === 0) {
          setIsProcessingSwipe(false);
          return prev;
        }
        const [topCard, ...rest] = prev;
        
        // Push to history
        setHistory((h) => [...h.slice(-9), topCard]);

        const nextProto = profiles[nextIndexRef.current % profiles.length];
        nextIndexRef.current++;

        setIsProcessingSwipe(false);
        return [
          ...rest,
          {
            ...nextProto,
            uniqueId: `${nextProto.id}-${nextIndexRef.current}`,
          },
        ];
      });
    }, 400); // Allow time for card exit animation
  };

  const handleRewind = () => {
    if (history.length === 0 || isProcessingSwipe) return;
    setIsProcessingSwipe(true);

    const lastCard = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));

    setActiveCards((prev) => {
      const rest = prev.slice(0, -1);
      setIsProcessingSwipe(false);
      return [
        {
          ...lastCard,
          action: undefined, // reset the swipe action
        },
        ...rest,
      ];
    });
  };

  useEffect(() => {
    if (activeCards.length === 0 || isProcessingSwipe) return;

    const timer = setTimeout(() => {
      const topCard = activeCards[0];
      const action = topCard.action || "like";
      swipeTopCard(action);
    }, 3000); // Swipe every 3 seconds

    return () => clearTimeout(timer);
  }, [activeCards, isProcessingSwipe]);

  // --- Telegram Bot Mockup Logic ---
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timelineIndex = 0;
    setChatMessages([]);
    setIsTyping(false);
    let activeTimeout: NodeJS.Timeout | null = null;
    let loopTimeout: NodeJS.Timeout | null = null;

    const playNextMessage = () => {
      if (timelineIndex >= messageTimeline.length) {
        // Conversation finished, pause then restart loop
        loopTimeout = setTimeout(() => {
          setChatMessages([]);
          timelineIndex = 0;
          playNextMessage();
        }, 5000);
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
  }, []);

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
    <section className="py-[120px] px-4 md:px-10 relative overflow-hidden bg-midnight">
      {/* Blurred background image of airplane view */}
      <div 
        className="absolute inset-0 bg-[url('/images/difference-bg.jpg')] bg-cover bg-center bg-fixed opacity-20 pointer-events-none filter blur-[12px] scale-110" 
        aria-hidden="true"
      />
      {/* Edge blending gradients */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-midnight to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

      {/* Decorative neon gradient overlays */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-magenta/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

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
            <div className="relative w-full max-w-[320px] h-[550px] flex items-center justify-center select-none z-10">
              <AnimatePresence>
                {activeCards.slice(0, 3).reverse().map((profile) => {
                  const isTop = profile.uniqueId === activeCards[0]?.uniqueId;
                  const stackIndex = isTop ? 2 : (profile.uniqueId === activeCards[1]?.uniqueId ? 1 : 0);

                  return (
                    <motion.div
                      key={profile.uniqueId}
                      className="absolute inset-0 bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col justify-end"
                      style={{
                        transformOrigin: "bottom center",
                        zIndex: stackIndex,
                      }}
                      initial={{ scale: 0.92, y: -20, opacity: 0 }}
                      animate={{
                        scale: stackIndex === 2 ? 1 : stackIndex === 1 ? 0.96 : 0.92,
                        y: stackIndex === 2 ? 0 : stackIndex === 1 ? -12 : -24,
                        rotate: stackIndex === 2 ? 0 : stackIndex === 1 ? -1.5 : 1.5,
                        opacity: stackIndex === 0 ? 0.4 : 1,
                      }}
                      exit={{
                        x: profile.action === "like" ? 450 : profile.action === "nope" ? -450 : 0,
                        y: profile.action === "superlike" ? -600 : 40,
                        rotate: profile.action === "like" ? 20 : profile.action === "nope" ? -20 : 0,
                        opacity: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 17,
                      }}
                    >
                      {/* Portrait Image */}
                      <div className="absolute inset-0 w-full h-full bg-[#111111]">
                        <Image
                          src={profile.image}
                          alt="Student profile"
                          fill
                          sizes="320px"
                          priority={isTop}
                          className="object-cover pointer-events-none"
                        />
                        {/* Dark Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                      </div>

                      {/* Top Stories-like pagination lines */}
                      <div className="absolute top-3 inset-x-3 z-30 flex gap-1 px-1 opacity-60">
                        <div className={`h-1 flex-1 rounded-full ${profile.id === 1 ? 'bg-white' : 'bg-white/30'}`} />
                        <div className={`h-1 flex-1 rounded-full ${profile.id === 2 ? 'bg-white' : 'bg-white/30'}`} />
                        <div className={`h-1 flex-1 rounded-full ${profile.id === 3 ? 'bg-white' : 'bg-white/30'}`} />
                        <div className={`h-1 flex-1 rounded-full ${profile.id === 4 ? 'bg-white' : 'bg-white/30'}`} />
                        <div className={`h-1 flex-1 rounded-full ${profile.id === 5 ? 'bg-white' : 'bg-white/30'}`} />
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
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white shadow-md flex-shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                            </span>
                          </div>

                          {/* College and Distance */}
                          <div className="flex flex-col gap-0.5 text-xs text-gray-300 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            <div className="flex items-center gap-1.5">
                              <GraduationCap className="w-4 h-4 text-magenta" />
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
                                className="text-[10px] font-bold text-white bg-black/40 border border-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons Row (Only interactive on top card) */}
                        <div className={`flex items-center justify-center gap-3.5 pt-2 ${isTop ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-40'}`}>
                          {/* Rewind Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRewind();
                            }}
                            disabled={history.length === 0}
                            className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 hover:bg-amber-400/20 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] active:scale-95 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none backdrop-blur-sm"
                            aria-label="Rewind"
                          >
                            <RotateCcw className="w-4.5 h-4.5 stroke-[2.5]" />
                          </button>

                          {/* Nope Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              swipeTopCard("nope");
                            }}
                            className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] active:scale-95 transition-all duration-200 backdrop-blur-sm"
                            aria-label="Nope"
                          >
                            <X className="w-5.5 h-5.5 stroke-[3]" />
                          </button>

                          {/* Superlike Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              swipeTopCard("superlike");
                            }}
                            className="w-10 h-10 rounded-full bg-sky-400/10 flex items-center justify-center text-sky-400 hover:bg-sky-400/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95 transition-all duration-200 backdrop-blur-sm"
                            aria-label="Super Like"
                          >
                            <Star className="w-4.5 h-4.5 fill-sky-400/10 stroke-[2.5]" />
                          </button>

                          {/* Like Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              swipeTopCard("like");
                            }}
                            className="w-12 h-12 rounded-full bg-emerald-400/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-400/20 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] active:scale-95 transition-all duration-200 backdrop-blur-sm"
                            aria-label="Like"
                          >
                            <Heart className="w-5.5 h-5.5 fill-emerald-400/5 stroke-[2.5]" />
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
              <h3 className="text-xl md:text-2xl font-bold font-sans text-white">
                {t("difference.doThis")}
              </h3>
            </div>

            {/* Chatbot Telegram Frame */}
            <div className="w-full max-w-[360px] h-[440px] bg-black/60 border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col overflow-hidden relative">
              {/* Header */}
              <div className="px-4 py-3 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-magenta-dark/30 to-magenta/20 border border-magenta/30 flex items-center justify-center relative overflow-hidden shadow-neon-sm">
                    <Image
                      src="/images/star-mascot.png"
                      alt="Gennety Mascot"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Gennety Bot
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-magenta text-midnight flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      {t("difference.chat.status")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Telegram-style Pinned Message active bar */}
              <div className="bg-white/[0.02] border-b border-white/10 py-2.5 px-4 text-xs flex items-center gap-3 select-none">
                <div className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magenta opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-magenta"></span>
                </div>
                <div className="w-[2px] h-8 bg-magenta/40 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-magenta font-bold uppercase tracking-wider leading-tight">
                    {tickerTitle}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate leading-tight">
                    {tickerSubtitle}
                  </p>
                </div>
              </div>

              {/* Message History area with Grid Wallpaper */}
              <div 
                ref={chatContainerRef} 
                className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin select-none"
                style={{ 
                  backgroundImage: "radial-gradient(rgba(208, 173, 252, 0.04) 1px, transparent 1px)", 
                  backgroundSize: "12px 12px" 
                }}
              >
                <AnimatePresence initial={false}>
                  {chatMessages.map((msg, index) => {
                    if (msg.sender === "ticket") {
                      return (
                        <motion.div
                          key={`msg-${msg.id}`}
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                          className="flex justify-center py-2"
                        >
                          {/* Wednesday Drop / Thursday Drop Ticket Container */}
                          <div className="relative w-full max-w-[280px] bg-white/[0.02] backdrop-blur-md border border-magenta/20 rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col">
                            {/* Neon glowing dash design element */}
                            <div className="absolute top-0 inset-x-0 h-1 bg-magenta" />
                            
                            {/* Ticket header */}
                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                              <span className="text-[10px] font-bold tracking-wider text-magenta uppercase flex items-center gap-1">
                                <Flame className="w-3 h-3 text-magenta" />
                                {t("difference.chat.ticket.title")}
                              </span>
                              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-bold uppercase">
                                NYU ONLY
                              </span>
                            </div>

                            {/* Ticket Body */}
                            <div className="p-4 space-y-3">
                              {/* Match Name */}
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full border border-magenta bg-magenta/10 flex items-center justify-center font-bold text-xs text-white">
                                  S
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 font-semibold">{t("difference.chat.ticket.match")}</p>
                                  <p className="text-[10px] text-magenta font-black">{t("difference.chat.ticket.desc")}</p>
                                </div>
                              </div>

                              {/* Details */}
                              <div className="space-y-2 pt-1 border-t border-white/5 text-[11px]">
                                <div className="flex items-center gap-2 text-gray-300">
                                  <MapPin className="w-3.5 h-3.5 text-magenta flex-shrink-0" />
                                  <span>{t("difference.chat.ticket.venue")}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                  <Calendar className="w-3.5 h-3.5 text-magenta flex-shrink-0" />
                                  <span>{t("difference.chat.ticket.time")}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }

                    const isBot = msg.sender === "bot";
                    return (
                      <motion.div
                        key={`msg-${msg.id}`}
                        initial={{ opacity: 0, x: isBot ? -15 : 15, y: 5 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs md:text-sm shadow-md leading-relaxed ${
                            isBot
                              ? "bg-white/[0.06] text-white rounded-tl-sm border border-white/5"
                              : "bg-magenta text-midnight font-medium rounded-tr-sm shadow-[0_4px_12px_rgba(208,173,252,0.25)]"
                          }`}
                        >
                          {msg.textKey ? t(msg.textKey) : ""}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Bouncing Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/[0.06] text-white rounded-2xl rounded-tl-sm px-4 py-2.5 flex gap-1 items-center border border-white/5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Main Value Proposition Copy under components */}
        <div className="max-w-3xl mx-auto mt-16 text-center text-gray-400 text-base md:text-lg leading-relaxed px-4">
          <p>{t("difference.description")}</p>
        </div>
      </div>
    </section>
  );
}
