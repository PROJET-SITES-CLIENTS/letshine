"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  CreditCard,
  Smartphone,
  Building2,
  Check,
  Sparkles,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionHeader } from "@/components/layout/section-header";
import { donationGoals, donationAmounts } from "@/lib/data";
import { toast } from "sonner";

export function DonPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [mode, setMode] = useState<"oneTime" | "monthly">("oneTime");
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [payment, setPayment] = useState<"card" | "mobile" | "transfer">("card");

  const finalAmount = custom ? parseInt(custom) || 0 : amount;

  const handleSubmit = () => {
    toast.success(t("donate.thank"));
  };

  const paymentOptions = [
    { id: "card" as const, label: t("donate.card"), icon: CreditCard, color: "from-blue-500 to-indigo-600" },
    { id: "mobile" as const, label: t("donate.mobile"), icon: Smartphone, color: "from-orange-500 to-amber-600" },
    { id: "transfer" as const, label: t("donate.transfer"), icon: Building2, color: "from-emerald-500 to-teal-600" },
  ];

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1920&q=80"
            alt={t("donate.tag")}
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
            <Heart className="w-3.5 h-3.5" /> {t("donate.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("donate.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("donate.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge={t("donate.tag")} title={t("donate.title")} subtitle={t("donate.subtitle")} />

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 max-w-6xl mx-auto">
            {/* LEFT: Donation goals */}
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                {t("donate.objectives")}
              </h3>
              <div className="space-y-5">
                {donationGoals.map((g, i) => {
                  const pct = Math.min((g.current / g.target) * 100, 100);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={g.image}
                          alt={g.goal[loc]}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                          <p className="font-display font-bold text-white text-base leading-tight">{g.goal[loc]}</p>
                          <span className="text-xs font-bold text-yellow-300 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm whitespace-nowrap">
                            {Math.round(pct)}%
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden mb-3">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${g.color}`}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-blue-700">
                            {g.current.toLocaleString("fr-FR")}€ <span className="text-slate-500 font-normal">collectés</span>
                          </span>
                          <span className="text-slate-500">/ {g.target.toLocaleString("fr-FR")}€</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Donation form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-3xl p-7 md:p-9"
            >
              {/* Mode toggle */}
              <div className="flex gap-2 p-1 rounded-xl bg-slate-100 mb-7">
                {(["oneTime", "monthly"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      mode === m
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-md shadow-amber-500/20"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t(`donate.${m}`)}
                  </button>
                ))}
              </div>

              {/* Amount grid */}
              <div className="mb-6">
                <p className="text-sm text-slate-600 mb-3 font-medium">{t("donate.amount")}</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {donationAmounts.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setAmount(a); setCustom(""); }}
                      className={`py-3 rounded-xl font-bold transition-all ${
                        amount === a && !custom
                          ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-amber-500/25"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-slate-900"
                      }`}
                    >
                      {a}€
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom amount */}
              <div className="mb-6">
                <p className="text-sm text-slate-600 mb-2 font-medium">{t("donate.custom")}</p>
                <div className="relative">
                  <input
                    type="number"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="0"
                    className="w-full input-shine rounded-xl px-4 py-3 text-lg font-display font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 font-bold">€</span>
                </div>
              </div>

              {/* Payment method */}
              <div className="mb-6">
                <p className="text-sm text-slate-600 mb-3 font-medium">{t("donate.payment")}</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {paymentOptions.map((p) => {
                    const Icon = p.icon;
                    const isActive = payment === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPayment(p.id)}
                        className={`relative p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all border-2 ${
                          isActive
                            ? "bg-white border-yellow-400/50 shadow-md"
                            : "bg-white border-slate-200 hover:border-amber-300"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center shadow">
                            <Check className="w-2.5 h-2.5 text-slate-900" />
                          </span>
                        )}
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center shadow-sm`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary + CTA */}
              <div className="pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-600">{t("donate.amount")}</span>
                  <span className="font-display font-extrabold text-2xl text-blue-800">
                    {finalAmount}€
                    <span className="text-sm text-slate-500 font-medium ml-1">
                      / {mode === "monthly" ? "mois" : "unique"}
                    </span>
                  </span>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full btn-gold py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  {t("donate.confirm")}
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-3 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Transaction sécurisée · Reçu fiscal envoyé par email
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
