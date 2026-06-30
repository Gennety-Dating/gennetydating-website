"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Heading, ScriptHighlight } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-context";

function TestimonialCard({
  name,
  school,
  quote,
}: {
  name: string;
  school: string;
  quote: string;
}) {
  return (
    <div className="group relative flex-shrink-0 w-[280px] md:w-[320px] aspect-square rounded-3xl overflow-hidden bg-midnight select-none">
      {/* Photo/Gradient background container */}
      <div className="absolute inset-0 bg-gradient-to-br from-magenta/10 via-midnight to-magenta/5 flex items-center justify-center">
        <span className="text-6xl select-none opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out" aria-hidden="true">
          😊
        </span>
        {/* Soft vignette/shadow overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Floating premium badge */}
      <div className="absolute inset-x-4 bottom-4 z-10">
        <motion.div 
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="w-full p-4 rounded-2xl bg-black/50 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.7)] flex flex-col relative transition-all duration-500 group-hover:bg-black/60"
        >
          {/* Quote text */}
          <p className="text-white text-xs md:text-sm leading-relaxed mb-3 font-normal italic">
            &ldquo;{quote}&rdquo;
          </p>

          {/* Author info */}
          <p className="text-[10px] md:text-xs text-gray-400 font-medium tracking-wide">
            {name}{" "}
            <span className="text-magenta drop-shadow-[0_0_10px_rgba(139,37,59,0.4)] font-semibold">@{school}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function TestimonialsHeading() {
  const { t } = useLanguage();
  return (
    <Heading as="h2">
      {t("testimonials.title.pre")}{" "}
      <ScriptHighlight className="text-4xl md:text-6xl lg:text-7xl">
        {t("testimonials.title.highlight")}
      </ScriptHighlight>
    </Heading>
  );
}

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const speedRef = useRef(0.5);

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

    // Pause on hover
    const handleMouseEnter = () => {
      speedRef.current = 0;
    };
    const handleMouseLeave = () => {
      speedRef.current = 0.5;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicate testimonials for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-[120px] overflow-hidden">
      <div className="text-center mb-16 px-4">
        <TestimonialsHeading />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 pb-12 pl-4 md:pl-10 overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard
            key={`${t.name}-${i}`}
            name={t.name}
            school={t.school}
            quote={t.quote}
          />
        ))}
      </div>
    </section>
  );
}
