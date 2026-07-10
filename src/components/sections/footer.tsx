"use client";

import { CONTACT_EMAIL, TELEGRAM_BOT_URL, TWITTER_URL } from "@/lib/data";
// 🟠 BETA-ONLY — point the footer's "message us" link at the beta bot in beta
// mode. Remove this import + the conditional below on rollback (BETA_WEBSITE.md).
import { BETA_MODE, BETA_BOT_URL } from "@/config/beta";
import { useLanguage } from "@/lib/language-context";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
  const { t } = useLanguage();
  const { withdrawConsent } = useCookieConsent();

  return (
    <footer className="bg-transparent px-6 md:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          {/* Large wordmark */}
          <div className="flex items-center">
            <Image
              src="/images/logo-wordmark.png"
              alt="Gennety"
              width={320}
              height={80}
              className={cn(
                "h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-300",
                theme === "dark" ? "" : "brightness-0"
              )}
            />
          </div>

          {/* App Store & Google Play Block */}
          <div className="flex flex-wrap items-center gap-4.5">
            {/* App Store Badge */}
            <div className="select-none">
              <div className="flex items-center gap-3.5 bg-black/75 hover:bg-black/85 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-3 transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.5-1.34.05-1.77-.76-3.29-.76-1.53 0-2 .73-3.27.78-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.44 1.44-1.38 2.82M15.97 4.17c.66-.81 1.1-1.9 1-3.17-1 .04-2.1.6-2.76 1.38-.56.66-1.05 1.76-.9 3.01 1.05.08 2.06-.51 2.66-1.22z"/>
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-[9px] uppercase tracking-wider text-white/60 font-medium">Download on the</span>
                  <span className="block text-base font-semibold text-white">App Store</span>
                </div>
              </div>
            </div>

            {/* Google Play Badge */}
            <div className="select-none">
              <div className="flex items-center gap-3.5 bg-black/75 hover:bg-black/85 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-3 transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 2.086c-.221.22-.35.55-.35.952v17.924c0 .401.129.731.35.951l.06.06L13.74 11.96v-.12L3.67 1.966l-.06.12z" fill="#00FFFF" opacity="0.8"/>
                  <path d="M17.09 8.618l-3.35 3.34v.12l3.35 3.34.07-.04 3.96-2.25c1.13-.64 1.13-1.69 0-2.33l-3.96-2.25-.07.07z" fill="#FF00FF" />
                  <path d="M13.74 11.96L3.67 22.016c.37.39.97.44 1.66.05l11.76-6.68-3.35-3.42z" fill="#FF5555" />
                  <path d="M13.74 11.84l3.35-3.42-11.76-6.68c-.69-.39-1.29-.34-1.66.05l10.07 10.05z" fill="#FFAA00" />
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-[9px] uppercase tracking-wider text-white/60 font-medium">Get it on</span>
                  <span className="block text-base font-semibold text-white">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div className={cn(
          "flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t transition-colors duration-300",
          theme === "dark" ? "border-white/10" : "border-[#111111]/10"
        )}>
          <div className={cn(
            "flex flex-wrap gap-6 text-sm transition-colors duration-300",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            <a
              /* 🟠 BETA-ONLY: beta bot in beta mode, prod bot otherwise */
              href={BETA_MODE ? BETA_BOT_URL : TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 hover:underline underline-offset-4 transition-colors",
                theme === "dark" ? "hover:text-white" : "hover:text-black"
              )}
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
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center hover:underline underline-offset-4 transition-colors",
                theme === "dark" ? "hover:text-white" : "hover:text-black"
              )}
              aria-label="X (Twitter)"
            >
              <svg className="w-4 h-4 shrink-0 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={cn(
                "hover:underline underline-offset-4 transition-colors",
                theme === "dark" ? "hover:text-white" : "hover:text-black"
              )}
            >
              {t("footer.contact")}
            </a>
            <Link href="/thesis" className={cn(
              "hover:underline underline-offset-4 transition-colors",
              theme === "dark" ? "hover:text-white" : "hover:text-black"
            )}>
              {t("footer.thesis")}
            </Link>
            <Link href="/terms" className={cn(
              "hover:underline underline-offset-4 transition-colors",
              theme === "dark" ? "hover:text-white" : "hover:text-black"
            )}>
              {t("footer.terms")}
            </Link>
            <Link href="/privacy" className={cn(
              "hover:underline underline-offset-4 transition-colors",
              theme === "dark" ? "hover:text-white" : "hover:text-black"
            )}>
              {t("footer.privacy")}
            </Link>
            <button
              onClick={withdrawConsent}
              className={cn(
                "hover:underline underline-offset-4 transition-colors",
                theme === "dark" ? "hover:text-white" : "hover:text-black"
              )}
            >
              {t("footer.cookie_preferences")}
            </button>
          </div>

          <p className={cn(
            "text-sm transition-colors duration-300",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            &copy; {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
