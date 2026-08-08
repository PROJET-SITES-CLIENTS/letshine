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
  CheckCircle2,
  Copy,
  Home,
  Share2,
  Loader2,
  Trophy,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionHeader } from "@/components/layout/section-header";
import { donationGoals as staticDonationGoals, donationAmounts } from "@/lib/data";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { useApi } from "@/hooks/use-api";
import { useRouter } from "@/components/providers/router-provider";

type Confirmation = {
  reference: string;
  amount: number;
  mode: "oneTime" | "monthly";
};

export function DonPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { user } = useAuth();
  const { navigate } = useRouter();
  const { data } = useApi<{ donationGoals: any[] }>("/api/donation-goals");
  const donationGoals = data?.donationGoals || staticDonationGoals;

  const [mode, setMode] = useState<"oneTime" | "monthly">("oneTime");
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [payment, setPayment] = useState<"card" | "mobile" | "transfer">("card");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [copied, setCopied] = useState(false);

  const finalAmount = custom ? parseInt(custom) || 0 : amount;
  const methodMap: Record<"card" | "mobile" | "transfer", string> = {
    card: "CARD",
    mobile: "ORANGE_MONEY",
    transfer: "BANK_TRANSFER",
  };

  const handleSubmit = async () => {
    if (finalAmount <= 0) {
      toast.error("Montant invalide");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: user?.name || "Donateur",
          donorEmail: user?.email || "donor@letsshine.africa",
          amount: finalAmount,
          mode: mode === "monthly" ? "MONTHLY" : "ONE_TIME",
          method: methodMap[payment],
          userId: user?.id,
          goal: selectedGoal || undefined,
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok) {
        // Show the premium confirmation screen instead of just a toast.
        setConfirmation({
          reference: json?.reference || json?.donation?.reference || `DON-${Date.now()}`,
          amount: finalAmount,
          mode,
        });
        toast.success(t("donate.thank"));
      } else {
        toast.error(json?.error || "Erreur lors du don");
      }
    } catch {
      toast.error("Erreur réseau");
    }
    setSubmitting(false);
  };

  const handleCopyRef = async () => {
    if (!confirmation) return;
    try {
      await navigator.clipboard.writeText(confirmation.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Impossible de copier la référence");
    }
  };

  const shareText = `Je viens de soutenir LET'S SHINE avec ${confirmation?.amount ?? 0}€. Rejoignez le mouvement ✨`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
  const socialLinks = confirmation
    ? [
        {
          label: "Facebook",
          icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
          url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
          color: "bg-[#1877F2]",
        },
        {
          label: "X",
          icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
          url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          color: "bg-black",
        },
        {
          label: "LinkedIn",
          icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
          url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          color: "bg-[#0A66C2]",
        },
        {
          label: "WhatsApp",
          icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
          url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
          color: "bg-[#25D366]",
        },
      ]
    : [];

  const paymentOptions = [
    { id: "card" as const, label: t("donate.card"), icon: CreditCard, color: "from-blue-500 to-indigo-600" },
    { id: "mobile" as const, label: t("donate.mobile"), icon: Smartphone, color: "from-orange-500 to-amber-600" },
    { id: "transfer" as const, label: t("donate.transfer"), icon: Building2, color: "from-emerald-500 to-teal-600" },
  ];

  // ---------- Confirmation screen ----------
  if (confirmation) {
    return (
      <div className="animate-page-enter pt-20">
        <section className="py-16 md:py-24 bg-shine-radial-light min-h-screen">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-premium-lg overflow-hidden">
                {/* Top banner */}
                <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600 px-7 md:px-10 py-10 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <Heart className="absolute -top-4 -left-4 w-24 h-24 text-white fill-white" />
                    <Sparkles className="absolute bottom-2 right-10 w-16 h-16 text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0, rotate: 10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-5 shadow-lg"
                  >
                    <Heart className="w-11 h-11 text-white fill-white" strokeWidth={2.4} />
                  </motion.div>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
                    Merci pour votre générosité
                  </h1>
                  <p className="text-amber-50 text-sm md:text-base">
                    Votre soutien transforme la vie des jeunes Africains.
                  </p>
                </div>

                {/* Body */}
                <div className="px-7 md:px-10 py-8 md:py-10 space-y-6">
                  {/* Reference + amount */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                        Référence du don
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-display font-bold text-slate-900 text-base md:text-lg font-mono">
                          {confirmation.reference}
                        </p>
                        <button
                          onClick={handleCopyRef}
                          className="p-1.5 rounded-md hover:bg-slate-200/60 transition-colors"
                          title="Copier"
                        >
                          {copied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                        Montant donné
                      </p>
                      <p className="font-display font-bold text-amber-700 text-lg">
                        {confirmation.amount}€
                        <span className="text-sm text-slate-500 font-medium ml-1.5">
                          {confirmation.mode === "monthly" ? "/ mois" : "/ unique"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Receipt notice */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Un reçu fiscal vous a été envoyé par email. Conservez la référence ci-dessus pour toute demande relative à ce don.
                    </p>
                  </div>

                  {/* Share on social media */}
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-amber-500" />
                      Partagez votre geste
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {socialLinks.map((s) => (
                        <a
                          key={s.label}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group ${s.color} rounded-xl px-3 py-3 flex items-center justify-center gap-2 text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm`}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d={s.icon} />
                          </svg>
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <button
                      onClick={() => navigate("home")}
                      className="w-full btn-gold py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <Home className="w-5 h-5" />
                      Retour à l'accueil
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // ---------- Donation form ----------
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
            {/* LEFT: Donation goals (now selectable) */}
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                {t("donate.objectives")}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Cliquez sur un objectif pour affecter votre don, ou laissez non sélectionné pour un soutien général.
              </p>
              <div className="space-y-5">
                {donationGoals.map((g, i) => {
                  const pct = Math.min((g.current / g.target) * 100, 100);
                  const isGoalId = (g.id || g.goal?.fr) === selectedGoal;
                  const goalKey = (g.id || g.goal?.fr) as string;
                  return (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() =>
                        setSelectedGoal(isGoalId ? null : goalKey)
                      }
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`group w-full text-left bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 relative ${
                        isGoalId ? "ring-2 ring-yellow-400" : ""
                      }`}
                    >
                      {isGoalId && (
                        <span className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 text-slate-900" strokeWidth={3} />
                        </span>
                      )}
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={g.image}
                          alt={g.goal?.[loc] || g.goal?.fr || ""}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                          <p className="font-display font-bold text-white text-base leading-tight">{g.goal?.[loc] || g.goal?.fr || ""}</p>
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
                    </motion.button>
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
              {/* Selected goal badge */}
              {selectedGoal && (
                <div className="mb-5 flex items-center justify-between p-3 rounded-xl bg-yellow-50 border border-yellow-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                    <Trophy className="w-4 h-4" />
                    Don affecté à un objectif
                  </div>
                  <button
                    onClick={() => setSelectedGoal(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Retirer
                  </button>
                </div>
              )}

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
                  disabled={submitting}
                  className="w-full btn-gold py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      {t("donate.confirm")}
                    </>
                  )}
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
