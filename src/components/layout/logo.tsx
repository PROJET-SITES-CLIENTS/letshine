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

export function LetsShineLogo({ size = 44, withText = true, withSlogan = false, className = "", animated = true, variant = "light" }: Props) {
  const textColor = variant === "light" ? "text-slate-900" : "text-white";
  const subColor = variant === "light" ? "text-slate-500" : "text-slate-400";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        initial={animated ? { rotate: -20, opacity: 0, scale: 0.7 } : false}
        animate={animated ? { rotate: 0, opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={animated ? { scale: 1.08, rotate: 5 } : {}}
      >
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="ls-ring-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffd700" />
              <stop offset="0.5" stopColor="#ffc107" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
            <radialGradient id="ls-glow" cx="32" cy="32" r="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffd700" stopOpacity="0.4" />
              <stop offset="1" stopColor="#ffd700" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ls-figure" x1="20" y1="14" x2="44" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3b5bdb" />
              <stop offset="1" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>

          <circle cx="32" cy="32" r="32" fill="url(#ls-glow)" />
          <circle cx="32" cy="32" r="29" stroke="url(#ls-ring-grad)" strokeWidth="2.5" fill="#ffffff" />
          <g>
            <path d="M32 6 L34 11 L32 14 L30 11 Z" fill="url(#ls-ring-grad)" />
            <circle cx="32" cy="9" r="1.6" fill="#fff8d6" />
          </g>
          <g>
            <circle cx="32" cy="22" r="4.5" fill="url(#ls-figure)" />
            <rect x="30" y="27" width="4" height="14" rx="2" fill="url(#ls-figure)" />
            <path d="M30 30 L20 38 L22 40 L32 33 Z" fill="url(#ls-figure)" />
            <path d="M34 30 L44 38 L42 40 L32 33 Z" fill="url(#ls-figure)" />
            <rect x="29" y="40" width="3" height="12" rx="1.5" fill="url(#ls-figure)" />
            <rect x="32" y="40" width="3" height="12" rx="1.5" fill="url(#ls-figure)" />
          </g>
          <g stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
            <line x1="14" y1="14" x2="17" y2="17" />
            <line x1="50" y1="14" x2="47" y2="17" />
            <line x1="14" y1="50" x2="17" y2="47" />
            <line x1="50" y1="50" x2="47" y2="47" />
          </g>
        </svg>
      </motion.div>

      {withText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-extrabold text-xl tracking-tight ${textColor}`}>
            LET'S <span className="text-gold-gradient">SHINE</span>
          </span>
          {withSlogan && (
            <span className={`text-[10px] uppercase tracking-[0.25em] ${subColor} mt-1 font-medium`}>
              Brighter Day for Everyone
            </span>
          )}
        </div>
      )}
    </div>
  );
}
