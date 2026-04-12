"use client";

import { MessageBubble } from "@/components/ui/message-bubble";
import { CONTACT_EMAIL, TELEGRAM_BOT_URL } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function Footer() {
  const { t } = useLanguage();
  const { withdrawConsent } = useCookieConsent();

  return (
    <footer className="bg-midnight px-6 md:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        {/* iMessage-style slogan bubble */}
        <div className="max-w-md mb-12">
          <MessageBubble variant="blue" tail="left">
            <p className="text-base md:text-lg font-medium">
              {t("footer.slogan")}
            </p>
          </MessageBubble>
        </div>

        {/* Large wordmark — fluid size */}
        <h2
          className="font-bold tracking-tight text-white mb-12"
          style={{ fontSize: "clamp(2.5rem, 10vw, 6rem)" }}
        >
          Gennety
        </h2>

        {/* Bottom links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:text-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/telegram.svg"
                alt=""
                className="w-4 h-4"
                aria-hidden="true"
              />
              {t("footer.telegram")}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center min-h-[44px] hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:text-white"
            >
              {t("footer.contact")}
            </a>
            <a href="#" className="inline-flex items-center min-h-[44px] hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:text-white">
              {t("footer.terms")}
            </a>
            <a href="#" className="inline-flex items-center min-h-[44px] hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:text-white">
              {t("footer.privacy")}
            </a>
            <button
              onClick={withdrawConsent}
              className="inline-flex items-center min-h-[44px] hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:text-white"
            >
              {t("footer.cookie_preferences")}
            </button>
          </div>

          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
