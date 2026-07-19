"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";

export function FloatingLanguageSwitcher() {
  const { hasConsented, isLoading } = useCookieConsent();
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  useEffect(() => {
    const syncRegistrationModalState = () => {
      setRegistrationModalOpen(document.body.dataset.registrationModalOpen === "true");
    };

    syncRegistrationModalState();
    window.addEventListener("gennety:registration-modal", syncRegistrationModalState);
    return () => {
      window.removeEventListener("gennety:registration-modal", syncRegistrationModalState);
    };
  }, []);

  if (isLoading || registrationModalOpen) return null;

  return (
    <div className={cn(
      "floating-language-switcher fixed right-4 md:hidden",
      hasConsented ? "bottom-4 z-40" : "bottom-[224px] z-[102]"
    )}>
      <LanguageSwitcher menuPlacement="top" isFloating />
    </div>
  );
}
