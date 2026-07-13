"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-30"
        style={{ background: "radial-gradient(circle, #FFD700, transparent 70%)" }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[35rem] h-[35rem] rounded-full blur-[120px] opacity-30"
        style={{ background: "radial-gradient(circle, #1E3A5F, transparent 70%)" }}
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 80, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 w-[45rem] h-[45rem] rounded-full blur-[140px] opacity-25"
        style={{ background: "radial-gradient(circle, #FFC107, transparent 70%)" }}
        animate={{
          x: [0, 60, -50, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
