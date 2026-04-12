"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKeys } from "@/lib/i18n";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 px-1 text-left cursor-pointer group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-midnight rounded"
      >
        <span className="text-base md:text-lg font-medium text-white pr-4 group-hover:text-gray-200 transition-colors">
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
            filter: "drop-shadow(0 0 6px rgba(208, 173, 252, 0.7))",
          }}
          aria-hidden="true"
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

      {/*
        Grid-row expansion — animates to actual content height.
        No fixed max-h means long answers open fully.
      */}
      <div
        className="grid overflow-hidden"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease",
        }}
      >
        <div className="min-h-0">
          <p className="text-sm md:text-base text-gray-400 leading-relaxed px-1 pb-5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="py-[var(--section-y)] px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Heading as="h2">{t("faq.title")}</Heading>
        </div>

        <div className="border-t border-white/10">
          {faqKeys.map((num, index) => (
            <AccordionItem
              key={num}
              question={t(`faq.${num}.q` as TranslationKeys)}
              answer={t(`faq.${num}.a` as TranslationKeys)}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
