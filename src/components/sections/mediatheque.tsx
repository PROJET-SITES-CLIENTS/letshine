"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Image as ImageIcon, Video, Download, Play, FileText, X } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { mediaItems, type MediaItem } from "@/lib/data";

export function Mediathèque() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [tab, setTab] = useState<"all" | "photo" | "video">("all");
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const filtered = tab === "all" ? mediaItems : mediaItems.filter((m) => m.type === tab);

  const tabs = [
    { id: "all" as const, label: t("common.all"), icon: Icons.LayoutGrid },
    { id: "photo" as const, label: t("media.photos"), icon: ImageIcon },
    { id: "video" as const, label: t("media.videos"), icon: Video },
  ];

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString(loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <SectionReveal id="media" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0f1e] via-[#0d152b] to-[#0a0f1e]">
      <div className="absolute top-1/3 right-0 w-[35rem] h-[35rem] bg-gradient-to-br from-purple-600/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Icons.GalleryVerticalEnd className="w-3.5 h-3.5" />
            {t("media.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("media.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("media.subtitle")}
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tb) => {
            const Icon = tb.icon;
            return (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  tab === tb.id
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-yellow-400/20"
                    : "glass text-slate-300 hover:text-yellow-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tb.label}
              </button>
            );
          })}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((m, i) => (
              <motion.button
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(m)}
                className={`group relative glass rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500 ${
                  i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className={`relative ${i % 5 === 0 ? "aspect-square md:aspect-[2/1]" : "aspect-square"} bg-gradient-to-br from-slate-800 via-slate-900 to-[#0a0f1e]`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-extrabold text-4xl text-yellow-400/30 group-hover:scale-110 group-hover:text-yellow-400/50 transition-all">
                      {m.title[loc].charAt(0)}
                    </span>
                  </div>
                  {m.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-yellow-400/80 transition-all">
                        <Play className="w-5 h-5 text-white group-hover:text-slate-900 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${m.type === "video" ? "bg-rose-500/80 text-white" : "bg-blue-500/80 text-white"}`}>
                      {m.type === "video" ? t("media.videos") : t("media.photos")}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className={`font-semibold text-white ${i % 5 === 0 ? "text-base" : "text-xs"} line-clamp-2`}>{m.title[loc]}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{m.category} · {formatDate(m.date)}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Downloads section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-strong rounded-3xl p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                <Download className="w-7 h-7 text-slate-900" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-1">{t("media.downloads")}</h3>
                <p className="text-sm text-slate-400">Rapports annuels, plaquettes, charte graphique</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Rapport 2025", "Plaquette FR", "Plaquette EN", "Logo pack"].map((d) => (
                <button key={d} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-semibold text-yellow-300 hover:bg-yellow-400/10 transition-all">
                  <FileText className="w-4 h-4" />
                  {d}
                  <Download className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-3xl w-full pointer-events-auto"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute -top-12 right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="aspect-video rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-[#0a0f1e] border border-yellow-400/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="text-center">
                    <div className="text-9xl font-display font-extrabold text-yellow-400/30 mb-4">{selected.title[loc].charAt(0)}</div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{selected.title[loc]}</h3>
                    <p className="text-sm text-slate-400">{selected.category} · {formatDate(selected.date)}</p>
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
