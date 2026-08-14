"use client";

import { motion } from "framer-motion";
import { Crown, ShieldCheck, Lightbulb, Target, HeartHandshake, Rocket, Quote, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { values, objectives, founder as staticFounder } from "@/lib/data";
import type { TeamMember } from "@/lib/data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useApi } from "@/hooks/use-api";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown, ShieldCheck, Lightbulb, Target, HeartHandshake, Rocket,
};

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const loc = useLocalized();
  const { t, lang } = useLanguage();
  
  return (
    <Dialog>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -6 }}
        className="group relative glass rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-500 card-shine overflow-hidden h-full flex flex-col"
      >
        <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${member.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />
        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg`}>
          {member.initials}
        </div>
        <h4 className="font-display font-bold text-lg text-white mb-1">{member.name}</h4>
        <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-3">
          {member.role[loc]}
        </p>
        <div className="flex-grow">
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
            {member.bio[loc]}
          </p>
        </div>
        
        <DialogTrigger asChild>
          <button className="text-yellow-400 text-xs font-medium hover:text-yellow-300 mt-4 text-left transition-colors flex items-center gap-1">
            {lang === "en" ? "Read more" : lang === "es" ? "Leer más" : "En savoir plus"} <span aria-hidden="true">&rarr;</span>
          </button>
        </DialogTrigger>
      </motion.div>

      <DialogContent className="sm:max-w-xl bg-slate-900 border-slate-800 text-white p-0 overflow-hidden">
        <div className={`h-24 w-full bg-gradient-to-br ${member.color} opacity-80`} />
        <div className="px-6 pb-8 pt-4 relative">
          <div className={`absolute -top-12 left-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-slate-900`}>
            {member.initials}
          </div>
          <DialogHeader className="mt-8 text-left">
            <DialogTitle className="text-2xl font-bold">{member.name}</DialogTitle>
            <DialogDescription className="text-yellow-400 font-medium text-sm uppercase tracking-wide mt-1">
              {member.role[loc]}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-slate-300 leading-relaxed text-[15px] whitespace-pre-wrap">
              {member.bio[loc]}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function About() {
  const { t, lang } = useLanguage();
  const loc = useLocalized();

  const { data: teamData } = useApi<{ team: any[] }>("/api/team");
  const allTeam = teamData?.team || [];
  const founder = allTeam.find((m: any) => m?.category === "founder") || staticFounder;
  const nationalTeam = allTeam.filter((m: any) => m?.category === "national");
  const committee = allTeam.filter((m: any) => m?.category === "committee");
  const experts = allTeam.filter((m: any) => m?.category === "experts");

  const sections = [
    { key: "about.story", text: "about.story.text", icon: Quote, color: "from-amber-500 to-yellow-600" },
    { key: "about.why", text: "about.why.text", icon: Lightbulb, color: "from-blue-500 to-indigo-600" },
    { key: "about.vision", text: "about.vision.text", icon: Target, color: "from-purple-500 to-fuchsia-600" },
    { key: "about.mission", text: "about.mission.text", icon: Rocket, color: "from-emerald-500 to-teal-600" },
  ];

  return (
    <SectionReveal id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] bg-gradient-to-b from-yellow-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t("about.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight"
          >
            {t("about.title")}
          </motion.h2>
        </div>

        {/* Story / Why / Vision / Mission - alternating layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {sections.map((s, i) => {
            const Icon = s.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative glass rounded-3xl p-8 lg:p-10 hover:border-yellow-400/40 transition-all duration-500 overflow-hidden ${
                  isEven ? "md:mt-0" : "md:mt-12"
                }`}
              >
                <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-700`} />
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">{t(s.key)}</h3>
                <p className="text-slate-300/90 leading-relaxed text-[15px]">
                  {t(s.text)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Values */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-12"
          >
            {t("about.values")}
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {values.map((v, i) => {
              const Icon = iconMap[v.icon];
              return (
                <motion.div
                  key={v.key}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group relative glass rounded-2xl p-5 text-center hover:border-yellow-400/40 transition-all duration-300 cursor-default"
                >
                  <div className={`relative w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${v.color} blur-md opacity-50 -z-10`} />
                  </div>
                  <h4 className="font-display font-bold text-white text-sm mb-2">{t(`${v.key}`)}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{t(`${v.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-12"
          >
            {t("about.objectives")}
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {objectives.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-4 p-5 rounded-2xl glass hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center font-bold text-slate-900 font-display text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-slate-200 leading-relaxed text-[15px] pt-1.5">{o[loc]}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Founder spotlight */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-12"
          >
            {t("about.founder")}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden max-w-5xl mx-auto"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-600/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-600/15 to-indigo-700/10 blur-3xl" />
            <div className="relative grid md:grid-cols-[280px_1fr] gap-8 items-center">
              <div className="relative mx-auto md:mx-0">
                <div className={`w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-gradient-to-br ${founder.color} flex items-center justify-center text-white font-display font-extrabold text-6xl shadow-2xl`}>
                  {founder.initials}
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-3xl border-2 border-dashed border-yellow-400/30"
                />
              </div>
              <div>
                <h4 className="font-display text-3xl font-bold text-white mb-2">{founder.name}</h4>
                <p className="text-yellow-400 font-semibold uppercase tracking-wide text-sm mb-6">{founder.role[loc]}</p>
                
                <Dialog>
                  <p className="text-slate-300/90 leading-relaxed text-[15px] md:text-base mb-2 line-clamp-4">
                    {founder.bio[loc]}
                  </p>
                  <DialogTrigger asChild>
                    <button className="text-yellow-400 text-sm font-medium hover:text-yellow-300 mb-6 transition-colors flex items-center gap-1">
                      {lang === "en" ? "Read more" : lang === "es" ? "Leer más" : "En savoir plus"} <span aria-hidden="true">&rarr;</span>
                    </button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-2xl bg-slate-900 border-slate-800 text-white p-0 overflow-hidden">
                    <div className={`h-32 w-full bg-gradient-to-br ${founder.color} opacity-80`} />
                    <div className="px-8 pb-8 pt-4 relative">
                      <div className={`absolute -top-16 left-8 w-24 h-24 rounded-2xl bg-gradient-to-br ${founder.color} flex items-center justify-center text-white font-bold text-3xl shadow-xl border-4 border-slate-900`}>
                        {founder.initials}
                      </div>
                      <DialogHeader className="mt-10 text-left">
                        <DialogTitle className="text-3xl font-bold">{founder.name}</DialogTitle>
                        <DialogDescription className="text-yellow-400 font-medium uppercase tracking-wide mt-2">
                          {founder.role[loc]}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-slate-300 leading-relaxed text-base whitespace-pre-wrap">
                          {founder.bio[loc]}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex flex-wrap gap-3">
                  {["#Visionnaire", "#Leadership", "#Afrique", "#Éducation"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* National team */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-12"
          >
            {t("about.team")}
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {nationalTeam.map((m, i) => <TeamCard key={m.id} member={m} index={i} />)}
          </div>
        </div>

        {/* International committee */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-12"
          >
            {t("about.committee")}
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {committee.map((m, i) => <TeamCard key={m.id} member={m} index={i} />)}
          </div>
        </div>

        {/* Experts */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-12"
          >
            {t("about.experts")}
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experts.map((m, i) => <TeamCard key={m.id} member={m} index={i} />)}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
