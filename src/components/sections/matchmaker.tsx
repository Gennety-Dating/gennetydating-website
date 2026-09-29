"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { BrandMessageBubble } from "@/components/ui/brand-message-bubble";
import type { TranslationKeys } from "@/lib/i18n";

interface ChatMessageItem {
  id: number;
  sender: "agent" | "user";
  translationKey: TranslationKeys;
  time: string;
  reaction?: {
    emoji: string;
    avatarUrl?: string;
  };
}

const chatMessages: ChatMessageItem[] = [
  {
    id: 1,
    sender: "agent",
    translationKey: "matchmaker.chat.msg1",
    time: "21:14",
  },
  {
    id: 2,
    sender: "user",
    translationKey: "matchmaker.chat.msg2",
    time: "21:15",
  },
  {
    id: 3,
    sender: "agent",
    translationKey: "matchmaker.chat.msg3",
    time: "21:15",
  },
  {
    id: 4,
    sender: "user",
    translationKey: "matchmaker.chat.msg4",
    time: "21:16",
  },
  {
    id: 5,
    sender: "agent",
    translationKey: "matchmaker.chat.msg5",
    time: "21:17",
    reaction: {
      emoji: "❤️",
      avatarUrl: "/images/reaction-avatar.png",
    },
  },
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

      {/* Безрамочный чат-контейнер с авторскими пузырями сообщений Gennety */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: viewportMargin }}
        className="relative z-10 w-full max-w-[480px] mx-auto min-h-[380px] p-4 sm:p-6 bg-transparent flex flex-col gap-3.5 justify-start"
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
              className={cn("w-fit", isAgent ? "self-start" : "self-end")}
            >
              <BrandMessageBubble
                isOutgoing={!isAgent}
                palette={isAgent ? "dark" : "cherry"}
                timestamp={msg.time}
                status={isAgent ? undefined : "read"}
                reaction={msg.reaction}
              >
                {t(msg.translationKey)}
              </BrandMessageBubble>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

