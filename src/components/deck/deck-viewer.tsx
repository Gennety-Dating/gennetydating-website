"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { DECK_PDF, DECK_SLIDES, deckSlideSrc } from "@/lib/deck-content";
import { deckTracker } from "@/lib/deck-tracker";
import styles from "./deck.module.css";

type NavMethod = "button" | "key" | "tap" | "swipe" | "thumb";

/** Slide-by-slide deck with thumbnails, keyboard and swipe navigation and a full-screen mode. */
export function DeckViewer() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const section = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLOListElement>(null);
  const inView = useRef(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const count = DECK_SLIDES.length;

  const go = useCallback((next: number, method: NavMethod) => {
    const clamped = Math.max(0, Math.min(count - 1, next));
    if (clamped === index) return;
    deckTracker.track("slide_nav", method, clamped + 1);
    setIndex(clamped);
  }, [count, index]);

  useEffect(() => {
    deckTracker.setSlide(index);
    const thumb = strip.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.intersectionRatio > 0.5;
    }, { threshold: [0, 0.5, 1] });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const setFullscreen = useCallback((value: boolean) => {
    setOpen(value);
    deckTracker.setDeckFullscreen(value);
    deckTracker.track(value ? "fullscreen" : "fullscreen_exit", undefined, index + 1);
  }, [index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!open && !inView.current) return;
      if (event.target instanceof HTMLElement && /^(INPUT|TEXTAREA|VIDEO)$/.test(event.target.tagName)) return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || (open && event.key === " ")) {
        event.preventDefault();
        go(index + 1, "key");
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(index - 1, "key");
      } else if (event.key === "Escape" && open) {
        setFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, open, setFullscreen]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const onPointerDown = (event: React.PointerEvent) => {
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(index + (dx < 0 ? 1 : -1), "swipe");
      return;
    }
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      const box = event.currentTarget.getBoundingClientRect();
      go(index + (event.clientX - box.left < box.width * 0.35 ? -1 : 1), "tap");
    }
  };

  const stage = (
    <div
      className={styles.stage}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} of ${count}: ${DECK_SLIDES[index]}`}
    >
      {DECK_SLIDES.map((title, i) => (
        <Image
          key={title}
          src={deckSlideSrc(i)}
          alt={`Slide ${i + 1}: ${title}`}
          width={2400}
          height={1350}
          unoptimized
          priority={i === 0}
          loading={i === 0 ? undefined : Math.abs(i - index) <= 1 ? "eager" : "lazy"}
          className={styles.slide}
          data-active={i === index}
          draggable={false}
        />
      ))}
    </div>
  );

  const controls = (
    <div className={styles.deckControls}>
      <button type="button" onClick={() => go(index - 1, "button")} disabled={index === 0} aria-label="Previous slide">
        <ChevronLeft aria-hidden="true" />
      </button>
      <p className={styles.counter} aria-live="polite">
        <span>{index + 1}</span> of {count}
        <span className={styles.slideTitle}>{DECK_SLIDES[index]}</span>
      </p>
      <button type="button" onClick={() => go(index + 1, "button")} disabled={index === count - 1} aria-label="Next slide">
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <div ref={section}>
      <div className={styles.blockHead}>
        <h2 id="deck-heading">The deck</h2>
        <p className={styles.deckLinks}>
          <button type="button" className={styles.textButton} onClick={() => setFullscreen(true)}>
            <Maximize2 aria-hidden="true" /> Full screen
          </button>
          <a href={DECK_PDF} download data-track="download:deck" data-event="download">
            Download PDF
          </a>
        </p>
      </div>

      {!open && stage}
      {!open && controls}

      <ol ref={strip} className={styles.thumbs} aria-label="All slides">
        {DECK_SLIDES.map((title, i) => (
          <li key={title}>
            <button
              type="button"
              onClick={() => go(i, "thumb")}
              aria-label={`Go to slide ${i + 1}: ${title}`}
              aria-current={i === index}
              className={styles.thumb}
            >
              <Image src={deckSlideSrc(i, true)} alt="" width={480} height={270} unoptimized loading="lazy" />
            </button>
          </li>
        ))}
      </ol>

      {open && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Deck, full screen">
          <button type="button" className={styles.close} onClick={() => setFullscreen(false)} aria-label="Close full screen">
            <X aria-hidden="true" />
          </button>
          {stage}
          {controls}
        </div>
      )}
    </div>
  );
}
