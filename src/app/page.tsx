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
      <TheDifference />
      <Matchmaker />
      <Comparison />
      <Safety />
      <FAQ />
      <Marquee />
      <Footer />
    </main>
  );
}
