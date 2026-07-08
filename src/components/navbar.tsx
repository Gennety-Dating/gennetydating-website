"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RegistrationButton } from "@/components/registration-button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/language-context";
// 🟠 BETA-ONLY — beta badge next to the wordmark. Remove on rollback (see BETA_WEBSITE.md).
import { BetaBadge } from "@/components/beta-badge";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isScrolledPastLight = true;

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-40 flex items-center justify-between px-4 md:px-10 py-3 md:py-4 bg-transparent transition-all duration-300",
        isScrolledPastLight ? "text-white" : "text-[#111111]"
      )}
    >
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={cn(
            "text-lg md:text-xl font-bold tracking-tight transition-colors hover:text-magenta",
            isScrolledPastLight ? "text-white" : "text-[#111111]"
          )}
        >
          Gennety
        </Link>
        {/* 🟠 BETA-ONLY */}
        <BetaBadge />
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:block">
          <LanguageSwitcher theme={isScrolledPastLight ? "dark" : "light"} />
        </div>
        <RegistrationButton
          mode="login"
          variant="ghost"
          size="sm"
          className={cn(
            "px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm transition-all duration-300",
            isScrolledPastLight
              ? "text-white border-white/60 hover:bg-white/10"
              : "text-[#111111] border-[#111111]/60 hover:bg-[#111111]/10"
          )}
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
