import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Caveat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingLanguageSwitcher } from "@/components/ui/floating-language-switcher";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Site grey — matches the status-bar cover block and the hero/footer chrome so
  // iOS Safari's tinted zones don't read darker than the grey top block.
  themeColor: "#1A1A1A",
};

export const metadata: Metadata = {
  title: "Gennety — AI-Powered Dating for Students",
  description:
    "Go on a date with your type. Gennety is an AI-driven dating service that curates personalized dates for college students — no swiping required.",
  keywords: ["dating", "AI dating", "college dating", "student dating", "Gennety"],
  icons: {
    icon: [
      { url: "/images/butterfly-favicon.svg", type: "image/svg+xml" },
      { url: "/images/butterfly-favicon.png", type: "image/png" },
    ],
    shortcut: "/images/butterfly-favicon.png",
    apple: "/images/butterfly-favicon.png",
  },
  openGraph: {
    title: "Gennety — AI-Powered Dating for Students",
    description:
      "Go on a date with your type. No swiping, no small talk — just real dates.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LanguageProvider>
          {children}
          <CookieBanner />
          <FloatingLanguageSwitcher />
        </LanguageProvider>
        {/* iPhone status-bar / Dynamic Island cover. Deliberately at <body> level
            with a very high z-index so it sits above ALL page content (the photo
            sections and their stacking contexts included) — inside the navbar it
            was getting out-stacked, so content showed through behind the
            clock/battery. With viewport-fit=cover the page scrolls under the
            notch; this opaque strip stops that show-through. Height is
            env(safe-area-inset-top) — the notch inset, 0 on devices without one.
            Mobile only; Safari's own chrome handles the area otherwise. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 right-0 z-[9999] bg-[#1A1A1A] md:hidden"
          style={{ height: "env(safe-area-inset-top)" }}
        />
      </body>
    </html>
  );
}
