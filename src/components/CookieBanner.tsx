"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useCookieConsent, type ConsentChoices } from "@/hooks/useCookieConsent";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { OPEN_CONSENT_PREFERENCES_EVENT } from "@/lib/consent-cache";

export function CookieBanner() {
  const pathname = usePathname();
  const isThesisPage = pathname === "/thesis";
  const isPlacesPage = pathname === "/places";
  const isAppPage = pathname === "/app" || pathname?.startsWith("/app/");

  if (isAppPage) return null;

  const { hasConsented, currentConsents, isLoading, submitConsent } = useCookieConsent();
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();
  const isOverDarkBg = true;

  useEffect(() => {
    const openPreferences = () => {
      setChoices(currentConsents ?? {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false,
      });
      setShowCustomize(true);
      setPreferencesOpen(true);
    };

    window.addEventListener(OPEN_CONSENT_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_CONSENT_PREFERENCES_EVENT, openPreferences);
  }, [currentConsents]);

  // Focus trap for customize modal
  useEffect(() => {
    if (!showCustomize) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"]), input'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowCustomize(false);
        setPreferencesOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showCustomize]);

  const handleAcceptAll = useCallback(() => {
    setShowCustomize(false);
    setPreferencesOpen(false);
    submitConsent("accepted", {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  }, [submitConsent]);

  const handleRejectNonEssential = useCallback(() => {
    setShowCustomize(false);
    setPreferencesOpen(false);
    submitConsent("rejected", {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  }, [submitConsent]);

  const handleSaveCustom = useCallback(() => {
    const hasAny = choices.analytics || choices.marketing || choices.functional;
    const allTrue = choices.analytics && choices.marketing && choices.functional;
    const action = allTrue ? "accepted" : hasAny ? "partial" : "rejected";
    submitConsent(action, choices);
    setShowCustomize(false);
    setPreferencesOpen(false);
  }, [choices, submitConsent]);

  const showBanner = !isLoading && (!hasConsented || preferencesOpen);

  return (
    <>
      {showBanner && showCustomize && (
        <div
          aria-hidden
          className={cn(
            "cookie-spotify-cover",
            isOverDarkBg ? "cookie-spotify-cover-dark" : "cookie-spotify-cover-light"
          )}
        />
      )}
      {showBanner && (
        <div
          ref={dialogRef}
          role={showCustomize ? "dialog" : "region"}
          aria-modal={showCustomize ? "true" : undefined}
          aria-label={t("cookie.banner_title")}
          className="fixed bottom-[22px] left-3 right-3 z-[101] md:bottom-5 md:left-6 md:right-6"
        >
          <div
            className={cn(
              "cookie-liquid-shell mx-auto max-w-screen-2xl overflow-hidden rounded-[24px] px-3 py-3 md:rounded-[28px] md:px-5 md:py-4 transition-all duration-300",
              isOverDarkBg ? "cookie-liquid-shell-dark" : "cookie-liquid-shell-light"
            )}
          >
            {showCustomize && (
              <div className="mb-3 grid gap-2.5 md:grid-cols-4">
                <ToggleRow
                  label={t("cookie.cat_necessary")}
                  description={t("cookie.cat_necessary_desc")}
                  checked={true}
                  disabled
                  isDark={isOverDarkBg}
                />
                <ToggleRow
                  label={t("cookie.cat_analytics")}
                  description={t("cookie.cat_analytics_desc")}
                  checked={choices.analytics}
                  onChange={(v) => setChoices((c) => ({ ...c, analytics: v }))}
                  isDark={isOverDarkBg}
                />
                <ToggleRow
                  label={t("cookie.cat_marketing")}
                  description={t("cookie.cat_marketing_desc")}
                  checked={choices.marketing}
                  onChange={(v) => setChoices((c) => ({ ...c, marketing: v }))}
                  isDark={isOverDarkBg}
                />
                <ToggleRow
                  label={t("cookie.cat_functional")}
                  description={t("cookie.cat_functional_desc")}
                  checked={choices.functional}
                  onChange={(v) => setChoices((c) => ({ ...c, functional: v }))}
                  isDark={isOverDarkBg}
                />
              </div>
            )}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className={cn(
                "min-w-0 flex-1 text-[12px] leading-5 md:text-sm md:leading-6 transition-colors duration-300",
                isOverDarkBg ? "text-gray-300" : "text-neutral-700"
              )}>
                {t("cookie.banner_text")}
              </p>

              <div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-2 md:w-auto">
                <button
                  ref={firstFocusRef}
                  type="button"
                  onClick={() => {
                    if (preferencesOpen && showCustomize) {
                      setShowCustomize(false);
                      setPreferencesOpen(false);
                      return;
                    }
                    setShowCustomize((v) => !v);
                  }}
                  className={cn(
                    "cookie-liquid-button w-full md:w-auto transition-all duration-300",
                    isOverDarkBg
                      ? "cookie-liquid-button-dark text-white/60 hover:text-white"
                      : "cookie-liquid-button-light text-neutral-600 hover:text-black"
                  )}
                >
                  {showCustomize ? t("cookie.cancel") : t("cookie.customize")}
                </button>
                <button
                  type="button"
                  onClick={showCustomize ? handleSaveCustom : handleRejectNonEssential}
                  className={cn(
                    "cookie-liquid-button w-full md:w-auto transition-all duration-300",
                    isOverDarkBg
                      ? "cookie-liquid-button-dark text-white/80 hover:bg-white/10 hover:text-white"
                      : "cookie-liquid-button-light text-neutral-800 hover:bg-black/[0.06] hover:text-black"
                  )}
                >
                  {showCustomize ? t("cookie.save_preferences") : t("cookie.reject_non_essential")}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="cookie-liquid-primary w-full md:w-auto"
                >
                  {t("cookie.accept_all")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isThesisPage && !isPlacesPage && !isAppPage && currentConsents?.functional && !showBanner && (
        <SpotifyWidget />
      )}
    </>
  );
}

function SpotifyWidget() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="fixed bottom-[104px] right-6 z-[99] w-[320px]">
      <iframe
        title="Spotify music player"
        data-testid="embed-iframe"
        style={{ borderRadius: 12, display: "block" }}
        src="https://open.spotify.com/embed/track/7BKLCZ1jbUBVqRi2FVlTVw?utm_source=generator"
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        scrolling="no"
      />
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  disabled,
  onChange,
  isDark,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  isDark?: boolean;
}) {
  return (
    <label className={cn(
      "cursor-pointer",
      isDark ? "cookie-consent-tile-dark" : "cookie-consent-tile-light"
    )}>
      <div className="shrink-0 pt-0.5">
        <button
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) onChange?.(!checked);
          }}
          className={cn(
            "relative h-6 w-10 rounded-full transition-all duration-200 cursor-pointer",
            checked ? "bg-magenta shadow-[0_0_18px_rgba(139,37,59,0.26)]" : isDark ? "bg-white/[0.12]" : "bg-black/[0.12]",
            disabled ? "cursor-not-allowed opacity-[0.55]" : isDark ? "hover:bg-white/[0.18]" : "hover:bg-black/[0.18]"
          )}
        >
          <span
            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              checked ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="min-w-0">
        <span className={cn(
          "block text-sm font-semibold transition-colors duration-300",
          isDark ? "text-white" : "text-neutral-900"
        )}>{label}</span>
        <p className={cn(
          "mt-1 text-xs leading-5 transition-colors duration-300",
          isDark ? "text-white/60" : "text-neutral-500"
        )}>{description}</p>
      </div>
    </label>
  );
}
