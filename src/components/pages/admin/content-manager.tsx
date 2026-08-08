"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";

export function ContentManager({ type, label, onRefresh }: { type: "programs" | "formations" | "articles" | "events" | "services" | "case-studies" | "media"; label: string; onRefresh: () => Promise<void> }) {
  const { data, loading, refresh } = useApi<{ [key: string]: any[] }>(`/api/${type}`);
  const items = (data as any)?.[type] || [];
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const deleteItem = async (slug: string) => {
    if (!confirm(`Supprimer ce ${label} ?`)) return;
    const res = await fetch(`/api/${type}/${slug}`, { method: "DELETE" });
    if (res.ok) { toast.success(`${label} supprimé`); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  const getTitle = (item: any) => {
    if (type === "programs") return item.title?.fr || item.titleFr || "";
    if (type === "formations") return item.title?.fr || item.titleFr || "";
    if (type === "articles") return item.title?.fr || item.titleFr || "";
    if (type === "events") return item.title?.fr || item.titleFr || "";
    if (type === "services") return item.title?.fr || item.titleFr || "";
    if (type === "case-studies") return item.title?.fr || item.titleFr || "";
    if (type === "media") return item.title?.fr || item.titleFr || "";
    return "";
  };
  const getImage = (item: any) => item.image || "";
  const getDate = (item: any) => {
    if (type === "articles") return item.date ? new Date(item.date).toLocaleDateString("fr-FR") : "";
    if (type === "events") return item.date ? new Date(item.date).toLocaleDateString("fr-FR") : "";
    return item.createdAt ? new Date(item.createdAt).toLocaleDateString("fr-FR") : "";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-[#003366] text-sm">Gestion des {label}s ({items.length})</h3>
        <button onClick={() => setCreating(true)} className="btn-gold px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Ajouter</button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Titre</th>
                {type === "articles" && <th className="text-left px-4 py-3">Auteur</th>}
                {type === "events" && <th className="text-left px-4 py-3">Date</th>}
                <th className="text-left px-4 py-3">Créé le</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECF1]">
              {loading ? <tr><td colSpan={4} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
               items.length === 0 ? <tr><td colSpan={4} className="text-center py-8 text-[#5C6573]">Aucun {label}</td></tr> :
               items.map((item: any) => (
                <tr key={item.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2">{getImage(item) && <img src={getImage(item)} alt={getTitle(item)} className="w-10 h-10 rounded-md object-cover" />}<span className="font-medium text-[#003366]">{getTitle(item)}</span></div></td>
                  {type === "articles" && <td className="px-4 py-3 text-[#5C6573]">{item.author || item.authorName || "—"}</td>}
                  {type === "events" && <td className="px-4 py-3 text-[#5C6573]">{getDate(item)}</td>}
                  <td className="px-4 py-3 text-[#5C6573] text-[12px]">{item.createdAt ? new Date(item.createdAt).toLocaleDateString("fr-FR") : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(item)} className="p-1.5 rounded text-[#003366] hover:bg-[#F4F6F9] transition-colors mr-1"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(creating || editing) && <FullContentEditor type={type} label={label} item={editing} creating={creating} onClose={() => { setCreating(false); setEditing(null); refresh(); onRefresh(); }} />}
    </div>
  );
}

export function FullContentEditor({ type, label, item, creating, onClose }: { type: string; label: string; item: any; creating: boolean; onClose: () => void }) {
  const [lang, setLang] = useState<"fr" | "en" | "es">("fr");
  const [saving, setSaving] = useState(false);

  // Helper to get nested value: getField(item, "title.fr") or default ""
  const get = (path: string) => {
    if (!item) return "";
    const parts = path.split(".");
    let val: any = item;
    for (const p of parts) { val = val?.[p]; if (val === undefined) return ""; }
    return typeof val === "string" ? val : "";
  };
  const getArr = (path: string) => {
    if (!item) return [];
    const parts = path.split(".");
    let val: any = item;
    for (const p of parts) { val = val?.[p]; if (val === undefined) return []; }
    return Array.isArray(val) ? val : [];
  };

  // Form state — localized fields stored as { fr, en, es }
  const [form, setForm] = useState<any>(() => {
    const base: any = {
      image: item?.image || "",
    };
    if (type === "programs") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.short = { fr: get("short.fr"), en: get("short.en"), es: get("short.es") };
      base.description = { fr: get("description.fr"), en: get("description.en"), es: get("description.es") };
      base.target = { fr: get("target.fr"), en: get("target.en"), es: get("target.es") };
      base.objectives = { fr: getArr("objectives.fr").join("\n"), en: getArr("objectives.en").join("\n"), es: getArr("objectives.es").join("\n") };
      base.results = { fr: getArr("results.fr").join("\n"), en: getArr("results.en").join("\n"), es: getArr("results.es").join("\n") };
      base.icon = item?.icon || "Sparkles";
      base.gradient = item?.gradient || "from-amber-500 via-yellow-500 to-orange-500";
      base.color = item?.color || "text-amber-500";
      base.gallery = getArr("gallery").join("\n");
    }
    if (type === "formations") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.description = { fr: get("description.fr"), en: get("description.en"), es: get("description.es") };
      base.category = { fr: get("category.fr"), en: get("category.en"), es: get("category.es") };
      base.duration = { fr: get("duration.fr"), en: get("duration.en"), es: get("duration.es") };
      base.program = { fr: getArr("program.fr").join("\n"), en: getArr("program.en").join("\n"), es: getArr("program.es").join("\n") };
      base.icon = item?.icon || "GraduationCap";
      base.level = item?.level || "Débutant";
      base.mode = (item?.mode || ["online"]).join(",");
      base.price = item?.price ?? 250000;
      base.certificate = item?.certificate ?? true;
      base.popular = item?.popular ?? false;
    }
    if (type === "articles") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.excerpt = { fr: get("excerpt.fr"), en: get("excerpt.en"), es: get("excerpt.es") };
      base.content = { fr: get("content.fr"), en: get("content.en"), es: get("content.es") };
      base.category = { fr: get("category.fr"), en: get("category.en"), es: get("category.es") };
      base.authorRole = { fr: get("authorRole.fr"), en: get("authorRole.en"), es: get("authorRole.es") };
      base.authorName = item?.author || item?.authorName || "Admin";
      base.tag = item?.tag || "blog";
      base.readTime = item?.readTime ?? 5;
      base.date = item?.date ? new Date(item.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
    }
    if (type === "events") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.description = { fr: get("description.fr"), en: get("description.en"), es: get("description.es") };
      base.location = { fr: get("location.fr"), en: get("location.en"), es: get("location.es") };
      base.type = item?.type || "webinar";
      base.time = item?.time || "16:00";
      base.date = item?.date ? new Date(item.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
      base.mode = item?.mode || "online";
      base.price = item?.price ?? 0;
      base.seats = item?.seats ?? 1000;
    }
    if (type === "services") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.description = { fr: get("description.fr"), en: get("description.en"), es: get("description.es") };
      base.features = { fr: getArr("features.fr").join("\n"), en: getArr("features.en").join("\n"), es: getArr("features.es").join("\n") };
      base.icon = item?.icon || "Star";
      base.gradient = item?.gradient || "from-blue-500 to-indigo-600";
    }
    if (type === "case-studies") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.description = { fr: get("description.fr"), en: get("description.en"), es: get("description.es") };
      base.partner = item?.partner || "";
      base.result = item?.result || "";
      base.metric = item?.metric || "";
    }
    if (type === "media") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.type = item?.type || "photo";
      base.category = item?.category || "";
      base.thumb = item?.thumb || "";
      base.date = item?.date ? new Date(item.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
    }
    return base;
  });

  const setField = (field: string, lang: "fr" | "en" | "es", value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
  };
  const setCommon = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const linesToArray = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

    const payload: any = {};

    if (type === "programs") {
      payload.title = form.title;
      payload.short = form.short;
      payload.description = form.description;
      payload.target = form.target;
      payload.objectives = { fr: linesToArray(form.objectives.fr), en: linesToArray(form.objectives.en), es: linesToArray(form.objectives.es) };
      payload.results = { fr: linesToArray(form.results.fr), en: linesToArray(form.results.en), es: linesToArray(form.results.es) };
      payload.image = form.image || "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80";
      payload.icon = form.icon;
      payload.gradient = form.gradient;
      payload.color = form.color;
      payload.gallery = linesToArray(form.gallery);
    }
    if (type === "formations") {
      payload.title = form.title;
      payload.description = form.description;
      payload.category = form.category;
      payload.duration = form.duration;
      payload.program = { fr: linesToArray(form.program.fr), en: linesToArray(form.program.en), es: linesToArray(form.program.es) };
      payload.image = form.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80";
      payload.icon = form.icon;
      payload.level = form.level;
      payload.mode = form.mode.split(",").map((s: string) => s.trim()).filter(Boolean);
      payload.price = Number(form.price);
      payload.certificate = form.certificate;
      payload.popular = form.popular;
    }
    if (type === "articles") {
      payload.title = form.title;
      payload.excerpt = form.excerpt;
      payload.content = form.content;
      payload.category = form.category;
      payload.authorRole = form.authorRole;
      payload.authorName = form.authorName;
      payload.tag = form.tag;
      payload.readTime = Number(form.readTime);
      payload.image = form.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80";
      payload.date = form.date ? new Date(form.date).toISOString() : new Date().toISOString();
    }
    if (type === "events") {
      payload.title = form.title;
      payload.description = form.description;
      payload.location = form.location;
      payload.image = form.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";
      payload.type = form.type;
      payload.time = form.time;
      payload.mode = form.mode;
      payload.price = Number(form.price);
      payload.seats = Number(form.seats);
      payload.date = form.date ? new Date(form.date).toISOString() : new Date().toISOString();
    }
    if (type === "services") {
      payload.title = form.title;
      payload.description = form.description;
      payload.features = { fr: linesToArray(form.features.fr), en: linesToArray(form.features.en), es: linesToArray(form.features.es) };
      payload.image = form.image || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80";
      payload.icon = form.icon;
      payload.gradient = form.gradient;
    }
    if (type === "case-studies") {
      payload.title = form.title;
      payload.description = form.description;
      payload.partner = form.partner;
      payload.result = form.result;
      payload.metric = form.metric;
      payload.image = form.image || "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80";
    }
    if (type === "media") {
      payload.title = form.title;
      payload.type = form.type;
      payload.category = form.category;
      payload.thumb = form.thumb || form.image;
      payload.image = form.thumb || form.image;
      payload.date = form.date ? new Date(form.date).toISOString() : new Date().toISOString();
    }

    if (creating) {
      payload.slug = form.title.fr.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;
    }

    const url = creating ? `/api/${type}` : `/api/${type}/${item.id}`;
    const method = creating ? "POST" : "PATCH";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { toast.success(creating ? `${label} créé` : `${label} mis à jour`); onClose(); } else { toast.error("Erreur"); }
    setSaving(false);
  };

  const langTabs = [
    { code: "fr" as const, label: "Français", flag: "🇫🇷" },
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "es" as const, label: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-premium-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-[#E8ECF1] px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-display font-bold text-[#003366]">{creating ? `Nouveau ${label}` : `Modifier le ${label}`}</h3>
          <button onClick={onClose} className="p-1.5 rounded text-[#5C6573] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Language tabs */}
          <div className="flex gap-1 p-1 rounded-lg bg-[#F4F6F9]">
            {langTabs.map((lt) => (
              <button key={lt.code} onClick={() => setLang(lt.code)} className={`flex-1 py-2 rounded-md text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 ${lang === lt.code ? "bg-white text-[#003366] shadow-premium" : "text-[#5C6573]"}`}>
                <span>{lt.flag}</span> {lt.label}
              </button>
            ))}
          </div>

          {/* Localized fields */}
          <div className="space-y-4">
            <FieldInput label={`Titre (${lang.toUpperCase()})`} value={form.title?.[lang] || ""} onChange={(v) => setField("title", lang, v)} />

            {type === "programs" && (
              <>
                <FieldTextarea label={`Description courte (${lang.toUpperCase()})`} value={form.short?.[lang] || ""} onChange={(v) => setField("short", lang, v)} rows={2} />
                <FieldTextarea label={`Description (${lang.toUpperCase()})`} value={form.description?.[lang] || ""} onChange={(v) => setField("description", lang, v)} rows={4} />
                <FieldTextarea label={`Public cible (${lang.toUpperCase()})`} value={form.target?.[lang] || ""} onChange={(v) => setField("target", lang, v)} rows={2} />
                <FieldTextarea label={`Objectifs (${lang.toUpperCase()}) — un par ligne`} value={form.objectives?.[lang] || ""} onChange={(v) => setField("objectives", lang, v)} rows={4} />
                <FieldTextarea label={`Résultats (${lang.toUpperCase()}) — un par ligne`} value={form.results?.[lang] || ""} onChange={(v) => setField("results", lang, v)} rows={4} />
              </>
            )}

            {type === "formations" && (
              <>
                <FieldTextarea label={`Description (${lang.toUpperCase()})`} value={form.description?.[lang] || ""} onChange={(v) => setField("description", lang, v)} rows={4} />
                <FieldInput label={`Catégorie (${lang.toUpperCase()})`} value={form.category?.[lang] || ""} onChange={(v) => setField("category", lang, v)} />
                <FieldInput label={`Durée (${lang.toUpperCase()})`} value={form.duration?.[lang] || ""} onChange={(v) => setField("duration", lang, v)} />
                <FieldTextarea label={`Programme détaillé (${lang.toUpperCase()}) — un point par ligne`} value={form.program?.[lang] || ""} onChange={(v) => setField("program", lang, v)} rows={5} />
              </>
            )}

            {type === "articles" && (
              <>
                <FieldTextarea label={`Extrait (${lang.toUpperCase()})`} value={form.excerpt?.[lang] || ""} onChange={(v) => setField("excerpt", lang, v)} rows={3} />
                <FieldTextarea label={`Contenu (${lang.toUpperCase()})`} value={form.content?.[lang] || ""} onChange={(v) => setField("content", lang, v)} rows={8} />
                <FieldInput label={`Catégorie (${lang.toUpperCase()})`} value={form.category?.[lang] || ""} onChange={(v) => setField("category", lang, v)} />
                <FieldInput label={`Rôle de l'auteur (${lang.toUpperCase()})`} value={form.authorRole?.[lang] || ""} onChange={(v) => setField("authorRole", lang, v)} />
              </>
            )}

            {type === "events" && (
              <>
                <FieldTextarea label={`Description (${lang.toUpperCase()})`} value={form.description?.[lang] || ""} onChange={(v) => setField("description", lang, v)} rows={4} />
                <FieldInput label={`Lieu (${lang.toUpperCase()})`} value={form.location?.[lang] || ""} onChange={(v) => setField("location", lang, v)} />
              </>
            )}

            {type === "services" && (
              <>
                <FieldTextarea label={`Description (${lang.toUpperCase()})`} value={form.description?.[lang] || ""} onChange={(v) => setField("description", lang, v)} rows={4} />
                <FieldTextarea label={`Fonctionnalités (${lang.toUpperCase()}) — une par ligne`} value={form.features?.[lang] || ""} onChange={(v) => setField("features", lang, v)} rows={4} />
              </>
            )}

            {type === "case-studies" && (
              <>
                <FieldTextarea label={`Description (${lang.toUpperCase()})`} value={form.description?.[lang] || ""} onChange={(v) => setField("description", lang, v)} rows={4} />
              </>
            )}

            {type === "media" && (
              <FieldTextarea label={`Titre (${lang.toUpperCase()})`} value={form.title?.[lang] || ""} onChange={(v) => setField("title", lang, v)} rows={2} />
            )}
          </div>

          {/* Common fields */}
          <div className="border-t border-[#E8ECF1] pt-6">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6573] mb-4">Champs communs</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><FieldInput label="Image (URL)" value={form.image} onChange={(v) => setCommon("image", v)} /></div>

              {type === "programs" && (
                <>
                  <FieldInput label="Icône (Lucide)" value={form.icon} onChange={(v) => setCommon("icon", v)} />
                  <FieldInput label="Gradient (Tailwind)" value={form.gradient} onChange={(v) => setCommon("gradient", v)} />
                  <FieldInput label="Couleur texte" value={form.color} onChange={(v) => setCommon("color", v)} />
                  <div className="sm:col-span-2"><FieldTextarea label="Galerie d'images — une URL par ligne" value={form.gallery} onChange={(v) => setCommon("gallery", v)} rows={3} /></div>
                </>
              )}

              {type === "formations" && (
                <>
                  <FieldInput label="Icône (Lucide)" value={form.icon} onChange={(v) => setCommon("icon", v)} />
                  <FieldInput label="Niveau" value={form.level} onChange={(v) => setCommon("level", v)} />
                  <FieldInput label="Mode (online,offline)" value={form.mode} onChange={(v) => setCommon("mode", v)} />
                  <FieldInput label="Prix (GNF)" value={String(form.price)} onChange={(v) => setCommon("price", v)} type="number" />
                  <label className="flex items-center gap-2 text-[13px] text-[#003366]"><input type="checkbox" checked={form.certificate} onChange={(e) => setCommon("certificate", e.target.checked)} className="rounded" /> Certificat inclus</label>
                  <label className="flex items-center gap-2 text-[13px] text-[#003366]"><input type="checkbox" checked={form.popular} onChange={(e) => setCommon("popular", e.target.checked)} className="rounded" /> Populaire</label>
                </>
              )}

              {type === "articles" && (
                <>
                  <FieldInput label="Nom de l'auteur" value={form.authorName} onChange={(v) => setCommon("authorName", v)} />
                  <FieldInput label="Tag (interview, report, press, blog)" value={form.tag} onChange={(v) => setCommon("tag", v)} />
                  <FieldInput label="Temps de lecture (min)" value={String(form.readTime)} onChange={(v) => setCommon("readTime", v)} type="number" />
                  <FieldInput label="Date (YYYY-MM-DD)" value={form.date} onChange={(v) => setCommon("date", v)} />
                </>
              )}

              {type === "events" && (
                <>
                  <FieldInput label="Type (webinar, conference, workshop)" value={form.type} onChange={(v) => setCommon("type", v)} />
                  <FieldInput label="Heure" value={form.time} onChange={(v) => setCommon("time", v)} />
                  <FieldInput label="Date (YYYY-MM-DD)" value={form.date} onChange={(v) => setCommon("date", v)} />
                  <FieldInput label="Mode (online, offline, hybrid)" value={form.mode} onChange={(v) => setCommon("mode", v)} />
                  <FieldInput label="Prix (GNF, 0=gratuit)" value={String(form.price)} onChange={(v) => setCommon("price", v)} type="number" />
                  <FieldInput label="Places disponibles" value={String(form.seats)} onChange={(v) => setCommon("seats", v)} type="number" />
                </>
              )}

              {type === "services" && (
                <>
                  <FieldInput label="Icône (Lucide)" value={form.icon} onChange={(v) => setCommon("icon", v)} />
                  <FieldInput label="Gradient (Tailwind)" value={form.gradient} onChange={(v) => setCommon("gradient", v)} />
                </>
              )}

              {type === "case-studies" && (
                <>
                  <FieldInput label="Partenaire" value={form.partner} onChange={(v) => setCommon("partner", v)} />
                  <FieldInput label="Résultat (ex: Jeunes certifiés)" value={form.result} onChange={(v) => setCommon("result", v)} />
                  <FieldInput label="Métrique (ex: 1200)" value={form.metric} onChange={(v) => setCommon("metric", v)} />
                </>
              )}

              {type === "media" && (
                <>
                  <div>
                    <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Type</label>
                    <select value={form.type} onChange={(e) => setCommon("type", e.target.value)} className="input-shine rounded-md px-3 py-2 text-sm w-full">
                      <option value="photo">Photo</option>
                      <option value="video">Vidéo</option>
                    </select>
                  </div>
                  <FieldInput label="Catégorie" value={form.category} onChange={(v) => setCommon("category", v)} />
                  <FieldInput label="Date (YYYY-MM-DD)" value={form.date} onChange={(v) => setCommon("date", v)} />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-[#E8ECF1] px-6 py-4 flex gap-2 justify-end">
          <button onClick={onClose} className="px-6 py-2.5 rounded-md text-[13px] font-semibold border border-[#E8ECF1] text-[#5C6573] hover:bg-[#F4F6F9]">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 rounded-md text-[13px] font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> {saving ? "..." : creating ? "Créer" : "Enregistrer"}</button>
        </div>
      </div>
    </div>
  );
}

