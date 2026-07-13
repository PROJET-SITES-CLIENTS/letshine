"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import { Target, Users, TrendingUp, Image as ImageIcon, Video, CheckCircle2, ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { programs } from "@/lib/data";
import { toast } from "sonner";

export function ProgramDetailPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { params, navigate } = useRouter();
  const program = programs.find((p) => p.id === params.id) ?? programs[0];

  const handleRegister = () => toast.success(`Inscription au programme ${program.title[loc]} envoyée !`);

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={program.image} alt={program.title[loc]} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#0A1929]/75 to-[#003366]/60" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative py-20">
          <button
            onClick={() => navigate("programs")}
            className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> {t("programs.tag")}
          </button>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center shadow-lg`}>
              {(() => { const Icon = (Icons as any)[program.icon] ?? Icons.Sparkles; return <Icon className="w-8 h-8 text-white" />; })()}
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-2">{program.title[loc]}</h1>
              <p className="text-yellow-300 text-sm md:text-base font-medium">{program.short[loc]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 max-w-6xl mx-auto">
            {/* Main content */}
            <div className="space-y-10">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-7 shadow-premium"
              >
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">{t("programs.detail")}</h2>
                <p className="text-slate-700 leading-relaxed text-[15px]">{program.description[loc]}</p>
              </motion.div>

              {/* Objectives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-7 shadow-premium"
              >
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 mb-5">
                  <Target className="w-5 h-5 text-blue-600" /> {t("programs.objectives")}
                </h3>
                <div className="space-y-3">
                  {program.objectives[loc].map((o, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{o}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Target */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-7 shadow-premium"
              >
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 mb-4">
                  <Users className="w-5 h-5 text-blue-600" /> {t("programs.target")}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm p-4 rounded-xl bg-yellow-50/50 border border-yellow-100">{program.target[loc]}</p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-7 shadow-premium"
              >
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 mb-5">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> {t("programs.results")}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {program.results[loc].map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-yellow-50 border border-blue-100"
                    >
                      <p className="font-semibold text-slate-800 text-sm">{r}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-7 shadow-premium"
              >
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 mb-5">
                  <ImageIcon className="w-5 h-5 text-blue-600" /> {t("programs.gallery")}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {program.gallery.map((g, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                      <Image src={g} alt={`Galerie ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Videos placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-7 shadow-premium"
              >
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 mb-5">
                  <Video className="w-5 h-5 text-blue-600" /> {t("programs.videos")}
                </h3>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-yellow-50/50 cursor-pointer transition-colors">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800 text-sm mb-1">Vidéo {i + 1} — {program.title[loc]}</div>
                        <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
                      </div>
                      <span className="text-xs text-slate-500">{5 + i}:{30 + i * 15}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Register */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-7 shadow-premium-lg sticky top-24"
              >
                <h3 className="font-display text-xl font-bold text-white mb-4">{t("programs.register")}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Durée</span>
                    <span className="text-white font-semibold">6 mois</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Format</span>
                    <span className="text-white font-semibold">Présentiel + En ligne</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Cohorte</span>
                    <span className="text-white font-semibold">200 places</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Certificat</span>
                    <span className="text-yellow-400 font-semibold">Inclus</span>
                  </div>
                </div>
                <button
                  onClick={handleRegister}
                  className="w-full btn-gold py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" /> {t("programs.register")}
                </button>
                <p className="text-xs text-slate-300 text-center mt-3">Réponse sous 48h</p>
              </motion.div>

              {/* Other programs */}
              <div className="bg-white rounded-3xl p-6 shadow-premium">
                <h4 className="font-display font-bold text-slate-900 mb-4">Autres programmes</h4>
                <div className="space-y-2">
                  {programs.filter((p) => p.id !== program.id).slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => navigate("program-detail", { id: p.id })}
                      className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center flex-shrink-0`}>
                        {(() => { const Icon = (Icons as any)[p.icon] ?? Icons.Sparkles; return <Icon className="w-5 h-5 text-white" />; })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{p.title[loc]}</p>
                        <p className="text-xs text-slate-500 truncate">{p.short[loc]}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
