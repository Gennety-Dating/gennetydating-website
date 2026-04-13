"use client";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function FloatingLanguageSwitcher() {
  const { hasConsented, isLoading } = useCookieConsent();

  if (isLoading || !hasConsented) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
      <LanguageSwitcher />
    </div>
  );
}
