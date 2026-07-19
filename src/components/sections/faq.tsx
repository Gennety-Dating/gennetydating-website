"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  isLast,
  id,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
  id: string;
}) {
  return (
    <div
      className={cn(
        "transition-colors duration-300",
        !isLast && "border-b border-white/10",
        isOpen ? "bg-white/[0.03]" : "hover:bg-white/[0.015]"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        className="w-full flex items-center justify-between py-5 px-6 md:px-8 text-left cursor-pointer group"
      >
        <span className="text-base md:text-lg font-medium text-white pr-4 group-hover:text-white/80 transition-colors">
          {question}
        </span>
        <svg
          className={cn(
            "w-5 h-5 flex-shrink-0 text-magenta transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0 0 6px rgba(139, 37, 59, 0.6))",
          }}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.35,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: { duration: 0.25 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 pt-1 text-sm md:text-base text-gray-300 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section
      className="min-h-[100vh] md:min-h-[1000px] pt-[80px] md:pt-[100px] pb-[230px] px-4 md:px-10 relative overflow-clip bg-transparent flex flex-col justify-center items-center"
    >
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <Heading as="h2">{t("faq.title")}</Heading>
        </div>

        {/* Unified FAQ Accordion Block */}
        <div className="rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden">
          {faqKeys.map((num, index) => (
            <AccordionItem
              key={num}
              question={t(`faq.${num}.q` as TranslationKeys)}
              answer={t(`faq.${num}.a` as TranslationKeys)}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              isLast={index === faqKeys.length - 1}
              id={`faq-${num}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
