"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import { Sparkles, Star, Heart, Search, Shield, Truck, PackageX, ArrowRight, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { products, productCategories } from "@/lib/data";

const formatPrice = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " GNF";

const badges: Record<string, { label: string; color: string }> = {
  new: { label: "NEW", color: "from-emerald-400 to-teal-500" },
  promo: { label: "PROMO", color: "from-rose-400 to-pink-500" },
  best: { label: "BEST", color: "from-yellow-400 to-amber-500" },
};

export function BoutiquePage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();
  const [activeCat, setActiveCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCat !== "all") list = list.filter((p) => p.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return list;
  }, [activeCat, query]);

  const featured = products.filter((p) => p.featured).slice(0, 4);

  const toggleFav = (id: string) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80"
            alt={t("shop.title")}
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
            <ShoppingBag className="w-3.5 h-3.5" /> {t("shop.tag")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("shop.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("shop.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Featured banner */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden glass-strong p-6 md:p-8 shadow-premium-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-600/10 pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  {t("shop.featured")}
                </h3>
                <p className="text-sm text-slate-500">Paiement Orange Money · MTN Money · Visa · Mastercard</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <Shield className="w-4 h-4" /> {t("shop.secure")}
                </span>
                <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
                  <Truck className="w-4 h-4" /> Livraison 24/48h
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
              {featured.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  onClick={() => navigate("product-detail", { id: p.id })}
                  className="group text-left p-4 rounded-2xl bg-white border border-slate-100 hover:border-yellow-400/40 hover:shadow-premium transition-all"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 mb-3">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">{p.brand}</p>
                  <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 mb-1.5">{p.name}</h4>
                  <div className="font-display font-bold text-blue-700 text-sm">{formatPrice(p.price)}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search + Category filter */}
      <section className="py-12 md:py-16 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("shop.search")}
                className="w-full pl-11 pr-4 py-3 rounded-xl input-shine text-sm shadow-premium"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
              <button
                onClick={() => setActiveCat("all")}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCat === "all"
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-yellow-400/40 hover:text-blue-700"
                }`}
              >
                {t("shop.all")}
              </button>
              {productCategories.map((c) => {
                const Icon = (Icons as any)[c.icon] ?? Icons.Package;
                const isActive = activeCat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCat(c.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-md"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-yellow-400/40 hover:text-blue-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {c.name[loc]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.button
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate("product-detail", { id: p.id })}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 text-left card-shine"
                >
                  {p.badge && (
                    <div
                      className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r ${badges[p.badge].color} text-slate-900 text-[10px] font-bold shadow-sm`}
                    >
                      {badges[p.badge].label}
                    </div>
                  )}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFav(p.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        toggleFav(p.id);
                      }
                    }}
                    className={`absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/80 backdrop-blur hover:bg-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer ${
                      favorites.includes(p.id) ? "text-rose-500 opacity-100" : "text-slate-400"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(p.id) ? "fill-rose-500" : ""}`} />
                  </div>

                  <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {!p.inStock && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wide">
                          {t("shop.outStock")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">{p.brand}</p>
                    <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-1">{p.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-amber-600">{p.rating}</span>
                      <span className="text-xs text-slate-400">({p.reviews})</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-display font-bold text-blue-700 text-sm">{formatPrice(p.price)}</div>
                        {p.oldPrice && (
                          <div className="text-[11px] text-slate-400 line-through">{formatPrice(p.oldPrice)}</div>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          p.inStock
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {p.inStock ? t("shop.inStock") : t("shop.outStock")}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <PackageX className="w-14 h-14 mx-auto mb-4 text-slate-300" />
              <p className="text-slate-500 font-medium">Aucun produit trouvé.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCat("all");
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                Réinitialiser les filtres <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
