"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { useLanguage } from "@/lib/language-context";
import { ButterflyLogo } from "@/components/ui/butterfly-logo";
import { TELEGRAM_BOT_URL } from "@/lib/site-config";
import Image from "next/image";
import { VisitTracker } from "@/components/visit-tracker";

const localDict = {
  en: {
    modalTitle: "App Store Version Coming Soon",
    modalText: "We are currently putting final touches on our iOS app to deliver a premium native experience. In the meantime, you can get verified and matches in just one tap using our official Telegram bot!",
    modalCta: "Launch Telegram Bot Instead",
    modalClose: "Close",
    backHome: "Back to home",
  },
  uk: {
    modalTitle: "Додаток в App Store незабаром",
    modalText: "Ми допрацьовуємо наш додаток для iOS, щоб забезпечити найкращий досвід користування. Тим часом ви можете пройти верифікацію та шукати пари в один клік у нашому офіційному боті Telegram!",
    modalCta: "Запустити Telegram Бот",
    modalClose: "Закрити",
    backHome: "На головну",
  },
  ru: {
    modalTitle: "Приложение в App Store скоро",
    modalText: "Мы дорабатываем наше приложение для iOS, чтобы предоставить вам лучший нативный опыт. Тем временем вы можете пройти верификацию и искать пары в один клик в нашем официальном боте Telegram!",
    modalCta: "Запустить Telegram Бот",
    modalClose: "Закрыть",
    backHome: "На главную",
  },
  de: {
    modalTitle: "App Store Version kommt bald",
    modalText: "Wir legen gerade den letzten Schliff an unsere iOS-App. In der Zwischenzeit kannst du dich verifizieren und Übereinstimmungen mit nur einem Fingertipp in unserem offiziellen Telegram-Bot erhalten!",
    modalCta: "Stattdessen Telegram Bot nutzen",
    modalClose: "Schließen",
    backHome: "Zurück zur Startseite",
  },
  pl: {
    modalTitle: "Wersja App Store już wkrótce",
    modalText: "Obecnie dopracowujemy naszą aplikację na iOS. W międzyczasie możesz przejść weryfikację i znaleźć dopasowania jednym dotknięciem w naszym oficjalnym bocie na Telegramie!",
    modalCta: "Użyj Bota na Telegramie",
    modalClose: "Zamknij",
    backHome: "Powrót do strony głównej",
  },
  fr: {
    modalTitle: "Version App Store bientôt disponible",
    modalText: "Nous apportons actuellement les dernières touches à notre application iOS. En attendant, vous pouvez vous faire vérifier et obtenir des correspondances en un seul clic via notre bot Telegram officiel !",
    modalCta: "Lancer le Bot Telegram",
    modalClose: "Fermer",
    backHome: "Retour à l'accueil",
  },
  it: {
    modalTitle: "Versione App Store in arrivo",
    modalText: "Stiamo mettendo gli ultimi ritocchi alla nostra app iOS. Nel frattempo, puoi ottenere la verifica e trovare compatibilità con un solo tocco utilizzando il nostro bot Telegram ufficiale!",
    modalCta: "Usa invece il Bot di Telegram",
    modalClose: "Chiudi",
    backHome: "Torna alla home",
  },
  es: {
    modalTitle: "Versión de App Store muy pronto",
    modalText: "Actualmente estamos dando los últimos toques a nuestra aplicación para iOS. Mientras tanto, ¡puedes verificarte y obtener parejas con un solo toque usando nuestro bot oficial de Telegram!",
    modalCta: "Usar Bot de Telegram en su lugar",
    modalClose: "Cerrar",
    backHome: "Volver al inicio",
  }
};

export default function AppDownloadPage() {
  const { locale } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const tLocal = (key: keyof typeof localDict.en) => {
    return localDict[locale]?.[key] || localDict.en[key];
  };

  return (
    <main className="h-[100dvh] w-full bg-[#050505] text-white flex flex-col justify-between items-center py-8 px-6 font-sans relative overflow-hidden select-none">
      <VisitTracker page="app" />
      {/* Background images (Desktop & Mobile) */}
      <div className="fixed -inset-10 pointer-events-none filter blur-[4px] opacity-85 z-0 scale-105 hidden md:block" aria-hidden="true">
        <Image src="/images/app-desktop-bg-v3.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="fixed -inset-10 pointer-events-none filter blur-[4px] opacity-85 z-0 scale-105 md:hidden" aria-hidden="true">
        <Image src="/images/app-mobile-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      {/* Subtle dark overlay */}
      <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Center Section: Logo + Buttons */}
      <div className="flex flex-col items-start w-full max-w-sm z-10 my-auto">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group text-sm active:opacity-75"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{tLocal("backHome")}</span>
        </Link>

        <div className="flex flex-col items-center w-full text-center">
          {/* Logo */}
          <ButterflyLogo size={80} variant="gradient-bg" className="mb-10 shadow-[0_8px_30px_rgba(139,37,59,0.3)]" />

        {/* Buttons Stack */}
        <div className="flex flex-col gap-4 w-full px-2">
          
          {/* Telegram rectangular button with liquid glass effect */}
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full h-[60px] rounded-full bg-black/55 backdrop-blur-3xl flex items-center justify-center gap-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] active:scale-[0.98] hover:scale-[1.03] transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Reflection Shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

            {/* Telegram original icon (using user uploaded image) */}
            <Image
              src="/images/telegram-user.png"
              alt="Telegram"
              width={48}
              height={48}
              className="w-12 h-12 shrink-0 relative z-10 object-contain"
            />

            {/* Label */}
            <span className="font-sans font-bold text-white text-base relative z-10">
              Telegram
            </span>
          </a>

          {/* App Store button wrapper — relative so badge can float outside */}
          <div className="relative w-full">

            {/* Button — coming soon, visually inactive */}
            <div
              className="w-full h-[60px] rounded-full bg-black/55 backdrop-blur-3xl flex items-center justify-center gap-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] opacity-70 cursor-not-allowed overflow-hidden select-none"
            >
              {/* Reflection Shine */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

              {/* App Store original icon (using user uploaded image) */}
              <Image
                src="/images/app-store-user.png"
                alt="App Store"
                width={48}
                height={48}
                className="w-12 h-12 shrink-0 relative z-10 object-contain grayscale opacity-50"
              />

              {/* Label */}
              <span className="font-sans font-bold text-white text-base relative z-10">
                App Store
              </span>
            </div>

            {/* Soon badge — independent element, floats above button */}
            <span className="absolute top-[-6px] right-[-1px] z-30 px-2.5 py-0.5 rounded-full bg-black/55 backdrop-blur-3xl text-[10px] font-semibold text-white tracking-[0.18em] uppercase pointer-events-none">
              soon
            </span>

          </div>
        </div>

      </div>

      </div>

      {/* Bottom minimalist Copyright section */}
      <div className="z-10 text-[10px] text-gray-500 font-light tracking-wider pb-[calc(env(safe-area-inset-bottom)+4px)]">
        © 2026 Gennety
      </div>

      {/* Coming Soon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-300">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            onClick={() => setShowModal(false)}
          />
          
          <div className="relative w-full max-w-sm bg-[#0d0d0d]/90 border border-white/10 p-6 md:p-8 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center overflow-hidden animate-[scaleUp_0.2s_ease-out]">
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-cyan-500 via-magenta to-cyan-500" />
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto w-14 h-14 mb-5 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.1)]" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.05 0-1.48-.62-2.94-.62-1.46 0-1.93.6-2.94.64-1.03.04-2.18-1.01-3.18-1.97-2.02-1.96-3.56-5.54-3.56-8.9 0-5.32 3.46-8.15 6.87-8.15 1.08 0 2.1.64 2.76.64.67 0 1.93-.77 3.25-.77 1.38 0 2.63.5 3.44 1.52-2.83 1.7-3.37 5.6-1.12 7.54 1.72 1.48 3.86 2.37 4.56 2.37.06 0-.08.43-.24.87-.56 1.55-1.84 3.93-2.98 5.28M12.03 4.67c.78-.96 1.21-2.3 1.03-3.67-1.13.05-2.54.77-3.34 1.71-.72.84-1.28 2.22-1.08 3.56 1.25.1 2.6-.64 3.39-1.6z" />
              </svg>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-white mb-2">
              {tLocal("modalTitle")}
            </h2>

            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
              {tLocal("modalText")}
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#8B253B] hover:bg-[#A3304A] text-white font-semibold text-xs md:text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(139,37,59,0.4)] cursor-pointer"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
                <span>{tLocal("modalCta")}</span>
              </a>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white font-medium text-xs md:text-sm transition-all duration-300 cursor-pointer"
              >
                {tLocal("modalClose")}
              </button>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

    </main>
  );
}
