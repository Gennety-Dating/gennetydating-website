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

function WaveEdge({ position }: { position: "top" | "bottom" }) {
  const isTop = position === "top";

  return (
    <svg
      className={`absolute inset-x-0 ${isTop ? "-top-px" : "-bottom-px"} z-20 h-5 w-full pointer-events-none`}
      viewBox="0 0 1440 20"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {isTop ? (
        <path
          d="M0 0H1440V2C1320 2 1320 18 1200 18S1080 2 960 2S840 18 720 18S600 2 480 2S360 18 240 18S120 2 0 2Z"
          fill="#1A1A1A"
        />
      ) : (
        <path
          d="M0 18V2C120 2 120 18 240 18S360 2 480 2S600 18 720 18S840 2 960 2S1080 18 1200 18S1320 2 1440 2V20H0Z"
          fill="#1A1A1A"
        />
      )}
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <Navbar />
      
      {/* Hero section with grey background */}
      <div className="relative overflow-x-clip text-white z-10 bg-[#1A1A1A]">
        <Hero />
      </div>

      {/* HowItWorks & Matchmaker sections sharing the photo background */}
      <div className="relative isolate overflow-x-clip text-white z-10 bg-[#111111]">
        {/*
          Keep the photo in the section's normal paint layer. A sticky, transformed
          viewport-sized backdrop is unstable in iOS Safari while its browser chrome
          expands or collapses and can expose the document's black canvas.
        */}
        <div
          className="absolute inset-0 z-0 pointer-events-none bg-[#111111] bg-[url('/images/matchmaker-works-bg.jpg')] bg-cover bg-center opacity-55"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-[#111111]/45 pointer-events-none" aria-hidden="true" />

        {/* The whole wave is one vector, avoiding repeated-image seams on iOS. */}
        <WaveEdge position="top" />

        <div className="relative z-10">
          <HowItWorks />
          <Matchmaker />
        </div>

        <WaveEdge position="bottom" />
      </div>

      {/* TheDifference section with grey background */}
      <div className="relative z-10 text-white bg-[#1A1A1A]">
        <TheDifference />
      </div>

      {/* Comparison, Testimonials & FAQ container */}
      <div className="relative isolate overflow-x-clip bg-[#111111]">
        {/* See the note above: section-sized paint layers survive iOS viewport resizing. */}
        <div
          className="absolute inset-0 z-0 pointer-events-none bg-[#111111] bg-[url('/images/matchmaker-bg-1.jpg')] bg-cover bg-center opacity-35"
          aria-hidden="true"
        />
        <WaveEdge position="top" />
        
        <div className="relative z-10">
          <Comparison />
          <TestimonialsCarousel />
          <FAQ />
        </div>

        <WaveEdge position="bottom" />
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
