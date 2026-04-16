"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <nav
      className="fixed top-0 w-full z-40 flex items-center justify-between px-4 md:px-10 py-3 md:py-4"
    >
      <Link href="/" className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-magenta transition-colors">
        Gennety
      </Link>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm"
        >
          {t("nav.login")}
        </Button>
        <Button
          variant="solid"
          size="sm"
          className="px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm"
        >
          {t("nav.join")}
        </Button>
      </div>
    </nav>
  );
}
