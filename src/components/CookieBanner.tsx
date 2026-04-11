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
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("cookie.banner_title")}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] w-[360px] max-w-[calc(100vw-2rem)]"
    >
      <div className="glass rounded-2xl p-6 shadow-lg border border-glass-border">
        <p className="text-sm text-gray-400 mb-4">
          {t("cookie.banner_text")}
        </p>

        {/* Expandable customize section */}
        {showCustomize && (
          <div className="space-y-3 mb-4 pb-4 border-b border-white/10">
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

        {/* Top row: two buttons side by side */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setShowCustomize((v) => !v)}
            className="flex-1 px-4 py-2 rounded-full border border-white/20 text-gray-400 text-sm font-medium hover:text-white hover:border-white/40 transition-colors"
          >
            {showCustomize ? t("cookie.cancel") : t("cookie.customize")}
          </button>
          <button
            onClick={showCustomize ? handleSaveCustom : handleRejectNonEssential}
            className="flex-1 px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-colors"
          >
            {showCustomize ? t("cookie.save_preferences") : t("cookie.reject_non_essential")}
          </button>
        </div>

        {/* Bottom: full-width Accept All */}
        <button
          onClick={handleAcceptAll}
          className="w-full px-5 py-2 rounded-full bg-magenta text-white text-sm font-medium hover:shadow-neon transition-shadow"
        >
          {t("cookie.accept_all")}
        </button>
      </div>
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
    <label className="flex items-start gap-3 cursor-pointer">
      <div className="pt-0.5">
        <button
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) onChange?.(!checked);
          }}
          className={`
            relative w-10 h-6 rounded-full transition-colors
            ${checked ? "bg-magenta" : "bg-white/10"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <span
            className={`
              absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform
              ${checked ? "translate-x-4" : "translate-x-0"}
            `}
          />
        </button>
      </div>
      <div>
        <span className="text-sm font-medium text-white">{label}</span>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </label>
  );
}
