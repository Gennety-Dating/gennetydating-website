"use client";

import { useRef, useEffect } from "react";
import { testimonials } from "@/lib/data";
import { Heading, ScriptHighlight } from "@/components/ui/typography";
import { MessageBubble } from "@/components/ui/message-bubble";
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
    <div className="relative flex-shrink-0 w-[280px] md:w-[320px]">
      {/* Square photo placeholder */}
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-magenta/10 via-midnight to-magenta/5 flex items-center justify-center">
        <span className="text-6xl select-none opacity-60" aria-hidden="true">
          😊
        </span>
      </div>

      {/* iMessage bubble overlapping photo */}
      <div className="absolute -bottom-8 left-3 right-3">
        <MessageBubble variant="dark" tail="left">
          <p className="text-white text-sm leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="mt-2 text-xs text-gray-400 font-medium">
            {name}{" "}
            <span className="text-magenta">@{school}</span>
          </p>
        </MessageBubble>
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
