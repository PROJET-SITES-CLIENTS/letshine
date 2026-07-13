"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Heart, ShoppingBag, Users, Sparkles, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { ParticleField } from "@/components/effects/particle-field";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { stats } from "@/lib/data";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const ctas = [
    { key: "cta.join", icon: Users, primary: true, target: "member" },
    { key: "cta.discover", icon: Sparkles, primary: false, target: "programs" },
    { key: "cta.partner", icon: Heart, primary: false, target: "partners" },
    { key: "cta.donate", icon: Heart, primary: false, target: "donate" },
    { key: "cta.shop", icon: ShoppingBag, primary: false, target: "shop" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0f1e] noise-overlay"
    >
      {/* Background layers */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-[#0d152b] to-[#0a0f1e]" />
        <AuroraBackground />
        <ParticleField density={45} />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(10,15,30,0.9) 100%)" }} />
      </motion.div>

      {/* Animated light beam */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[60vh] bg-gradient-to-b from-yellow-300/0 via-yellow-300/40 to-yellow-300/0"
        animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.8, 1.1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 pb-20 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-yellow mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-yellow-300">
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-6"
        >
          <span className="block text-white">{t("hero.title1")}</span>
          <span className="block text-shine-gradient animate-count-glow mt-2">{t("hero.title2")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300/90 leading-relaxed mb-10 font-light"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-20"
        >
          {ctas.map((cta, i) => {
            const Icon = cta.icon;
            return (
              <motion.button
                key={cta.key}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo(cta.target)}
                className={cta.primary ? "btn-shine group px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2" : "btn-outline-shine px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2"}
              >
                <Icon className="w-4 h-4" />
                <span>{t(cta.key)}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.key}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-5 md:p-6 hover:border-yellow-400/40 transition-all duration-300 card-shine">
                <div className="text-3xl md:text-4xl font-extrabold text-shine-gradient font-display mb-1">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wide">
                  {t(s.key)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{t("hero.scroll")}</span>
        <div className="relative w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
          <span className="block w-1 h-2 rounded-full bg-yellow-400 animate-scroll-down" />
        </div>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent pointer-events-none z-[5]" />
    </section>
  );
}
