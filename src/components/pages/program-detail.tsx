"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import { Target, Users, TrendingUp, Image as ImageIcon, Video, CheckCircle2, ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { useApiItem } from "@/hooks/use-api";
import { programs as staticPrograms } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export function ProgramDetailPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { params, navigate } = useRouter();
  const { isAuthenticated } = useAuth();
  const [registering, setRegistering] = useState(false);

  const { data, loading } = useApiItem<{ program: any }>(
    params.id ? `/api/programs/${params.id}` : null
  );
  const program = data?.program || staticPrograms.find((p) => p.id === params.id) || staticPrograms[0];

  const handleRegister = async () => {
    if (!isAuthenticated) {
      toast.error("Contactez-nous pour vous inscrire");
      navigate("contact");
      return;
    }
    setRegistering(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PROGRAM", programId: program.id, amount: 0 }),
      });
      if (res.ok) {
        toast.success("Inscription envoyée !");
      } else {
        toast.error("Erreur");
      }
    } catch {
      toast.error("Erreur réseau");
    }
    setRegistering(false);
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#5C6573]">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="animate-page-enter pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={program.image} alt={program.title?.[loc] || program.title?.fr} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#003366]/75 to-[#1E3A5F]/60" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <button onClick={() => navigate("programs")} className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFC107] text-sm font-semibold mb-6">
            <ArrowLeft className="w-4 h-4" /> {t("programs.tag")}
          </button>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center shadow-lg`}>
              {(() => { const Icon = (Icons as any)[program.icon] ?? Icons.Sparkles; return <Icon className="w-8 h-8 text-white" />; })()}
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-2">{program.title?.[loc] || program.title?.fr}</h1>
              <p className="text-[#FFD700] text-sm md:text-base font-medium">{program.short?.[loc] || program.short?.fr}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 max-w-6xl mx-auto">
            <div className="space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-7 border border-[#E8ECF1] shadow-premium">
                <h2 className="font-display text-2xl font-bold text-[#003366] mb-4">{t("programs.detail")}</h2>
                <p className="text-[#003366] leading-relaxed text-[15px]">{program.description?.[loc] || program.description?.fr}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-7 border border-[#E8ECF1] shadow-premium">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-[#003366] mb-5">
                  <Target className="w-5 h-5 text-[#003366]" /> {t("programs.objectives")}
                </h3>
                <div className="space-y-3">
                  {(program.objectives?.[loc] || program.objectives?.fr || []).map((o: string, i: number) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                      <CheckCircle2 className="w-5 h-5 text-[#003366] flex-shrink-0 mt-0.5" />
                      <span className="text-[#003366] text-sm">{o}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-7 border border-[#E8ECF1] shadow-premium">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-[#003366] mb-4">
                  <Users className="w-5 h-5 text-[#003366]" /> {t("programs.target")}
                </h3>
                <p className="text-[#003366] leading-relaxed text-sm p-4 rounded-xl bg-yellow-50/50 border border-yellow-100">{program.target?.[loc] || program.target?.fr}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-7 border border-[#E8ECF1] shadow-premium">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-[#003366] mb-5">
                  <TrendingUp className="w-5 h-5 text-[#003366]" /> {t("programs.results")}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(program.results?.[loc] || program.results?.fr || []).map((r: string, i: number) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-yellow-50 border border-blue-100">
                      <p className="font-semibold text-[#003366] text-sm">{r}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {program.gallery && program.gallery.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-7 border border-[#E8ECF1] shadow-premium">
                  <h3 className="flex items-center gap-2 font-display text-xl font-bold text-[#003366] mb-5">
                    <ImageIcon className="w-5 h-5 text-[#003366]" /> {t("programs.gallery")}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {program.gallery.map((g: string, i: number) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                        <Image src={g} alt={`Galerie ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#003366] to-[#1E3A5F] rounded-xl p-7 shadow-premium-lg sticky top-24">
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
                    <span className="text-[#FFD700] font-semibold">Inclus</span>
                  </div>
                </div>
                <button onClick={handleRegister} disabled={registering} className="w-full btn-gold py-3.5 rounded-md font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                  <UserPlus className="w-5 h-5" /> {registering ? "..." : t("programs.register")}
                </button>
                <p className="text-xs text-slate-300 text-center mt-3">Réponse sous 48h</p>
              </motion.div>

              <div className="bg-white rounded-xl p-6 border border-[#E8ECF1] shadow-premium">
                <h4 className="font-display font-bold text-[#003366] mb-4">Autres programmes</h4>
                <div className="space-y-2">
                  {staticPrograms.filter((p) => p.id !== program.id).slice(0, 4).map((p) => (
                    <button key={p.id} onClick={() => navigate("program-detail", { id: p.id })} className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-[#F4F6F9] transition-colors text-left">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center flex-shrink-0`}>
                        {(() => { const Icon = (Icons as any)[p.icon] ?? Icons.Sparkles; return <Icon className="w-5 h-5 text-white" />; })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#003366] truncate">{p.title.fr}</p>
                        <p className="text-xs text-[#5C6573] truncate">{p.short.fr}</p>
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
