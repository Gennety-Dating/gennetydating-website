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
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <Navbar />
      
      {/* Hero section with grey background */}
      <div className="relative overflow-x-clip text-white z-10 bg-[#1A1A1A]">
        <Hero />
      </div>

      {/* HowItWorks & Matchmaker sections sharing the photo background */}
      <div className="relative overflow-x-clip text-white z-10 bg-[#111111]">
        {/*
          The background stays pinned while this section's content scrolls. Unlike
          the previous implementation, it has no forced GPU transform, oversized
          blurred image, or animated viewport measurement — the WebKit triggers
          behind the black safe-area artefacts.
        */}
        <div
          className="sticky top-0 z-0 -mb-[100dvh] h-[100dvh] min-h-[100svh] w-full pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[#111111] bg-[url('/images/matchmaker-works-bg.jpg')] bg-cover bg-center opacity-55" />
          <div className="absolute inset-0 bg-[#111111]/45" />
        </div>

        {/* Original postage-stamp edge. */}
        <div
          className="absolute -top-[1px] left-0 right-0 z-20 h-[15px] w-full pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='15'%3E%3Cpath d='M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z' fill='%231A1A1A'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "37px 15px",
          }}
        />

        <div className="relative z-10">
          <HowItWorks />
          <Matchmaker />
        </div>

        <div
          className="absolute -bottom-[1px] left-0 right-0 z-20 h-[15px] w-full pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='15'%3E%3Cpath d='M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z' fill='%231A1A1A'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "37px 15px",
          }}
        />
      </div>

      {/* TheDifference section with grey background */}
      <div className="relative z-10 text-white bg-[#1A1A1A]">
        <TheDifference />
      </div>

      {/* Comparison, Testimonials & FAQ container */}
      <div className="relative overflow-x-clip bg-[#111111]">
        {/* This background is pinned with the same WebKit-safe composition as above. */}
        <div
          className="sticky top-0 z-0 -mb-[100dvh] h-[100dvh] min-h-[100svh] w-full pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[#111111] bg-[url('/images/matchmaker-bg-1.jpg')] bg-cover bg-center opacity-35" />
        </div>
        <div
          className="absolute -top-[1px] left-0 right-0 z-20 h-[15px] w-full pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='15'%3E%3Cpath d='M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z' fill='%231A1A1A'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "37px 15px",
          }}
        />
        
        <div className="relative z-10">
          <Comparison />
          <TestimonialsCarousel />
          <FAQ />
        </div>

        <div
          className="absolute -bottom-[1px] left-0 right-0 z-20 h-[15px] w-full pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='15'%3E%3Cpath d='M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z' fill='%231A1A1A'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "37px 15px",
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
