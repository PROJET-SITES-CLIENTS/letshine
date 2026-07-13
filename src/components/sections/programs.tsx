"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { X, Target, Users, TrendingUp, Image as ImageIcon, Video, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { programs, type Program } from "@/lib/data";

export function Programs() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [selected, setSelected] = useState<Program | null>(null);

  return (
    <SectionReveal id="programs" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0A1929] via-[#0d152b] to-[#0A1929]">
      <div className="absolute top-20 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-yellow-500/8 to-amber-600/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-600/10 to-indigo-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Icons.Sparkles className="w-3.5 h-3.5" />
            {t("programs.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("programs.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("programs.subtitle")}
          </motion.p>
        </div>

        {/* Programs grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programs.map((p, i) => {
            const Icon = (Icons as any)[p.icon] ?? Icons.Sparkles;
            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelected(p)}
                className="group relative text-left glass rounded-3xl p-6 hover:border-yellow-400/40 transition-all duration-500 card-shine overflow-hidden"
              >
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${p.gradient} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  {p.title[loc]}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">{p.short[loc]}</p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                  <span>{t("cta.learnMore")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Program detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d152b] border border-yellow-400/25 pointer-events-auto shadow-2xl"
              >
                {/* Header */}
                <div className={`relative p-8 bg-gradient-to-br ${selected.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-[#0A1929]/60" />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-5 right-5 z-10 p-2 rounded-lg bg-black/30 hover:bg-black/50 text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="relative flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                      {(() => { const Icon = (Icons as any)[selected.icon] ?? Icons.Sparkles; return <Icon className="w-8 h-8 text-white" />; })()}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">{selected.title[loc]}</h3>
                      <p className="text-white/80 text-sm">{selected.short[loc]}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-7">
                  {/* Description */}
                  <div>
                    <p className="text-slate-300 leading-relaxed">{selected.description[loc]}</p>
                  </div>

                  {/* Objectives */}
                  <div>
                    <h4 className="flex items-center gap-2 font-display font-bold text-white mb-4">
                      <Target className="w-5 h-5 text-yellow-400" />
                      {t("programs.objectives")}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selected.objectives[loc].map((o, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300">{o}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Target audience */}
                  <div>
                    <h4 className="flex items-center gap-2 font-display font-bold text-white mb-3">
                      <Users className="w-5 h-5 text-yellow-400" />
                      {t("programs.target")}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      {selected.target[loc]}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="flex items-center gap-2 font-display font-bold text-white mb-4">
                      <TrendingUp className="w-5 h-5 text-yellow-400" />
                      {t("programs.results")}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selected.results[loc].map((r, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 rounded-xl bg-gradient-to-br from-yellow-400/10 to-amber-500/5 border border-yellow-400/20"
                        >
                          <p className="text-sm font-semibold text-yellow-300">{r}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery & Videos placeholders */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <h4 className="flex items-center gap-2 font-display font-bold text-white text-sm mb-3">
                        <ImageIcon className="w-4 h-4 text-yellow-400" />
                        {t("programs.gallery")}
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${selected.gradient} opacity-60 hover:opacity-100 transition-opacity cursor-pointer`} />
                        ))}
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <h4 className="flex items-center gap-2 font-display font-bold text-white text-sm mb-3">
                        <Video className="w-4 h-4 text-yellow-400" />
                        {t("programs.videos")}
                      </h4>
                      <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selected.gradient} flex items-center justify-center flex-shrink-0`}>
                              <Video className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="h-2 w-3/4 rounded-full bg-white/10 mb-1" />
                              <div className="h-2 w-1/2 rounded-full bg-white/5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full btn-shine py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2">
                    <Icons.UserPlus className="w-5 h-5" />
                    {t("programs.register")}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
