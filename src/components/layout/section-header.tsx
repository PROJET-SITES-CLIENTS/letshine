"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
};

export function SectionHeader({ badge, title, subtitle, align = "center", variant = "light" }: Props) {
  const isCenter = align === "center";
  const titleColor = variant === "light" ? "text-slate-900" : "text-white";
  const subColor = variant === "light" ? "text-slate-600" : "text-slate-300";
  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? "text-center" : "text-left"}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${
            variant === "light"
              ? "bg-yellow-50 border border-yellow-500/30 text-amber-700"
              : "glass-yellow text-yellow-300"
          } text-xs font-bold uppercase tracking-widest mb-4`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`font-display text-3xl md:text-5xl lg:text-6xl font-extrabold ${titleColor} ${isCenter ? "max-w-4xl mx-auto" : ""} leading-tight mb-4`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`${subColor} ${isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"} text-base md:text-lg leading-relaxed`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
