"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backgroundImages = [
  "/images/matchmaker-bg-1.jpg",
  "/images/matchmaker-bg-2.jpg",
  "/images/matchmaker-bg-3.jpg",
  "/images/matchmaker-bg-4.jpg",
  "/images/matchmaker-bg-8.jpg",
  "/images/matchmaker-bg-10.jpg",
  "/images/matchmaker-bg-12.jpg",
  "/images/matchmaker-bg-14.jpg",
  "/images/matchmaker-bg-15.jpg",
];

export function SlideshowBg() {
  const [bgIndex, setBgIndex] = useState(0);

  // Preload images client-side
  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(bgTimer);
  }, []);

  const currentImage = backgroundImages[bgIndex];

  return (
    <div className="sticky -top-[250px] h-[calc(100vh+500px)] w-full overflow-hidden bg-midnight" aria-hidden="true">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none filter blur-[4px] scale-105"
        >
          <img
            src={currentImage}
            alt="Slideshow background"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {/* Затемняющий оверлей для идеального контраста и интеграции в темную тему */}
      <div className="absolute inset-0 bg-[#111111]/45 z-10" />
    </div>
  );
}
