"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Users,
  Clock,
  Signal,
  Globe,
  MapPin,
  Award,
  CheckCircle2,
  UserPlus,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { useApiItem } from "@/hooks/use-api";
import { formations as staticFormations } from "@/lib/data";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function FormationDetailPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { params, navigate } = useRouter();
  const { isAuthenticated } = useAuth();
  const [registering, setRegistering] = useState(false);

  const { data, loading } = useApiItem<{ formation: any }>(
    params.id ? `/api/formations/${params.id}` : null
  );
  const formation =
    data?.formation ||
    staticFormations.find((f) => f.id === params.id) ||
    staticFormations[0];

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("fr-FR").format(n) + " GNF";

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
        body: JSON.stringify({
          type: "FORMATION",
          formationId: formation.id,
          amount: formation.price,
        }),
      });
      if (res.ok) {
        toast.success(`Inscription à la formation « ${formation.title?.[loc] || formation.title?.fr} » envoyée !`);
      } else {
        toast.error("Erreur");
      }
    } catch {
      toast.error("Erreur réseau");
    }
    setRegistering(false);
  };

  const otherFormations = staticFormations
    .filter((f) => f.id !== formation.id)
    .slice(0, 4);

  const Icon = (Icons as any)[formation.icon] ?? BookOpen;

  // Quick info cards
  const infoCards = [
    {
      icon: Clock,
      label: t("formations.duration"),
      value: formation.duration?.[loc] || formation.duration?.fr,
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Signal,
      label: t("formations.level"),
      value: formation.level,
      color: "from-purple-500 to-fuchsia-600",
    },
    {
      icon: (formation.mode || []).includes("online") ? Globe : MapPin,
      label: t("formations.online"),
      value: (formation.mode || [])
        .map((m: string) => (m === "online" ? t("formations.online") : t("formations.offline")))
        .join(" · "),
      color: "from-emerald-500 to-teal-600",
    },
  ];

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#5C6573]">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={formation.image}
            alt={formation.title?.[loc] || formation.title?.fr || ""}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#0A1929]/75 to-[#003366]/60" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative py-16 md:py-20">
          <button
            onClick={() => navigate("formations")}
            className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 text-sm font-semibold mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t("nav.formations")}
          </button>

          <div className="flex items-start gap-4 mb-6 max-w-4xl">
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/15 backdrop-blur items-center justify-center shadow-lg flex-shrink-0">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="inline-block text-[11px] uppercase tracking-widest text-yellow-300 font-bold mb-2">
                {formation.category?.[loc] || formation.category?.fr}
              </span>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
                {formation.title?.[loc] || formation.title?.fr}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                <span className="flex items-center gap-1.5 text-yellow-300 font-semibold">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {formation.rating}
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Users className="w-4 h-4 text-blue-300" />
                  {new Intl.NumberFormat("fr-FR").format(formation.students)}{" "}
                  {t("member.trainings").toLowerCase()}
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Signal className="w-4 h-4 text-purple-300" />
                  {formation.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Main content */}
            <div className="space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 md:p-7 shadow-premium"
              >
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  {t("programs.detail")}
                </h2>
                <p className="text-slate-700 leading-relaxed text-[15px]">
                  {formation.description?.[loc] || formation.description?.fr}
                </p>
              </motion.div>

              {/* Info cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid sm:grid-cols-3 gap-4"
              >
                {infoCards.map((card, i) => {
                  const CardIcon = card.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-5 shadow-premium"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg mb-3`}
                      >
                        <CardIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-0.5">
                        {card.label}
                      </div>
                      <div className="font-display font-bold text-slate-900 text-sm leading-snug">
                        {card.value}
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Program */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 md:p-7 shadow-premium"
              >
                <h3 className="font-display text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  {t("formations.program")}
                </h3>
                <ol className="space-y-3">
                  {(formation.program?.[loc] || formation.program?.fr || []).map((p: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-slate-700 text-sm pt-0.5">{p}</span>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>

              {/* Certificate */}
              {formation.certificate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-3xl p-6 md:p-7 shadow-premium border border-yellow-200/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 mb-1">
                        {t("formations.certificate")}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {loc === "fr"
                          ? "Obtenez un certificat reconnu à l'issue de la formation, attestant de vos compétences auprès des employeurs."
                          : loc === "en"
                          ? "Earn a recognized certificate upon completion of the training, attesting your skills to employers."
                          : "Obtén un certificado reconocido al finalizar la formación, que acredita tus competencias ante los empleadores."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mode badges recap */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 md:p-7 shadow-premium"
              >
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  {t("formations.online")} / {t("formations.offline")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(formation.mode || []).includes("online") && (
                    <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-1.5 border border-blue-100">
                      <Globe className="w-3.5 h-3.5" />
                      {t("formations.online")}
                    </span>
                  )}
                  {(formation.mode || []).includes("offline") && (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 border border-emerald-100">
                      <MapPin className="w-3.5 h-3.5" />
                      {t("formations.offline")}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Price card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-6 md:p-7 shadow-premium-lg lg:sticky lg:top-24"
              >
                <div className="text-[11px] uppercase tracking-widest text-yellow-300 font-bold mb-2">
                  {t("shop.price")}
                </div>
                <div className="font-display font-extrabold text-white text-3xl md:text-4xl mb-1">
                  {formatPrice(formation.price)}
                </div>
                <p className="text-slate-300 text-xs mb-6">
                  {loc === "fr"
                    ? "Paiement en plusieurs fois possible."
                    : loc === "en"
                    ? "Installment payment available."
                    : "Pago en varias cuotas disponible."}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {t("formations.duration")}
                    </span>
                    <span className="text-white font-semibold text-right">
                      {formation.duration?.[loc] || formation.duration?.fr}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Signal className="w-4 h-4" /> {t("formations.level")}
                    </span>
                    <span className="text-white font-semibold">{formation.level}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> {t("member.trainings")}
                    </span>
                    <span className="text-white font-semibold">
                      {new Intl.NumberFormat("fr-FR").format(formation.students)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> {t("formations.certificate")}
                    </span>
                    <span
                      className={`font-semibold ${
                        formation.certificate ? "text-yellow-400" : "text-slate-400"
                      }`}
                    >
                      {formation.certificate
                        ? loc === "fr"
                          ? "Inclus"
                          : loc === "en"
                          ? "Included"
                          : "Incluido"
                        : "—"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="w-full btn-gold py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <UserPlus className="w-5 h-5" /> {registering ? "Inscription..." : t("cta.subscribe")}
                </button>
                <p className="text-xs text-slate-300 text-center mt-3">
                  {loc === "fr"
                    ? "Réponse sous 48h"
                    : loc === "en"
                    ? "Response within 48h"
                    : "Respuesta en 48h"}
                </p>
              </motion.div>

              {/* Other formations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 shadow-premium"
              >
                <h4 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  {t("cta.viewAll")}
                </h4>
                <div className="space-y-2">
                  {otherFormations.map((f) => {
                    const OtherIcon = (Icons as any)[f.icon] ?? BookOpen;
                    return (
                      <button
                        key={f.id}
                        onClick={() => navigate("formation-detail", { id: f.id })}
                        className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <OtherIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-800 transition-colors">
                            {f.title?.[loc] || f.title?.fr}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {f.duration?.[loc] || f.duration?.fr} · {f.level}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => navigate("formations")}
                  className="mt-4 w-full btn-outline-shine py-2.5 rounded-xl text-sm font-bold"
                >
                  {t("cta.viewAll")}
                </button>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
