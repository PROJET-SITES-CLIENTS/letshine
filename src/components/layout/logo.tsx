"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  size?: number;
  withText?: boolean;
  withSlogan?: boolean;
  className?: string;
  animated?: boolean;
  variant?: "light" | "dark";
};

export function LetsShineLogo({ size = 38, className = "", animated = true }: Props) {
  // Le nouveau logo.jpg contient déjà le texte et le slogan.
  // On ajuste la taille car l'ancien 'size' correspondait uniquement à l'icône.
  const displayHeight = size * 1.5; 

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="relative flex items-center justify-center"
        initial={animated ? { opacity: 0, scale: 0.95 } : false}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={animated ? { scale: 1.02 } : {}}
      >
        <img 
          src="/logo.jpg" 
          alt="LET'S SHINE Logo" 
          style={{ height: `${displayHeight}px`, width: 'auto' }}
          className="object-contain rounded-md"
        />
      </motion.div>
    </div>
  );
}
