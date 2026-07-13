"use client";

import { motion } from "framer-motion";

type Props = {
  size?: number;
  withText?: boolean;
  withSlogan?: boolean;
  className?: string;
  animated?: boolean;
  variant?: "light" | "dark";
};

export function LetsShineLogo({ size = 38, withText = true, withSlogan = false, className = "", animated = true, variant = "light" }: Props) {
  const textColor = variant === "light" ? "text-[#003366]" : "text-white";
  const subColor = variant === "light" ? "text-[#5C6573]" : "text-slate-400";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        initial={animated ? { opacity: 0, scale: 0.85 } : false}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={animated ? { scale: 1.05 } : {}}
      >
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="ls-ring-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFD700" />
              <stop offset="0.5" stopColor="#FFC107" />
              <stop offset="1" stopColor="#FFD700" />
            </linearGradient>
            <linearGradient id="ls-figure" x1="20" y1="14" x2="44" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1E3A5F" />
              <stop offset="1" stopColor="#003366" />
            </linearGradient>
          </defs>

          {/* Outer ring - thinner, more elegant */}
          <circle cx="32" cy="32" r="29" stroke="url(#ls-ring-grad)" strokeWidth="1.5" fill="#ffffff" />

          {/* Light bulb accent - smaller, refined */}
          <g>
            <path d="M32 7 L33.5 11 L32 13 L30.5 11 Z" fill="url(#ls-ring-grad)" />
            <circle cx="32" cy="9.5" r="1.2" fill="#FFEB3B" />
          </g>

          {/* Human figure - refined proportions */}
          <g>
            <circle cx="32" cy="22" r="4" fill="url(#ls-figure)" />
            <rect x="30.2" y="27" width="3.6" height="14" rx="1.8" fill="url(#ls-figure)" />
            <path d="M30.2 30 L20.5 38 L21.8 39.5 L32 33 Z" fill="url(#ls-figure)" />
            <path d="M33.8 30 L43.5 38 L42.2 39.5 L32 33 Z" fill="url(#ls-figure)" />
            <rect x="29.3" y="40" width="2.6" height="12" rx="1.3" fill="url(#ls-figure)" />
            <rect x="32.1" y="40" width="2.6" height="12" rx="1.3" fill="url(#ls-figure)" />
          </g>

          {/* Subtle rays */}
          <g stroke="#FFD700" strokeWidth="0.8" strokeLinecap="round" opacity="0.6">
            <line x1="14" y1="14" x2="17" y2="17" />
            <line x1="50" y1="14" x2="47" y2="17" />
            <line x1="14" y1="50" x2="17" y2="47" />
            <line x1="50" y1="50" x2="47" y2="47" />
          </g>
        </svg>
      </motion.div>

      {withText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-bold text-lg tracking-tight ${textColor}`}>
            LET'S <span className="text-gold-gradient">SHINE</span>
          </span>
          {withSlogan && (
            <span className={`text-[9px] uppercase tracking-[0.28em] ${subColor} mt-1.5 font-medium`}>
              Brighter Day for Everyone
            </span>
          )}
        </div>
      )}
    </div>
  );
}
