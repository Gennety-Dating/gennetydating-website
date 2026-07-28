import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  // iOS Safari uses this colour for its browser chrome. Keep it in sync with
  // the root canvas and the safe-area backdrops below.
  themeColor: "#1A1A1A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gennety.com"),
  title: "Gennety — Your Personal AI Matchmaker",
  description: "Curated, not swiped.",
  keywords: ["dating", "AI dating", "college dating", "student dating", "Gennety", "AI matchmaker", "personal matchmaker"],
  icons: {
    icon: [
      { url: "/images/butterfly-favicon.svg", type: "image/svg+xml" },
      { url: "/images/butterfly-favicon.png", type: "image/png" },
    ],
    shortcut: "/images/butterfly-favicon.png",
    apple: "/images/butterfly-favicon.png",
  },
  openGraph: {
    title: "Gennety — Your Personal AI Matchmaker",
    description: "Curated, not swiped.",
    url: "https://gennety.com",
    siteName: "Gennety",
    images: [
      {
        url: "/images/butterfly-logo-gradient.png",
        width: 1200,
        height: 630,
        alt: "Gennety — Your Personal AI Matchmaker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gennety — Your Personal AI Matchmaker",
    description: "Curated, not swiped.",
    images: ["/images/butterfly-logo-gradient.png"],
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
      className={`${geist.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        {/* Skip-to-content link for keyboard users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-full focus:bg-magenta focus:text-white focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <LanguageProvider>
          {children}
          <CookieBanner />
          <FloatingLanguageSwitcher />
        </LanguageProvider>
        {/* Opaque mobile browser zones. Their heights come from iOS itself, so
            they remain aligned while Safari expands or collapses its controls. */}
        <div aria-hidden="true" className="ios-status-bar-backdrop" />
        <div aria-hidden="true" className="ios-browser-bar-backdrop" />
      </body>
    </html>
  );
}
