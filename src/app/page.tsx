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
    <main className="min-h-screen bg-midnight text-white">
      <Navbar />
      
      {/* Hero section with grey background */}
      <div className="relative overflow-clip text-white z-10 bg-[#1A1A1A]">
        <Hero />
      </div>

      {/* HowItWorks & Matchmaker sections sharing the photo background */}
      <div className="relative overflow-clip text-white z-10 bg-[#111111]">
        {/*
          This is kept sticky so the content scrolls over a static photo. Dynamic
          viewport units follow mobile browser chrome without exposing the page
          canvas above or below the image.
        */}
        <div
          className="sticky top-0 z-0 -mb-[100dvh] h-[100dvh] min-h-[100svh] w-full overflow-hidden pointer-events-none"
          style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
          aria-hidden="true"
        >
          <div 
            className="absolute -inset-8 bg-[#111111] bg-[url('/images/matchmaker-works-bg.jpg')] bg-cover bg-center opacity-55 blur-[8px]" 
            style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-[#111111]/45" />
        </div>

        {/* Wavy transition from Hero (grey #1A1A1A) to HowItWorks (Photo) */}
        <svg className="absolute -top-[1px] left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="how-it-works-stamp-teeth-top" width="37" height="15" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z" fill="#1A1A1A" />
            </pattern>
          </defs>
          <rect width="100%" height="15" fill="url(#how-it-works-stamp-teeth-top)" />
        </svg>

        <div className="relative z-10">
          <HowItWorks />
          <Matchmaker />
        </div>

        {/* Bottom wavy edge (Postage Stamp Wavy Bottom Edge) to transition to TheDifference (grey #1A1A1A) */}
        <svg className="absolute -bottom-[1px] left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="matchmaker-stamp-teeth-bottom" width="37" height="15" patternUnits="userSpaceOnUse">
              <path d="M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z" fill="#1A1A1A" />
            </pattern>
          </defs>
          <rect width="100%" height="15" fill="url(#matchmaker-stamp-teeth-bottom)" />
        </svg>
      </div>

      {/* TheDifference section with grey background */}
      <div className="relative z-10 text-white bg-[#1A1A1A]">
        <TheDifference />
      </div>

      {/* Comparison, Testimonials & FAQ container */}
      <div className="relative overflow-clip bg-[#111111]">
        {/* A sticky viewport layer preserves the fixed-photo effect without viewport gaps. */}
        <div
          className="sticky top-0 z-0 -mb-[100dvh] h-[100dvh] min-h-[100svh] w-full overflow-hidden pointer-events-none"
          style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
          aria-hidden="true"
        >
          <div 
            className="absolute -inset-10 bg-[#111111] bg-[url('/images/matchmaker-bg-1.jpg')] bg-cover bg-center opacity-35 blur-[12px]" 
            style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
          />
        </div>
        {/* Wavy transition from TheDifference (grey #1A1A1A) to Comparison (Photo) */}
        <svg className="absolute -top-[1px] left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="comparison-stamp-teeth-top" width="37" height="15" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z" fill="#1A1A1A" />
            </pattern>
          </defs>
          <rect width="100%" height="15" fill="url(#comparison-stamp-teeth-top)" />
        </svg>
        
        <div className="relative z-10">
          <Comparison />
          <TestimonialsCarousel />
          <FAQ />
        </div>

        {/* Bottom wavy edge (Postage Stamp Wavy Bottom Edge) to transition to FAQ (grey #1A1A1A) */}
        <svg className="absolute -bottom-[1px] left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-stamp-teeth-bottom" width="37" height="15" patternUnits="userSpaceOnUse">
              <path d="M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z" fill="#1A1A1A" />
            </pattern>
          </defs>
          <rect width="100%" height="15" fill="url(#faq-stamp-teeth-bottom)" />
        </svg>
      </div>

      {/* Marquee container with grey background */}
      <div className="relative overflow-clip bg-[#1A1A1A] text-white">
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
