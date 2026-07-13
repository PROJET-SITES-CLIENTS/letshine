"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Star, ShoppingCart, Shield, Truck, X, Check, Heart, Search, Filter } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { SectionReveal } from "@/components/effects/section-reveal";
import { products, productCategories, type Product } from "@/lib/data";

export function Boutique() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [activeCat, setActiveCat] = useState<string>("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCat !== "all") list = list.filter((p) => p.category === activeCat);
    if (query.trim()) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [activeCat, query]);

  const featured = products.filter((p) => p.featured).slice(0, 4);

  const formatPrice = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " GNF";

  const badges: Record<string, { label: string; color: string }> = {
    new: { label: "NEW", color: "from-emerald-400 to-teal-500" },
    promo: { label: "PROMO", color: "from-rose-400 to-pink-500" },
    best: { label: "BEST", color: "from-yellow-400 to-amber-500" },
  };

  return (
    <SectionReveal id="shop" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0f1e] via-[#0d152b] to-[#0a0f1e]">
      <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-gradient-to-br from-purple-600/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-yellow text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Icons.ShoppingBag className="w-3.5 h-3.5" />
            {t("shop.tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-5"
          >
            {t("shop.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {t("shop.subtitle")}
          </motion.p>
        </div>

        {/* Featured banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12 rounded-3xl overflow-hidden glass-strong p-6 md:p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-600/10" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-1">{t("shop.featured")}</h3>
              <p className="text-sm text-slate-400">Paiement Orange Money · MTN Money · Visa · Mastercard</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400"><Shield className="w-4 h-4" />{t("shop.secure")}</span>
              <span className="flex items-center gap-1.5 text-blue-400"><Truck className="w-4 h-4" />Livraison 24/48h</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featured.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(p)}
                className="group text-left p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-yellow-400/30 transition-all"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 mb-3 flex items-center justify-center overflow-hidden">
                  <div className="text-3xl font-display font-bold text-yellow-400/40 group-hover:scale-110 transition-transform">
                    {p.brand.charAt(0)}
                  </div>
                </div>
                <p className="text-xs text-slate-500 uppercase mb-0.5">{p.brand}</p>
                <h4 className="text-sm font-semibold text-white line-clamp-1 mb-1.5">{p.name}</h4>
                <div className="font-display font-bold text-yellow-400 text-sm">{formatPrice(p.price)}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Search + Category filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("shop.search")}
              className="w-full pl-11 pr-4 py-3 rounded-xl input-shine text-sm"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveCat("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCat === "all"
                  ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900"
                  : "glass text-slate-300 hover:text-yellow-300"
              }`}
            >
              {t("shop.all")}
            </button>
            {productCategories.map((c) => {
              const Icon = (Icons as any)[c.icon] ?? Icons.Package;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCat === c.id
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900"
                      : "glass text-slate-300 hover:text-yellow-300"
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
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(p)}
                className="group relative glass rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500 cursor-pointer card-shine"
              >
                {p.badge && (
                  <div className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r ${badges[p.badge].color} text-slate-900 text-[10px] font-bold`}>
                    {badges[p.badge].label}
                  </div>
                )}
                <button className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-black/30 backdrop-blur text-white hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4" />
                </button>

                <div className="aspect-square bg-gradient-to-br from-slate-800 via-slate-900 to-[#0a0f1e] flex items-center justify-center overflow-hidden">
                  <div className="text-5xl font-display font-extrabold text-yellow-400/30 group-hover:scale-110 group-hover:text-yellow-400/50 transition-all duration-500">
                    {p.brand.charAt(0)}
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">{p.brand}</p>
                  <h4 className="font-semibold text-white text-sm mb-2 line-clamp-1">{p.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-400">{p.rating}</span>
                    <span className="text-xs text-slate-500">({p.reviews})</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-display font-bold text-yellow-400">{formatPrice(p.price)}</div>
                      {p.oldPrice && (
                        <div className="text-xs text-slate-500 line-through">{formatPrice(p.oldPrice)}</div>
                      )}
                    </div>
                    <span className={`text-[10px] font-semibold ${p.inStock ? "text-emerald-400" : "text-rose-400"}`}>
                      {p.inStock ? t("shop.inStock") : t("shop.outStock")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Icons.PackageX className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucun produit trouvé.</p>
          </div>
        )}
      </div>

      {/* Product detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d152b] border border-yellow-400/25 pointer-events-auto shadow-2xl"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 z-10 p-2 rounded-lg bg-black/30 hover:bg-black/50 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="aspect-square md:aspect-auto bg-gradient-to-br from-slate-800 via-slate-900 to-[#0a0f1e] flex items-center justify-center p-12">
                    <div className="text-9xl font-display font-extrabold text-yellow-400/40">{selected.brand.charAt(0)}</div>
                  </div>

                  {/* Details */}
                  <div className="p-8">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{selected.brand}</p>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">{selected.name}</h3>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(selected.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`} />
                        ))}
                      </div>
                      <span className="text-sm text-yellow-400 font-semibold">{selected.rating}</span>
                      <span className="text-sm text-slate-500">({selected.reviews} {t("shop.reviews")})</span>
                    </div>

                    <div className="flex items-end gap-3 mb-5">
                      <span className="font-display font-extrabold text-3xl text-yellow-400">{formatPrice(selected.price)}</span>
                      {selected.oldPrice && <span className="text-base text-slate-500 line-through mb-1">{formatPrice(selected.oldPrice)}</span>}
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-5">{selected.description[loc]}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${selected.inStock ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                        <Check className="w-3 h-3" />{selected.inStock ? t("shop.inStock") : t("shop.outStock")}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/15 text-blue-300">
                        <Shield className="w-3 h-3" />{t("shop.warranty")} {selected.warranty}
                      </span>
                    </div>

                    {/* Specs */}
                    <div className="mb-6">
                      <h4 className="font-display font-bold text-white text-sm mb-3 uppercase tracking-wide">{t("shop.specs")}</h4>
                      <div className="space-y-1.5">
                        {selected.specs.map((s, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 text-sm">
                            <span className="text-slate-500">{s.label}</span>
                            <span className="text-slate-200 font-medium">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment methods */}
                    <div className="mb-6">
                      <h4 className="font-display font-bold text-white text-sm mb-2 uppercase tracking-wide">{t("shop.secure")}</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Visa", "Mastercard", "Orange Money", "MTN Money"].map((m) => (
                          <span key={m} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-xs text-slate-300">{m}</span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => { setCartCount((c) => c + 1); setSelected(null); }}
                      className="w-full btn-shine py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {t("shop.addToCart")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
