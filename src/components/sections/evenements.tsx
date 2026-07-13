"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Calendar, Clock, MapPin, Users, Video, Mic, Wrench, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { events } from "@/lib/data";

export function Evenements() {
  const { t } = useLanguage();
  const loc = useLocalized();

  const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    webinar: Video,
    conference: Mic,
    workshop: Wrench,
  };

  const typeLabels: Record<string, string> = {
    webinar: t("events.webinar"),
    conference: t("events.conference"),
    workshop: t("events.workshop"),
  };

  const typeGradients: Record<string, string> = {
    webinar: "from-rose-500 to-pink-600",
    conference: "from-blue-500 to-indigo-600",
    workshop: "from-emerald-500 to-teal-600",
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return {
      day: date.toLocaleDateString(loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US", { day: "numeric" }),
      month: date.toLocaleDateString(loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US", { month: "short" }).toUpperCase(),
      full: date.toLocaleDateString(loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    };
  };

  return (
    <SectionReveal id="events" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] bg-gradient-to-br from-fuchsia-600/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Calendar className="w-3.5 h-3.5" />
            {t("events.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("events.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("events.subtitle")}
          </motion.p>
        </div>

        <div className="space-y-5 max-w-5xl mx-auto">
          {events.map((e, i) => {
            const Icon = typeIcons[e.type];
            const date = formatDate(e.date);
            const fillPct = Math.min((e.registered / e.seats) * 100, 100);
            const isFree = e.price === 0;

            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative glass rounded-3xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500"
              >
                <div className="grid md:grid-cols-[140px_1fr_auto] gap-0">
                  {/* Date block */}
                  <div className={`relative p-6 bg-gradient-to-br ${typeGradients[e.type]} flex flex-col items-center justify-center text-center`}>
                    <div className="absolute inset-0 bg-[#0a0f1e]/30" />
                    <div className="relative">
                      <div className="font-display text-4xl font-extrabold text-white leading-none">{date.day}</div>
                      <div className="text-sm font-bold text-white/90 mt-1">{date.month}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r ${typeGradients[e.type]} text-white text-[10px] font-bold uppercase`}>
                        <Icon className="w-3 h-3" />
                        {typeLabels[e.type]}
                      </span>
                      {isFree ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-[10px] font-bold uppercase">GRATUIT</span>
                      ) : null}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                      {e.title[loc]}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">{e.description[loc]}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-yellow-400" />{e.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-yellow-400" />{e.location[loc]}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-yellow-400" />{e.registered}/{e.seats}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 max-w-xs">
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${fillPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{Math.round(fillPct)}% inscrits</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-6 md:p-7 flex flex-col items-center justify-center gap-3 border-t md:border-t-0 md:border-l border-white/5">
                    <div className="text-center mb-1">
                      <div className="font-display text-2xl font-extrabold text-yellow-400">
                        {isFree ? "GRATUIT" : new Intl.NumberFormat("fr-FR").format(e.price) + " GNF"}
                      </div>
                    </div>
                    <button className="btn-shine px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 whitespace-nowrap">
                      {t("events.register")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
