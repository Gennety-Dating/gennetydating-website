"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <nav
      className="fixed top-0 w-full z-40 flex items-center justify-between px-6 md:px-10 py-4"
    >
      <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-magenta transition-colors">
        Gennety
      </Link>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Button variant="ghost" size="sm">
          {t("nav.login")}
        </Button>
        <Button variant="solid" size="sm">
          {t("nav.join")}
        </Button>
      </div>
    </nav>
  );
}
