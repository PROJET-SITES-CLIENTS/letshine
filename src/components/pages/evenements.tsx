"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Mic,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { useApi } from "@/hooks/use-api";
import { useAuth } from "@/hooks/use-auth";
import { events as staticEvents } from "@/lib/data";
import { toast } from "sonner";

export function EvenementsPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();
  const { isAuthenticated } = useAuth();
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  const { data, loading } = useApi<{ events: any[] }>("/api/events");
  const events = (data?.events?.length ? data.events : staticEvents);

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
      day: date.toLocaleDateString(
        loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US",
        { day: "numeric" }
      ),
      month: date
        .toLocaleDateString(
          loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US",
          { month: "short" }
        )
        .toUpperCase(),
    };
  };

  const handleRegister = async (e: any) => {
    if (!isAuthenticated) {
      toast.error("Contactez-nous pour vous inscrire");
      navigate("contact");
      return;
    }
    setRegisteringId(e.id);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "EVENT",
          eventId: e.id,
          amount: e.price,
        }),
      });
      if (res.ok) {
        toast.success(
          `Inscription à « ${e.title?.[loc] || e.title?.fr} » envoyée !`
        );
      } else {
        toast.error("Erreur");
      }
    } catch {
      toast.error("Erreur réseau");
    }
    setRegisteringId(null);
  };

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
            alt={t("events.title")}
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
            <Calendar className="w-3.5 h-3.5" /> {t("events.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("events.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("events.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Event list */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("events.tag")}
            title={t("events.title")}
            subtitle={t("events.subtitle")}
          />

          <div className="space-y-5 max-w-5xl mx-auto">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl overflow-hidden shadow-premium animate-pulse"
                >
                  <div className="grid md:grid-cols-[140px_1fr_auto] gap-0">
                    <div className="h-[120px] bg-slate-200" />
                    <div className="p-7 space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-1/4" />
                      <div className="h-6 bg-slate-200 rounded w-2/3" />
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-1/2" />
                    </div>
                    <div className="p-7 flex items-center justify-center">
                      <div className="h-8 w-24 bg-slate-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
            events.map((e, i) => {
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
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
                >
                  <div className="grid md:grid-cols-[140px_1fr_auto] gap-0">
                    {/* Date block */}
                    <div
                      className={`relative p-6 bg-gradient-to-br ${typeGradients[e.type]} flex flex-col items-center justify-center text-center min-h-[120px]`}
                    >
                      <div className="relative">
                        <div className="font-display text-4xl font-extrabold text-white leading-none">
                          {date.day}
                        </div>
                        <div className="text-sm font-bold text-white/90 mt-1">
                          {date.month}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-7 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r ${typeGradients[e.type]} text-white text-[10px] font-bold uppercase`}
                        >
                          <Icon className="w-3 h-3" />
                          {typeLabels[e.type]}
                        </span>
                        {isFree && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
                            GRATUIT
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {e.title?.[loc] || e.title?.fr}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        {e.description?.[loc] || e.description?.fr}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          {e.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          {e.location?.[loc] || e.location?.fr}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-amber-500" />
                          {e.registered}/{e.seats}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4 max-w-xs">
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${fillPct}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: i * 0.1 + 0.3,
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">
                          {Math.round(fillPct)}% {t("events.upcoming").toLowerCase()}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="p-6 md:p-7 flex flex-col items-center justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100">
                      <div className="text-center mb-1">
                        <div className="font-display text-2xl font-extrabold text-blue-700">
                          {isFree
                            ? "GRATUIT"
                            : new Intl.NumberFormat("fr-FR").format(e.price) +
                              " GNF"}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRegister(e)}
                        disabled={registeringId === e.id}
                        className="btn-gold px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {registeringId === e.id ? "..." : t("events.register")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
