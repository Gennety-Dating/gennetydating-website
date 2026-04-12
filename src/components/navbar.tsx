"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 w-full z-40 flex items-center justify-between gap-x-3 gap-y-2 flex-wrap px-4 md:px-10 py-2 backdrop-blur-sm">
      {/* Logo — never shrinks */}
      <Link
        href="/"
        className="shrink-0 text-xl font-bold tracking-tight text-white hover:text-magenta transition-colors"
      >
        Gennety
      </Link>

      {/* Right controls — wrap on very narrow viewports */}
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        {/* Hide Login on xs screens (<375px) to prevent overflow */}
        <Button variant="ghost" size="sm" className="hidden min-[375px]:inline-flex">
          {t("nav.login")}
        </Button>
        <Button variant="solid" size="sm">
          {t("nav.join")}
        </Button>
      </div>
    </nav>
  );
}
