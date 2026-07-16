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

          NOTE: no `will-change`/`translate3d` GPU promotion here. On iOS Safari
          (viewport-fit=cover) a forced composite layer on a blurred sticky element
          is not repainted inside the notch/home-indicator safe-area insets during
          scroll, which flashed those strips black. The root canvas colour matches
          #111111 as a second line of defence — see globals.css.
        */}
        <div
          className="sticky top-0 z-0 -mb-[100dvh] h-[100dvh] min-h-[100svh] w-full overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -inset-8 bg-[#111111] bg-[url('/images/matchmaker-works-bg.jpg')] bg-cover bg-center opacity-55 blur-[8px]" />
          <div className="absolute inset-0 bg-[#111111]/45" />
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
          <div className="absolute -inset-10 bg-[#111111] bg-[url('/images/matchmaker-bg-1.jpg')] bg-cover bg-center opacity-35 blur-[12px]" />
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
