"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowRight,
  Newspaper,
  Mic,
  FileText,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { articles } from "@/lib/data";

export function ActualitesPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<string>("all");

  const tagIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    interview: Mic,
    report: FileText,
    press: Newspaper,
    blog: BookOpen,
  };

  const tagFilters = [
    { id: "all", label: t("common.all"), icon: Newspaper },
    { id: "interview", label: t("news.interviews"), icon: Mic },
    { id: "report", label: t("news.reports"), icon: FileText },
    { id: "press", label: t("news.press"), icon: Newspaper },
    { id: "blog", label: t("news.blog"), icon: BookOpen },
  ];

  const filtered =
    filter === "all" ? articles : articles.filter((a) => a.tag === filter);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString(
      loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US",
      { day: "numeric", month: "short", year: "numeric" }
    );
  };

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
            alt={t("news.title")}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#0A1929]/80 to-[#003366]/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative text-center py-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Newspaper className="w-3.5 h-3.5" /> {t("news.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("news.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("news.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("news.tag")}
            title={t("news.title")}
            subtitle={t("news.subtitle")}
          />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tagFilters.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    filter === f.id
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-yellow-400/50 hover:text-blue-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((a, i) => {
                const TagIcon = tagIcons[a.tag] ?? Newspaper;
                return (
                  <motion.article
                    key={a.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => navigate("article-detail", { id: a.id })}
                    className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 cursor-pointer card-shine flex flex-col"
                  >
                    {/* Cover */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={a.image}
                        alt={a.title[loc]}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <TagIcon className="absolute top-4 right-4 w-5 h-5 text-white/80" />
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-yellow-400 text-slate-900 text-[10px] font-bold uppercase tracking-wide">
                          {a.category[loc]}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(a.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {a.readTime} min
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {a.title[loc]}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3 flex-1">
                        {a.excerpt[loc]}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-slate-900 text-[10px] font-bold">
                            {a.author.charAt(0)}
                          </span>
                          {a.author}
                        </span>
                        <span className="flex items-center gap-1 text-blue-700 text-xs font-semibold">
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

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              {t("common.loading")}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
