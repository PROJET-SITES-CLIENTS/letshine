"use client";

import { motion } from "framer-motion";

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
};

export function SectionHeader({ badge, title, subtitle, align = "center", variant = "light" }: Props) {
  const isCenter = align === "center";
  const titleColor = variant === "light" ? "text-[#003366]" : "text-white";
  const subColor = variant === "light" ? "text-[#5C6573]" : "text-slate-300";

  return (
    <div className={`mb-14 md:mb-20 ${isCenter ? "text-center" : "text-left"}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-3 mb-5 ${isCenter ? "justify-center" : ""}`}
        >
          <span className="block w-8 h-px bg-gradient-to-r from-transparent to-[#FFD700]" />
          <span className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${variant === "light" ? "text-[#B8860B]" : "text-[#FFD700]"}`}>
            {badge}
          </span>
          <span className="block w-8 h-px bg-gradient-to-l from-transparent to-[#FFD700]" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${titleColor} ${isCenter ? "max-w-3xl mx-auto" : "max-w-2xl"} leading-[1.1] tracking-tight mb-5`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`${subColor} ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"} text-base md:text-[17px] leading-relaxed font-light`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
