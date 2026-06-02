"use client";

import { MessageBubble } from "@/components/ui/message-bubble";
import { CONTACT_EMAIL, TELEGRAM_BOT_URL } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function Footer() {
  const { t } = useLanguage();
  const { withdrawConsent } = useCookieConsent();

  return (
    <footer className="bg-midnight px-6 md:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Top footer row: slogan bubble on left, coming soon app badge on right */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
          {/* Left: iMessage slogan */}
          <div className="max-w-md w-full">
            <MessageBubble variant="blue" tail="left">
              <p className="text-base md:text-lg font-medium">
                {t("footer.slogan")}
              </p>
            </MessageBubble>
          </div>

          {/* Right: App Store & Google Play "Soon" Block */}
          <div className="flex flex-col items-start md:items-end justify-center">
            <div className="flex flex-wrap items-center gap-4.5">
              {/* App Store Badge */}
              <div className="relative select-none">
                <div className="flex items-center gap-3.5 bg-black/60 border border-white/10 rounded-2xl px-6 py-3 opacity-60">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.5-1.34.05-1.77-.76-3.29-.76-1.53 0-2 .73-3.27.78-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.44 1.44-1.38 2.82M15.97 4.17c.66-.81 1.1-1.9 1-3.17-1 .04-2.1.6-2.76 1.38-.56.66-1.05 1.76-.9 3.01 1.05.08 2.06-.51 2.66-1.22z"/>
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-medium">Download on the</span>
                    <span className="block text-base font-semibold text-white">App Store</span>
                  </div>
                </div>
                {/* Soon sticker overlay */}
                <span className="absolute -top-2.5 -right-3.5 z-10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-black bg-magenta rounded-md rotate-12 uppercase shadow-[0_0_12px_rgba(255,0,255,0.9)] border border-white/20">
                  soon
                </span>
              </div>

              {/* Google Play Badge */}
              <div className="relative select-none">
                <div className="flex items-center gap-3.5 bg-black/60 border border-white/10 rounded-2xl px-6 py-3 opacity-60">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 2.086c-.221.22-.35.55-.35.952v17.924c0 .401.129.731.35.951l.06.06L13.74 11.96v-.12L3.67 1.966l-.06.12z" fill="#00FFFF" opacity="0.8"/>
                    <path d="M17.09 8.618l-3.35 3.34v.12l3.35 3.34.07-.04 3.96-2.25c1.13-.64 1.13-1.69 0-2.33l-3.96-2.25-.07.07z" fill="#FF00FF" />
                    <path d="M13.74 11.96L3.67 22.016c.37.39.97.44 1.66.05l11.76-6.68-3.35-3.42z" fill="#FF5555" />
                    <path d="M13.74 11.84l3.35-3.42-11.76-6.68c-.69-.39-1.29-.34-1.66.05l10.07 10.05z" fill="#FFAA00" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-medium">Get it on</span>
                    <span className="block text-base font-semibold text-white">Google Play</span>
                  </div>
                </div>
                {/* Soon sticker overlay */}
                <span className="absolute -top-2.5 -right-3.5 z-10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-black bg-magenta rounded-md rotate-12 uppercase shadow-[0_0_12px_rgba(255,0,255,0.9)] border border-white/20">
                  soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Large wordmark */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-12">
          Gennety
        </h2>

        {/* Bottom links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/telegram.svg"
                alt=""
                className="w-4 h-4"
                aria-hidden="true"
              />
              {t("footer.telegram")}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              {t("footer.contact")}
            </a>
            <a href="/terms" className="hover:text-white hover:underline underline-offset-4 transition-colors">
              {t("footer.terms")}
            </a>
            <a href="/privacy" className="hover:text-white hover:underline underline-offset-4 transition-colors">
              {t("footer.privacy")}
            </a>
            <button
              onClick={withdrawConsent}
              className="hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              {t("footer.cookie_preferences")}
            </button>
          </div>

          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
