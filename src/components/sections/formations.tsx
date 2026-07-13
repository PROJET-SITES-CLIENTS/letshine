"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Star, Clock, Signal, Globe, MapPin, Award, Users, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { formations, type Formation } from "@/lib/data";

export function Formations() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Formation | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(formations.map((f) => f.category[loc]));
    return ["all", ...Array.from(cats)];
  }, [loc]);

  const filtered = filter === "all" ? formations : formations.filter((f) => f.category[loc] === filter);

  const formatPrice = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " GNF";

  return (
    <SectionReveal id="formations" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-[35rem] h-[35rem] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-gradient-to-br from-amber-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Icons.GraduationCap className="w-3.5 h-3.5" />
            {t("formations.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("formations.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("formations.subtitle")}
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === c
                  ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-yellow-400/20"
                  : "glass text-slate-300 hover:text-yellow-300 hover:border-yellow-400/30"
              }`}
            >
              {c === "all" ? t("formations.all") : c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((f, i) => {
              const Icon = (Icons as any)[f.icon] ?? Icons.BookOpen;
              return (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative glass rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelected(f)}
                >
                  {f.popular && (
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-[10px] font-bold uppercase tracking-wide">
                      Popular
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/10 border border-yellow-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{f.category[loc]}</span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-yellow-400">{f.rating}</span>
                          <span>·</span>
                          <span>{f.students} {t("member.trainings").toLowerCase()}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-yellow-300 transition-colors line-clamp-2 min-h-[3.5rem]">
                      {f.title[loc]}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">{f.description[loc]}</p>

                    <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" />{f.duration[loc]}</span>
                      <span className="flex items-center gap-1.5"><Signal className="w-3.5 h-3.5 text-purple-400" />{f.level}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {f.mode.includes("online") && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 text-[10px] font-semibold flex items-center gap-1">
                          <Globe className="w-3 h-3" />{t("formations.online")}
                        </span>
                      )}
                      {f.mode.includes("offline") && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{t("formations.offline")}
                        </span>
                      )}
                      {f.certificate && (
                        <span className="px-2 py-0.5 rounded-md bg-yellow-500/15 text-yellow-300 text-[10px] font-semibold flex items-center gap-1">
                          <Award className="w-3 h-3" />{t("formations.certificate")}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">{t("shop.price")}</div>
                        <div className="font-display font-bold text-yellow-400 text-lg">{formatPrice(f.price)}</div>
                      </div>
                      <button className="px-4 py-2 rounded-lg btn-shine text-sm font-bold flex items-center gap-1.5">
                        {t("cta.subscribe")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Formation detail modal */}
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
                className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d152b] border border-yellow-400/25 pointer-events-auto shadow-2xl"
              >
                <div className="relative p-8 bg-gradient-to-br from-blue-600/30 via-indigo-700/20 to-purple-700/20 border-b border-white/5">
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-5 right-5 p-2 rounded-lg bg-black/30 hover:bg-black/50 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  {(() => { const Icon = (Icons as any)[selected.icon] ?? Icons.BookOpen; return (
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  ); })()}
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{selected.title[loc]}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-yellow-300"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{selected.rating}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-300">{selected.students} étudiants</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-300">{selected.level}</span>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <p className="text-slate-300 leading-relaxed">{selected.description[loc]}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-xs text-slate-500 uppercase mb-1">{t("formations.duration")}</div>
                      <div className="font-semibold text-white text-sm">{selected.duration[loc]}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-xs text-slate-500 uppercase mb-1">{t("formations.level")}</div>
                      <div className="font-semibold text-white text-sm">{selected.level}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-white mb-3">{t("formations.program")}</h4>
                    <div className="space-y-2">
                      {selected.program[loc].map((p, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <span className="text-sm text-slate-300">{p}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {selected.certificate && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-400/10 to-amber-500/5 border border-yellow-400/20">
                      <Award className="w-6 h-6 text-yellow-400" />
                      <div>
                        <div className="font-semibold text-yellow-300 text-sm">{t("formations.certificate")}</div>
                        <div className="text-xs text-slate-400">Certificat reconnu à l'issue de la formation</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <div className="text-xs text-slate-500 uppercase">{t("shop.price")}</div>
                      <div className="font-display font-bold text-yellow-400 text-2xl">{formatPrice(selected.price)}</div>
                    </div>
                    <button className="btn-shine px-8 py-3.5 rounded-xl font-bold flex items-center gap-2">
                      {t("cta.subscribe")}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
