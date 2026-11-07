import type { Metadata, Viewport } from "next";
import { Geologica } from "next/font/google";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gennety — Investor deck",
  description: "Gennety is a personal AI matchmaker: zero swiping, zero chats, real dates. Pre-seed, raising $300K.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Gennety — Investor deck",
    description: "Zero swiping. Zero chats. Real dates. Pre-seed, raising $300K.",
    url: "https://www.gennety.com/deck",
    siteName: "Gennety",
    images: [{ url: "/deck/slides/slide-01.webp", width: 2400, height: 1350, alt: "Gennety deck cover" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gennety — Investor deck",
    description: "Zero swiping. Zero chats. Real dates.",
    images: ["/deck/slides/slide-01.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#FBF8F7",
};

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return <div className={geologica.variable}>{children}</div>;
}
