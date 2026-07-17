import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TheDifference } from "@/components/sections/the-difference";
import { Matchmaker } from "@/components/sections/matchmaker";
import { Comparison } from "@/components/sections/comparison";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FAQ } from "@/components/sections/faq";
import { Marquee } from "@/components/sections/marquee";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      {/* No top safe-area cover. A fixed grey bar sized by env(safe-area-inset-top)
          hid the photo and juddered on scroll (Safari resizes that inset as its URL
          bar animates, and the fixed gradient layer also lagged scrolling), so the
          notch strip is intentionally left transparent — the pinned photo shows
          through it edge-to-edge, kept clean by the section's z-10 stacking. */}

      {/* Hero section with grey background */}
      <div className="relative overflow-x-clip text-white z-10 bg-[#1A1A1A]">
        <Hero />
      </div>

      {/* HowItWorks & Matchmaker sections sharing the photo background */}
      <div className="relative overflow-x-clip text-white z-10 bg-[#111111]">
        {/*
          Pinned photo background. It is kept sticky so the content scrolls over a
          static photo. Dynamic viewport units follow the mobile browser chrome so
          the page canvas is never exposed above or below the image.

          NOTE: the blur AND darkening are baked into the *-soft.jpg asset, so
          there is NO runtime `filter`/`opacity`/`will-change`/`translate3d` on
          these layers. Under viewport-fit=cover, iOS Safari does not repaint such
          a composite layer inside the notch/home-indicator safe-area insets while
          scrolling, which left black bars over the photo sections. A plain opaque
          image paints edge to edge. The #111111 root canvas (globals.css) is a
          backstop. To re-tune the look, regenerate the asset — see
          scripts/bake-photo-backgrounds (blur radius + photo/#111111 mix).
        */}
        <div
          className="sticky top-0 z-0 -mb-[100dvh] h-[100dvh] min-h-[100svh] w-full overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* Mobile: beach couple photo */}
          <div className="absolute -inset-8 bg-[#111111] bg-[url('/images/beach-couple-bg-soft.jpg')] bg-cover bg-center md:hidden" />
          {/* Desktop: original ice-cream couple photo */}
          <div className="absolute -inset-8 bg-[#111111] bg-[url('/images/matchmaker-works-bg-soft.jpg')] bg-cover bg-center hidden md:block" />
        </div>

        {/* Wavy transition from Hero (grey #1A1A1A) to HowItWorks (Photo) */}
        <div
          className="absolute -top-[1px] left-0 right-0 w-full h-[17px] z-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 17' width='28' height='17'%3E%3Cpath d='M 0 0 L 28 0 C 23 0, 19 15, 14 15 C 9 15, 5 0, 0 0 Z' fill='%231A1A1A' stroke='%231A1A1A' stroke-width='1' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "round",
            backgroundSize: "28px 17px"
          }}
        />

        <div className="relative z-10">
          <HowItWorks />
          <Matchmaker />
        </div>

        {/* Bottom wavy edge (Postage Stamp Wavy Bottom Edge) to transition to TheDifference (grey #1A1A1A) */}
        <div
          className="absolute -bottom-[1px] left-0 right-0 w-full h-[17px] z-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 17' width='28' height='17'%3E%3Cpath d='M 0 17 L 28 17 C 23 17, 19 2, 14 2 C 9 2, 5 17, 0 17 Z' fill='%231A1A1A' stroke='%231A1A1A' stroke-width='1' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "round",
            backgroundSize: "28px 17px"
          }}
        />
      </div>

      {/* TheDifference section with grey background */}
      <div className="relative z-10 text-white bg-[#1A1A1A]">
        <TheDifference />
      </div>

      {/* Comparison, Testimonials & FAQ container.
          z-10 (matching the first photo section) gives this container its own
          stacking context, so the pinned sticky photo composites WITH the section
          and iOS repaints its bottom safe-area inset. Without z-10 the sticky
          layer promoted to the root stacking context, where WebKit dropped the
          home-indicator strip to a dark block while the first section (which has
          z-10) stayed clean. */}
      <div className="relative z-10 overflow-x-clip bg-[#111111]">
        {/* A sticky viewport layer preserves the fixed-photo effect without viewport gaps. */}
        <div
          className="sticky top-0 z-0 -mb-[100dvh] h-[100dvh] min-h-[100svh] w-full overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* Blur + darkening baked into the *-soft.jpg (no runtime filter/opacity),
              so this layer is not composited and does not drop the iOS safe-area
              insets to black — see the note on the first photo section above. */}
          <div className="absolute -inset-10 bg-[#111111] bg-[url('/images/cathedral-couple-bg-soft.jpg')] bg-cover bg-center" />
        </div>
        {/* Wavy transition from TheDifference (grey #1A1A1A) to Comparison (Photo) */}
        <div
          className="absolute -top-[1px] left-0 right-0 w-full h-[17px] z-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 17' width='28' height='17'%3E%3Cpath d='M 0 0 L 28 0 C 23 0, 19 15, 14 15 C 9 15, 5 0, 0 0 Z' fill='%231A1A1A' stroke='%231A1A1A' stroke-width='1' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "round",
            backgroundSize: "28px 17px"
          }}
        />

        <div className="relative z-10">
          <Comparison />
          <TestimonialsCarousel />
          <FAQ />
        </div>

        {/* Bottom wavy edge (Postage Stamp Wavy Bottom Edge) to transition to FAQ (grey #1A1A1A) */}
        <div
          className="absolute -bottom-[1px] left-0 right-0 w-full h-[17px] z-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 17' width='28' height='17'%3E%3Cpath d='M 0 17 L 28 17 C 23 17, 19 2, 14 2 C 9 2, 5 17, 0 17 Z' fill='%231A1A1A' stroke='%231A1A1A' stroke-width='1' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "round",
            backgroundSize: "28px 17px"
          }}
        />
      </div>

      {/* Marquee container with grey background.
          z-10 keeps this grey band above the previous photo section's z-10 pinned
          background (which bleeds down via -mb-[100dvh]); without a matching
          z-index the section-2 photo showed through behind the marquee. Mirrors
          the z-10 already on TheDifference and the Footer. */}
      <div className="relative z-10 overflow-x-clip bg-[#1A1A1A] text-white">
        <div className="relative z-10">
          <Marquee />
        </div>
      </div>

      <div id="light-section-bottom" className="bg-[#1A1A1A] text-white relative z-10">
        <Footer theme="dark" />
      </div>
    </main>
  );
}
