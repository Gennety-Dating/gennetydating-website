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
  // Grey to match the site chrome (Hero at the top, Footer at the bottom, both
  // #1A1A1A). iOS Safari paints its status-bar and bottom-toolbar zones with
  // this colour; #050505 read as a near-black block at the bottom and behind the
  // clock/battery whenever the notch strip cover collapsed (env inset = 0 at the
  // top of the page). #1A1A1A blends both into the site's grey.
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
      </body>
    </html>
  );
}
