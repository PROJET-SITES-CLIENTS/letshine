"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  BookOpen,
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  Lock,
  Loader2,
  CheckCircle2,
  Copy,
  ExternalLink,
  Mail,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Home,
} from "lucide-react";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { useApiItem } from "@/hooks/use-api";
import { formations as staticFormations, programs as staticPrograms } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

type PaymentMethod = "CARD" | "ORANGE_MONEY" | "MTN_MONEY";
type PaymentOption = "FULL" | "PARTIAL";

type Confirmation = {
  registrationId: string;
  registrationNumber: string;
  accessUrl: string;
  amount: number;
};

export function FormationCheckoutPage() {
  const loc = useLocalized();
  const { params, navigate } = useRouter();
  const { user, isAuthenticated } = useAuth();

  // Determine whether the user is checking out a Formation or a Program.
  // The route is shared: params.type === "program" → PROGRAM, else FORMATION.
  const isProgram = params.type === "program";

  const { data, loading } = useApiItem<{ formation?: any; program?: any }>(
    params.id
      ? isProgram
        ? `/api/programs/${params.id}`
        : `/api/formations/${params.id}`
      : null
  );

  const formation =
    data?.formation ||
    staticFormations.find((f) => f.id === params.id) ||
    staticFormations[0];

  const program =
    data?.program ||
    staticPrograms.find((p) => p.id === params.id) ||
    staticPrograms[0];

  const item = isProgram ? program : formation;
  const basePrice = isProgram ? 0 : formation.price ?? 0;
  const itemTitle = isProgram
    ? program.title?.[loc] || program.title?.fr
    : formation.title?.[loc] || formation.title?.fr;
  const itemImage = isProgram ? program.image : formation.image;

  const Icon = isProgram
    ? (Icons as any)[program.icon] ?? Icons.Sparkles
    : (Icons as any)[formation.icon] ?? BookOpen;

  // Form state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
  const [paymentOption, setPaymentOption] = useState<PaymentOption>("FULL");
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [copied, setCopied] = useState(false);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("fr-FR").format(n) + " GNF";

  // Partial payment = 30% of base price (rounded up to nearest 100).
  const partialAmount = basePrice > 0 ? Math.ceil((basePrice * 0.3) / 100) * 100 : 0;
  const amountDue = paymentOption === "PARTIAL" ? partialAmount : basePrice;

  const paymentMethods: {
    id: PaymentMethod;
    label: string;
    sub: string;
    icon: typeof CreditCard;
    color: string;
  }[] = [
    {
      id: "CARD",
      label: "Carte bancaire",
      sub: "Visa · Mastercard",
      icon: CreditCard,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "ORANGE_MONEY",
      label: "Orange Money",
      sub: "Paiement mobile",
      icon: Smartphone,
      color: "from-orange-500 to-amber-600",
    },
    {
      id: "MTN_MONEY",
      label: "MTN Money",
      sub: "MoMo",
      icon: Banknote,
      color: "from-yellow-400 to-amber-500",
    },
  ];

  const handleSubmit = async () => {
    if (!isAuthenticated || !user?.id) {
      toast.error("Veuillez vous connecter pour finaliser l'inscription");
      navigate("member");
      return;
    }
    if (!fullName.trim() || !email.trim()) {
      toast.error("Veuillez renseigner votre nom et votre email");
      return;
    }
    if (amountDue <= 0 && !isProgram) {
      toast.error("Montant invalide");
      return;
    }

    setSubmitting(true);
    setRedirecting(true);

    try {
      // 1. Create the registration with paid=true (placeholder payment gateway).
      //    The amount stored is the amount actually paid (full or partial).
      const regRes = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: isProgram ? "PROGRAM" : "FORMATION",
          programId: isProgram ? program.id : undefined,
          formationId: isProgram ? undefined : formation.id,
          amount: amountDue,
          paid: true,
        }),
      });

      if (!regRes.ok) {
        const errBody = await regRes.json().catch(() => null);
        throw new Error(errBody?.error || "Échec de l'inscription");
      }

      const { registration } = await regRes.json();

      // Briefly show the "Redirection vers Jomi..." message before resolving
      // the access link — this stands in for the real payment gateway redirect.
      await new Promise((r) => setTimeout(r, 900));

      setRedirecting(false);

      // 2. Generate the personal access URL.
      const linkRes = await fetch(
        `/api/registrations/${registration.id}/access-link`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!linkRes.ok) {
        throw new Error("Impossible de générer le lien d'accès");
      }
      const { accessUrl } = await linkRes.json();

      // Use a short registration number (last 8 chars of the cuid) for display.
      const shortNumber = String(registration.id).slice(-8).toUpperCase();

      setConfirmation({
        registrationId: registration.id,
        registrationNumber: `LS-${shortNumber}`,
        accessUrl,
        amount: amountDue,
      });

      toast.success("Paiement confirmé, votre lien d'accès est prêt !");
    } catch (e: any) {
      toast.error(e?.message || "Erreur lors du paiement");
    } finally {
      setSubmitting(false);
      setRedirecting(false);
    }
  };

  const handleCopy = async () => {
    if (!confirmation) return;
    try {
      // Resolve to an absolute URL if the API returned a relative path.
      const absolute =
        confirmation.accessUrl.startsWith("http") || typeof window === "undefined"
          ? confirmation.accessUrl
          : `${window.location.origin}${confirmation.accessUrl}`;
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      toast.success("Lien copié dans le presse-papiers");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Impossible de copier le lien");
    }
  };

  const absoluteAccessUrl =
    confirmation && typeof window !== "undefined"
      ? confirmation.accessUrl.startsWith("http")
        ? confirmation.accessUrl
        : `${window.location.origin}${confirmation.accessUrl}`
      : confirmation?.accessUrl ?? "";

  // ---------- Loading ----------
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-shine-radial-light">
        <div className="flex items-center gap-3 text-[#5C6573]">
          <Loader2 className="w-5 h-5 animate-spin" />
          Chargement du paiement...
        </div>
      </div>
    );
  }

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
              {/* Premium success card */}
              <div className="bg-white rounded-3xl shadow-premium-lg overflow-hidden">
                {/* Top banner */}
                <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 px-7 md:px-10 py-10 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <Sparkles className="absolute -top-4 -left-4 w-24 h-24 text-white" />
                    <Sparkles className="absolute bottom-0 right-8 w-16 h-16 text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-5 shadow-lg"
                  >
                    <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.4} />
                  </motion.div>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
                    Paiement confirmé !
                  </h1>
                  <p className="text-emerald-50 text-sm md:text-base">
                    Votre inscription a bien été enregistrée.
                  </p>
                </div>

                {/* Body */}
                <div className="px-7 md:px-10 py-8 md:py-10 space-y-6">
                  {/* Reference + amount */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                        N° d'inscription
                      </p>
                      <p className="font-display font-bold text-slate-900 text-lg">
                        {confirmation.registrationNumber}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                        Montant payé
                      </p>
                      <p className="font-display font-bold text-emerald-700 text-lg">
                        {formatPrice(confirmation.amount)}
                      </p>
                    </div>
                  </div>

                  {/* Access link */}
                  <div className="rounded-2xl border-2 border-yellow-300/60 bg-gradient-to-br from-yellow-50 to-amber-50 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-sm">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-display font-bold text-slate-900 text-sm">
                        Votre lien d'accès personnel
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">
                      Conservez ce lien — il vous donne accès à votre formation à tout moment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-white border border-amber-200 text-xs text-slate-700 font-mono truncate">
                        {absoluteAccessUrl}
                      </div>
                      <button
                        onClick={handleCopy}
                        className="px-3 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copié
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copier
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Email notice */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Un email avec votre lien d'accès a été envoyé à{" "}
                      <span className="font-semibold">{email || "votre adresse"}</span>.
                      Pensez à vérifier vos spams.
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={absoluteAccessUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-gold py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Accéder à la formation
                    </a>
                    <button
                      onClick={() => navigate("home")}
                      className="flex-1 sm:flex-none px-5 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      Accueil
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

  // ---------- Checkout form ----------
  return (
    <div className="animate-page-enter pt-20">
      {/* Header */}
      <section className="py-12 md:py-16 bg-shine-radial-light border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate(isProgram ? "program-detail" : "formation-detail", { id: params.id })}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-semibold mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Retour
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#B8860B]">
              Paiement sécurisé
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#003366] leading-tight">
            Finaliser mon inscription
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl">
            {isProgram
              ? "Inscrivez-vous au programme et recevez un lien d'accès personnel immédiat."
              : "Réglez votre formation et recevez votre lien d'accès personnel immédiat."}
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 md:py-16 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 max-w-6xl mx-auto">
            {/* LEFT: Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Customer info */}
              <div className="bg-white rounded-3xl p-6 md:p-7 shadow-premium">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Vos informations
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex. Aissatou Diallo"
                      className="w-full input-shine rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@email.com"
                      className="w-full input-shine rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+224 ..."
                      className="w-full input-shine rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Pays
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Guinée"
                      className="w-full input-shine rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                </div>
                {!isAuthenticated && (
                  <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    Vous devez être connecté pour finaliser le paiement.{" "}
                    <button
                      onClick={() => navigate("member")}
                      className="font-semibold underline hover:text-amber-900"
                    >
                      Se connecter
                    </button>
                  </p>
                )}
              </div>

              {/* Payment option (full / partial) — only for paid formations */}
              {!isProgram && basePrice > 0 && (
                <div className="bg-white rounded-3xl p-6 md:p-7 shadow-premium">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Option de paiement
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentOption("FULL")}
                      className={`relative text-left p-4 rounded-2xl border-2 transition-all ${
                        paymentOption === "FULL"
                          ? "border-yellow-400 bg-yellow-50/60 shadow-md"
                          : "border-slate-200 hover:border-amber-300"
                      }`}
                    >
                      {paymentOption === "FULL" && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                          <Check className="w-3 h-3 text-slate-900" strokeWidth={3} />
                        </span>
                      )}
                      <p className="font-display font-bold text-slate-900 text-sm mb-1">Paiement intégral</p>
                      <p className="text-xs text-slate-600 mb-2">Réglez la totalité maintenant.</p>
                      <p className="font-bold text-emerald-700 text-sm">{formatPrice(basePrice)}</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentOption("PARTIAL")}
                      className={`relative text-left p-4 rounded-2xl border-2 transition-all ${
                        paymentOption === "PARTIAL"
                          ? "border-yellow-400 bg-yellow-50/60 shadow-md"
                          : "border-slate-200 hover:border-amber-300"
                      }`}
                    >
                      {paymentOption === "PARTIAL" && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                          <Check className="w-3 h-3 text-slate-900" strokeWidth={3} />
                        </span>
                      )}
                      <p className="font-display font-bold text-slate-900 text-sm mb-1">
                        Acompte 30%
                      </p>
                      <p className="text-xs text-slate-600 mb-2">Réservez votre place, soldez plus tard.</p>
                      <p className="font-bold text-emerald-700 text-sm">{formatPrice(partialAmount)}</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Payment method */}
              <div className="bg-white rounded-3xl p-6 md:p-7 shadow-premium">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Moyen de paiement
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {paymentMethods.map((m) => {
                    const PMIcon = m.icon;
                    const active = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`relative p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                          active
                            ? "border-yellow-400 bg-white shadow-md"
                            : "border-slate-200 hover:border-amber-300 bg-white"
                        }`}
                      >
                        {active && (
                          <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                            <Check className="w-3 h-3 text-slate-900" strokeWidth={3} />
                          </span>
                        )}
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center shadow-sm`}>
                          <PMIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-slate-800 text-center leading-tight">
                          {m.label}
                        </span>
                        <span className="text-[10px] text-slate-500">{m.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transactions chiffrées SSL. Vos données bancaires ne sont jamais stockées sur nos serveurs.
                  Paiement traité via notre partenaire <span className="font-semibold text-slate-800">Jomi</span>.
                </p>
              </div>
            </motion.div>

            {/* RIGHT: Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white rounded-3xl p-6 md:p-7 shadow-premium-lg lg:sticky lg:top-24">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                  Récapitulatif
                </h3>

                {/* Item thumbnail */}
                <div className="flex items-center gap-3 mb-5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    {itemImage ? (
                      <Image
                        src={itemImage}
                        alt={itemTitle || ""}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[#B8860B] mb-0.5">
                      {isProgram ? "Programme" : "Formation"}
                    </p>
                    <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {itemTitle}
                    </p>
                    {!isProgram && (
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {formation.rating}
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        {formation.duration?.[loc] || formation.duration?.fr}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4 mb-5">
                  {!isProgram ? (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Prix de la formation</span>
                        <span className="font-semibold text-slate-900">{formatPrice(basePrice)}</span>
                      </div>
                      {paymentOption === "PARTIAL" && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Acompte (30%)</span>
                          <span className="font-semibold text-slate-900">{formatPrice(partialAmount)}</span>
                        </div>
                      )}
                      {paymentOption === "PARTIAL" && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Solde restant</span>
                          <span className="font-semibold text-slate-500">{formatPrice(basePrice - partialAmount)}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Inscription au programme</span>
                      <span className="font-semibold text-emerald-700">Gratuit</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Frais de traitement</span>
                    <span className="font-semibold text-emerald-700">Offerts</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-6">
                  <span className="font-display font-bold text-slate-900">Total à payer</span>
                  <span className="font-display font-extrabold text-2xl text-blue-800">
                    {isProgram ? "0 GNF" : formatPrice(amountDue)}
                  </span>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !isAuthenticated}
                  className="w-full btn-gold py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    redirecting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Redirection vers Jomi...
                      </>
                    ) : (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Traitement...
                      </>
                    )
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      {isProgram ? "Confirmer mon inscription" : `Payer ${formatPrice(amountDue)}`}
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center mt-3 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Paiement sécurisé · Reçu envoyé par email
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-2 font-semibold">Vous recevrez :</p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      Un lien d'accès personnel à la formation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      Un email de confirmation avec votre reçu
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      Un accès à votre espace membre
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
