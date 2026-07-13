"use client";

import { useRef, useEffect } from "react";
import { testimonials } from "@/lib/data";
import { Heading, ScriptHighlight } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const testimonialImages = [
  "/images/testimonial-ali.jpg",
  "/images/testimonial-leo.jpg",
  "/images/testimonial-mars.jpg",
  "/images/testimonial-sophia.jpg",
  "/images/testimonial-justin.jpg",
  "/images/testimonial-hotdog.jpg",
  "/images/testimonial-walk.jpg",
  "/images/testimonial-clasped.jpg",
  "/images/testimonial-leo-sweet.jpg",
];

const testimonialRotations = [
  "rotate-[-2deg] sm:rotate-[-2.5deg]",
  "rotate-[1deg] sm:rotate-[1.5deg]",
  "rotate-[-1.2deg] sm:rotate-[-1deg]",
  "rotate-[2deg] sm:rotate-[2.5deg]",
  "rotate-[-1.5deg] sm:rotate-[-1.8deg]",
  "rotate-[1.3deg] sm:rotate-[1.8deg]",
  "rotate-[-2.2deg] sm:rotate-[-2.5deg]",
  "rotate-[1.5deg] sm:rotate-[2deg]",
  "rotate-[-1.2deg] sm:rotate-[-1.5deg]",
];

const testimonialReactions = [
  "heart", // Ali
  "fire",  // Leo
  "like",  // Mars
  "heart", // Sophia
  "star",  // Justin
  "like",  // Maya
  "fire",  // Lucas
  "heart", // Elena
  "star",  // Dan
];



function TestimonialCard({
  name,
  school,
  quote,
  image,
  rotationClass,
  reaction,
}: {
  name: string;
  school: string;
  quote: string;
  image: string;
  rotationClass: string;
  reaction: string;
}) {
  return (
    <div className={cn("relative flex-shrink-0 w-[270px] md:w-[300px] h-[370px] md:h-[410px] select-none transition-transform duration-500 hover:scale-[1.03] hover:rotate-0 hover:z-20", rotationClass)}>
      {/* Photo container with sharp corners and no border */}
      <div className="absolute inset-0 rounded-[12px] overflow-hidden bg-[#0A0A0A] shadow-[0_10px_30px_rgba(0,0,0,0.55)] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-700 ease-out"
        />
        {/* Soft dark vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />

      </div>

      {/* Overlapping white fully rounded bubble */}
      <div className="absolute bottom-[-14px] left-3.5 right-3.5 z-10">
        <div className="relative bg-white text-[#111111] p-4 pt-3.5 pb-3.5 rounded-[24px] shadow-[0_12px_28px_rgba(0,0,0,0.3)] text-left">
          
          {/* Reaction Tapback Bubble */}
          <div className="absolute -top-3.5 -right-1 bg-[#0B84FF] text-white rounded-full w-[26px] h-[26px] flex items-center justify-center text-[11px] shadow-md border-2 border-white select-none">
            {reaction === "heart" && "❤️"}
            {reaction === "fire" && "🔥"}
            {reaction === "like" && "👍"}
            {reaction === "star" && "✨"}
          </div>

          {/* Sender Header */}
          <span className="text-[10px] md:text-[11px] font-sans font-medium text-gray-500 mb-1 block uppercase tracking-wider">
            {name} <span className="text-[#8B253B] font-bold">@{school}</span>
          </span>

          {/* Message Text */}
          <p className="text-xs md:text-[13px] leading-snug font-sans font-normal text-[#111111] pr-1">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsHeading() {
  const { t } = useLanguage();
  return (
    <Heading as="h2" className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
      <span className="tracking-tight text-heading-white/90">
        {t("testimonials.title.pre")}
      </span>
      <span className="inline-flex items-center justify-center text-center leading-none bg-white text-[#050505] px-5 py-2.5 rounded-full border border-white/20 shadow-[0_8px_30px_rgba(255,255,255,0.12)] font-script text-3xl md:text-4xl lg:text-5xl rotate-[2.5deg] sm:rotate-[1.5deg] ml-0 sm:ml-2 select-none cursor-default">
        {t("testimonials.title.highlight")}
      </span>
    </Heading>
  );
}

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const speedRef = useRef(0.5);
  const { t } = useLanguage();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPos = 0;

    function animate() {
      if (!container) return;
      scrollPos += speedRef.current;

      // Reset when we've scrolled through the first set
      const halfWidth = container.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }

      container.scrollLeft = scrollPos;
      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover or touch
    const handleMouseEnter = () => {
      speedRef.current = 0;
    };
    const handleMouseLeave = () => {
      speedRef.current = 0.5;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleMouseEnter, { passive: true });
    container.addEventListener("touchend", handleMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleMouseEnter);
      container.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  // Duplicate testimonials for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-[120px] overflow-hidden relative">
      <div className="text-center mb-16 px-4">
        <TestimonialsHeading />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 pb-16 pt-4 pl-4 md:pl-10 overflow-x-auto md:overflow-x-hidden [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none" }}
      >
        {doubled.map((item, i) => {
          const index = i % testimonials.length;
          const image = testimonialImages[index];
          const rotationClass = testimonialRotations[index];
          const reaction = testimonialReactions[index];

          return (
            <TestimonialCard
              key={`${item.name}-${i}`}
              name={item.name}
              school={item.school}
              quote={item.quote}
              image={image}
              rotationClass={rotationClass}
              reaction={reaction}
            />
          );
        })}
      </div>

      {/* Places CTA Button */}
      <div className="mt-8 flex justify-center relative z-10">
        <Button 
          variant="outline" 
          size="sm" 
          href="/places"
          className="cursor-pointer text-xs md:text-sm font-bold tracking-wider border-2 border-white text-white hover:text-black bg-transparent hover:bg-white transition-all duration-300 px-6 py-2.5"
        >
          {t("places.cta")}
        </Button>
      </div>
    </section>
  );
}
