"use client";

import { Heading, ScriptHighlight } from "@/components/ui/typography";
import { StarLogo } from "@/components/ui/star-logo";
import { CountdownTimer } from "@/components/countdown-timer";
import { RegistrationButton } from "@/components/registration-button";
import { useLanguage } from "@/lib/language-context";



export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-4 text-center overflow-hidden">
      {/* Star logo */}
      <StarLogo />

      {/* Headline */}
      <Heading as="h1" className="max-w-3xl">
        {t("hero.headline")}{" "}
        <ScriptHighlight className="text-6xl md:text-8xl lg:text-9xl">
          {t("hero.highlight")}
        </ScriptHighlight>
      </Heading>

      {/* Polaroid photo */}
      <div className="relative mt-8 mb-6 flex justify-center z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/polaroid-couple.png"
          alt="Couple"
          className="max-w-[110px] sm:max-w-[125px] md:max-w-[147px] w-full h-auto drop-shadow-xl transition-transform hover:scale-[1.02] -rotate-2 pointer-events-none"
        />
      </div>

      {/* Countdown timer */}
      <CountdownTimer />

      {/* CTA button */}
      <RegistrationButton
        mode="join"
        variant="solid"
        size="lg"
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
      </RegistrationButton>

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
