"use client";

import { useState, useRef, useEffect } from "react";
import { CONTACT_EMAIL, TIKTOK_URL, TWITTER_URL, INSTAGRAM_URL } from "@/lib/site-config";
import { useLanguage } from "@/lib/language-context";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Shield, ChevronUp, FileText, Cookie, SlidersHorizontal } from "lucide-react";

interface FooterIconProps {
  href: string;
  label: string;
  isExternal?: boolean;
  theme: "light" | "dark";
  children: React.ReactNode;
}

function FooterIconLink({
  href,
  label,
  isExternal = false,
  theme,
  children,
}: FooterIconProps) {
  const isDark = theme === "dark";
  const commonClasses = cn(
    "group relative inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-all duration-200 cursor-pointer",
    isDark
      ? "text-gray-400 hover:text-white hover:bg-white/[0.08]"
      : "text-gray-600 hover:text-black hover:bg-black/[0.06]"
  );

  const tooltip = (
    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0e0e0e]/95 text-white text-[11px] font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-200 translate-y-1 group-hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.6)] border border-white/10 z-30">
      {label}
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        aria-label={label}
      >
        {children}
        {tooltip}
      </a>
    );
  }

  return (
    <Link href={href} className={commonClasses} aria-label={label}>
      {children}
      {tooltip}
    </Link>
  );
}

export function Footer({ 
  theme = "light",
  showAppBadges = true,
}: { 
  theme?: "light" | "dark";
  showAppBadges?: boolean;
}) {
  const { t } = useLanguage();
  const { openPreferences } = useCookieConsent();
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const displayAppBadges = showAppBadges && pathname !== "/merch";

  const [legalOpen, setLegalOpen] = useState(false);
  const legalRef = useRef<HTMLDivElement>(null);

  // Close legal popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (legalRef.current && !legalRef.current.contains(event.target as Node)) {
        setLegalOpen(false);
      }
    }
    if (legalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [legalOpen]);

  const isDark = theme === "dark";

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
          {displayAppBadges && (
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
          )}
        </div>

        {/* Bottom Bar: Sleek Icon Dock + Legal Popover & Copyright */}
        <div className={cn(
          "flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t transition-colors duration-300",
          theme === "dark" ? "border-white/10" : "border-[#111111]/10"
        )}>
          {/* Icons & Legal Cluster */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
            {/* Socials Group */}
            <FooterIconLink href={TIKTOK_URL} label="TikTok" isExternal theme={theme}>
              <svg className="w-[19px] h-[19px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.9 2.852 2.895 2.895 0 0 1-2.895-2.895 2.895 2.895 0 0 1 2.895-2.895c.348 0 .68.06.988.17v-3.535a6.386 6.386 0 0 0-.988-.078A6.335 6.335 0 0 0 3 15.627 6.335 6.335 0 0 0 9.335 22a6.335 6.335 0 0 0 6.335-6.335V9a8.16 8.16 0 0 0 4.77 1.524V7.042a4.848 4.848 0 0 1-.851-.356z"/>
              </svg>
            </FooterIconLink>

            <FooterIconLink href={TWITTER_URL} label="X (Twitter)" isExternal theme={theme}>
              <svg className="w-[19px] h-[19px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </FooterIconLink>

            <FooterIconLink href={INSTAGRAM_URL} label="Instagram" isExternal theme={theme}>
              <svg className="w-[19px] h-[19px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </FooterIconLink>

            <FooterIconLink href={`mailto:${CONTACT_EMAIL}`} label={t("footer.contact")} isExternal theme={theme}>
              <svg className="w-[19px] h-[19px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="3" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </FooterIconLink>

            {/* Subtle Divider */}
            <div className={cn("h-4 w-px mx-1 sm:mx-1.5", isDark ? "bg-white/15" : "bg-black/15")} aria-hidden="true" />

            {/* Pages Group (Thesis, Merch, Careers) */}
            <FooterIconLink href="/thesis" label={t("footer.thesis")} theme={theme}>
              <svg className="w-[19px] h-[19px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M8 7h8" />
                <path d="M8 11h6" />
                <path d="M8 15h4" />
              </svg>
            </FooterIconLink>

            <FooterIconLink href="/merch" label={t("footer.merch")} theme={theme}>
              <svg className="w-[19px] h-[19px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </FooterIconLink>

            <FooterIconLink href="/careers" label={t("footer.careers")} theme={theme}>
              <svg className="w-[19px] h-[19px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="14" x="2" y="7" rx="3" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <path d="M12 12v3" />
              </svg>
            </FooterIconLink>

          </div>

          {/* Legal & Copyright Column */}
          <div className="flex flex-col items-start md:items-end gap-2.5">
            {/* Legal Dropdown Button */}
            <div className="relative" ref={legalRef}>
              <button
                type="button"
                onClick={() => setLegalOpen((prev) => !prev)}
                className={cn(
                  "group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none",
                  isDark
                    ? "bg-white/[0.05] hover:bg-white/[0.12] text-gray-300 hover:text-white border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                    : "bg-black/[0.05] hover:bg-black/[0.1] text-gray-700 hover:text-black border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
                  legalOpen && (isDark ? "bg-white/[0.15] text-white border-white/25" : "bg-black/[0.15] text-black border-black/25")
                )}
                aria-expanded={legalOpen}
                aria-label="Legal documents menu"
              >
                <Shield className="w-3.5 h-3.5 opacity-80" />
                <span>{t("footer.legal")}</span>
                <ChevronUp className={cn("w-3.5 h-3.5 transition-transform duration-200 opacity-70", legalOpen ? "rotate-180" : "")} />
              </button>

              {/* Legal Popover Menu */}
              {legalOpen && (
                <div 
                  className={cn(
                    "absolute bottom-full mb-2.5 left-0 md:left-auto md:right-0 z-50 min-w-[215px] p-1.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] border backdrop-blur-2xl animate-[fadeIn_0.15s_ease-out]",
                    isDark
                      ? "bg-[#0d0d0d]/95 border-white/15 text-white"
                      : "bg-[#f9f9f9]/95 border-black/15 text-black shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                  )}
                >
                  <Link
                    href="/terms"
                    onClick={() => setLegalOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                      isDark ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-700 hover:text-black hover:bg-black/5"
                    )}
                  >
                    <FileText className="w-3.5 h-3.5 opacity-60" />
                    <span>{t("footer.terms")}</span>
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={() => setLegalOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                      isDark ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-700 hover:text-black hover:bg-black/5"
                    )}
                  >
                    <Shield className="w-3.5 h-3.5 opacity-60" />
                    <span>{t("footer.privacy")}</span>
                  </Link>
                  <Link
                    href="/cookies"
                    onClick={() => setLegalOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                      isDark ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-700 hover:text-black hover:bg-black/5"
                    )}
                  >
                    <Cookie className="w-3.5 h-3.5 opacity-60" />
                    <span>{t("footer.cookies")}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setLegalOpen(false);
                      openPreferences();
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer",
                      isDark ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-700 hover:text-black hover:bg-black/5"
                    )}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 opacity-60" />
                    <span>{t("footer.cookie_preferences")}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Copyright */}
            <p className={cn(
              "text-xs md:text-sm transition-colors duration-300 shrink-0",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              &copy; {new Date().getFullYear()} {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
