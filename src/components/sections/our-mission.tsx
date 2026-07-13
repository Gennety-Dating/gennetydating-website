"use client";

import { motion } from "framer-motion";

export function OurMission() {
  return (
    <section
      className="py-[120px] px-4 md:px-10 relative overflow-clip bg-transparent flex flex-col justify-center items-center"
    >
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Animated Polaroid/Scrapbook Scroll Element */}
        <motion.div
          initial={{ opacity: 0, y: 25, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[450px] aspect-[2/3] mx-auto select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter"
        >
          {/* Scroll Background Image with baked-in text */}
          <img
            src="/images/mission-scroll.png"
            alt="Our Mission"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}

