"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[9999]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #FFD700, #FFC107, #FFC107, #1E3A5F, #003366)",
        boxShadow: "0 0 12px rgba(255, 215, 0, 0.6)",
      }}
    />
  );
}
