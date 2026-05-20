"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

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

  if (isLoading || !hasConsented || registrationModalOpen) return null;

  return (
    <div className="floating-language-switcher fixed bottom-4 right-4 z-40 md:hidden">
      <LanguageSwitcher menuPlacement="top" />
    </div>
  );
}
