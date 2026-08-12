"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import { Sparkles, CheckCircle2, ArrowRight, Heart } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { services as staticServices } from "@/lib/data";
import { useApi } from "@/hooks/use-api";

export function ServicesPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();

  const { data } = useApi<{ services: any[] }>("/api/services");
  const services = (data?.services?.length ? data.services : staticServices);

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
            alt={t("services.title")}
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
            <Sparkles className="w-3.5 h-3.5" /> {t("services.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("services.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("services.tag")}
            title={t("services.title")}
            subtitle={t("services.subtitle")}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="group bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 card-shine flex flex-col"
                >
                  {/* Image header */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title?.fr || ""}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div
                      className={`absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 pt-9 flex-1 flex flex-col">
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {s.title?.[loc] || s.title?.fr || ""}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {s.description?.[loc] || s.description?.fr || ""}
                    </p>
                    <ul className="space-y-2.5 mt-auto">
                      {(s.features?.[loc] || s.features?.fr || []).map((f, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2.5 text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-slate-900" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t("partners.become")}
            </h2>
            <p className="text-slate-200 mb-8 max-w-2xl mx-auto">
              {t("partners.subtitle")}
            </p>
            <button
              onClick={() => navigate("partners")}
              className="btn-gold px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2"
            >
              {t("partners.become")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
