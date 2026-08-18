"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { useLanguage } from "@/lib/language-context";
import { TELEGRAM_SUPPORT_URL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Localized UI Translations
const backTexts = {
  en: "Back to Home",
  uk: "Назад на головну",
  ru: "Назад на главную",
  de: "Zurück zur Startseite",
  pl: "Powrót do strony głównej",
  fr: "Retour à l'accueil",
  it: "Torna alla Home",
  es: "Volver al inicio",
};

const merchTitles = {
  en: "Merch",
  uk: "Мерч",
  ru: "Мерч",
  de: "Merch",
  pl: "Merch",
  fr: "Merch",
  it: "Merch",
  es: "Merch",
};

const merchSubtitles = {
  en: "Official Gennety collection — limited drop",
  uk: "Офіційна колекція Gennety — лімітований дроп",
  ru: "Официальная коллекция Gennety — лимитированный дроп",
  de: "Offizielle Gennety Kollektion — Limitierter Drop",
  pl: "Oficjalna kolekcja Gennety — Limitowany drop",
  fr: "Collection officielle Gennety — Drop limité",
  it: "Collezione ufficiale Gennety — Drop limitato",
  es: "Colección oficial de Gennety — Drop limitado",
};

const filterTexts = {
  all: {
    en: "All",
    uk: "Всі",
    ru: "Все",
    de: "Alle",
    pl: "Wszystkie",
    fr: "Tous",
    it: "Tutti",
    es: "Todos",
  },
  white: {
    en: "White",
    uk: "Білі",
    ru: "Белые",
    de: "Weiß",
    pl: "Białe",
    fr: "Blanc",
    it: "Bianco",
    es: "Blanco",
  },
  burgundy: {
    en: "Burgundy",
    uk: "Бордові",
    ru: "Бордовые",
    de: "Burgunder",
    pl: "Bordowe",
    fr: "Bordeaux",
    it: "Borgogna",
    es: "Burdeos",
  },
};

const orderTexts = {
  en: "Order in Telegram",
  uk: "Замовити в Telegram",
  ru: "Заказать в Telegram",
  de: "In Telegram bestellen",
  pl: "Zamów na Telegramie",
  fr: "Commander sur Telegram",
  it: "Ordina su Telegram",
  es: "Pedir en Telegram",
};

const viewBackTexts = {
  en: "Back view",
  uk: "Вид ззаду",
  ru: "Вид сзади",
  de: "Rückseite",
  pl: "Widok z tyłu",
  fr: "Vue arrière",
  it: "Vista posteriore",
  es: "Vista trasera",
};

const viewFrontTexts = {
  en: "Front view",
  uk: "Вид спереду",
  ru: "Вид спереди",
  de: "Vorderseite",
  pl: "Widok z przodu",
  fr: "Vue de face",
  it: "Vista frontale",
  es: "Vista frontal",
};

export interface MerchItem {
  id: string;
  color: "white" | "burgundy";
  price: string;
  name: { [key: string]: string };
  tag: { [key: string]: string };
  description: { [key: string]: string };
  images: {
    src: string;
    label: { [key: string]: string };
  }[];
}

const merchItems: MerchItem[] = [
  {
    id: "white-cant-flirt",
    color: "white",
    price: "$23.99",
    name: {
      en: "I Can't Flirt",
      uk: "I Can't Flirt",
      ru: "I Can't Flirt",
      de: "I Can't Flirt",
      pl: "I Can't Flirt",
      fr: "I Can't Flirt",
      it: "I Can't Flirt",
      es: "I Can't Flirt",
    },
    tag: {
      en: "White Tee · Drop 01",
      uk: "Біла футболка · Дроп 01",
      ru: "Белая футболка · Дроп 01",
      de: "Weißes Shirt · Drop 01",
      pl: "Biała koszulka · Drop 01",
      fr: "T-shirt blanc · Drop 01",
      it: "T-shirt bianca · Drop 01",
      es: "Camiseta blanca · Drop 01",
    },
    description: {
      en: "“I CAN'T FLIRT — I'M AFRAID OF WOMEN” back print with front burgundy Gennety butterfly embroidery.",
      uk: "Принт «I CAN'T FLIRT — I'M AFRAID OF WOMEN» на спині та вишита бордова бабочка Gennety спереду.",
      ru: "Принт «I CAN'T FLIRT — I'M AFRAID OF WOMEN» на спине и вышитая бордовая бабочка Gennety спереди.",
      de: "„I CAN'T FLIRT — I'M AFRAID OF WOMEN“ Rückendruck mit gesticktem burgunderfarbenem Schmetterling vorne.",
      pl: "Nadruk na plecach „I CAN'T FLIRT — I'M AFRAID OF WOMEN” i haftowany bordowy motyl Gennety z przodu.",
      fr: "Impression dos « I CAN'T FLIRT — I'M AFRAID OF WOMEN » avec papillon bordeaux brodé sur le devant.",
      it: "Stampa posteriore «I CAN'T FLIRT — I'M AFRAID OF WOMEN» con farfalla bordeaux ricamata sul davanti.",
      es: "Estampado trasero «I CAN'T FLIRT — I'M AFRAID OF WOMEN» con mariposa burdeos bordada en el frente.",
    },
    images: [
      {
        src: "/images/merch/white-cant-flirt-back.png",
        label: viewBackTexts,
      },
      {
        src: "/images/merch/tshirt-white-front.png",
        label: viewFrontTexts,
      },
    ],
  },
  {
    id: "white-need-problem",
    color: "white",
    price: "$23.99",
    name: {
      en: "If You Need A Problem",
      uk: "If You Need A Problem",
      ru: "If You Need A Problem",
      de: "If You Need A Problem",
      pl: "If You Need A Problem",
      fr: "If You Need A Problem",
      it: "If You Need A Problem",
      es: "If You Need A Problem",
    },
    tag: {
      en: "White Tee · Drop 01",
      uk: "Біла футболка · Дроп 01",
      ru: "Белая футболка · Дроп 01",
      de: "Weißes Shirt · Drop 01",
      pl: "Biała koszulka · Drop 01",
      fr: "T-shirt blanc · Drop 01",
      it: "T-shirt bianca · Drop 01",
      es: "Camiseta blanca · Drop 01",
    },
    description: {
      en: "“If you need a problem I'm here” serif typography back print with signature butterfly front chest detail.",
      uk: "Принт «If you need a problem I'm here» витонченим шрифтом на спині та фірмова бабочка на грудях.",
      ru: "Принт «If you need a problem I'm here» изящным шрифтом на спине и фирменная бабочка на груди.",
      de: "„If you need a problem I'm here“ eleganter Serifenschrift-Print hinten und Schmetterling vorne.",
      pl: "Elegancki nadruk szeryfowy „If you need a problem I'm here” na plecach i motyl z przodu.",
      fr: "Typographie élégante « If you need a problem I'm here » au dos et papillon signature sur la poitrine.",
      it: "Stampa con scritta «If you need a problem I'm here» sul retro e farfalla sul petto.",
      es: "Tipografía elegante «If you need a problem I'm here» en la espalda y mariposa en el pecho.",
    },
    images: [
      {
        src: "/images/merch/white-need-problem-back.png",
        label: viewBackTexts,
      },
      {
        src: "/images/merch/tshirt-white-front.png",
        label: viewFrontTexts,
      },
    ],
  },
  {
    id: "white-red-flags",
    color: "white",
    price: "$23.99",
    name: {
      en: "I'm A Bull",
      uk: "I'm A Bull",
      ru: "I'm A Bull",
      de: "I'm A Bull",
      pl: "I'm A Bull",
      fr: "I'm A Bull",
      it: "I'm A Bull",
      es: "I'm A Bull",
    },
    tag: {
      en: "White Tee · Drop 01",
      uk: "Біла футболка · Дроп 01",
      ru: "Белая футболка · Дроп 01",
      de: "Weißes Shirt · Drop 01",
      pl: "Biała koszulka · Drop 01",
      fr: "T-shirt blanc · Drop 01",
      it: "T-shirt bianca · Drop 01",
      es: "Camiseta blanca · Drop 01",
    },
    description: {
      en: "“I DON'T CARE IF SHE GOT RED FLAGS — I'M A BULL” back statement with front Gennety butterfly.",
      uk: "«I DON'T CARE IF SHE GOT RED FLAGS — I'M A BULL» на спині та вишита бордова бабочка спереду.",
      ru: "«I DON'T CARE IF SHE GOT RED FLAGS — I'M A BULL» на спине и вышитая бордовая бабочка спереди.",
      de: "„I DON'T CARE IF SHE GOT RED FLAGS — I'M A BULL“ Statement auf dem Rücken mit Schmetterling vorne.",
      pl: "Napis „I DON'T CARE IF SHE GOT RED FLAGS — I'M A BULL” na plecach i motyl Gennety z przodu.",
      fr: "« I DON'T CARE IF SHE GOT RED FLAGS — I'M A BULL » au dos avec papillon Gennety brodé devant.",
      it: "«I DON'T CARE IF SHE GOT RED FLAGS — I'M A BULL» sul retro con farfalla Gennety sul davanti.",
      es: "«I DON'T CARE IF SHE GOT RED FLAGS — I'M A BULL» en la espalda con mariposa Gennety en el pecho.",
    },
    images: [
      {
        src: "/images/merch/white-red-flags-back.png",
        label: viewBackTexts,
      },
      {
        src: "/images/merch/tshirt-white-front.png",
        label: viewFrontTexts,
      },
    ],
  },
  {
    id: "white-parents-fan",
    color: "white",
    price: "$23.99",
    name: {
      en: "Huge Fan",
      uk: "Huge Fan",
      ru: "Huge Fan",
      de: "Huge Fan",
      pl: "Huge Fan",
      fr: "Huge Fan",
      it: "Huge Fan",
      es: "Huge Fan",
    },
    tag: {
      en: "White Tee · Drop 01",
      uk: "Біла футболка · Дроп 01",
      ru: "Белая футболка · Дроп 01",
      de: "Weißes Shirt · Drop 01",
      pl: "Biała koszulka · Drop 01",
      fr: "T-shirt blanc · Drop 01",
      it: "T-shirt bianca · Drop 01",
      es: "Camiseta blanca · Drop 01",
    },
    description: {
      en: "“TELL YOUR PARENTS THAT I'M A HUGE FAN OF THEIR WORK” bold blue back print with front butterfly.",
      uk: "Синій акцентний принт «TELL YOUR PARENTS THAT I'M A HUGE FAN OF THEIR WORK» на спині та бабочка спереду.",
      ru: "Синий акцентный принт «TELL YOUR PARENTS THAT I'M A HUGE FAN OF THEIR WORK» на спине и бабочка спереди.",
      de: "Blauer Statement-Print „TELL YOUR PARENTS THAT I'M A HUGE FAN OF THEIR WORK“ hinten.",
      pl: "Niebieski nadruk „TELL YOUR PARENTS THAT I'M A HUGE FAN OF THEIR WORK” na plecach.",
      fr: "Impression bleue vive « TELL YOUR PARENTS THAT I'M A HUGE FAN OF THEIR WORK » au dos.",
      it: "Stampa blu «TELL YOUR PARENTS THAT I'M A HUGE FAN OF THEIR WORK» sul retro.",
      es: "Estampado azul «TELL YOUR PARENTS THAT I'M A HUGE FAN OF THEIR WORK» en la espalda.",
    },
    images: [
      {
        src: "/images/merch/white-parents-fan-back.png",
        label: viewBackTexts,
      },
      {
        src: "/images/merch/white-parents-fan-front.png",
        label: viewFrontTexts,
      },
    ],
  },
  {
    id: "white-karma-69",
    color: "white",
    price: "$23.99",
    name: {
      en: "Karma Is Like 69",
      uk: "Karma Is Like 69",
      ru: "Karma Is Like 69",
      de: "Karma Is Like 69",
      pl: "Karma Is Like 69",
      fr: "Karma Is Like 69",
      it: "Karma Is Like 69",
      es: "Karma Is Like 69",
    },
    tag: {
      en: "White Tee · Drop 01",
      uk: "Біла футболка · Дроп 01",
      ru: "Белая футболка · Дроп 01",
      de: "Weißes Shirt · Drop 01",
      pl: "Biała koszulka · Drop 01",
      fr: "T-shirt blanc · Drop 01",
      it: "T-shirt bianca · Drop 01",
      es: "Camiseta blanca · Drop 01",
    },
    description: {
      en: "“KARMA IS LIKE 69: YOU GET, WHAT YOU GIVE” back print with front Gennety butterfly embroidery.",
      uk: "Принт «KARMA IS LIKE 69: YOU GET, WHAT YOU GIVE» на спині та вишита бордова бабочка спереду.",
      ru: "Принт «KARMA IS LIKE 69: YOU GET, WHAT YOU GIVE» на спине и вышитая бордовая бабочка спереди.",
      de: "„KARMA IS LIKE 69: YOU GET, WHAT YOU GIVE“ Rückendruck mit gesticktem Schmetterling vorne.",
      pl: "Nadruk „KARMA IS LIKE 69: YOU GET, WHAT YOU GIVE” na plecach i motyl Gennety z przodu.",
      fr: "Impression « KARMA IS LIKE 69: YOU GET, WHAT YOU GIVE » au dos avec papillon sur le devant.",
      it: "Stampa «KARMA IS LIKE 69: YOU GET, WHAT YOU GIVE» sul retro con farfalla ricamata davanti.",
      es: "Estampado «KARMA IS LIKE 69: YOU GET, WHAT YOU GIVE» en la espalda con mariposa en el frente.",
    },
    images: [
      {
        src: "/images/merch/white-karma-69-back.png",
        label: viewBackTexts,
      },
      {
        src: "/images/merch/tshirt-white-front.png",
        label: viewFrontTexts,
      },
    ],
  },
  {
    id: "burgundy-social-media",
    color: "burgundy",
    price: "$23.99",
    name: {
      en: "Death of Romance",
      uk: "Death of Romance",
      ru: "Death of Romance",
      de: "Death of Romance",
      pl: "Death of Romance",
      fr: "Death of Romance",
      it: "Death of Romance",
      es: "Death of Romance",
    },
    tag: {
      en: "Burgundy Tee · Drop 01",
      uk: "Бордова футболка · Дроп 01",
      ru: "Бордовая футболка · Дроп 01",
      de: "Burgunder Shirt · Drop 01",
      pl: "Bordowa koszulka · Drop 01",
      fr: "T-shirt bordeaux · Drop 01",
      it: "T-shirt bordeaux · Drop 01",
      es: "Camiseta burdeos · Drop 01",
    },
    description: {
      en: "“SOCIAL MEDIA KILLED ROMANCE” bold back statement on signature deep burgundy tee with front white butterfly.",
      uk: "Принт «SOCIAL MEDIA KILLED ROMANCE» на спині фірмової бордової футболки з білою бабочкою спереду.",
      ru: "Принт «SOCIAL MEDIA KILLED ROMANCE» на спине фирменной бордовой футболки с белой бабочкой спереди.",
      de: "„SOCIAL MEDIA KILLED ROMANCE“ Statement auf dem Rücken mit weißem Schmetterling vorne.",
      pl: "Nadruk „SOCIAL MEDIA KILLED ROMANCE” na plecach bordowej koszulki z białym motylem z przodu.",
      fr: "« SOCIAL MEDIA KILLED ROMANCE » au dos du t-shirt bordeaux avec papillon blanc brodé devant.",
      it: "«SOCIAL MEDIA KILLED ROMANCE» sul retro della t-shirt bordeaux con farfalla bianca davanti.",
      es: "«SOCIAL MEDIA KILLED ROMANCE» en la espalda de la camiseta burdeos con mariposa blanca en el frente.",
    },
    images: [
      {
        src: "/images/merch/burgundy-social-media-back.png",
        label: viewBackTexts,
      },
      {
        src: "/images/merch/tshirt-burgundy-front.png",
        label: viewFrontTexts,
      },
    ],
  },
];

function MerchCard({ item, locale }: { item: MerchItem; locale: string }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const imagesCount = item.images.length;
  const currentImage = item.images[activeImageIndex] || item.images[0];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % imagesCount);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + imagesCount) % imagesCount);
  };

  const name = item.name[locale] || item.name.en;
  const tag = item.tag[locale] || item.tag.en;
  const description = item.description[locale] || item.description.en;
  const orderText = orderTexts[locale as keyof typeof orderTexts] || orderTexts.en;
  const currentLabel = currentImage.label[locale] || currentImage.label.en;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1c1c1e] hover:bg-[#252528] transition-[background-color,box-shadow] duration-300 hover:shadow-2xl">
      <div className="flex flex-col">
        {/* Showcase Image Box */}
        <div className="relative h-[380px] sm:h-[400px] md:h-[420px] w-full overflow-hidden bg-[#151517] flex items-center justify-center p-4">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

          {/* Tag / Badge Top Left */}
          <div className="absolute top-4 left-4 z-20">
            <div className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white select-none">
              <span>{tag}</span>
            </div>
          </div>

          {/* Current view indicator (Top Right) */}
          {imagesCount > 1 && (
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextImage();
                }}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white/90 transition-all duration-200 cursor-pointer select-none shadow-md"
              >
                <span>{currentLabel}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/60">{activeImageIndex + 1}/{imagesCount}</span>
              </button>
            </div>
          )}

          {/* T-shirt Image with smooth transition */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={currentImage.src}
                  alt={name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain p-2 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows for Front / Back / Icon flipping */}
          {imagesCount > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>

              {/* Bottom Pagination Dots */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-20 pointer-events-none">
                {item.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      idx === activeImageIndex
                        ? "w-5 bg-white"
                        : "w-1.5 bg-white/30"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 pb-2 flex flex-col">
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <h2 className="font-sans text-xl font-bold tracking-tight text-white leading-tight">
              {name}
            </h2>
            <span className="font-sans font-bold text-lg text-white/95 shrink-0">
              {item.price}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-1 line-clamp-3 select-none">
            {description}
          </p>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="px-5 pb-5 pt-3">
        <a
          href={TELEGRAM_SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] py-3.5 md:py-2.5 text-sm md:text-xs font-bold text-white transition-all duration-300 cursor-pointer"
        >
          <TelegramIcon className="w-4 h-4 md:w-3.5 md:h-3.5 shrink-0" />
          <span>{orderText}</span>
        </a>
      </div>
    </div>
  );
}

export default function MerchPage() {
  const { locale } = useLanguage();
  const [selectedColor, setSelectedColor] = useState<"all" | "white" | "burgundy">("all");

  const backText = backTexts[locale as keyof typeof backTexts] || backTexts.en;
  const title = merchTitles[locale as keyof typeof merchTitles] || merchTitles.en;
  const subtitle = merchSubtitles[locale as keyof typeof merchSubtitles] || merchSubtitles.en;

  const filteredItems = merchItems.filter((item) => {
    if (selectedColor === "all") return true;
    return item.color === selectedColor;
  });

  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background image (Mobile & Desktop) */}
      <div
        className="fixed inset-0 bg-[url('/images/merch-mobile-bg.jpg')] md:bg-[url('/images/merch-desktop-bg.jpg')] bg-cover bg-center pointer-events-none z-0 scale-100"
        aria-hidden="true"
      />

      {/* Dark overlay for contrast and seamless blending */}
      <div className="fixed inset-0 bg-black/45 z-0 pointer-events-none" />
      <div className="fixed inset-x-0 top-0 h-44 bg-gradient-to-b from-midnight/90 via-midnight/50 to-transparent pointer-events-none z-0" />
      <div className="fixed inset-x-0 bottom-0 h-44 bg-gradient-to-t from-midnight via-midnight/80 to-transparent pointer-events-none z-0" />

      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-4 md:px-10 max-w-6xl mx-auto w-full flex flex-col justify-start relative z-10">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 self-start group text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{backText}</span>
        </Link>

        {/* Header Section */}
        <div className="text-center md:text-left mb-10 relative">
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-3 lowercase">
              {title}
            </h1>
          </div>
          <p className="text-gray-300 text-sm md:text-base font-light tracking-wide max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Color Filter Tabs */}
        <div className="flex justify-center md:justify-start gap-4 mb-10">
          {(["all", "white", "burgundy"] as const).map((colorKey) => {
            const isActive = selectedColor === colorKey;
            const label = filterTexts[colorKey][locale as keyof typeof filterTexts["all"]] || filterTexts[colorKey].en;
            return (
              <button
                key={colorKey}
                type="button"
                onClick={() => setSelectedColor(colorKey)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer uppercase",
                  isActive
                    ? "bg-white text-midnight shadow-lg"
                    : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Merch Grid matching Places layout with rounded-2xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredItems.map((item) => (
            <MerchCard key={item.id} item={item} locale={locale} />
          ))}
        </div>

      </div>

      <Footer theme="dark" />
    </main>
  );
}
