"use client";

import { CONTACT_EMAIL, TELEGRAM_BOT_URL, TWITTER_URL, INSTAGRAM_URL } from "@/lib/site-config";
import { useLanguage } from "@/lib/language-context";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
  const { t } = useLanguage();
  const { openPreferences } = useCookieConsent();
  const pathname = usePathname();
  const isMainPage = pathname === "/";

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
            <div className="relative select-none">
              <div className="flex items-center gap-3.5 bg-black/75 hover:bg-black/85 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-3 transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.5-1.34.05-1.77-.76-3.29-.76-1.53 0-2 .73-3.27.78-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.44 1.44-1.38 2.82M15.97 4.17c.66-.81 1.1-1.9 1-3.17-1 .04-2.1.6-2.76 1.38-.56.66-1.05 1.76-.9 3.01 1.05.08 2.06-.51 2.66-1.22z"/>
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-[9px] uppercase tracking-wider text-white/60 font-medium">Download on the</span>
                  <span className="block text-base font-semibold text-white">App Store</span>
                </div>
              </div>
              <span className={cn(
                "absolute -top-2.5 -right-2 text-[9.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-[4px] pointer-events-none rotate-[14deg]",
                isMainPage
                  ? "bg-[#8B253B] text-white border border-white/10 shadow-[0_2px_8px_rgba(139,37,59,0.5)]"
                  : "bg-white text-black border border-black/10 shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
              )}>
                Soon
              </span>
            </div>

            {/* Google Play Badge */}
            <div className="relative select-none">
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
              <span className={cn(
                "absolute -top-2.5 -right-2 text-[9.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-[4px] pointer-events-none rotate-[14deg]",
                isMainPage
                  ? "bg-[#8B253B] text-white border border-white/10 shadow-[0_2px_8px_rgba(139,37,59,0.5)]"
                  : "bg-white text-black border border-black/10 shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
              )}>
                Soon
              </span>
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div className={cn(
          "flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t transition-colors duration-300",
          theme === "dark" ? "border-white/10" : "border-[#111111]/10"
        )}>
          <div className={cn(
            "flex flex-wrap items-center gap-x-6 gap-y-2 text-sm transition-colors duration-300 [&_a]:min-h-11 [&_button]:min-h-11",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            <a
              href={TELEGRAM_BOT_URL}
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
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center hover:underline underline-offset-4 transition-colors",
                theme === "dark" ? "hover:text-white" : "hover:text-black"
              )}
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 shrink-0 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={cn(
                "inline-flex items-center hover:underline underline-offset-4 transition-colors",
                theme === "dark" ? "hover:text-white" : "hover:text-black"
              )}
            >
              {t("footer.contact")}
            </a>
            <Link href="/thesis" className={cn(
              "inline-flex items-center hover:underline underline-offset-4 transition-colors",
              theme === "dark" ? "hover:text-white" : "hover:text-black"
            )}>
              {t("footer.thesis")}
            </Link>
            <Link href="/terms" className={cn(
              "inline-flex items-center hover:underline underline-offset-4 transition-colors",
              theme === "dark" ? "hover:text-white" : "hover:text-black"
            )}>
              {t("footer.terms")}
            </Link>
            <Link href="/privacy" className={cn(
              "inline-flex items-center hover:underline underline-offset-4 transition-colors",
              theme === "dark" ? "hover:text-white" : "hover:text-black"
            )}>
              {t("footer.privacy")}
            </Link>
            <button
              onClick={openPreferences}
              className={cn(
                "inline-flex items-center hover:underline underline-offset-4 transition-colors",
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
