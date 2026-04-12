"use client";

import { Heading, ScriptHighlight } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { StarLogo } from "@/components/ui/star-logo";
import { PolaroidCard } from "@/components/ui/polaroid";
import { CountdownTimer } from "@/components/countdown-timer";
import { TELEGRAM_BOT_URL } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

function HeartOverlay() {
  return (
    <svg
      className="absolute -top-4 -right-4 w-12 h-12 md:w-16 md:h-16 drop-shadow-neon-sm"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 56 C32 56 8 40 8 22 C8 14 14 8 22 8 C27 8 31 11 32 14 C33 11 37 8 42 8 C50 8 56 14 56 22 C56 40 32 56 32 56Z"
        fill="#d0adfc"
        stroke="#dcc4fd"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden px-4"
      style={{
        minHeight: "100svh",
        paddingTop: "calc(var(--navbar-h) + var(--safe-top) + 2rem)",
        paddingBottom: "calc(2rem + var(--safe-bottom))",
      }}
    >
      {/* Star logo */}
      <StarLogo />

      {/* Headline */}
      <Heading as="h1" className="max-w-3xl mt-6">
        {t("hero.headline")}{" "}
        <ScriptHighlight
          className="text-[clamp(2.5rem,10vw,8rem)]"
        >
          {t("hero.highlight")}
        </ScriptHighlight>
      </Heading>

      {/* Polaroid photo */}
      <div className="relative mt-8 mb-6">
        <PolaroidCard rotation={-2} className="max-w-[240px] sm:max-w-[280px] md:max-w-[320px]">
          {/* Placeholder couple photo — replace with real image */}
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-magenta/20 via-midnight to-magenta/10 flex items-center justify-center">
            <span className="text-5xl select-none" aria-hidden="true">
              💑
            </span>
          </div>
        </PolaroidCard>
        <HeartOverlay />
      </div>

      {/* Countdown timer */}
      <CountdownTimer />

      {/* CTA button — full width on phone, capped at 360px */}
      <Button
        variant="solid"
        size="lg"
        href={TELEGRAM_BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 w-full max-w-[360px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/telegram.svg"
          alt=""
          className="w-5 h-5"
          aria-hidden="true"
        />
        {t("hero.cta")}
      </Button>

      {/* Disclaimer */}
      <p className="mt-4 text-xs text-gray-400 max-w-xs">
        {t("hero.disclaimer")}{" "}
        <a href="#" className="underline hover:text-white transition-colors focus-visible:outline-none focus-visible:text-white">
          {t("hero.terms")}
        </a>{" "}
        &{" "}
        <a href="#" className="underline hover:text-white transition-colors focus-visible:outline-none focus-visible:text-white">
          {t("hero.privacy")}
        </a>
        .
      </p>
    </section>
  );
}
