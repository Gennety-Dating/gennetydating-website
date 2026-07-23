"use client";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function FloatingLanguageSwitcher() {
  const pathname = usePathname();
  const isAppPage = pathname === "/app" || pathname?.startsWith("/app/");
  const { hasConsented, isLoading } = useCookieConsent();

  if (isLoading || isAppPage) return null;

  return (
    <div className={cn(
      "floating-language-switcher fixed right-4 md:hidden",
      hasConsented ? "bottom-4 z-40" : "bottom-[224px] z-[102]"
    )}>
      <LanguageSwitcher menuPlacement="top" isFloating />
    </div>
  );
}
