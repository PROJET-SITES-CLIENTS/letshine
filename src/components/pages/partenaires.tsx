"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Send, Trophy } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionHeader } from "@/components/layout/section-header";
import { partners, caseStudies } from "@/lib/data";
import { toast } from "sonner";

export function PartenairesPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const tierColors: Record<string, string> = {
    gold: "from-yellow-400 to-amber-500",
    silver: "from-slate-300 to-slate-500",
    bronze: "from-orange-400 to-amber-700",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    setSending(true);
    try {
      const res = await fetch("/api/partner-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Demande de partenariat envoyée ! Nous vous répondrons sous 48h.");
        (e.target as HTMLFormElement).reset();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        toast.error("Erreur lors de l'envoi");
      }
    } catch {
      toast.error("Erreur réseau");
    }
    setSending(false);
  };

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
            alt={t("partners.title")}
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
            <Sparkles className="w-3.5 h-3.5" /> {t("partners.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("partners.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("partners.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Partners grid */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("partners.tag")}
            title={t("partners.title")}
            subtitle={t("partners.subtitle")}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/40 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-0.5 rounded-md bg-gradient-to-r ${tierColors[p.tier]} text-slate-900 text-[9px] font-bold uppercase`}
                    >
                      {p.tier}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-3 flex flex-col items-center text-center px-2">
                    <span className="font-display font-extrabold text-2xl text-yellow-300 drop-shadow">
                      {p.logo}
                    </span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2">
                    {p.name}
                  </h4>
                  <p className="text-xs text-slate-500">{p.sector}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("partners.caseStudies")}
            title={t("partners.caseStudies")}
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 card-shine flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.title[loc]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                    <Trophy className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] text-yellow-300 uppercase tracking-widest font-bold mb-1">
                      {cs.partner}
                    </p>
                    <h4 className="font-display font-bold text-lg text-white">
                      {cs.title[loc]}
                    </h4>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {cs.description[loc]}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="text-3xl font-display font-extrabold text-shine-gradient">
                      {cs.metric}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">
                      {cs.result}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner form */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-3xl mx-auto glass-strong rounded-3xl p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-yellow-500/15 to-amber-600/8 blur-3xl pointer-events-none" />
            <div className="relative">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {t("partners.form.title")}
              </h3>
              <p className="text-slate-600 text-sm mb-7">
                {t("partners.form.subtitle")}
              </p>

              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  name="name"
                  placeholder={t("contact.name")}
                  className="input-shine rounded-xl px-4 py-3 text-sm"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder={t("contact.email")}
                  className="input-shine rounded-xl px-4 py-3 text-sm"
                />
                <input
                  required
                  name="phone"
                  placeholder={t("member.phone")}
                  className="input-shine rounded-xl px-4 py-3 text-sm"
                />
                <input
                  name="subject"
                  placeholder={t("contact.subject")}
                  className="input-shine rounded-xl px-4 py-3 text-sm"
                />
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder={t("contact.message")}
                  className="input-shine rounded-xl px-4 py-3 text-sm sm:col-span-2 resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="sm:col-span-2 btn-gold py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitted ? "Merci !" : sending ? "Envoi en cours..." : t("cta.send")}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
