"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { services } from "@/lib/data";

export function Services() {
  const { t } = useLanguage();
  const loc = useLocalized();

  return (
    <SectionReveal id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-gradient-to-br from-emerald-500/8 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Icons.Briefcase className="w-3.5 h-3.5" />
            {t("services.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = (Icons as any)[s.icon] ?? Icons.Star;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className="group relative glass rounded-3xl p-7 hover:border-yellow-400/40 transition-all duration-500 card-shine overflow-hidden"
              >
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${s.gradient} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-yellow-300 transition-colors">
                  {s.title[loc]}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{s.description[loc]}</p>
                <ul className="space-y-2">
                  {s.features[loc].map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
