"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Music2,
  Twitter,
  Check,
  MailOpen,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { toast } from "sonner";

export function ContactPage() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("contact.sent"));
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };

  const contactCards = [
    { icon: MapPin, label: t("contact.address"), value: "Avenue de la République, Conakry, Guinea", color: "from-rose-500 to-pink-600" },
    { icon: Phone, label: t("contact.phone"), value: "+224 622 33 44 55", color: "from-blue-500 to-indigo-600" },
    { icon: MessageCircle, label: t("contact.whatsapp"), value: "+224 628 77 88 99", color: "from-emerald-500 to-teal-600" },
    { icon: Mail, label: t("contact.email"), value: "contact@letsshine.africa", color: "from-amber-500 to-yellow-600" },
  ];

  const socials = [
    { name: "Facebook", icon: Facebook, color: "hover:bg-blue-600 hover:text-white" },
    { name: "LinkedIn", icon: Linkedin, color: "hover:bg-blue-700 hover:text-white" },
    { name: "Instagram", icon: Instagram, color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white" },
    { name: "YouTube", icon: Youtube, color: "hover:bg-red-600 hover:text-white" },
    { name: "TikTok", icon: Music2, color: "hover:bg-slate-800 hover:text-white" },
    { name: "X", icon: Twitter, color: "hover:bg-slate-900 hover:text-white" },
  ];

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80"
            alt={t("contact.tag")}
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
            <Mail className="w-3.5 h-3.5" /> {t("contact.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("contact.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge={t("contact.tag")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* LEFT: contact info + map + socials */}
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
                      className="group bg-white rounded-2xl p-5 shadow-premium hover:shadow-premium-lg transition-all border border-slate-100"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1 font-semibold">{c.label}</p>
                      <p className="text-sm text-slate-800 font-medium">{c.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-3xl overflow-hidden h-64 shadow-premium border border-slate-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="absolute inset-0 bg-dot-pattern opacity-50" />
                  {/* Decorative street lines */}
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-slate-300/60" />
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-slate-300/60" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-px bg-slate-300/60" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-px bg-slate-300/60" />

                  {/* Animated pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      <div className="relative">
                        <span className="absolute -inset-3 rounded-full bg-blue-500/20 animate-ping" />
                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                          <MapPin className="w-6 h-6 text-yellow-300" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom address card */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-strong">
                    <p className="text-xs text-slate-900 font-bold">LET&apos;S SHINE HQ</p>
                    <p className="text-[11px] text-slate-600">Avenue de la République, Conakry</p>
                  </div>
                </div>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 shadow-premium border border-slate-100"
              >
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-3 font-semibold">{t("contact.follow")}</p>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.name}
                        className={`w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 transition-all ${s.color}`}
                        aria-label={s.name}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: contact form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-3xl p-7 md:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1.5 font-medium">{t("contact.name")}</label>
                    <input required className="input-shine rounded-xl px-4 py-3 text-sm w-full" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1.5 font-medium">{t("contact.email")}</label>
                    <input required type="email" className="input-shine rounded-xl px-4 py-3 text-sm w-full" placeholder="vous@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5 font-medium">{t("contact.subject")}</label>
                  <input required className="input-shine rounded-xl px-4 py-3 text-sm w-full" placeholder="Sujet de votre message" />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5 font-medium">{t("contact.message")}</label>
                  <textarea required rows={6} className="input-shine rounded-xl px-4 py-3 text-sm w-full resize-none" placeholder="Votre message..." />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Réponse sous 48h ouvrées</span>
                </div>
                <button
                  type="submit"
                  disabled={sent}
                  className="w-full btn-gold py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {sent ? (
                    <>
                      <Check className="w-5 h-5" /> Message envoyé !
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> {t("cta.send")}
                    </>
                  )}
                </button>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm"
                  >
                    <MailOpen className="w-4 h-4" />
                    <span>{t("contact.sent")}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
