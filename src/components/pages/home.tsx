"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import { ArrowRight, Heart, ShoppingBag, Users, Sparkles, ChevronDown, Compass, Lightbulb, Trophy, Star } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { ParticleField } from "@/components/effects/particle-field";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { SectionHeader } from "@/components/layout/section-header";
import { useApi } from "@/hooks/use-api";
import { stats, caseStudies as staticCaseStudies, heroGallery, programs as staticPrograms, formations as staticFormations, products as staticProducts, articles as staticArticles, events as staticEvents } from "@/lib/data";

export function HomePage() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Fetch from API (DB-backed) with fallback to static data
  const { data: programsData } = useApi<{ programs: any[] }>("/api/programs");
  const { data: formationsData } = useApi<{ formations: any[] }>("/api/formations?popular=true");
  const { data: productsData } = useApi<{ products: any[] }>("/api/products?featured=true");
  const { data: articlesData } = useApi<{ articles: any[] }>("/api/articles");
  const { data: eventsData } = useApi<{ events: any[] }>("/api/events");
  const { data: csData } = useApi<{ caseStudies: any[] }>("/api/case-studies");
  const caseStudies = csData?.caseStudies || staticCaseStudies;

  const featuredPrograms = (programsData?.programs || staticPrograms).slice(0, 4);
  const featuredFormations = (formationsData?.formations || staticFormations.filter((f) => f.popular)).slice(0, 3);
  const featuredProducts = (productsData?.products || staticProducts.filter((p) => p.featured)).slice(0, 4);
  const featuredArticles = (articlesData?.articles || staticArticles).slice(0, 3);
  const featuredEvents = (eventsData?.events || staticEvents).slice(0, 2);

  const heroCtas = [
    { key: "cta.join", icon: Users, target: "member" as const, primary: true },
    { key: "cta.discover", icon: Sparkles, target: "programs" as const, primary: false },
    { key: "cta.partner", icon: Heart, target: "partners" as const, primary: false },
    { key: "cta.shop", icon: ShoppingBag, target: "shop" as const, primary: false },
  ];

  return (
    <div className="animate-page-enter">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80" alt="Jeunesse africaine" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/80 via-[#003366]/70 to-[#1E3A5F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-[#0A1929]/30" />
        </motion.div>
        <div className="absolute inset-0 opacity-40"><ParticleField density={28} /></div>

        <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center justify-center gap-3 mb-8">
            <span className="block w-10 h-px bg-gradient-to-r from-transparent to-[#FFD700]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFD700]">{t("hero.badge")}</span>
            <span className="block w-10 h-px bg-gradient-to-l from-transparent to-[#FFD700]" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-8 text-white tracking-tight">
            <span className="block font-light italic text-white/90">{t("hero.title1")}</span>
            <span className="block text-yellow-gradient mt-2">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }} className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200/85 leading-relaxed mb-12 font-light">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }} className="flex flex-wrap items-center justify-center gap-3 mb-20">
            {heroCtas.map((cta, i) => {
              const Icon = cta.icon;
              return (
                <motion.button key={cta.key} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }} onClick={() => navigate(cta.target)} className={cta.primary ? "btn-gold group px-7 py-3.5 rounded-md text-[13px] font-semibold flex items-center gap-2 tracking-tight" : "px-7 py-3.5 rounded-md text-[13px] font-semibold flex items-center gap-2 tracking-tight bg-white/[0.06] backdrop-blur border border-white/15 text-white hover:bg-white/[0.12] hover:border-white/25 transition-all duration-400"}>
                  <Icon className="w-4 h-4" />
                  <span>{t(cta.key)}</span>
                  {i === 0 && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-px max-w-4xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
            {stats.map((s, i) => (
              <div key={i} className="bg-[#0A1929]/40 px-6 py-7 text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-[#FFD700] mb-1.5 tabular-nums">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300/80 font-medium">{t(s.key)}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.button onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" })} style={{ opacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-slate-400 hover:text-[#FFD700] transition-colors duration-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}>
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium">{t("hero.scroll")}</span>
          <div className="relative w-5 h-9 rounded-full border border-slate-500/60 flex justify-center pt-2">
            <span className="block w-px h-2 rounded-full bg-[#FFD700] animate-scroll-down" />
          </div>
        </motion.button>
      </section>

      {/* ===== VISION BAND ===== */}
      <section className="py-24 md:py-32 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={t("about.tag")} title={t("about.title")} subtitle={t("about.mission.text")} />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Compass, title: t("about.vision"), text: t("about.vision.text").slice(0, 180) + "…", color: "from-[#1E3A5F] to-[#003366]", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
              { icon: Lightbulb, title: t("about.why"), text: t("about.why.text").slice(0, 180) + "…", color: "from-[#FFD700] to-[#FFC107]", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80" },
              { icon: Trophy, title: t("about.objectives"), text: "Six objectifs ambitieux à l'horizon 2030, de la formation de 50 000 jeunes à la création d'un réseau panafricain de mentors.", color: "from-[#5c8a7a] to-[#3d6b5d]", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -4 }} className="group bg-white rounded-xl overflow-hidden border border-[#E8ECF1]/60 hover:border-[#FFD700]/30 hover:shadow-premium-lg transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={c.image} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/50 via-transparent to-transparent" />
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-[#003366] mb-3 tracking-tight">{c.title}</h3>
                    <p className="text-[14px] text-[#5C6573] leading-relaxed mb-4">{c.text}</p>
                    <button onClick={() => navigate("about")} className="inline-flex items-center gap-1.5 text-[#FFD700] font-medium text-[13px] hover:gap-2.5 transition-all duration-300">
                      {t("cta.learnMore")} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROGRAMS ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={t("programs.tag")} title={t("programs.title")} subtitle={t("programs.subtitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPrograms.map((p, i) => (
              <motion.button key={p.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6 }} onClick={() => navigate("program-detail", { id: p.id })} className="group text-left bg-white rounded-xl overflow-hidden border border-[#E8ECF1]/60 hover:border-[#FFD700]/30 hover:shadow-premium-lg transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <Image src={p.image} alt={p.title?.fr || p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/80 via-[#0A1929]/15 to-transparent" />
                  <div className={`absolute top-4 left-4 w-10 h-10 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-md`}>
                    {(() => { const Icon = (Icons as any)[p.icon] ?? Sparkles; return <Icon className="w-5 h-5 text-white" />; })()}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFD700] font-semibold">Programme</span>
                    <h3 className="font-display font-semibold text-lg text-white mt-1 leading-tight">{p.title?.fr || p.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[13px] text-[#5C6573] leading-relaxed mb-4 line-clamp-3">{p.short?.fr || p.short}</p>
                  <div className="flex items-center gap-1.5 text-[#FFD700] text-[13px] font-medium">
                    <span>{t("cta.learnMore")}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("programs")} className="btn-outline-shine px-8 py-3 rounded-md text-[13px] font-semibold inline-flex items-center gap-2">
              {t("cta.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURED FORMATIONS ===== */}
      <section className="py-24 md:py-32 bg-[#FBF8F2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={t("formations.tag")} title={t("formations.title")} subtitle={t("formations.subtitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFormations.map((f, i) => (
              <motion.button key={f.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }} whileHover={{ y: -4 }} onClick={() => navigate("formation-detail", { id: f.id })} className="group text-left bg-white rounded-xl overflow-hidden border border-[#E8ECF1]/60 hover:border-[#FFD700]/30 hover:shadow-premium-lg transition-all duration-500">
                <div className="relative h-44 overflow-hidden">
                  <Image src={f.image} alt={f.title?.fr || f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.2s]" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur text-[#003366] text-[9px] font-semibold uppercase tracking-wider">Populaire</div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#FFD700] font-semibold">{f.category?.fr || f.category}</span>
                  <h3 className="font-display font-semibold text-lg text-[#003366] mt-1.5 mb-2 leading-tight">{f.title?.fr || f.title}</h3>
                  <p className="text-[13px] text-[#5C6573] leading-relaxed mb-4 line-clamp-2">{f.description?.fr || f.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E8ECF1]/60">
                    <span className="font-display font-semibold text-[#003366] text-base tabular-nums">{new Intl.NumberFormat("fr-FR").format(f.price)} <span className="text-[11px] text-[#5C6573] font-normal">GNF</span></span>
                    <span className="flex items-center gap-1 text-[12px] text-[#5C6573]">
                      <Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />{f.rating}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("formations")} className="btn-outline-shine px-8 py-3 rounded-md text-[13px] font-semibold inline-flex items-center gap-2">
              {t("cta.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={t("shop.tag")} title={t("shop.title")} subtitle={t("shop.subtitle")} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featuredProducts.map((p, i) => (
              <motion.button key={p.id} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} whileHover={{ y: -3 }} onClick={() => navigate("product-detail", { id: p.id })} className="group text-left bg-white rounded-xl overflow-hidden border border-[#E8ECF1]/60 hover:border-[#FFD700]/30 hover:shadow-premium-lg transition-all duration-500">
                <div className="relative aspect-square overflow-hidden bg-[#F4F6F9]">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.2s]" sizes="(max-width: 768px) 50vw, 25vw" />
                  {p.badge && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur text-[#003366]">
                      {p.badge === "best" ? "Best-seller" : p.badge === "new" ? "Nouveau" : "Promo"}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#FFD700] font-semibold mb-1">{p.brand}</p>
                  <h4 className="font-medium text-[#003366] text-[13px] mb-2 line-clamp-1">{p.name}</h4>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                    <span className="text-[11px] font-medium text-[#003366]">{p.rating}</span>
                    <span className="text-[11px] text-[#5C6573]">({p.reviews})</span>
                  </div>
                  <div className="font-display font-semibold text-[#003366] text-[15px] tabular-nums">{new Intl.NumberFormat("fr-FR").format(p.price)} <span className="text-[10px] text-[#5C6573] font-normal">GNF</span></div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("shop")} className="btn-outline-shine px-8 py-3 rounded-md text-[13px] font-semibold inline-flex items-center gap-2">
              {t("cta.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="py-24 md:py-32 bg-[#FBF8F2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={t("partners.tag")} title={t("partners.title")} subtitle={t("partners.subtitle")} />
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} whileHover={{ y: -6 }} className="group bg-white rounded-xl overflow-hidden border border-[#E8ECF1]/60 hover:border-[#FFD700]/30 hover:shadow-premium-lg transition-all duration-500">
                <div className="relative h-52 overflow-hidden">
                  <Image src={cs.image} alt={cs.title?.fr || ""} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.2s]" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/85 via-[#0A1929]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-white text-[10px] font-semibold uppercase tracking-wider">{cs.partner}</span>
                    <div className="text-right">
                      <div className="text-3xl font-display font-bold text-[#FFD700] tabular-nums leading-none">{cs.metric}</div>
                      <div className="text-[9px] text-white/75 uppercase tracking-wider mt-1">{cs.result}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-display font-semibold text-lg text-[#003366] mb-2 leading-tight">{cs.title?.fr || ""}</h4>
                  <p className="text-[13px] text-[#5C6573] leading-relaxed">{cs.description?.fr || ""}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("partners")} className="btn-outline-shine px-8 py-3 rounded-md text-[13px] font-semibold inline-flex items-center gap-2">
              {t("partners.become")} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== NEWS + EVENTS ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <SectionHeader badge={t("news.tag")} title={t("news.title")} align="left" />
              <div className="space-y-3">
                {featuredArticles.map((a, i) => (
                  <motion.button key={a.id} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} onClick={() => navigate("article-detail", { id: a.id })} className="group flex items-start gap-4 bg-white rounded-lg p-3 border border-[#E8ECF1]/50 hover:border-[#FFD700]/30 hover:shadow-premium transition-all w-full text-left">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={a.image} alt={a.title?.fr || a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="80px" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#FFD700] font-semibold">{a.category?.fr || a.category}</span>
                      <h4 className="font-medium text-[#003366] text-[13px] leading-snug mt-1 mb-1 line-clamp-2 group-hover:text-[#FFD700] transition-colors">{a.title?.fr || a.title}</h4>
                      <p className="text-[11px] text-[#5C6573]">{a.readTime} min · {new Date(a.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
              <button onClick={() => navigate("news")} className="mt-6 text-[#FFD700] font-medium text-[13px] hover:underline inline-flex items-center gap-1">
                {t("cta.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <SectionHeader badge={t("events.tag")} title={t("events.title")} align="left" />
              <div className="space-y-3">
                {featuredEvents.map((e, i) => (
                  <motion.div key={e.id} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group flex items-center gap-4 bg-white rounded-lg p-3 border border-[#E8ECF1]/50 hover:border-[#FFD700]/30 hover:shadow-premium transition-all">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={e.image} alt={e.title?.fr || e.title} fill className="object-cover" sizes="64px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/80 to-transparent" />
                      <div className="absolute bottom-0.5 left-0 right-0 text-center text-white">
                        <div className="text-base font-bold leading-none font-display">{new Date(e.date).toLocaleDateString("fr-FR", { day: "numeric" })}</div>
                        <div className="text-[8px] uppercase tracking-wider">{new Date(e.date).toLocaleDateString("fr-FR", { month: "short" })}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#FFD700] font-semibold">{e.type}</span>
                      <h4 className="font-medium text-[#003366] text-[13px] leading-snug mt-1 mb-1 line-clamp-2">{e.title?.fr || e.title}</h4>
                      <p className="text-[11px] text-[#5C6573]">{e.location?.fr || e.location}</p>
                    </div>
                    <button onClick={() => navigate("events")} className="px-3 py-1.5 rounded-md bg-[#FFF8DC]/40 text-[#003366] text-[11px] font-semibold hover:bg-[#FFF8DC]/70 transition-all">{t("events.register")}</button>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => navigate("events")} className="mt-6 text-[#FFD700] font-medium text-[13px] hover:underline inline-flex items-center gap-1">
                {t("cta.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-24 md:py-32 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={t("media.tag")} title={t("media.title")} subtitle={t("media.subtitle")} />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {heroGallery.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -3 }} onClick={() => navigate("media")} className={`group relative cursor-pointer overflow-hidden rounded-lg shadow-premium hover:shadow-premium-lg transition-all ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}>
                <Image src={img} alt={`Galerie ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.2s]" sizes="(max-width: 768px) 50vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#003366] via-[#1f3358] to-[#1E3A5F] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#FFD700]/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
              <span className="block w-8 h-px bg-gradient-to-r from-transparent to-[#FFD700]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFD700]">LET'S SHINE</span>
              <span className="block w-8 h-px bg-gradient-to-l from-transparent to-[#FFD700]" />
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{t("hero.title2")}</motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-300/90 text-base md:text-lg mb-10 leading-relaxed font-light max-w-xl mx-auto">{t("donate.subtitle")}</motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate("donate")} className="btn-gold px-8 py-3.5 rounded-md text-[13px] font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4" /> {t("cta.donate")}
              </button>
              <button onClick={() => navigate("member")} className="px-8 py-3.5 rounded-md text-[13px] font-semibold bg-white/[0.06] backdrop-blur border border-white/15 text-white hover:bg-white/[0.12] transition-all flex items-center gap-2">
                <Users className="w-4 h-4" /> {t("cta.join")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
