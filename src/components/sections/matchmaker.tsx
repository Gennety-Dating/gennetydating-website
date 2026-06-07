"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { TranslationKeys } from "@/lib/i18n";

const chatMessages = [
  { id: 1, sender: "agent" as const, translationKey: "matchmaker.chat.msg1" as TranslationKeys },
  { id: 2, sender: "user" as const, translationKey: "matchmaker.chat.msg2" as TranslationKeys },
  { id: 3, sender: "agent" as const, translationKey: "matchmaker.chat.msg3" as TranslationKeys },
  { id: 4, sender: "user" as const, translationKey: "matchmaker.chat.msg4" as TranslationKeys },
  { id: 5, sender: "agent" as const, translationKey: "matchmaker.chat.msg5" as TranslationKeys },
];

export function Matchmaker() {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let sequenceActive = false;

    const runSequence = () => {
      sequenceActive = true;
      let count = 0;
      setVisibleCount(0);

      const next = () => {
        if (!sequenceActive) return;
        if (count < chatMessages.length) {
          count++;
          setVisibleCount(count);
          // 1200ms delay between bubbles
          timer = setTimeout(next, 1200);
        } else {
          // Once all 5 messages are shown, wait 5000ms and reset
          timer = setTimeout(() => {
            if (!sequenceActive) return;
            setVisibleCount(0);
            timer = setTimeout(runSequence, 400);
          }, 5000);
        }
      };

      // Start first bubble after 800ms
      timer = setTimeout(next, 800);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!sequenceActive) {
            runSequence();
          }
        } else {
          sequenceActive = false;
          clearTimeout(timer);
          setVisibleCount(0);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      sequenceActive = false;
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-[120px] px-4 md:px-10 relative overflow-hidden bg-midnight"
    >
      {/* Размытый фоновый рисунок (Blur background image) */}
      <div 
        className="absolute inset-0 bg-[url('/images/matchmaker-bg.jpg')] bg-cover bg-center pointer-events-none filter blur-[6px] scale-105 opacity-30 z-0" 
        aria-hidden="true"
      />
      {/* Затемняющий оверлей для идеального контраста и интеграции в темную тему */}
      <div className="absolute inset-0 bg-[#050505]/70 z-0" />

      {/* Верхний волнообразный край (Postage Stamp Wavy Top Edge) */}
      <svg className="absolute top-0 left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stamp-teeth-top" width="37" height="15" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z" fill="#050505" />
          </pattern>
        </defs>
        <rect width="100%" height="15" fill="url(#stamp-teeth-top)" />
      </svg>

      {/* Нижний волнообразный край (Postage Stamp Wavy Bottom Edge) */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stamp-teeth-bottom" width="37" height="15" patternUnits="userSpaceOnUse">
            <path d="M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z" fill="#050505" />
          </pattern>
        </defs>
        <rect width="100%" height="15" fill="url(#stamp-teeth-bottom)" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white leading-[1.15] mb-4">
          {t("matchmaker.title")}
        </h2>
        <p className="text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-xl mx-auto text-balance">
          {t("matchmaker.subheadline")}
        </p>
      </div>

      {/* Прозрачный и безрамочный контейнер чата (Chat screen container) */}
      <div className="relative z-10 w-full max-w-[480px] mx-auto min-h-[380px] p-6 bg-transparent flex flex-col gap-4 justify-start">
        <AnimatePresence>
          {chatMessages.slice(0, visibleCount).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={cn(
                "flex max-w-[85%] rounded-[20px] px-5 py-3 text-sm md:text-base leading-relaxed text-left",
                msg.sender === "agent"
                  ? "bg-[#e9e9eb] text-black self-start rounded-tl-sm"
                  : "bg-black text-white self-end rounded-tr-sm font-medium"
              )}
            >
              {t(msg.translationKey)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
