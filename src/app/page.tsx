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

      {/*
        iPhone safe-area covers. iOS Safari repaints the pinned photo backgrounds
        unreliably inside the notch/status-bar (top) and home-indicator (bottom)
        insets while scrolling — the top strip stayed grey, the bottom flickered.
        Rather than fight the compositor, paint BOTH insets deliberately with a
        stable solid bar: a plain fixed div (no filter/transform/opacity) cannot
        drop like a composite layer, so top and bottom stay consistent. env()
        collapses each bar to 0 height on devices/orientations with no inset.
        z-30 sits above the page content and pinned photo (z-0/10/20) but below
        the transparent navbar (z-40), whose own content clears the inset.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-30 bg-[#1A1A1A]"
        style={{ height: "env(safe-area-inset-top)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-[#1A1A1A]"
        style={{ height: "env(safe-area-inset-bottom)" }}
      />

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
          <div className="absolute -inset-8 bg-[#111111] bg-[url('/images/matchmaker-works-bg-soft.jpg')] bg-cover bg-center" />
        </div>

        {/* Wavy transition from Hero (grey #1A1A1A) to HowItWorks (Photo) */}
        <div
          className="absolute -top-[1px] left-0 right-0 w-full h-[15px] z-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='15'%3E%3Cpath d='M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z' fill='%231A1A1A'/%3E%3C/svg%3E\")",
            backgroundRepeat: "round",
            backgroundSize: "37px 15px"
          }}
        />

        <div className="relative z-10">
          <HowItWorks />
          <Matchmaker />
        </div>

        {/* Bottom wavy edge (Postage Stamp Wavy Bottom Edge) to transition to TheDifference (grey #1A1A1A) */}
        <div
          className="absolute -bottom-[1px] left-0 right-0 w-full h-[15px] z-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='15'%3E%3Cpath d='M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z' fill='%231A1A1A'/%3E%3C/svg%3E\")",
            backgroundRepeat: "round",
            backgroundSize: "37px 15px"
          }}
        />
      </div>

      {/* TheDifference section with grey background */}
      <div className="relative z-10 text-white bg-[#1A1A1A]">
        <TheDifference />
      </div>

      {/* Comparison, Testimonials & FAQ container */}
      <div className="relative overflow-x-clip bg-[#111111]">
        {/* A sticky viewport layer preserves the fixed-photo effect without viewport gaps. */}
        <div
          className="sticky top-0 z-0 -mb-[100dvh] h-[100dvh] min-h-[100svh] w-full overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* Blur + darkening baked into the *-soft.jpg (no runtime filter/opacity),
              so this layer is not composited and does not drop the iOS safe-area
              insets to black — see the note on the first photo section above. */}
          <div className="absolute -inset-10 bg-[#111111] bg-[url('/images/matchmaker-bg-1-soft.jpg')] bg-cover bg-center" />
        </div>
        {/* Wavy transition from TheDifference (grey #1A1A1A) to Comparison (Photo) */}
        <div
          className="absolute -top-[1px] left-0 right-0 w-full h-[15px] z-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='15'%3E%3Cpath d='M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z' fill='%231A1A1A'/%3E%3C/svg%3E\")",
            backgroundRepeat: "round",
            backgroundSize: "37px 15px"
          }}
        />

        <div className="relative z-10">
          <Comparison />
          <TestimonialsCarousel />
          <FAQ />
        </div>

        {/* Bottom wavy edge (Postage Stamp Wavy Bottom Edge) to transition to FAQ (grey #1A1A1A) */}
        <div
          className="absolute -bottom-[1px] left-0 right-0 w-full h-[15px] z-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='15'%3E%3Cpath d='M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z' fill='%231A1A1A'/%3E%3C/svg%3E\")",
            backgroundRepeat: "round",
            backgroundSize: "37px 15px"
          }}
        />
      </div>

      {/* Marquee container with grey background */}
      <div className="relative overflow-x-clip bg-[#1A1A1A] text-white">
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
