"use client";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function FloatingLanguageSwitcher() {
  const { hasConsented, isLoading } = useCookieConsent();

  if (isLoading || !hasConsented) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 md:hidden">
      <LanguageSwitcher />
    </div>
  );
}
