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

      {/* CTA button & Sticker */}
      <div className="relative mt-8 inline-block">
        <RegistrationButton
          mode="join"
          variant="solid"
          size="lg"
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

        {/* Postage stamp sticker */}
        <div className="absolute -top-1 -right-6 sm:-top-2 sm:-right-8 z-20 rotate-[15deg] flex items-center justify-center w-[104px] h-[24px] drop-shadow-[0_0_8px_rgba(255,0,255,0.6)] select-none pointer-events-none">
          {/* Perforated background */}
          <div 
            className="absolute inset-0 bg-[#FF00FF]"
            style={{
              maskImage: `radial-gradient(circle, transparent 2px, black 2.5px)`,
              maskSize: `8px 8px`,
              maskPosition: `-4px -4px`,
              WebkitMaskImage: `radial-gradient(circle, transparent 2px, black 2.5px)`,
              WebkitMaskSize: `8px 8px`,
              WebkitMaskPosition: `-4px -4px`,
            }}
          />
          {/* Solid core to hide internal perforations */}
          <div className="absolute inset-[2px] bg-[#FF00FF]" />

          <span className="relative z-10 block text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-center translate-y-[0.5px]">
            No dick pics
          </span>
        </div>
      </div>

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
