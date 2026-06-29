"use client";

import Link from "next/link";
import { RegistrationButton } from "@/components/registration-button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/language-context";
// 🟠 BETA-ONLY — beta badge next to the wordmark. Remove on rollback (see BETA_WEBSITE.md).
import { BetaBadge } from "@/components/beta-badge";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <nav
      className="fixed top-0 w-full z-40 flex items-center justify-between px-4 md:px-10 py-3 md:py-4"
    >
      <div className="flex items-center gap-2">
        {/* 🟠 BETA-ONLY */}
        <BetaBadge />
        <Link href="/" className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-magenta transition-colors">
          Gennety
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
        <RegistrationButton
          mode="login"
          variant="ghost"
          size="sm"
          className="px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm"
        >
          {t("nav.login")}
        </RegistrationButton>
        <RegistrationButton
          mode="join"
          variant="solid"
          size="sm"
          className="px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm"
        >
          {t("nav.join")}
        </RegistrationButton>
      </div>
    </nav>
  );
}
