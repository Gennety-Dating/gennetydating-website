"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useCookieConsent, type ConsentChoices } from "@/hooks/useCookieConsent";
import { useLanguage } from "@/lib/language-context";

export function CookieBanner() {
  const { hasConsented, isLoading, submitConsent } = useCookieConsent();
  const [showCustomize, setShowCustomize] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const syncRegistrationModalState = () => {
      const isOpen = document.body.dataset.registrationModalOpen === "true";
      setRegistrationModalOpen(isOpen);
      if (isOpen) setShowCustomize(false);
    };

    syncRegistrationModalState();
    window.addEventListener("gennety:registration-modal", syncRegistrationModalState);
    return () => {
      window.removeEventListener("gennety:registration-modal", syncRegistrationModalState);
    };
  }, []);

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
    submitConsent("accepted", {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  }, [submitConsent]);

  const handleRejectNonEssential = useCallback(() => {
    setShowCustomize(false);
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
  }, [choices, submitConsent]);

  const showBanner = !isLoading && !hasConsented;

  if (registrationModalOpen) return null;

  return (
    <>
      {showBanner && showCustomize && <div aria-hidden className="cookie-spotify-cover" />}

      {showBanner && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("cookie.banner_title")}
          className="fixed bottom-3 left-3 right-3 z-[101] md:bottom-5 md:left-6 md:right-6"
        >
          <div className="cookie-liquid-shell mx-auto max-w-screen-2xl overflow-hidden rounded-[24px] px-3 py-3 md:rounded-[28px] md:px-5 md:py-4">
            {showCustomize && (
              <div className="mb-3 grid gap-2.5 md:grid-cols-4">
                <ToggleRow
                  label={t("cookie.cat_necessary")}
                  description={t("cookie.cat_necessary_desc")}
                  checked={true}
                  disabled
                />
                <ToggleRow
                  label={t("cookie.cat_analytics")}
                  description={t("cookie.cat_analytics_desc")}
                  checked={choices.analytics}
                  onChange={(v) => setChoices((c) => ({ ...c, analytics: v }))}
                />
                <ToggleRow
                  label={t("cookie.cat_marketing")}
                  description={t("cookie.cat_marketing_desc")}
                  checked={choices.marketing}
                  onChange={(v) => setChoices((c) => ({ ...c, marketing: v }))}
                />
                <ToggleRow
                  label={t("cookie.cat_functional")}
                  description={t("cookie.cat_functional_desc")}
                  checked={choices.functional}
                  onChange={(v) => setChoices((c) => ({ ...c, functional: v }))}
                />
              </div>
            )}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="min-w-0 flex-1 text-[12px] leading-5 text-white/[0.68] md:text-sm md:leading-6">
                {t("cookie.banner_text")}
              </p>

              <div className="grid grid-cols-3 gap-2 md:flex md:items-center md:gap-2">
                <button
                  ref={firstFocusRef}
                  type="button"
                  onClick={() => setShowCustomize((v) => !v)}
                  className="cookie-liquid-button text-white/[0.68] hover:text-white"
                >
                  {showCustomize ? t("cookie.cancel") : t("cookie.customize")}
                </button>
                <button
                  type="button"
                  onClick={showCustomize ? handleSaveCustom : handleRejectNonEssential}
                  className="cookie-liquid-button text-white hover:bg-white/[0.13]"
                >
                  {showCustomize ? t("cookie.save_preferences") : t("cookie.reject_non_essential")}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="cookie-liquid-primary"
                >
                  {t("cookie.accept_all")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SpotifyWidget />
    </>
  );
}

function SpotifyWidget() {
  return (
    <div className="fixed bottom-[104px] right-4 md:right-6 z-[99] w-[220px] md:w-[260px]">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: 12 }}
        src="https://open.spotify.com/embed/track/7BKLCZ1jbUBVqRi2FVlTVw?utm_source=generator"
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
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
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label className="cookie-consent-tile cursor-pointer">
      <div className="shrink-0 pt-0.5">
        <button
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) onChange?.(!checked);
          }}
          className={`relative h-6 w-10 rounded-full transition-all duration-200 ${
            checked ? "bg-magenta shadow-[0_0_18px_rgba(208,173,252,0.26)]" : "bg-white/[0.14]"
          } ${disabled ? "cursor-not-allowed opacity-[0.55]" : "hover:bg-white/[0.20]"}`}
        >
          <span
            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              checked ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="min-w-0">
        <span className="block text-sm font-semibold text-white">{label}</span>
        <p className="mt-1 text-xs leading-5 text-white/[0.48]">{description}</p>
      </div>
    </label>
  );
}
