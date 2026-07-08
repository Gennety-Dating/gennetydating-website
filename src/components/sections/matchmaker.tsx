"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { BubbleTail } from "@/components/ui/bubble-tail";
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
      className="min-h-[100vh] md:min-h-[1050px] py-[210px] px-4 md:px-10 relative overflow-hidden bg-transparent flex flex-col justify-center items-center"
    >
      {/* Upper wavy edge (Postage Stamp Wavy Top Edge) */}
      <svg className="absolute top-0 left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stamp-teeth-top" width="37" height="15" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z" fill="#1A1A1A" />
          </pattern>
        </defs>
        <rect width="100%" height="15" fill="url(#stamp-teeth-top)" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-heading-white leading-[1.15] mb-4">
          {t("matchmaker.title")}
        </h2>
        <p className="text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-xl mx-auto text-balance">
          {t("matchmaker.subheadline")}
        </p>
      </div>

      {/* Прозрачный и безрамочный контейнер чата (Chat screen container) */}
      <div className="relative z-10 w-full max-w-[480px] mx-auto min-h-[380px] p-6 bg-transparent flex flex-col gap-4 justify-start">
        <AnimatePresence>
          {chatMessages.slice(0, visibleCount).map((msg) => {
            const isAgent = msg.sender === "agent";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "relative max-w-[85%] rounded-[22px] px-[18px] py-2.5 text-sm md:text-base leading-relaxed text-left shadow-[0_1px_2px_rgba(0,0,0,0.16)]",
                  isAgent
                    ? "bg-[#e9e9eb] text-black self-start rounded-bl-md"
                    : "bg-black text-white self-end rounded-br-md font-medium"
                )}
              >
                {t(msg.translationKey)}
                <BubbleTail
                  side={isAgent ? "left" : "right"}
                  className="absolute"
                  style={
                    isAgent
                      ? { color: "#e9e9eb", left: "-6px", bottom: "-1px" }
                      : { color: "#000000", right: "-6px", bottom: "-1px" }
                  }
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
