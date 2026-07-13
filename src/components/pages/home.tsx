"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import { ArrowRight, Heart, ShoppingBag, Users, Sparkles, ChevronDown, Compass, Briefcase, Lightbulb, Trophy } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { ParticleField } from "@/components/effects/particle-field";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { SectionHeader } from "@/components/layout/section-header";
import { stats, programs, formations, products, articles, events, caseStudies, heroGallery } from "@/lib/data";

export function HomePage() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const featuredPrograms = programs.slice(0, 4);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const featuredArticles = articles.slice(0, 3);
  const featuredEvents = events.slice(0, 2);

  const heroCtas = [
    { key: "cta.join", icon: Users, target: "member" as const, primary: true },
    { key: "cta.discover", icon: Sparkles, target: "programs" as const, primary: false },
    { key: "cta.partner", icon: Heart, target: "partners" as const, primary: false },
    { key: "cta.shop", icon: ShoppingBag, target: "shop" as const, primary: false },
  ];

  return (
    <div className="animate-page-enter">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80"
            alt="Jeunesse africaine"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/85 via-[#0f172a]/80 to-[#1e3a8a]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-[#0a0f1e]/40" />
        </motion.div>

        {/* Particles for atmosphere */}
        <div className="absolute inset-0">
          <ParticleField density={35} />
        </div>

        {/* Animated light beam */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[60vh] bg-gradient-to-b from-yellow-300/0 via-yellow-300/40 to-yellow-300/0"
          animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.8, 1.1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{ opacity }}
          className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 pb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-yellow mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-yellow-300">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-6 text-white"
          >
            <span className="block">{t("hero.title1")}</span>
            <span className="block text-gold-gradient animate-count-glow mt-2">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-200/90 leading-relaxed mb-10 font-light"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {heroCtas.map((cta) => {
              const Icon = cta.icon;
              return (
                <motion.button
                  key={cta.key}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(cta.target)}
                  className={cta.primary ? "btn-gold group px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2" : "px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-all"}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(cta.key)}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {stats.map((s) => (
              <motion.div
                key={s.key}
                whileHover={{ y: -4 }}
                className="glass-navy rounded-2xl p-5 md:p-6"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-gold-gradient font-display mb-1">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs md:text-sm text-slate-300 font-medium uppercase tracking-wide">
                  {t(s.key)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.button
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" })}
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-300 hover:text-yellow-400 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{t("hero.scroll")}</span>
          <div className="relative w-6 h-10 rounded-full border-2 border-slate-500 flex justify-center pt-2">
            <span className="block w-1 h-2 rounded-full bg-yellow-400 animate-scroll-down" />
          </div>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.button>
      </section>

      {/* ===== HIGHLIGHTS / VISION BAND ===== */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("about.tag")}
            title={t("about.title")}
            subtitle={t("about.mission.text")}
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Compass, title: t("about.vision"), text: t("about.vision.text").slice(0, 200) + "…", color: "from-blue-500 to-indigo-600", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
              { icon: Lightbulb, title: t("about.why"), text: t("about.why.text").slice(0, 200) + "…", color: "from-amber-500 to-yellow-600", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80" },
              { icon: Trophy, title: t("about.objectives"), text: "6 objectifs ambitieux à l'horizon 2030, de la formation de 50 000 jeunes à la création d'un réseau panafricain de mentors.", color: "from-emerald-500 to-teal-600", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image src={c.image} alt={c.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute -bottom-6 left-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6 pt-8">
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{c.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{c.text}</p>
                    <button onClick={() => navigate("about")} className="flex items-center gap-1.5 text-blue-700 font-semibold text-sm hover:gap-2.5 transition-all">
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("programs.tag")}
            title={t("programs.title")}
            subtitle={t("programs.subtitle")}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPrograms.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate("program-detail", { id: p.id })}
                className="group text-left bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 card-shine"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={p.image} alt={p.title.fr} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg`}>
                    {(() => { const Icon = (Icons as any)[p.icon] ?? Sparkles; return <Icon className="w-5 h-5 text-white" />; })()}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display font-bold text-lg text-white mb-1">{p.title.fr}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{p.short.fr}</p>
                  <div className="flex items-center gap-1.5 text-blue-700 text-sm font-semibold">
                    <span>{t("cta.learnMore")}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigate("programs")} className="btn-outline-shine px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2">
              {t("cta.viewAll")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURED FORMATIONS ===== */}
      <section className="py-24 bg-gradient-to-b from-yellow-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("formations.tag")}
            title={t("formations.title")}
            subtitle={t("formations.subtitle")}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {formations.filter((f) => f.popular).slice(0, 3).map((f, i) => (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate("formation-detail", { id: f.id })}
                className="group text-left bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={f.image} alt={f.title.fr} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-[10px] font-bold uppercase">
                    Popular
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{f.category.fr}</span>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2 mt-1">{f.title.fr}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">{f.description.fr}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="font-display font-bold text-blue-700 text-lg">{new Intl.NumberFormat("fr-FR").format(f.price)} GNF</span>
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <Icons.Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />{f.rating}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigate("formations")} className="btn-outline-shine px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2">
              {t("cta.viewAll")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("shop.tag")}
            title={t("shop.title")}
            subtitle={t("shop.subtitle")}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate("product-detail", { id: p.id })}
                className="group text-left bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  {p.badge && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 text-[10px] font-bold uppercase">
                      {p.badge === "best" ? "BEST" : p.badge === "new" ? "NEW" : "PROMO"}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">{p.brand}</p>
                  <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-1">{p.name}</h4>
                  <div className="flex items-center gap-1 mb-1">
                    <Icons.Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold text-slate-700">{p.rating}</span>
                    <span className="text-xs text-slate-400">({p.reviews})</span>
                  </div>
                  <div className="font-display font-bold text-blue-700">{new Intl.NumberFormat("fr-FR").format(p.price)} GNF</div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigate("shop")} className="btn-outline-shine px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2">
              {t("cta.viewAll")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== CASE STUDIES / IMPACT ===== */}
      <section className="py-24 bg-gradient-to-b from-white to-yellow-50/40">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            badge={t("partners.tag")}
            title={t("partners.title")}
            subtitle={t("partners.subtitle")}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={cs.image} alt={cs.title.fr} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-white/15 backdrop-blur text-white text-[10px] font-bold uppercase">{cs.partner}</span>
                    <div className="text-right">
                      <div className="text-3xl font-display font-extrabold text-yellow-400">{cs.metric}</div>
                      <div className="text-[10px] text-white/80 uppercase">{cs.result}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-display font-bold text-lg text-slate-900 mb-2">{cs.title.fr}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{cs.description.fr}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigate("partners")} className="btn-outline-shine px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2">
              {t("partners.become")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== NEWS + EVENTS ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* News */}
            <div>
              <SectionHeader badge={t("news.tag")} title={t("news.title")} align="left" />
              <div className="space-y-4">
                {featuredArticles.map((a, i) => (
                  <motion.button
                    key={a.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => navigate("article-detail", { id: a.id })}
                    className="group flex items-start gap-4 bg-white rounded-2xl p-3 shadow-premium hover:shadow-premium-lg transition-all w-full text-left"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image src={a.image} alt={a.title.fr} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="96px" />
                    </div>
                    <div className="flex-1 pt-1">
                      <span className="text-[10px] uppercase tracking-wide text-amber-600 font-bold">{a.category.fr}</span>
                      <h4 className="font-semibold text-slate-900 text-sm leading-snug mt-1 mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">{a.title.fr}</h4>
                      <p className="text-xs text-slate-500">{a.readTime} min · {new Date(a.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
              <button onClick={() => navigate("news")} className="mt-6 text-blue-700 font-semibold text-sm hover:underline inline-flex items-center gap-1">
                {t("cta.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Events */}
            <div>
              <SectionHeader badge={t("events.tag")} title={t("events.title")} align="left" />
              <div className="space-y-4">
                {featuredEvents.map((e, i) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex items-center gap-4 bg-white rounded-2xl p-3 shadow-premium hover:shadow-premium-lg transition-all"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image src={e.image} alt={e.title.fr} fill className="object-cover" sizes="80px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-1 left-0 right-0 text-center text-white">
                        <div className="text-lg font-bold leading-none">{new Date(e.date).toLocaleDateString("fr-FR", { day: "numeric" })}</div>
                        <div className="text-[9px] uppercase">{new Date(e.date).toLocaleDateString("fr-FR", { month: "short" })}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-wide text-amber-600 font-bold">{e.type}</span>
                      <h4 className="font-semibold text-slate-900 text-sm leading-snug mt-1 mb-1 line-clamp-2">{e.title.fr}</h4>
                      <p className="text-xs text-slate-500">{e.location.fr}</p>
                    </div>
                    <button onClick={() => navigate("events")} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-all">
                      {t("events.register")}
                    </button>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => navigate("events")} className="mt-6 text-blue-700 font-semibold text-sm hover:underline inline-flex items-center gap-1">
                {t("cta.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY BAND ===== */}
      <section className="py-24 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge={t("media.tag")} title={t("media.title")} subtitle={t("media.subtitle")} />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {heroGallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate("media")}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-premium ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}
              >
                <Image src={img} alt={`Galerie ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-5xl font-extrabold text-white mb-5"
            >
              {t("hero.title2")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-200 text-base md:text-lg mb-8 leading-relaxed"
            >
              {t("donate.subtitle")}
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate("donate")} className="btn-gold px-8 py-3.5 rounded-xl font-bold flex items-center gap-2">
                <Heart className="w-4 h-4" /> {t("cta.donate")}
              </button>
              <button onClick={() => navigate("member")} className="px-8 py-3.5 rounded-xl font-bold bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2">
                <Users className="w-4 h-4" /> {t("cta.join")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
