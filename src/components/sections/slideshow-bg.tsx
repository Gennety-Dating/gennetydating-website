"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const backgroundImages = [
  "/images/matchmaker-bg-1.jpg",
  "/images/matchmaker-bg-2.jpg",
  "/images/matchmaker-bg-3.jpg",
  "/images/matchmaker-bg-4.jpg",
  "/images/matchmaker-bg-5.jpg",
  "/images/matchmaker-bg-6.jpg",
  "/images/matchmaker-bg-7.jpg",
  "/images/matchmaker-bg-8.jpg",
  "/images/matchmaker-bg-9.jpg",
  "/images/matchmaker-bg-10.jpg",
];

export function SlideshowBg() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(bgTimer);
  }, []);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden" aria-hidden="true">
      {backgroundImages.map((src, index) => (
        <motion.div
          key={src}
          initial={{ opacity: index === 0 ? 0.65 : 0 }}
          animate={{ opacity: index === bgIndex ? 0.65 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none filter blur-[4px] scale-105"
        >
          <Image
            src={src}
            alt="Slideshow background"
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ))}
      {/* Затемняющий оверлей для идеального контраста и интеграции в темную тему */}
      <div className="absolute inset-0 bg-[#111111]/45 z-10" />
    </div>
  );
}
