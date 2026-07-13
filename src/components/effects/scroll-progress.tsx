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
        background: "linear-gradient(90deg, #ffd700, #ffc107, #f59e0b, #3b5bdb, #1e3a8a)",
        boxShadow: "0 0 12px rgba(255, 215, 0, 0.6)",
      }}
    />
  );
}
