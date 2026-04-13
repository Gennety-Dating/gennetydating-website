import type { Metadata } from "next";
import { Geist } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gennety — AI-Powered Dating for Students",
  description:
    "Go on a date with your type. Gennety is an AI-driven dating service that curates personalized dates for college students — no swiping required.",
  keywords: ["dating", "AI dating", "college dating", "student dating", "Gennety"],
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
      className={`${geist.variable} ${playfair.variable} ${caveat.variable} h-full antialiased`}
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
