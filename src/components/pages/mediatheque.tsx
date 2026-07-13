"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  GalleryVerticalEnd,
  Image as ImageIcon,
  Video,
  Play,
  Download,
  FileText,
  X,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionHeader } from "@/components/layout/section-header";
import { mediaItems, type MediaItem } from "@/lib/data";

export function MediathequePage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [tab, setTab] = useState<"all" | "photo" | "video">("all");
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const filtered =
    tab === "all" ? mediaItems : mediaItems.filter((m) => m.type === tab);

  const tabs = [
    { id: "all" as const, label: t("common.all"), icon: Icons.LayoutGrid },
    { id: "photo" as const, label: t("media.photos"), icon: ImageIcon },
    { id: "video" as const, label: t("media.videos"), icon: Video },
  ];

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString(
      loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US",
      { day: "numeric", month: "short", year: "numeric" }
    );
  };

  const downloads = [
    "Rapport 2025",
    "Plaquette FR",
    "Plaquette EN",
    "Logo pack",
  ];

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80"
            alt={t("media.title")}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/85 via-[#0f172a]/80 to-[#1e3a8a]/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative text-center py-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <GalleryVerticalEnd className="w-3.5 h-3.5" /> {t("media.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("media.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("media.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("media.tag")}
            title={t("media.title")}
            subtitle={t("media.subtitle")}
          />

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tb) => {
              const Icon = tb.icon;
              return (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    tab === tb.id
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-yellow-400/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-yellow-400/50 hover:text-blue-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tb.label}
                </button>
              );
            })}
          </div>

          {/* Masonry-style grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[200px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((m, i) => {
                const large = i === 0;
                return (
                  <motion.button
                    key={m.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelected(m)}
                    className={`group relative rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 card-shine ${
                      large ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={m.thumb}
                      alt={m.title[loc]}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes={
                        large
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {m.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center group-hover:bg-yellow-400 transition-all">
                          <Play className="w-5 h-5 text-white group-hover:text-slate-900 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          m.type === "video"
                            ? "bg-rose-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {m.type === "video" ? t("media.videos") : t("media.photos")}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p
                        className={`font-semibold text-white ${
                          large ? "text-base md:text-lg" : "text-xs"
                        } line-clamp-2`}
                      >
                        {m.title[loc]}
                      </p>
                      <p className="text-[10px] text-slate-300 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {m.category} · {formatDate(m.date)}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Downloads section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 glass-strong rounded-3xl p-8 md:p-10 max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Download className="w-7 h-7 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                    {t("media.downloads")}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {t("media.subtitle")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {downloads.map((d) => (
                  <button
                    key={d}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-blue-700 hover:border-yellow-400/60 hover:bg-yellow-50/50 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    {d}
                    <Download className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-4xl w-full pointer-events-auto"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute -top-12 right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label={t("common.close")}
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-yellow-400/30 shadow-premium-lg">
                  <Image
                    src={selected.thumb}
                    alt={selected.title[loc]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase mb-2 ${
                        selected.type === "video"
                          ? "bg-rose-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {selected.type === "video"
                        ? t("media.videos")
                        : t("media.photos")}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {selected.title[loc]}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {selected.category} · {formatDate(selected.date)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
