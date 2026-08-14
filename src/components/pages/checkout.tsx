"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Smartphone,
  Truck,
  Lock,
  Shield,
  PackageCheck,
  Sparkles,
  Info,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " GNF";

type PaymentOption = "full" | "partial" | "delivery";
type PaymentMethod = "CARD" | "ORANGE_MONEY" | "MTN_MONEY";

type CreatedOrder = {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  paymentOption: PaymentOption;
  paymentMethod: string | null;
  paymentAmount: number;
  items: { id: string; name: string; price: number; quantity: number }[];
};

export function CheckoutPage() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const { items, remove, updateQty, total, count, clear } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name ?? "");
  const [customerEmail, setCustomerEmail] = useState(user?.email ?? "");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("Conakry");
  const [countryCode, setCountryCode] = useState("GN");
  const [paymentOption, setPaymentOption] = useState<PaymentOption>("full");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CreatedOrder | null>(null);

  // --- Empty-cart state ---
  if (count === 0 && !confirmedOrder) {
    return (
      <div className="animate-page-enter pt-20">
        <section className="bg-shine-radial-light border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <button
              onClick={() => navigate("shop")}
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm font-semibold group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              {t("nav.shop")}
            </button>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-shine-radial-light min-h-[60vh]">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-white rounded-3xl shadow-premium-lg p-8 md:p-10 text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-5">
                <ShoppingCart className="w-7 h-7 text-amber-600" />
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-extrabold text-[#003366] mb-2">
                Votre panier est vide
              </h1>
              <p className="text-slate-600 text-sm md:text-base mb-7">
                Parcourez notre boutique et ajoutez des produits pour passer
                commande.
              </p>
              <button
                onClick={() => navigate("shop")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-gold text-sm font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                Découvrir la boutique
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // --- Confirmation state ---
  if (confirmedOrder) {
    const isDelivery = confirmedOrder.paymentOption === "delivery";
    const remaining =
      confirmedOrder.paymentOption === "partial"
        ? confirmedOrder.totalAmount - confirmedOrder.paymentAmount
        : 0;
    return (
      <div className="animate-page-enter pt-20">
        <section className="py-16 md:py-24 bg-shine-radial-light min-h-[80vh]">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-white rounded-3xl shadow-premium-lg overflow-hidden"
            >
              {/* Success header */}
              <div className="relative bg-gradient-to-br from-emerald-50 via-white to-yellow-50 px-6 md:px-10 py-8 md:py-10 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <PackageCheck className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-extrabold text-[#003366]">
                      Commande confirmée
                    </h1>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Merci pour votre confiance — votre commande a bien été
                      enregistrée.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="p-6 md:p-10 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoLine label="Numéro de commande" value={confirmedOrder.orderNumber} />
                  <InfoLine label="Statut" value={statusLabel(confirmedOrder.status)} />
                  <InfoLine
                    label="Mode de paiement"
                    value={optionLabel(confirmedOrder.paymentOption)}
                  />
                  <InfoLine
                    label="Total"
                    value={formatPrice(confirmedOrder.totalAmount)}
                  />
                </div>

                {/* Items */}
                <div className="bg-slate-50 rounded-2xl p-4 md:p-5">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Articles ({confirmedOrder.items.length})
                  </h3>
                  <ul className="space-y-2.5">
                    {confirmedOrder.items.map((it) => (
                      <li
                        key={it.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="text-slate-700 truncate">
                          <span className="text-slate-500 font-medium">
                            ×{it.quantity}
                          </span>{" "}
                          {it.name}
                        </span>
                        <span className="font-semibold text-slate-900 whitespace-nowrap">
                          {formatPrice(it.price * it.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment notice */}
                <div
                  className={`rounded-xl p-4 md:p-5 flex items-start gap-3 ${
                    isDelivery
                      ? "bg-blue-50 text-blue-800"
                      : "bg-yellow-50 text-amber-800"
                  }`}
                >
                  {isDelivery ? (
                    <Truck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="text-sm leading-relaxed">
                    {isDelivery
                      ? "Nous vous contacterons pour confirmer la commande et organiser la livraison. Le paiement s'effectue à la réception."
                      : "Vous serez redirigé vers la plateforme de paiement pour finaliser la transaction. (Paiement en ligne bientôt disponible.)"}
                    {remaining > 0 && (
                      <p className="mt-2 font-semibold">
                        Acompte à payer :{" "}
                        {formatPrice(confirmedOrder.paymentAmount)} · Solde à la
                        livraison : {formatPrice(remaining)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => navigate("shop")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn-gold text-sm font-semibold"
                  >
                    Continuer mes achats
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate("home")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-[#003366] hover:bg-slate-50 transition-colors"
                  >
                    Retour à l'accueil
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // --- Form / checkout UI ---
  const paymentOptions: {
    id: PaymentOption;
    label: string;
    description: string;
    icon: typeof CreditCard;
    amount: number;
  }[] = [
    {
      id: "full",
      label: "Paiement complet",
      description: "Réglez la totalité maintenant",
      icon: CreditCard,
      amount: total,
    },
    {
      id: "partial",
      label: "Paiement partiel",
      description: "30% maintenant, solde à la livraison",
      icon: Shield,
      amount: Math.round(total * 0.3),
    },
    {
      id: "delivery",
      label: "Paiement à la livraison",
      description: "Payez en espèces à la réception",
      icon: Truck,
      amount: 0,
    },
  ];

  const paymentMethods: {
    id: PaymentMethod;
    label: string;
    icon: typeof CreditCard;
  }[] = [
    { id: "CARD", label: "Carte bancaire", icon: CreditCard },
    { id: "ORANGE_MONEY", label: "Orange Money", icon: Smartphone },
    { id: "MTN_MONEY", label: "MTN Money", icon: Smartphone },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Basic client-side validation
    if (!customerName.trim()) {
      toast.error("Veuillez indiquer votre nom");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) {
      toast.error("Adresse e-mail invalide");
      return;
    }
    if (!customerPhone.trim()) {
      toast.error("Veuillez indiquer votre téléphone");
      return;
    }
    if (!shippingAddress.trim()) {
      toast.error("Veuillez indiquer votre adresse de livraison");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          customerName,
          customerEmail,
          customerPhone,
          countryCode,
          shippingAddress,
          shippingCity,
          paymentOption,
          paymentMethod: paymentOption === "delivery" ? undefined : paymentMethod,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.error || "Erreur lors de la création de la commande");
        setSubmitting(false);
        return;
      }
      
      if (json.redirectUrl && paymentOption !== "delivery") {
        window.location.href = json.redirectUrl;
        return;
      }

      setConfirmedOrder(json.order as CreatedOrder);
      clear();
      toast.success(
        paymentOption === "delivery"
          ? "Commande enregistrée — nous vous contacterons."
          : "Commande créée — en attente de paiement."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-page-enter pt-20">
      {/* Breadcrumb */}
      <section className="bg-shine-radial-light border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <button
            onClick={() => navigate("shop")}
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm font-semibold group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t("nav.shop")}
          </button>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-[#003366] mt-3">
            Finaliser ma commande
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            {count} article{count > 1 ? "s" : ""} · {formatPrice(total)}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 md:py-14 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {/* LEFT — Form fields */}
            <div className="lg:col-span-3 space-y-6">
              {/* Customer info */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-premium p-5 md:p-7"
              >
                <h2 className="font-display text-base md:text-lg font-bold text-[#003366] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-yellow-50 text-amber-700 text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  Vos informations
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nom complet" required>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex. Aissatou Diallo"
                      required
                      className="input-shine w-full rounded-lg px-3.5 py-2.5 text-sm"
                    />
                  </Field>
                  <Field label="E-mail" required>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="vous@email.com"
                      required
                      className="input-shine w-full rounded-lg px-3.5 py-2.5 text-sm"
                    />
                  </Field>
                  <Field label="Téléphone" required>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+224 6XX XX XX XX"
                      required
                      className="input-shine w-full rounded-lg px-3.5 py-2.5 text-sm"
                    />
                  </Field>
                  <Field label="Ville" required>
                    <input
                      type="text"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      placeholder="Conakry"
                      required
                      className="input-shine w-full rounded-lg px-3.5 py-2.5 text-sm"
                    />
                  </Field>
                  <Field label="Pays" required>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      required
                      className="input-shine w-full rounded-lg px-3.5 py-2.5 text-sm"
                    >
                      <option value="GN">Guinée (GN)</option>
                      <option value="CI">Côte d'Ivoire (CI)</option>
                      <option value="SN">Sénégal (SN)</option>
                      <option value="ML">Mali (ML)</option>
                      <option value="FR">France (FR)</option>
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Adresse de livraison" required>
                      <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Quartier, rue, point de repère…"
                        required
                        className="input-shine w-full rounded-lg px-3.5 py-2.5 text-sm"
                      />
                    </Field>
                  </div>
                </div>
              </motion.div>

              {/* Payment option */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="bg-white rounded-2xl shadow-premium p-5 md:p-7"
              >
                <h2 className="font-display text-base md:text-lg font-bold text-[#003366] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-yellow-50 text-amber-700 text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  Mode de paiement
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {paymentOptions.map((opt) => {
                    const selected = paymentOption === opt.id;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPaymentOption(opt.id)}
                        className={`text-left rounded-xl p-4 border-2 transition-all ${
                          selected
                            ? "border-yellow-400 bg-yellow-50/60 shadow-premium"
                            : "border-slate-200 hover:border-yellow-400/40 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon
                            className={`w-5 h-5 ${
                              selected ? "text-amber-600" : "text-slate-500"
                            }`}
                          />
                          {selected && (
                            <Check className="w-4 h-4 text-amber-600" />
                          )}
                        </div>
                        <p className="font-semibold text-sm text-[#003366] leading-tight">
                          {opt.label}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                          {opt.description}
                        </p>
                        <p className="text-[12px] font-semibold text-amber-700 mt-2">
                          {opt.amount > 0 ? formatPrice(opt.amount) : "À la livraison"}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Payment method (only when not delivery) */}
                {paymentOption !== "delivery" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 pt-5 border-t border-slate-100"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                      Méthode de paiement
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {paymentMethods.map((m) => {
                        const selected = paymentMethod === m.id;
                        const Icon = m.icon;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id)}
                            className={`flex items-center gap-3 rounded-xl p-3.5 border-2 transition-all ${
                              selected
                                ? "border-blue-700 bg-blue-50/60 shadow-premium"
                                : "border-slate-200 hover:border-blue-700/40 bg-white"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 flex-shrink-0 ${
                                selected ? "text-blue-700" : "text-slate-500"
                              }`}
                            />
                            <span className="text-sm font-semibold text-[#003366]">
                              {m.label}
                            </span>
                            {selected && (
                              <Check className="w-4 h-4 text-blue-700 ml-auto" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 flex items-start gap-2 text-[12px] text-slate-500">
                      <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      Vous serez redirigé vers la plateforme de paiement pour
                      finaliser la transaction. (Passerelle en cours
                      d'intégration.)
                    </p>
                  </motion.div>
                )}

                {paymentOption === "delivery" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 pt-5 border-t border-slate-100"
                  >
                    <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-blue-800">
                      <Truck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">
                        Nous vous contacterons pour confirmer la commande et
                        organiser la livraison. Le paiement s'effectue en
                        espèces à la réception.
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* RIGHT — Cart summary */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-premium-lg p-5 md:p-7 lg:sticky lg:top-24">
                <h2 className="font-display text-base md:text-lg font-bold text-[#003366] mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-600" />
                  Mon panier ({count})
                </h2>

                {/* Items list */}
                <ul className="space-y-3 max-h-[340px] overflow-y-auto pr-1 -mr-1">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className="flex gap-3 items-center p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        {it.image ? (
                          <Image
                            src={it.image}
                            alt={it.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <PackageCheck className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                          {it.name}
                        </p>
                        <p className="text-xs text-blue-700 font-semibold">
                          {formatPrice(it.price)}
                        </p>
                        {/* Qty controls */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, it.quantity - 1)}
                            disabled={it.quantity <= 1}
                            className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Diminuer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-slate-700 w-6 text-center tabular-nums">
                            {it.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, it.quantity + 1)}
                            className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(it.id)}
                            className="ml-1 w-6 h-6 rounded-md text-rose-500 hover:bg-rose-50 flex items-center justify-center"
                            aria-label="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 whitespace-nowrap">
                          {formatPrice(it.price * it.quantity)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Totals */}
                <div className="mt-5 pt-5 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Sous-total</span>
                    <span className="font-semibold text-slate-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Livraison</span>
                    <span className="font-semibold text-emerald-600">
                      Calculée à la livraison
                    </span>
                  </div>
                  {paymentOption === "partial" && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-amber-700 font-semibold">
                        Acompte (30%)
                      </span>
                      <span className="font-semibold text-amber-700">
                        {formatPrice(Math.round(total * 0.3))}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-100">
                    <span className="font-display font-bold text-[#003366]">
                      Total
                    </span>
                    <span className="font-display font-extrabold text-xl text-[#003366]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting || count === 0}
                  className="w-full mt-5 btn-gold py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                      Traitement…
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      {paymentOption === "delivery"
                        ? "Confirmer ma commande"
                        : `Payer ${formatPrice(
                            paymentOption === "partial"
                              ? Math.round(total * 0.3)
                              : total
                          )}`}
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  Paiement chiffré SSL · Vos données sont protégées
                </p>
              </div>
            </motion.aside>
          </form>
        </div>
      </section>
    </div>
  );
}

// ---------- Small helpers ----------

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] font-semibold text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3.5">
      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
        {label}
      </p>
      <p className="text-sm font-bold text-[#003366] mt-0.5 break-words">
        {value}
      </p>
    </div>
  );
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    PENDING: "En attente de paiement",
    PENDING_CONFIRMATION: "En attente de confirmation",
    PAID: "Payée",
    SHIPPED: "Expédiée",
    DELIVERED: "Livrée",
    CANCELLED: "Annulée",
  };
  return map[status] ?? status;
}

function optionLabel(option: PaymentOption): string {
  const map: Record<PaymentOption, string> = {
    full: "Paiement complet",
    partial: "Paiement partiel (30%)",
    delivery: "Paiement à la livraison",
  };
  return map[option];
}
