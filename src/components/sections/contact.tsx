"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, Facebook, Linkedin, Instagram, Youtube, Music2, Twitter } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { toast } from "sonner";

export function Contact() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success(t("contact.sent"));
    setTimeout(() => setSent(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  const contactCards = [
    { icon: MapPin, label: t("contact.address"), value: "Avenue de la République, Conakry, Guinea", color: "from-rose-500 to-pink-600" },
    { icon: Phone, label: t("contact.phone"), value: "+224 622 33 44 55", color: "from-blue-500 to-indigo-600" },
    { icon: MessageCircle, label: t("contact.whatsapp"), value: "+224 628 77 88 99", color: "from-emerald-500 to-teal-600" },
    { icon: Mail, label: t("contact.email"), value: "contact@letsshine.africa", color: "from-amber-500 to-yellow-600" },
  ];

  const socials = [
    { name: "Facebook", icon: Facebook, color: "hover:bg-blue-600" },
    { name: "LinkedIn", icon: Linkedin, color: "hover:bg-blue-700" },
    { name: "Instagram", icon: Instagram, color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600" },
    { name: "YouTube", icon: Youtube, color: "hover:bg-red-600" },
    { name: "TikTok", icon: Music2, color: "hover:bg-slate-800" },
    { name: "X", icon: Twitter, color: "hover:bg-slate-900" },
  ];

  return (
    <SectionReveal id="contact" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0f1e] via-[#0d152b] to-[#0a0f1e]">
      <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-br from-cyan-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Icons.Mail className="w-3.5 h-3.5" />
            {t("contact.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: contact info + map */}
          <div className="space-y-5">
            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactCards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="group glass rounded-2xl p-5 hover:border-yellow-400/40 transition-all"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">{c.label}</p>
                    <p className="text-sm text-white font-medium">{c.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative glass rounded-3xl overflow-hidden h-64"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-[#0a0f1e]">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                {/* Animated pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-32 h-32 -translate-y-1/2 rounded-full border-2 border-yellow-400/30 animate-ping" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-strong">
                  <p className="text-xs text-white font-semibold">LET'S SHINE HQ</p>
                  <p className="text-[11px] text-slate-400">Avenue de la République, Conakry</p>
                </div>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-5"
            >
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-3 font-medium">{t("contact.follow")}</p>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.name}
                      className={`w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-white transition-all ${s.color}`}
                      aria-label={s.name}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-7 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("contact.name")}</label>
                  <input required className="input-shine rounded-xl px-4 py-3 text-sm w-full" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("contact.email")}</label>
                  <input required type="email" className="input-shine rounded-xl px-4 py-3 text-sm w-full" placeholder="vous@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("contact.subject")}</label>
                <input required className="input-shine rounded-xl px-4 py-3 text-sm w-full" placeholder="Sujet de votre message" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("contact.message")}</label>
                <textarea required rows={6} className="input-shine rounded-xl px-4 py-3 text-sm w-full resize-none" placeholder="Votre message..." />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                <span>Réponse sous 48h ouvrées</span>
              </div>
              <button
                type="submit"
                disabled={sent}
                className="w-full btn-shine py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sent ? (
                  <>
                    <Icons.Check className="w-5 h-5" /> Message envoyé !
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> {t("cta.send")}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
