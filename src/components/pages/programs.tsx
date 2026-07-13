"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { programs } from "@/lib/data";

export function ProgramsPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" alt="Programmes" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/85 via-[#0f172a]/80 to-[#1e3a8a]/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative text-center py-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" /> {t("programs.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("programs.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("programs.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Programs grid */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
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
                  className="group text-left bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 card-shine"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image src={p.image} alt={p.title[loc]} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display font-bold text-xl text-white mb-1">{p.title[loc]}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.short[loc]}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Icons.Users className="w-3 h-3 text-blue-600" />{p.results[loc][0].split(" ")[0]}</span>
                      </div>
                      <span className="flex items-center gap-1 text-blue-700 text-sm font-semibold">
                        {t("cta.learnMore")}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
