import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { RealDates } from "@/components/sections/real-dates";
import { Matchmaker } from "@/components/sections/matchmaker";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
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
      <RealDates />
      <Matchmaker />
      <TestimonialsCarousel />
      <Comparison />
      <Safety />
      <FAQ />
      <Marquee />
      <Footer />
    </main>
  );
}
