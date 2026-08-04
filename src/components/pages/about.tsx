"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import { Crown, ShieldCheck, Lightbulb, Target, HeartHandshake, Rocket, Quote, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { values, objectives, founder as staticFounder, nationalTeam as staticNationalTeam, committee as staticCommittee, experts as staticExperts } from "@/lib/data";
import type { TeamMember } from "@/lib/data";
import { useApi } from "@/hooks/use-api";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown, ShieldCheck, Lightbulb, Target, HeartHandshake, Rocket,
};

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const loc = useLocalized();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h4 className="font-display font-bold text-lg text-white mb-1">{member.name}</h4>
          <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wide">{member.role?.[loc] || member.role?.fr || ""}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-600 leading-relaxed">{member.bio?.[loc] || member.bio?.fr || ""}</p>
      </div>
    </motion.div>
  );
}

export function AboutPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();

  const { data: teamData } = useApi<{ team: any[] }>("/api/team");
  const allTeam = teamData?.team || [];
  const founder = allTeam.find((m: any) => m?.category === "founder") || staticFounder;
  const apiNational = allTeam.filter((m: any) => m?.category === "national");
  const apiCommittee = allTeam.filter((m: any) => m?.category === "committee");
  const apiExperts = allTeam.filter((m: any) => m?.category === "experts");
  const nationalTeam = apiNational.length ? apiNational : staticNationalTeam;
  const committee = apiCommittee.length ? apiCommittee : staticCommittee;
  const experts = apiExperts.length ? apiExperts : staticExperts;

  const sections = [
    { key: "about.story", text: "about.story.text", icon: Quote, color: "from-amber-500 to-yellow-600", image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80" },
    { key: "about.why", text: "about.why.text", icon: Lightbulb, color: "from-blue-500 to-indigo-600", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80" },
    { key: "about.vision", text: "about.vision.text", icon: Target, color: "from-purple-500 to-fuchsia-600", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80" },
    { key: "about.mission", text: "about.mission.text", icon: Rocket, color: "from-emerald-500 to-teal-600", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" },
  ];

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1920&q=80" alt="À propos" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#0A1929]/80 to-[#003366]/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative text-center py-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Icons.Sparkles className="w-3.5 h-3.5" /> {t("about.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("about.title")}
          </motion.h1>
        </div>
      </section>

      {/* Story sections with images */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-12 max-w-6xl mx-auto">
            {sections.map((s, i) => {
              const Icon = s.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-8 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
                >
                  <div className={`relative h-72 md:h-80 rounded-3xl overflow-hidden shadow-premium-lg [direction:ltr]`}>
                    <Image src={s.image} alt={t(s.key)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className={`absolute -bottom-6 ${reverse ? "right-6" : "left-6"} w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="[direction:ltr]">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t(s.key)}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px] md:text-base">{t(s.text)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values with images */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge={t("about.values")} title={t("about.values")} />
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
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300"
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image src={v.image} alt={t(v.key)} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 16vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-display font-bold text-slate-900 text-sm mb-1.5">{t(v.key)}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{t(`${v.key}.desc`)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-24 bg-gradient-to-b from-yellow-50/40 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge={t("about.objectives")} title={t("about.objectives")} />
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {objectives.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white shadow-premium hover:shadow-premium-lg transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center font-bold text-white font-display text-base shadow-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-slate-700 leading-relaxed text-[15px] pt-2.5">{o[loc]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder spotlight */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge={t("about.founder")} title={t("about.founder")} />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-yellow-50 rounded-3xl overflow-hidden shadow-premium-lg"
          >
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
              <div className="relative h-80 md:h-auto">
                <Image src={founder.image} alt={founder.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-8 md:p-10">
                <h4 className="font-display text-3xl font-bold text-slate-900 mb-2">{founder.name}</h4>
                <p className="text-blue-700 font-semibold uppercase tracking-wide text-sm mb-6">{founder.role?.[loc] || founder.role?.fr || ""}</p>
                <p className="text-slate-700 leading-relaxed text-[15px] md:text-base mb-6">{founder.bio?.[loc] || founder.bio?.fr || ""}</p>
                <div className="flex flex-wrap gap-2">
                  {["#Visionnaire", "#Leadership", "#Afrique", "#Éducation"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teams */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6 space-y-20">
          <div>
            <SectionHeader badge={t("about.team")} title={t("about.team")} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {nationalTeam.map((m, i) => <TeamCard key={m.id} member={m} index={i} />)}
            </div>
          </div>
          <div>
            <SectionHeader badge={t("about.committee")} title={t("about.committee")} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {committee.map((m, i) => <TeamCard key={m.id} member={m} index={i} />)}
            </div>
          </div>
          <div>
            <SectionHeader badge={t("about.experts")} title={t("about.experts")} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {experts.map((m, i) => <TeamCard key={m.id} member={m} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 relative text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-5">Rejoignez l'aventure LET'S SHINE</h2>
          <p className="text-slate-200 mb-8 max-w-2xl mx-auto">Que vous soyez jeune, partenaire, mentor ou donateur, il y a une place pour vous dans notre mouvement.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate("member")} className="btn-gold px-8 py-3.5 rounded-xl font-bold flex items-center gap-2">
              {t("cta.join")} <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate("contact")} className="px-8 py-3.5 rounded-xl font-bold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
              {t("cta.contactUs")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
