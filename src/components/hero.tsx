"use client";

import { Heading, ScriptHighlight } from "@/components/ui/typography";
import { ButterflyLogo } from "@/components/ui/butterfly-logo";
import { CountdownTimer } from "@/components/countdown-timer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";
// import { Butterflies } from "@/components/ui/butterflies";

export function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-4 text-center overflow-hidden">
      {/* Fluttering butterflies animation */}
      {/* <Butterflies /> */}

      {/* Butterfly logo */}
      <ButterflyLogo className="mb-6 md:mb-8" />

      {/* Headline */}
      <Heading as="h1" className="max-w-3xl text-heading-white">
        <span className="block mb-0">
          {locale === "en" ? (
            <span className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter">
              {t("hero.headline")}
            </span>
          ) : (
            t("hero.headline")
          )}
        </span>
        <span className="block -mt-2 md:-mt-4 lg:-mt-6">
          <ScriptHighlight className="text-6xl md:text-8xl lg:text-9xl">
            {t("hero.highlight")}
          </ScriptHighlight>
        </span>
      </Heading>
 
      {/* Polaroid photo */}
      <div className="relative mt-8 mb-6 flex justify-center z-10">
        <Image
          src="/images/polaroid-couple.png"
          alt="Polaroid photo of a happy couple"
          width={819}
          height={1024}
          sizes="(min-width: 768px) 147px, (min-width: 640px) 125px, 110px"
          priority
          className="max-w-[110px] sm:max-w-[125px] md:max-w-[147px] w-full h-auto drop-shadow-xl transition-transform hover:scale-[1.02] -rotate-2 pointer-events-none"
        />
      </div>
 
      {/* Countdown timer */}
      <CountdownTimer />
 
      {/* CTA button & Sticker */}
      <div className="relative mt-8 inline-block">
        <Button
          href="/join"
          variant="solid"
          size="lg"
        >
          {t("hero.cta")}
        </Button>
 
        {/* Postage stamp sticker */}
        <div className="absolute -top-1 -right-6 sm:-top-2 sm:-right-8 z-20 rotate-[15deg] flex items-center justify-center w-[104px] h-[24px] drop-shadow-[0_0_8px_rgba(139,37,59,0.6)] select-none pointer-events-none" aria-hidden="true">
          {/* Perforated background */}
          <div 
            className="absolute inset-0 bg-white"
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
          <div className="absolute inset-[2px] bg-white" />
 
          <span className="relative z-10 block text-[#8B253B] text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-center translate-y-[0.5px]">
            No Dick pics
          </span>
        </div>
      </div>
 
      {/* Disclaimer */}
      <p className="mt-4 text-xs text-gray-400">
        {t("hero.disclaimer")}{" "}
        <a href="/terms" className="underline hover:text-white transition-colors">
          {t("hero.terms")}
        </a>{" "}
        &{" "}
        <a href="/privacy" className="underline hover:text-white transition-colors">
          {t("hero.privacy")}
        </a>
        .
      </p>
    </section>
  );
}
