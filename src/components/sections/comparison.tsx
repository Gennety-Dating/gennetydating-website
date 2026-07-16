"use client";

import { Heading } from "@/components/ui/typography";
import { MessageBubble } from "@/components/ui/message-bubble";
import { Bell } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Comparison() {
  const { t } = useLanguage();

  return (
    <section className="py-[120px] px-4 md:px-10">
      <Heading as="h2" className="text-center mb-[95px]">
        {t("comparison.title")}
      </Heading>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {/* Left — Gennety */}
        <div className="flex flex-col items-center text-center">
          <h3 className="font-sans font-bold text-2xl tracking-tight text-heading-white mb-8">
            {t("comparison.gennety")}
          </h3>

          <div className="relative w-full max-w-lg">
            {/* Telegram Floating Icon */}
            <div className="absolute top-[45px] left-1/2 -translate-x-1/2 z-20 w-[84px] h-[84px]">
              <img
                src="/images/logos/telegram.png"
                alt="Telegram"
                className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
              />
              <span 
                className="absolute -top-[20px] -right-[20px] bg-red-500 text-white text-xl md:text-2xl font-semibold w-[40px] h-[40px] rounded-full flex items-center justify-center leading-none shadow-lg z-10"
                style={{ fontFamily: "ui-rounded, 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
              >
                <span className="relative -top-[1px]">1</span>
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/gennety-notification.jpg"
              alt="Gennety Notification"
              className="w-full h-[200px] object-cover object-bottom rounded-2xl shadow-lg relative z-10"
            />
          </div>

          <p className="text-gray-400 text-sm mt-6 max-w-xs">
            {t("comparison.gennetyDesc")}
          </p>
        </div>

        {/* Right — Competitors */}
        <div className="flex flex-col items-center text-center">
          <h3 className="font-sans font-bold text-2xl tracking-tight text-heading-white mb-8">
            {t("comparison.competitors")}
          </h3>

          {/* Crumpled paper style container */}
          <div className="relative w-full max-w-lg">
            <div className="rounded-xl bg-gradient-to-br from-[#262423] to-[#1a1817] border border-white/10 p-6 relative overflow-hidden min-h-[200px] py-6 flex flex-col justify-center">
              {/* Graph paper lines */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative flex flex-wrap justify-center items-center gap-6 md:gap-8 pt-3">
                {/* Tinder */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/logos/tinder.png"
                      alt="Tinder"
                      className="w-full h-full scale-[1.05]"
                    />
                  </div>
                  <span 
                    className="absolute -top-[15px] left-[42%] bg-red-500 text-white text-base md:text-lg font-semibold px-2.5 rounded-full shadow-lg flex items-center justify-center min-w-[62px] h-[32px] z-10"
                    style={{ fontFamily: "ui-rounded, 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                  >
                    {t("comparison.tinderMessages")}
                  </span>
                </div>

                {/* Badoo */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/logos/badoo.svg"
                      alt="Badoo"
                      className="w-full h-full"
                    />
                  </div>
                  <span 
                    className="absolute -top-[15px] left-[42%] bg-red-500 text-white text-base md:text-lg font-semibold px-2.5 rounded-full shadow-lg flex items-center justify-center min-w-[62px] h-[32px] z-10"
                    style={{ fontFamily: "ui-rounded, 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                  >
                    {t("comparison.badooMessages")}
                  </span>
                </div>
              </div>

              {/* Unread counter */}
              <p className="relative mt-5 text-red-400 font-sans font-bold text-lg tracking-tight text-center">
                {t("comparison.unread")}
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-6 max-w-xs">
            {t("comparison.competitorsDesc")}
          </p>
        </div>
      </div>
    </section>
  );
}
