"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Send, Trophy } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { partners, caseStudies } from "@/lib/data";
import { toast } from "sonner";

export function Partenaires() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [submitted, setSubmitted] = useState(false);

  const tierColors: Record<string, string> = {
    gold: "from-yellow-400 to-amber-500",
    silver: "from-slate-300 to-slate-500",
    bronze: "from-orange-400 to-amber-700",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Demande de partenariat envoyée ! Nous vous répondrons sous 48h.");
    setTimeout(() => setSubmitted(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <SectionReveal id="partners" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0A1929] via-[#0d152b] to-[#0A1929]">
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-br from-yellow-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t("partners.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("partners.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("partners.subtitle")}
          </motion.p>
        </div>

        {/* Partners marquee grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="group relative glass rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-md bg-gradient-to-r ${tierColors[p.tier]} text-slate-900 text-[9px] font-bold uppercase`}>
                {p.tier}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-4 group-hover:from-yellow-400/20 group-hover:to-amber-500/10 transition-all">
                <span className="font-display font-extrabold text-2xl text-yellow-400/80 group-hover:text-yellow-400">{p.logo}</span>
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">{p.name}</h4>
              <p className="text-xs text-slate-500">{p.sector}</p>
            </motion.div>
          ))}
        </div>

        {/* Case studies */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-12"
          >
            {t("partners.caseStudies")}
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-5">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative glass rounded-3xl p-7 hover:border-yellow-400/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400/15 to-amber-500/5 blur-2xl group-hover:opacity-50" />
                <Trophy className="w-8 h-8 text-yellow-400 mb-4" />
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{cs.partner}</p>
                <h4 className="font-display font-bold text-lg text-white mb-3">{cs.title[loc]}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{cs.description[loc]}</p>
                <div className="pt-4 border-t border-white/5">
                  <div className="text-3xl font-display font-extrabold text-shine-gradient">{cs.metric}</div>
                  <div className="text-xs text-slate-500 uppercase">{cs.result}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto glass-strong rounded-3xl p-8 md:p-10 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-yellow-500/15 to-amber-600/8 blur-3xl" />
          <div className="relative">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{t("partners.form.title")}</h3>
            <p className="text-slate-400 text-sm mb-7">{t("partners.form.subtitle")}</p>

            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <input required placeholder={t("contact.name")} className="input-shine rounded-xl px-4 py-3 text-sm" />
              <input required type="email" placeholder={t("contact.email")} className="input-shine rounded-xl px-4 py-3 text-sm" />
              <input required placeholder={t("member.phone")} className="input-shine rounded-xl px-4 py-3 text-sm" />
              <input placeholder={t("contact.subject")} className="input-shine rounded-xl px-4 py-3 text-sm" />
              <textarea required rows={4} placeholder={t("contact.message")} className="input-shine rounded-xl px-4 py-3 text-sm sm:col-span-2 resize-none" />
              <button type="submit" className="sm:col-span-2 btn-shine py-3.5 rounded-xl font-bold flex items-center justify-center gap-2">
                {submitted ? "Merci !" : t("cta.send")}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
