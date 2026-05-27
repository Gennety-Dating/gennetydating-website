"use client";

import { Heading } from "@/components/ui/typography";
import { MessageBubble } from "@/components/ui/message-bubble";
import { Bell } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Comparison() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10 relative overflow-hidden">
      {/* Organic White Puddle/Blob Background */}
      <div className="absolute -inset-x-10 -inset-y-6 md:-inset-x-20 md:-inset-y-10 flex items-center justify-center select-none pointer-events-none">
        <svg
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-6xl scale-105 md:scale-110"
          style={{
            filter: "drop-shadow(0 25px 55px rgba(0,0,0,0.7)) drop-shadow(0 8px 16px rgba(0,0,0,0.45))",
          }}
          preserveAspectRatio="none"
        >
          <path
            d="M 150,150 C 300,80 450,80 600,120 C 750,160 880,180 920,300 C 960,420 850,480 750,520 C 650,560 350,550 220,500 C 90,450 60,350 80,260 C 100,170 120,160 150,150 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <Heading as="h2" className="text-center mb-20 text-stone-950 relative z-10">
        {t("comparison.title")}
      </Heading>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 relative z-10">
        {/* Left — Gennety */}
        <div className="flex flex-col items-center text-center">
          <h3 className="font-sans font-bold text-2xl tracking-tight text-stone-900 mb-8">
            {t("comparison.gennety")}
          </h3>

          <div className="w-full max-w-sm">
            <MessageBubble variant="blue" tail="left">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-sm">{t("comparison.dateSet")}</p>
                  <p className="text-white/70 text-xs mt-1">{t("comparison.viewDetails")}</p>
                </div>
              </div>
            </MessageBubble>

            {/* Badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 bg-[#007AFF] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              <span className="w-2 h-2 bg-white rounded-full" />
              {t("comparison.newMessage")}
            </div>
          </div>

          <p className="text-stone-600 font-medium text-sm mt-6 max-w-xs">
            {t("comparison.gennetyDesc")}
          </p>
        </div>

        {/* Right — Competitors */}
        <div className="flex flex-col items-center text-center">
          <h3 className="font-sans font-bold text-2xl tracking-tight text-stone-900 mb-8">
            {t("comparison.competitors")}
          </h3>

          {/* Crumpled paper style container */}
          <div className="relative w-full max-w-sm">
            <div className="rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 border border-white/5 p-6 relative overflow-hidden shadow-2xl shadow-black/40">
              {/* Graph paper lines */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative flex flex-wrap justify-center gap-3 md:gap-4">
                {/* Tinder */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden border border-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/logos/tinder.svg"
                      alt="Tinder"
                      className="w-10 h-10"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                    99+
                  </span>
                </div>

                {/* Badoo */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden border border-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/logos/badoo.svg"
                      alt="Badoo"
                      className="w-full h-full"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                    99+
                  </span>
                </div>
              </div>

              {/* Unread counter */}
              <p className="relative mt-5 text-red-400 font-mono text-sm font-bold text-center">
                {t("comparison.unread")}
              </p>
            </div>
          </div>

          <p className="text-stone-600 font-medium text-sm mt-6 max-w-xs">
            {t("comparison.competitorsDesc")}
          </p>
        </div>
      </div>
    </section>
  );
}
