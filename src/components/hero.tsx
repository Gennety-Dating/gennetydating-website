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
      className="absolute -top-4 -right-4 w-16 h-16 drop-shadow-neon-sm"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 56 C32 56 8 40 8 22 C8 14 14 8 22 8 C27 8 31 11 32 14 C33 11 37 8 42 8 C50 8 56 14 56 22 C56 40 32 56 32 56Z"
        fill="#FF00FF"
        stroke="#FF55FF"
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
    <section className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-4 text-center overflow-hidden">
      {/* Star logo */}
      <StarLogo className="mb-6" />

      {/* Headline */}
      <Heading as="h1" className="max-w-3xl">
        {t("hero.headline")}{" "}
        <ScriptHighlight className="text-6xl md:text-8xl lg:text-9xl">
          {t("hero.highlight")}
        </ScriptHighlight>
      </Heading>

      {/* Polaroid photo */}
      <div className="relative mt-10 mb-8">
        <PolaroidCard rotation={-2} className="max-w-[280px] md:max-w-[320px]">
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

      {/* CTA button */}
      <Button
        variant="solid"
        size="lg"
        href={TELEGRAM_BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8"
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
      <p className="mt-4 text-xs text-gray-400">
        {t("hero.disclaimer")}{" "}
        <a href="#" className="underline hover:text-white transition-colors">
          {t("hero.terms")}
        </a>{" "}
        &{" "}
        <a href="#" className="underline hover:text-white transition-colors">
          {t("hero.privacy")}
        </a>
        .
      </p>
    </section>
  );
}
