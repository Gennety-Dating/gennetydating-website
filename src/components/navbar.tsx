"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const isThesisPage = pathname === "/thesis";
  const isPlacesPage = pathname === "/places";
  const isWhiteHeaderPage = isThesisPage || isPlacesPage;

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "site-navbar fixed w-full z-40 flex items-center justify-between px-4 py-3 md:top-0 md:px-10 md:pt-[calc(env(safe-area-inset-top)+16px)] md:pb-4 transition-all duration-300",
        "md:bg-transparent md:backdrop-blur-none text-white"
      )}
    >
      <div className="flex items-center translate-x-[7px]">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80"
          aria-label="Gennety — Go to homepage"
        >
          <Image
            src="/images/logo-wordmark.png"
            alt="Gennety"
            width={145}
            height={36}
            priority
            className="h-[27px] md:h-[31.5px] w-auto object-contain"
          />
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-3 -translate-x-[7px]">
        <div className="hidden md:block">
          <LanguageSwitcher theme="dark" />
        </div>
        <Button
          href="/join"
          variant="ghost"
          size="sm"
          className="px-5 py-2.5 text-sm md:px-4 md:py-2 md:text-sm transition-all duration-300 text-white border-white hover:bg-white/10"
        >
          {t("nav.login")}
        </Button>
        <Button
          href="/join"
          variant="solid"
          size="sm"
          className={cn(
            "px-5 py-2.5 text-sm md:px-4 md:py-2 md:text-sm transition-all duration-300",
            isWhiteHeaderPage
              ? "bg-white text-black hover:bg-white/90 hover:text-black shadow-none hover:shadow-none"
              : ""
          )}
        >
          {t("nav.join")}
        </Button>
      </div>
    </nav>
  );
}
