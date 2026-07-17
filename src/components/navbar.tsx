"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RegistrationButton } from "@/components/registration-button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname === "/") {
      document.documentElement.style.backgroundColor = "#1A1A1A";
    } else {
      document.documentElement.style.backgroundColor = "";
    }
    return () => {
      document.documentElement.style.backgroundColor = "";
    };
  }, [pathname]);

  const isScrolledPastLight = true;
  const isThesisPage = pathname === "/thesis";
  const isPlacesPage = pathname === "/places";
  const isWhiteHeaderPage = isThesisPage || isPlacesPage;

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-40 flex items-center justify-between px-4 md:px-10 pt-[calc(clamp(38px,env(safe-area-inset-top),46px)+12px)] pb-3 md:pt-[calc(env(safe-area-inset-top)+16px)] md:pb-4 transition-all duration-300",
        "bg-black/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none",
        isScrolledPastLight ? "text-white" : "text-[#111111]"
      )}
    >
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/logo-wordmark.png"
            alt="Gennety"
            width={121}
            height={30}
            priority
            className="h-6 md:h-7 w-auto object-contain"
          />
        </Link>
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
          className={cn(
            "px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm transition-all duration-300",
            isWhiteHeaderPage
              ? "bg-white text-black hover:bg-white/90 hover:text-black shadow-none hover:shadow-none"
              : ""
          )}
        >
          {t("nav.join")}
        </RegistrationButton>
      </div>
    </nav>
  );
}
