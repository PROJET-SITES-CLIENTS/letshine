"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  Sparkles,
  Star,
  Clock,
  Signal,
  Globe,
  MapPin,
  Award,
  ArrowRight,
  GraduationCap,
  Users,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { useApi } from "@/hooks/use-api";
import { formations as staticFormations } from "@/lib/data";

export function FormationsPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<string>("all");

  const { data, loading } = useApi<{ formations: any[] }>("/api/formations");
  const formations = (data?.formations?.length ? data.formations : staticFormations);

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(formations.map((f) => f.category?.[loc] || f.category?.fr || ""))
    ).filter(Boolean);
    return ["all", ...cats];
  }, [loc, formations]);

  const filtered =
    filter === "all"
      ? formations
      : formations.filter(
          (f) => (f.category?.[loc] || f.category?.fr) === filter
        );

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("fr-FR").format(n) + " GNF";

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80"
            alt={t("formations.title")}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#0A1929]/80 to-[#003366]/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative text-center py-16 md:py-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5" /> {t("formations.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("formations.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("formations.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Listing */}
      <section className="py-20 md:py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("formations.tag")}
            title={t("formations.title")}
            subtitle={t("formations.subtitle")}
          />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
            <span className="sr-only">{t("formations.filter")}</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === c
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-yellow-400/30"
                    : "bg-white text-slate-700 shadow-premium hover:shadow-premium-lg hover:-translate-y-0.5"
                }`}
              >
                {c === "all" ? t("formations.all") : c}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl overflow-hidden shadow-premium animate-pulse"
                >
                  <div className="h-44 bg-slate-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-3 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
              >
            <AnimatePresence mode="popLayout">
              {filtered.map((f, i) => {
                const Icon = (Icons as any)[f.icon] ?? Icons.BookOpen;
                return (
                  <motion.article
                    key={f.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => navigate("formation-detail", { id: f.id })}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 cursor-pointer card-shine flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={f.image}
                        alt={f.title?.[loc] || f.title?.fr || ""}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      {/* Icon */}
                      <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
                        <Icon className="w-5 h-5 text-blue-700" />
                      </div>

                      {/* Popular badge */}
                      {f.popular && (
                        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-[10px] font-bold uppercase tracking-wide shadow-lg">
                          Popular
                        </div>
                      )}

                      {/* Rating overlay */}
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{f.rating}</span>
                        <span className="opacity-80">·</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {f.students}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[11px] uppercase tracking-wider text-amber-600 font-bold mb-1.5">
                        {f.category?.[loc] || f.category?.fr}
                      </span>
                      <h3 className="font-display font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-800 transition-colors">
                        {f.title?.[loc] || f.title?.fr}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {f.description?.[loc] || f.description?.fr}
                      </p>

                      {/* Duration + Level */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          {f.duration?.[loc] || f.duration?.fr}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Signal className="w-3.5 h-3.5 text-purple-600" />
                          {f.level}
                        </span>
                      </div>

                      {/* Mode + certificate badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {(f.mode || []).includes("online") && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold flex items-center gap-1 border border-blue-100">
                            <Globe className="w-3 h-3" />
                            {t("formations.online")}
                          </span>
                        )}
                        {(f.mode || []).includes("offline") && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold flex items-center gap-1 border border-emerald-100">
                            <MapPin className="w-3 h-3" />
                            {t("formations.offline")}
                          </span>
                        )}
                        {f.certificate && (
                          <span className="px-2 py-0.5 rounded-md bg-yellow-50 text-yellow-700 text-[10px] font-semibold flex items-center gap-1 border border-yellow-100">
                            <Award className="w-3 h-3" />
                            {t("formations.certificate")}
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
                            {t("shop.price")}
                          </div>
                          <div className="font-display font-bold text-blue-700 text-lg">
                            {formatPrice(f.price)}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("formation-detail", { id: f.id });
                          }}
                          className="btn-gold px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5"
                        >
                          {t("cta.subscribe")}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">—</p>
            </div>
          )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
