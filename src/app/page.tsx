import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TheDifference } from "@/components/sections/the-difference";
import { Matchmaker } from "@/components/sections/matchmaker";
import { SlideshowBg } from "@/components/sections/slideshow-bg";
import { Comparison } from "@/components/sections/comparison";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { OurMission } from "@/components/sections/our-mission";
import { FAQ } from "@/components/sections/faq";
import { Marquee } from "@/components/sections/marquee";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight text-white">
      <Navbar />
      <div id="light-section" className="bg-[#1A1A1A] text-white relative z-10">
        <Hero />
        <HowItWorks />
      </div>
      <div className="relative overflow-clip">
        {/* Slideshow background wrapper for Matchmaker & TheDifference */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <SlideshowBg />
        </div>
        <div className="relative z-10">
          <Matchmaker />
          <TheDifference />
        </div>
      </div>
      <div className="relative overflow-clip">
        {/* Sticky background wrapper for Comparison & Testimonials sections */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-[url('/images/verified-safety-bg.jpg')] bg-cover bg-center opacity-35 filter blur-[12px] scale-110" 
              aria-hidden="true"
            />
          </div>
        </div>
        {/* Edge blending gradients */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-midnight to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midnight to-transparent pointer-events-none z-10" />
        
        <div className="relative z-10">
          <Comparison />
          <TestimonialsCarousel />
        </div>
      </div>
      <div className="relative overflow-clip">
        {/* Sticky background wrapper for OurMission and FAQ */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-[url('/images/faq-bg.jpg')] bg-cover bg-center filter blur-[6px] scale-105 opacity-65" 
              aria-hidden="true"
            />
            {/* Затемняющий оверлей для идеального контраста и интеграции в темную тему */}
            <div className="absolute inset-0 bg-[#111111]/40" />
          </div>
        </div>

        {/* Верхний волнообразный край (Postage Stamp Wavy Top Edge) */}
        <svg className="absolute top-0 left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-stamp-teeth-top" width="37" height="15" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 37 0 C 30.5 0, 25 15, 18.5 15 C 12 15, 6.5 0, 0 0 Z" fill="#050505" />
            </pattern>
          </defs>
          <rect width="100%" height="15" fill="url(#faq-stamp-teeth-top)" />
        </svg>

        {/* Нижний волнообразный край (Postage Stamp Wavy Bottom Edge) */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-[15px] z-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-stamp-teeth-bottom" width="37" height="15" patternUnits="userSpaceOnUse">
              <path d="M 0 15 L 37 15 C 30.5 15, 25 0, 18.5 0 C 12 0, 6.5 15, 0 15 Z" fill="#1A1A1A" />
            </pattern>
          </defs>
          <rect width="100%" height="15" fill="url(#faq-stamp-teeth-bottom)" />
        </svg>

        <div className="relative z-10">
          <OurMission />
          <FAQ />
          <Marquee />
        </div>
      </div>
      <div id="light-section-bottom" className="bg-[#1A1A1A] text-white relative z-10">
        <Footer theme="dark" />
      </div>
    </main>
  );
}
