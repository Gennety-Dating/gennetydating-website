"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-40 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300",
        scrolled
          ? "glass-strong shadow-lg"
          : "bg-transparent"
      )}
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
