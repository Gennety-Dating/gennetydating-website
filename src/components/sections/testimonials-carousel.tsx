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
    <div
      className="relative flex-shrink-0 w-[260px] sm:w-[280px] md:w-[320px]"
      style={{ scrollSnapAlign: "start" }}
    >
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
      <ScriptHighlight className="text-[clamp(2rem,8vw,5rem)]">
        {t("testimonials.title.highlight")}
      </ScriptHighlight>
    </Heading>
  );
}

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const speedRef = useRef(0.5);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion — skip JS autoplay entirely
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let scrollPos = 0;

    function animate() {
      if (!container) return;
      if (!isPausedRef.current) {
        scrollPos += speedRef.current;
        const halfWidth = container.scrollWidth / 2;
        if (scrollPos >= halfWidth) scrollPos = 0;
        container.scrollLeft = scrollPos;
      }
      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => { isPausedRef.current = true; };
    const handleMouseLeave = () => { isPausedRef.current = false; };
    // Pause on touch — let native scroll-snap take over
    const handleTouchStart = () => { isPausedRef.current = true; };
    const handleTouchEnd = () => {
      // Resume after a short delay so snap can settle
      setTimeout(() => { isPausedRef.current = false; }, 1500);
    };
    // Pause when any child receives focus (keyboard nav)
    const handleFocusIn = () => { isPausedRef.current = true; };
    const handleFocusOut = () => { isPausedRef.current = false; };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);

    return () => {
      cancelAnimationFrame(animationRef.current);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  // Duplicate testimonials for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-[var(--section-y)] overflow-hidden">
      <div className="text-center mb-16 px-4">
        <TestimonialsHeading />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-8 pb-12 pl-4 md:pl-10 overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          /* Snap for touch devices — smooth swipe between cards */
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
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
