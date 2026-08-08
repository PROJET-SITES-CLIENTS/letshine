"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Calendar, Clock, ArrowRight, User, Newspaper, Mic, FileText, BookOpen } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { articles, type Article } from "@/lib/data";

export function Actualites() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [filter, setFilter] = useState<string>("all");

  const tagIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    interview: Mic,
    report: FileText,
    press: Newspaper,
    blog: BookOpen,
  };

  const tagFilters = [
    { id: "all", label: t("news.blog") },
    { id: "interview", label: t("news.interviews") },
    { id: "report", label: t("news.reports") },
    { id: "press", label: t("news.press") },
  ];

  const filtered = filter === "all" ? articles : articles.filter((a) => a.tag === filter);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString(loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  const gradientForTag: Record<string, string> = {
    interview: "from-rose-500 to-pink-600",
    report: "from-blue-500 to-indigo-600",
    press: "from-amber-500 to-yellow-600",
    blog: "from-emerald-500 to-teal-600",
  };

  return (
    <SectionReveal id="news" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[35rem] h-[35rem] bg-gradient-to-br from-rose-600/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Newspaper className="w-3.5 h-3.5" />
            {t("news.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("news.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("news.subtitle")}
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tagFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f.id
                  ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900"
                  : "glass text-slate-300 hover:text-yellow-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((a, i) => {
              const TagIcon = tagIcons[a.tag];
              return (
                <motion.article
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group relative glass rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500 cursor-pointer card-shine flex flex-col"
                >
                  {/* Cover */}
                  <div className={`relative h-48 bg-gradient-to-br ${gradientForTag[a.tag]} overflow-hidden`}>
                    <div className="absolute inset-0 bg-[#0A1929]/40" />
                    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                    <TagIcon className="absolute top-4 right-4 w-6 h-6 text-white/70" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wide">
                        {a.category[loc]}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-extrabold text-5xl text-white/30 group-hover:scale-110 transition-transform">
                        {a.category[loc].charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(a.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.readTime} min</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-yellow-300 transition-colors line-clamp-2">
                      {a.title[loc]}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3 flex-1">{a.excerpt[loc]}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-slate-900 text-[10px] font-bold">
                          {a.author.charAt(0)}
                        </div>
                        {a.author}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                        {t("news.readMore")}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
