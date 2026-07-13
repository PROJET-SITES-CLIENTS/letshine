"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { User, Lock, Mail, Phone, Globe, Eye, EyeOff, LogIn, UserPlus, LayoutDashboard, Award, History, BookOpen, MessageSquare, Bell } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { toast } from "sonner";

export function EspaceMembre() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [mode, setMode] = useState<"login" | "register" | "dashboard">("login");
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      toast.success("Connexion réussie ! Bienvenue.");
      setMode("dashboard");
    } else if (mode === "register") {
      toast.success("Compte créé ! Bienvenue dans la communauté LET'S SHINE.");
      setMode("dashboard");
    }
  };

  const dashboardItems = [
    { key: "member.profile", icon: User, color: "from-blue-500 to-indigo-600", count: null },
    { key: "member.trainings", icon: BookOpen, color: "from-emerald-500 to-teal-600", count: "3 actives" },
    { key: "member.certificates", icon: Award, color: "from-yellow-400 to-amber-500", count: "2" },
    { key: "member.history", icon: History, color: "from-purple-500 to-fuchsia-600", count: null },
    { key: "member.messages", icon: MessageSquare, color: "from-rose-500 to-pink-600", count: "5 non lus" },
    { key: "member.dashboard", icon: LayoutDashboard, color: "from-cyan-500 to-blue-600", count: null },
  ];

  return (
    <SectionReveal id="member" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 right-1/3 w-[35rem] h-[35rem] bg-gradient-to-br from-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Icons.Users className="w-3.5 h-3.5" />
            {t("member.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("member.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("member.subtitle")}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {mode !== "dashboard" ? (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-md mx-auto"
            >
              {/* Mode toggle */}
              <div className="flex gap-2 p-1 rounded-xl bg-white/[0.04] mb-7">
                <button
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    mode === "login"
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900"
                      : "text-slate-300"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  {t("cta.login")}
                </button>
                <button
                  onClick={() => setMode("register")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    mode === "register"
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900"
                      : "text-slate-300"
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  {t("cta.register")}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-7 space-y-4">
                {mode === "register" && (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("member.fullName")}</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input required className="input-shine rounded-xl pl-10 pr-4 py-3 text-sm w-full" placeholder="Aïssatou Diallo" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("member.email")}</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="email" className="input-shine rounded-xl pl-10 pr-4 py-3 text-sm w-full" placeholder="vous@email.com" />
                  </div>
                </div>

                {mode === "register" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("member.phone")}</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input required className="input-shine rounded-xl pl-10 pr-4 py-3 text-sm w-full" placeholder="+224 ..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("member.country")}</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input required className="input-shine rounded-xl pl-10 pr-4 py-3 text-sm w-full" placeholder="Guinée" />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t("member.password")}</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type={showPwd ? "text" : "password"} className="input-shine rounded-xl pl-10 pr-10 py-3 text-sm w-full" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-yellow-400">
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === "login" && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-yellow-400 hover:text-yellow-300 font-medium">{t("member.forgot")}</button>
                  </div>
                )}

                <button type="submit" className="w-full btn-shine py-3.5 rounded-xl font-bold flex items-center justify-center gap-2">
                  {mode === "login" ? <><LogIn className="w-4 h-4" />{t("cta.login")}</> : <><UserPlus className="w-4 h-4" />{t("cta.register")}</>}
                </button>

                <p className="text-center text-xs text-slate-500 pt-2">
                  {mode === "login" ? t("member.noAccount") : t("member.hasAccount")}{" "}
                  <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-yellow-400 hover:text-yellow-300 font-semibold">
                    {mode === "login" ? t("cta.register") : t("cta.login")}
                  </button>
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-5xl mx-auto"
            >
              {/* Welcome banner */}
              <div className="glass-strong rounded-3xl p-7 md:p-8 mb-6 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-yellow-500/15 to-amber-600/8 blur-3xl" />
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-slate-900 font-display font-extrabold text-2xl shadow-lg">
                      AD
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Bienvenue</p>
                      <h3 className="font-display text-2xl font-bold text-white">Aïssatou Diallo</h3>
                      <p className="text-sm text-yellow-400">Membre depuis 2024</p>
                    </div>
                  </div>
                  <button onClick={() => setMode("login")} className="px-4 py-2 rounded-lg glass text-sm font-semibold text-slate-300 hover:text-rose-400 transition-all">
                    Déconnexion
                  </button>
                </div>
              </div>

              {/* Dashboard tiles */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="group glass rounded-2xl p-5 hover:border-yellow-400/40 transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity`} />
                      <div className="relative flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {item.count && (
                          <span className="px-2 py-0.5 rounded-md bg-yellow-400/15 text-yellow-300 text-[10px] font-bold uppercase">
                            {item.count}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-white text-sm mb-1">{t(item.key)}</h4>
                      <p className="text-xs text-slate-400">Accéder à votre espace</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-2xl p-6 mt-6"
              >
                <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-yellow-400" />
                  Activité récente
                </h4>
                <div className="space-y-3">
                  {[
                    { icon: Award, text: "Certificat obtenu : Marketing Digital", date: "Il y a 2 jours", color: "text-yellow-400" },
                    { icon: BookOpen, text: "Progression : Développement Web — Module 4/8", date: "Il y a 5 jours", color: "text-emerald-400" },
                    { icon: MessageSquare, text: "Nouveau message de votre mentor", date: "Il y a 1 semaine", color: "text-rose-400" },
                  ].map((a, i) => {
                    const AIcon = a.icon;
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                        <AIcon className={`w-5 h-5 ${a.color}`} />
                        <div className="flex-1">
                          <p className="text-sm text-slate-200">{a.text}</p>
                          <p className="text-[11px] text-slate-500">{a.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}
