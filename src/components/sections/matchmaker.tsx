"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const messageVariants = {
  hidden: { opacity: 0, scale: 0.3, y: 15 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
};

export function Matchmaker() {
  const { t } = useLanguage();
  const [viewportMargin, setViewportMargin] = useState("-100px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewportMargin("-10px");
      } else {
        setViewportMargin("-100px");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="min-h-[100vh] md:min-h-[1050px] py-[210px] px-4 md:px-10 relative overflow-hidden bg-transparent flex flex-col justify-center items-center"
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-heading-white leading-[1.15] mb-4">
          {t("matchmaker.title")}
        </h2>
        <p className="text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-xl mx-auto text-balance">
          {t("matchmaker.subheadline")}
        </p>
      </div>

      {/* Прозрачный и безрамочный контейнер чата (Chat screen container) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: viewportMargin }}
        className="relative z-10 w-full max-w-[480px] mx-auto min-h-[380px] p-6 bg-transparent flex flex-col gap-4 justify-start"
      >
        {chatMessages.map((msg) => {
          const isAgent = msg.sender === "agent";
          return (
            <motion.div
              key={msg.id}
              variants={messageVariants}
              style={{
                transformOrigin: isAgent ? "bottom left" : "bottom right",
              }}
              className={cn(
                "relative w-fit max-w-[280px] sm:max-w-[300px] md:max-w-[320px] rounded-[20px] px-[18px] py-2.5 text-[14px] md:text-[15px] leading-relaxed text-left",
                isAgent
                  ? "bg-white text-black self-start rounded-bl-[8px]"
                  : "bg-[#3a3a3c] text-white self-end rounded-br-[8px] font-medium"
              )}
            >
              <span>{t(msg.translationKey)}</span>
              <BubbleTail
                side={isAgent ? "left" : "right"}
                className="absolute"
                width={20}
                height={19}
                style={
                  isAgent
                    ? { color: "#ffffff", left: "-7px", bottom: "0px" }
                    : { color: "#3a3a3c", right: "-7px", bottom: "0px" }
                }
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
