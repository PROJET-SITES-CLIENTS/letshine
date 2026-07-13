"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, CreditCard, Smartphone, Building2, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { donationGoals, donationAmounts } from "@/lib/data";
import { toast } from "sonner";

export function Don() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [mode, setMode] = useState<"oneTime" | "monthly">("oneTime");
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [payment, setPayment] = useState<"card" | "mobile" | "transfer">("card");

  const finalAmount = custom ? parseInt(custom) || 0 : amount;

  const handleSubmit = () => {
    toast.success(t("donate.thank") + ` (${finalAmount}€)`);
  };

  const paymentOptions = [
    { id: "card" as const, label: t("donate.card"), icon: CreditCard, color: "from-blue-500 to-indigo-600" },
    { id: "mobile" as const, label: t("donate.mobile"), icon: Smartphone, color: "from-orange-500 to-amber-600" },
    { id: "transfer" as const, label: t("donate.transfer"), icon: Building2, color: "from-emerald-500 to-teal-600" },
  ];

  return (
    <SectionReveal id="donate" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0f1e] via-[#0d152b] to-[#0a0f1e]">
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-br from-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Heart className="w-3.5 h-3.5" />
            {t("donate.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("donate.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("donate.subtitle")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 max-w-6xl mx-auto">
          {/* Goals */}
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
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
                    className="glass rounded-2xl p-5 hover:border-yellow-400/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-semibold text-white text-sm pr-3">{g.goal[loc]}</p>
                      <span className="text-xs font-bold text-yellow-400 whitespace-nowrap">{Math.round(pct)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.15 }}
                        className={`h-full rounded-full bg-gradient-to-r ${g.color}`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{g.current.toLocaleString("fr-FR")}€ collectés</span>
                      <span className="text-slate-500">/ {g.target.toLocaleString("fr-FR")}€</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Donation form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-7 md:p-9"
          >
            {/* Mode toggle */}
            <div className="flex gap-2 p-1 rounded-xl bg-white/[0.04] mb-7">
              {(["oneTime", "monthly"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    mode === m
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {t(`donate.${m}`)}
                </button>
              ))}
            </div>

            {/* Amount grid */}
            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-3 font-medium">{t("donate.amount")}</p>
              <div className="grid grid-cols-3 gap-2.5">
                {donationAmounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setAmount(a); setCustom(""); }}
                    className={`py-3 rounded-xl font-bold transition-all ${
                      amount === a && !custom
                        ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-yellow-400/20"
                        : "glass text-white hover:border-yellow-400/40"
                    }`}
                  >
                    {a}€
                  </button>
                ))}
              </div>
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-2 font-medium">{t("donate.custom")}</p>
              <div className="relative">
                <input
                  type="number"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="0"
                  className="w-full input-shine rounded-xl px-4 py-3 text-lg font-display font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400 font-bold">€</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-3 font-medium">{t("donate.payment")}</p>
              <div className="grid grid-cols-3 gap-2.5">
                {paymentOptions.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPayment(p.id)}
                      className={`relative p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${
                        payment === p.id
                          ? "glass-strong border-yellow-400/50"
                          : "glass hover:border-yellow-400/30"
                      }`}
                    >
                      {payment === p.id && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-slate-900" />
                        </span>
                      )}
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                        <Icon className="w-4.5 h-4.5 text-white" />
                      </div>
                      <span className="text-[11px] font-semibold text-white text-center leading-tight">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary + CTA */}
            <div className="pt-5 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-400">{t("donate.amount")}</span>
                <span className="font-display font-extrabold text-2xl text-yellow-400">
                  {finalAmount}€
                  <span className="text-sm text-slate-500 font-medium ml-1">/ {mode === "monthly" ? "mois" : "unique"}</span>
                </span>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full btn-shine py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                {t("donate.confirm")}
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-3">
                🔒 Transaction sécurisée · Reçu fiscal envoyé par email
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
