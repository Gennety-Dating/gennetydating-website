import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TheDifference } from "@/components/sections/the-difference";
import { Matchmaker } from "@/components/sections/matchmaker";
import { Comparison } from "@/components/sections/comparison";
import { Safety } from "@/components/sections/safety";
import { FAQ } from "@/components/sections/faq";
import { Marquee } from "@/components/sections/marquee";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Matchmaker />
      <div className="relative overflow-hidden">
        {/* Blurred background image for TheDifference, Comparison & Safety sections */}
        <div 
          className="absolute inset-0 bg-[url('/images/verified-safety-bg.jpg')] bg-cover bg-center bg-fixed opacity-20 pointer-events-none filter blur-[12px] scale-110" 
          aria-hidden="true"
        />
        {/* Edge blending gradients */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-midnight to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midnight to-transparent pointer-events-none" />
        
        <TheDifference />
        <Comparison />
        <Safety />
      </div>
      <FAQ />
      <Marquee />
      <Footer />
    </main>
  );
}
