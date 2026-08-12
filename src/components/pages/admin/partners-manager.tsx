"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";
import { FileUpload } from "@/components/ui/file-upload";

export function PartnersManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const { data, loading, refresh } = useApi<{ partners: any[] }>("/api/partners");
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const partners = data?.partners || [];

  const deleteItem = async (slug: string) => {
    if (!confirm("Supprimer ce partenaire ?")) return;
    const res = await fetch(`/api/partners/${slug}`, { method: "DELETE" });
    if (res.ok) { toast.success("Partenaire supprimé"); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-[#003366] text-sm">Gestion des partenaires ({partners.length})</h3>
        <button onClick={() => setCreating(true)} className="btn-gold px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Ajouter</button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Partenaire</th>
                <th className="text-left px-4 py-3">Secteur</th>
                <th className="text-left px-4 py-3">Tier</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECF1]">
              {loading ? <tr><td colSpan={4} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
               partners.map((p) => (
                <tr key={p.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><img src={p.image} alt={p.name} className="w-8 h-8 rounded-md object-cover" /><span className="font-medium text-[#003366]">{p.name}</span></div></td>
                  <td className="px-4 py-3 text-[#5C6573]">{p.sector}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.tier === "gold" ? "bg-[#FFD700]/20 text-[#B8860B]" : p.tier === "silver" ? "bg-slate-100 text-slate-600" : "bg-orange-100 text-orange-700"}`}>{p.tier}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(p)} className="p-1.5 rounded text-[#003366] hover:bg-[#F4F6F9] transition-colors mr-1"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteItem(p.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(editing || creating) && <PartnerEditor partner={editing} creating={creating} onClose={() => { setEditing(null); setCreating(false); refresh(); onRefresh(); }} />}
    </div>
  );
}

export function PartnerEditor({ partner, creating, onClose }: { partner: any; creating: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: partner?.name || "",
    tier: partner?.tier || "silver",
    logo: partner?.logo || "",
    sector: partner?.sector || "",
    image: partner?.image || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const payload = { slug, ...form };
    const url = creating ? "/api/partners" : `/api/partners/${partner.id}`;
    const method = creating ? "POST" : "PATCH";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { toast.success(creating ? "Partenaire créé" : "Partenaire mis à jour"); onClose(); } else { toast.error("Erreur"); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-premium-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-[#003366]">{creating ? "Nouveau partenaire" : "Modifier le partenaire"}</h3>
          <button onClick={onClose} className="p-1.5 rounded text-[#5C6573] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <FieldInput label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <div>
            <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Tier</label>
            <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="input-shine rounded-md px-3 py-2 text-sm w-full">
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>
          <FieldInput label="Secteur" value={form.sector} onChange={(v) => setForm({ ...form, sector: v })} />
          <FileUpload label="Logo (Fichier)" value={form.logo} onChange={(v) => setForm({ ...form, logo: v })} accept="image/*" />
          <FileUpload label="Image (Fichier)" value={form.image} onChange={(v) => setForm({ ...form, image: v })} accept="image/*" />
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="px-6 py-2.5 rounded-md text-[13px] font-semibold border border-[#E8ECF1] text-[#5C6573] hover:bg-[#F4F6F9]">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 rounded-md text-[13px] font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> {saving ? "..." : "Enregistrer"}</button>
        </div>
      </div>
    </div>
  );
}

