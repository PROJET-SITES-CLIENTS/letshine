"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { useApi } from "@/hooks/use-api";
import { programs as staticPrograms } from "@/lib/data";

export function ProgramsPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();
  const { data, loading } = useApi<{ programs: any[] }>("/api/programs");
  const programs = (data?.programs?.length ? data.programs : staticPrograms);

  return (
    <div className="animate-page-enter pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" alt="Programmes" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#003366]/80 to-[#1E3A5F]/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center py-20">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-[#FFD700] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> {t("programs.tag")}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5">
            {t("programs.title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg">
            {t("programs.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden border border-[#E8ECF1] animate-pulse">
                  <div className="h-56 bg-slate-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-3 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p, i) => {
                const Icon = (Icons as any)[p.icon] ?? Sparkles;
                return (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    whileHover={{ y: -8 }}
                    onClick={() => navigate("program-detail", { id: p.id })}
                    className="group text-left bg-white rounded-xl overflow-hidden border border-[#E8ECF1]/60 hover:border-[#FFD700]/30 hover:shadow-premium-lg transition-all duration-500"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image src={p.image} alt={p.title?.[loc] || p.title?.fr || ""} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.2s]" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/70 via-[#0A1929]/20 to-transparent" />
                      <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-display font-bold text-xl text-white mb-1">{p.title?.[loc] || p.title?.fr}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-[#5C6573] leading-relaxed mb-4">{p.short?.[loc] || p.short?.fr}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#E8ECF1]">
                        <div className="flex items-center gap-3 text-xs text-[#5C6573]">
                          <span className="flex items-center gap-1"><Icons.Users className="w-3 h-3 text-[#003366]" />{p.results?.fr?.[0]?.split(" ")[0] || ""}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[#FFD700] text-sm font-semibold">
                          {t("cta.learnMore")}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
