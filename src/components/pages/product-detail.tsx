"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  Star,
  Shield,
  ShoppingCart,
  Check,
  ArrowLeft,
  ArrowRight,
  Truck,
  Lock,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { useApiItem } from "@/hooks/use-api";
import { products as staticProducts, productCategories } from "@/lib/data";
import { toast } from "sonner";

const formatPrice = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " GNF";

const badges: Record<string, { label: string; color: string }> = {
  new: { label: "NEW", color: "from-emerald-400 to-teal-500" },
  promo: { label: "PROMO", color: "from-rose-400 to-pink-500" },
  best: { label: "BEST", color: "from-yellow-400 to-amber-500" },
};

export function ProductDetailPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { params, navigate } = useRouter();
  const { data, loading } = useApiItem<{ product: any }>(
    params.id ? `/api/products/${params.id}` : null
  );
  const product =
    data?.product ||
    staticProducts.find((p) => p.id === params.id) ||
    staticProducts[0];
  const [activeImg, setActiveImg] = useState(0);

  const gallery = (product.gallery && product.gallery.length > 0) ? product.gallery : [product.image];
  const category = productCategories.find((c) => c.id === product.category);
  const similar = staticProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    toast.success("Ajouté au panier !");
  };

  const CatIcon = category ? (Icons as any)[category.icon] ?? Icons.Package : Icons.Package;

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#5C6573]">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="animate-page-enter pt-20">
      {/* Minimal hero / breadcrumb */}
      <section className="bg-shine-radial-light border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <button
            onClick={() => navigate("shop")}
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm font-semibold mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t("nav.shop")}
          </button>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => navigate("shop")} className="hover:text-blue-700">
              {t("nav.shop")}
            </button>
            <ChevronRight className="w-3 h-3" />
            {category && (
              <>
                <span className="text-slate-600">{category.name?.[loc] || category.name?.fr}</span>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            <span className="text-slate-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product layout */}
      <section className="py-12 md:py-16 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {/* Image gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-24 self-start"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-premium-lg">
                <Image
                  src={gallery[activeImg]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.badge && (
                  <div
                    className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-gradient-to-r ${badges[product.badge].color} text-slate-900 text-xs font-bold shadow-md`}
                  >
                    {badges[product.badge].label}
                  </div>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all ${
                        activeImg === i ? "border-yellow-400 shadow-md" : "border-slate-200 hover:border-yellow-400/40"
                      }`}
                    >
                      <Image src={g} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 25vw, 12vw" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {category && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">
                      <CatIcon className="w-3.5 h-3.5" />
                      {category.name?.[loc] || category.name?.fr}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{product.brand}</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-amber-600">{product.rating}</span>
                  <span className="text-sm text-slate-500">
                    ({product.reviews} {t("shop.reviews")})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 py-4 border-y border-slate-100">
                <span className="font-display font-extrabold text-4xl text-blue-700">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-lg text-slate-400 line-through mb-1">{formatPrice(product.oldPrice)}</span>
                )}
                {product.oldPrice && (
                  <span className="ml-auto mb-1 px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 text-xs font-bold">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                  {t("shop.description")}
                </h3>
                <p className="text-slate-700 leading-relaxed text-[15px]">{product.description?.[loc] || product.description?.fr}</p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
                    product.inStock ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {product.inStock ? t("shop.inStock") : t("shop.outStock")}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
                  <Shield className="w-3.5 h-3.5" />
                  {t("shop.warranty")} {product.warranty}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-yellow-50 text-amber-700">
                  <Truck className="w-3.5 h-3.5" />
                  Livraison 24/48h
                </span>
              </div>

              {/* Specs */}
              <div className="bg-white rounded-2xl p-5 shadow-premium">
                <h3 className="font-display text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Icons.ListChecks className="w-4 h-4 text-blue-700" />
                  {t("shop.specs")}
                </h3>
                <div className="space-y-1">
                  {(product.specs || []).map((s: { label: string; value: string }, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0 text-sm"
                    >
                      <span className="text-slate-500">{s.label}</span>
                      <span className="text-slate-900 font-medium text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment methods */}
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-700" />
                  {t("shop.secure")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Visa", "Mastercard", "Orange Money", "MTN Money"].map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-700 font-semibold shadow-sm"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full btn-gold py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {t("shop.addToCart")}
              </button>
              <p className="text-center text-xs text-slate-500">
                {t("shop.secure")} · Paiement chiffré SSL
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Similar products */}
      {similar.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeader badge={t("shop.similar")} title={t("shop.similar")} align="left" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {similar.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  onClick={() => {
                    navigate("product-detail", { id: p.id });
                    setActiveImg(0);
                  }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 text-left card-shine border border-slate-100"
                >
                  <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {p.badge && (
                      <div
                        className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r ${badges[p.badge].color} text-slate-900 text-[10px] font-bold shadow-sm`}
                      >
                        {badges[p.badge].label}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">{p.brand}</p>
                    <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-1">{p.name}</h4>
                    <div className="flex items-center justify-between">
                      <div className="font-display font-bold text-blue-700 text-sm">{formatPrice(p.price)}</div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
