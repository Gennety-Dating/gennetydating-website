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
    <div
      className={cn(
        "mb-4 rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen
          ? "border-white/10 bg-black/60"
          : "border-white/5 bg-black/30 hover:border-white/10 hover:bg-black/45"
      )}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-6 text-left cursor-pointer group"
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
            filter: "drop-shadow(0 0 6px rgba(255, 0, 255, 0.8))",
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

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-6 pt-1 text-sm md:text-base text-gray-300 leading-relaxed">
          {answer}
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
    <section
      className="py-[120px] px-4 md:px-10 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/faq-bg.jpg')" }}
    >
      {/* Затемняющий оверлей для идеального контраста и интеграции в темную тему */}
      <div className="absolute inset-0 bg-[#050505]/80 z-0" />

      {/* Верхний волнообразный край (Postage Stamp Wavy Top Edge) */}
      <svg className="absolute top-0 left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="faq-stamp-teeth-top" width="37" height="15" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z" fill="#050505" />
          </pattern>
        </defs>
        <rect width="100%" height="15" fill="url(#faq-stamp-teeth-top)" />
      </svg>

      {/* Нижний волнообразный край (Postage Stamp Wavy Bottom Edge) */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="faq-stamp-teeth-bottom" width="37" height="15" patternUnits="userSpaceOnUse">
            <path d="M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z" fill="#050505" />
          </pattern>
        </defs>
        <rect width="100%" height="15" fill="url(#faq-stamp-teeth-bottom)" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <Heading as="h2">{t("faq.title")}</Heading>
        </div>

        <div className="flex flex-col">
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
