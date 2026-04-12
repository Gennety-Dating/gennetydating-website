"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useCookieConsent, type ConsentChoices } from "@/hooks/useCookieConsent";
import { useLanguage } from "@/lib/language-context";

export function CookieBanner() {
  const { hasConsented, isLoading, submitConsent } = useCookieConsent();
  const [showCustomize, setShowCustomize] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

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
    submitConsent("accepted", {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  }, [submitConsent]);

  const handleRejectNonEssential = useCallback(() => {
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

  if (isLoading || hasConsented) return null;

  return (
    <>
      {/* Cookie consent — bottom sheet on phone, thin bar on md+ */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("cookie.banner_title")}
        className="fixed bottom-0 left-0 right-0 z-[100]"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* Expandable customize panel */}
        {showCustomize && (
          <div className="glass md:bg-midnight md:backdrop-blur-none border-t border-x border-glass-border rounded-t-xl mx-0 md:mx-8 p-4 mb-0 space-y-3">
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

        {/* Banner body */}
        <div className="glass md:bg-midnight md:backdrop-blur-none border-t border-glass-border px-4 md:px-8 py-4 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 max-w-screen-2xl mx-auto">
            {/* Text */}
            <p className="text-xs md:text-sm text-gray-400">
              {t("cookie.banner_text")}
            </p>

            {/* Buttons — vertical stack on phone, horizontal on md+ */}
            <div className="flex flex-col min-[480px]:flex-row md:flex-row items-stretch min-[480px]:items-center gap-2 shrink-0">
              <button
                onClick={() => setShowCustomize((v) => !v)}
                className="px-4 py-3 md:py-1.5 rounded-full border border-white/20 text-gray-400 text-xs md:text-sm font-medium hover:text-white hover:border-white/40 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
              >
                {showCustomize ? t("cookie.cancel") : t("cookie.customize")}
              </button>
              <button
                onClick={showCustomize ? handleSaveCustom : handleRejectNonEssential}
                className="px-4 py-3 md:py-1.5 rounded-full border border-white/20 text-white text-xs md:text-sm font-medium hover:border-white/40 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
              >
                {showCustomize ? t("cookie.save_preferences") : t("cookie.reject_non_essential")}
              </button>
              <button
                ref={firstFocusRef}
                onClick={handleAcceptAll}
                className="px-4 py-3 md:py-1.5 rounded-full bg-magenta text-white text-xs md:text-sm font-medium hover:shadow-neon transition-shadow min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
              >
                {t("cookie.accept_all")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spotify widget — hidden on phones to avoid covering content */}
      <div className="hidden md:block fixed bottom-16 right-6 z-[99] w-[320px]">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/track/7BKLCZ1jbUBVqRi2FVlTVw?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </>
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
    <div className="flex items-start gap-3">
      {/* Touch-target wrapper: 44px minimum */}
      <div className="pt-0.5 flex-shrink-0">
        <button
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) onChange?.(!checked);
          }}
          className={[
            "relative w-10 h-6 rounded-full transition-colors",
            "min-h-[44px] min-w-[44px] flex items-center justify-center",
            checked ? "bg-magenta" : "bg-white/10",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-midnight",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 rounded-full bg-white transition-transform",
              checked ? "translate-x-4" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>
      <div>
        <span className="text-sm font-medium text-white">{label}</span>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
