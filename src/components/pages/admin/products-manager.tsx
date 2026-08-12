"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";
import { FileUpload } from "@/components/ui/file-upload";

export function ProductsManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const { data, loading, refresh } = useApi<{ products: any[] }>("/api/products");
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const products = data?.products || [];

  const toggleStock = async (slug: string, current: boolean) => {
    const res = await fetch(`/api/products/${slug}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ inStock: !current }) });
    if (res.ok) { toast.success("Produit mis à jour"); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  const deleteProduct = async (slug: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
    if (res.ok) { toast.success("Produit supprimé"); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-[#003366] text-sm">Gestion des produits ({products.length})</h3>
        <button onClick={() => setCreating(true)} className="btn-gold px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Ajouter</button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Produit</th>
                <th className="text-left px-4 py-3">Marque</th>
                <th className="text-left px-4 py-3">Prix</th>
                <th className="text-left px-4 py-3">Stock</th>
                <th className="text-left px-4 py-3">Note</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECF1]">
              {loading ? <tr><td colSpan={6} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
               products.map((p) => (
                <tr key={p.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover" /><span className="font-medium text-[#003366]">{p.name}</span></div></td>
                  <td className="px-4 py-3 text-[#5C6573]">{p.brand}</td>
                  <td className="px-4 py-3 font-display font-semibold text-[#003366]">{new Intl.NumberFormat("fr-FR").format(p.price)} GNF</td>
                  <td className="px-4 py-3"><button onClick={() => toggleStock(p.id, p.inStock)} className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.inStock ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{p.inStock ? "En stock" : "Rupture"}</button></td>
                  <td className="px-4 py-3 text-[#5C6573]"><Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700] inline mr-1" />{p.rating}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(p)} className="p-1.5 rounded text-[#003366] hover:bg-[#F4F6F9] transition-colors mr-1"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(editing || creating) && <ProductEditor product={editing} creating={creating} onClose={() => { setEditing(null); setCreating(false); refresh(); onRefresh(); }} />}
    </div>
  );
}

export function ProductEditor({ product, creating, onClose }: { product: any; creating: boolean; onClose: () => void }) {
  const [lang, setLang] = useState<"fr" | "en" | "es">("fr");
  const [form, setForm] = useState({
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category || "",
    price: product?.price || 0,
    oldPrice: product?.oldPrice || "",
    image: product?.image || "",
    descriptionFr: product?.description?.fr || "",
    descriptionEn: product?.description?.en || "",
    descriptionEs: product?.description?.es || "",
    warranty: product?.warranty || "12 mois",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    badge: product?.badge || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      image: form.image,
      description: { fr: form.descriptionFr, en: form.descriptionEn || form.descriptionFr, es: form.descriptionEs || form.descriptionFr },
      warranty: form.warranty,
      inStock: form.inStock,
      featured: form.featured,
      badge: form.badge || null,
      slug: creating ? form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : undefined,
      gallery: [form.image],
      specs: [],
    };
    const url = creating ? "/api/products" : `/api/products/${product.id}`;
    const method = creating ? "POST" : "PATCH";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      toast.success(creating ? "Produit créé" : "Produit mis à jour");
      onClose();
    } else {
      toast.error("Erreur");
    }
    setSaving(false);
  };

  const langTabs = [
    { code: "fr" as const, label: "Français", flag: "🇫🇷" },
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "es" as const, label: "Español", flag: "🇪🇸" },
  ];

  const descValue = lang === "fr" ? form.descriptionFr : lang === "en" ? form.descriptionEn : form.descriptionEs;
  const setDesc = (v: string) => setForm(lang === "fr" ? { ...form, descriptionFr: v } : lang === "en" ? { ...form, descriptionEn: v } : { ...form, descriptionEs: v });

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-premium-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-[#003366]">{creating ? "Nouveau produit" : "Modifier le produit"}</h3>
          <button onClick={onClose} className="p-1.5 rounded text-[#5C6573] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldInput label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <FieldInput label="Marque" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} />
          <FieldInput label="Catégorie" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
          <FieldInput label="Prix (GNF)" value={String(form.price)} onChange={(v) => setForm({ ...form, price: v })} type="number" />
          <FieldInput label="Ancien prix (optionnel)" value={String(form.oldPrice)} onChange={(v) => setForm({ ...form, oldPrice: v })} type="number" />
          <FieldInput label="Garantie" value={form.warranty} onChange={(v) => setForm({ ...form, warranty: v })} />
          <div className="sm:col-span-2">
            <FileUpload label="Image du produit" value={form.image} onChange={(v) => setForm({ ...form, image: v })} accept="image/*" />
          </div>
          <div className="sm:col-span-2">
            <div className="flex gap-1 p-1 rounded-lg bg-[#F4F6F9] mb-2">
              {langTabs.map((lt) => (
                <button key={lt.code} type="button" onClick={() => setLang(lt.code)} className={`flex-1 py-1.5 rounded-md text-[11px] font-semibold transition-all flex items-center justify-center gap-1 ${lang === lt.code ? "bg-white text-[#003366] shadow-premium" : "text-[#5C6573]"}`}>
                  <span>{lt.flag}</span> {lt.label}
                </button>
              ))}
            </div>
            <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Description ({lang.toUpperCase()})</label>
            <textarea value={descValue} onChange={(e) => setDesc(e.target.value)} rows={3} className="input-shine rounded-md px-3 py-2 text-sm w-full resize-none" />
          </div>
          <div className="sm:col-span-2 flex gap-4">
            <label className="flex items-center gap-2 text-[13px] text-[#003366]"><input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="rounded" /> En stock</label>
            <label className="flex items-center gap-2 text-[13px] text-[#003366]"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" /> Produit vedette</label>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 rounded-md text-[13px] font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> {saving ? "..." : "Enregistrer"}</button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-md text-[13px] font-semibold border border-[#E8ECF1] text-[#5C6573] hover:bg-[#F4F6F9]">Annuler</button>
        </div>
      </div>
    </div>
  );
}

