"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";
import { FileUpload } from "@/components/ui/file-upload";

export function TeamManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const { data, loading, refresh } = useApi<{ team: any[] }>("/api/team");
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const team = data?.team || [];

  const deleteItem = async (slug: string) => {
    if (!confirm("Supprimer ce membre ?")) return;
    const res = await fetch(`/api/team/${slug}`, { method: "DELETE" });
    if (res.ok) { toast.success("Membre supprimé"); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-[#003366] text-sm">Gestion de l'équipe ({team.length})</h3>
        <button onClick={() => setCreating(true)} className="btn-gold px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Ajouter</button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Nom</th>
                <th className="text-left px-4 py-3">Rôle</th>
                <th className="text-left px-4 py-3">Catégorie</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECF1]">
              {loading ? <tr><td colSpan={4} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
               team.map((m) => (
                <tr key={m.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><img src={m.image} alt={m.name} className="w-8 h-8 rounded-full object-cover" /><span className="font-medium text-[#003366]">{m.name}</span></div></td>
                  <td className="px-4 py-3 text-[#5C6573]">{m.role?.fr || "—"}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F4F6F9] text-[#5C6573]">{m.category}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(m)} className="p-1.5 rounded text-[#003366] hover:bg-[#F4F6F9] transition-colors mr-1"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteItem(m.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(editing || creating) && <TeamEditor member={editing} creating={creating} onClose={() => { setEditing(null); setCreating(false); refresh(); onRefresh(); }} />}
    </div>
  );
}

export function TeamEditor({ member, creating, onClose }: { member: any; creating: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: member?.name || "",
    roleFr: member?.role?.fr || "",
    roleEn: member?.role?.en || "",
    roleEs: member?.role?.es || "",
    bioFr: member?.bio?.fr || "",
    bioEn: member?.bio?.en || "",
    bioEs: member?.bio?.es || "",
    initials: member?.initials || "",
    color: member?.color || "from-blue-500 to-indigo-600",
    image: member?.image || "",
    category: member?.category || "national",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const payload = {
      slug,
      name: form.name,
      role: { fr: form.roleFr, en: form.roleEn, es: form.roleEs },
      bio: { fr: form.bioFr, en: form.bioEn, es: form.bioEs },
      initials: form.initials || form.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
      color: form.color,
      image: form.image,
      category: form.category,
    };
    const url = creating ? "/api/team" : `/api/team/${member.id}`;
    const method = creating ? "POST" : "PATCH";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { toast.success(creating ? "Membre créé" : "Membre mis à jour"); onClose(); } else { toast.error("Erreur"); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-premium-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-[#003366]">{creating ? "Nouveau membre" : "Modifier le membre"}</h3>
          <button onClick={onClose} className="p-1.5 rounded text-[#5C6573] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldInput label="Nom complet" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <FieldInput label="Initiales" value={form.initials} onChange={(v) => setForm({ ...form, initials: v })} />
          <div>
            <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Catégorie</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-shine rounded-md px-3 py-2 text-sm w-full">
              <option value="founder">Fondateur</option>
              <option value="national">Équipe nationale</option>
              <option value="committee">Comité international</option>
              <option value="experts">Experts & Mentors</option>
            </select>
          </div>
          <FieldInput label="Couleur (gradient Tailwind)" value={form.color} onChange={(v) => setForm({ ...form, color: v })} />
          <div className="sm:col-span-2">
            <FileUpload label="Photo de profil" value={form.image} onChange={(v) => setForm({ ...form, image: v })} accept="image/*" />
          </div>
          <FieldInput label="Rôle (FR)" value={form.roleFr} onChange={(v) => setForm({ ...form, roleFr: v })} />
          <FieldInput label="Rôle (EN)" value={form.roleEn} onChange={(v) => setForm({ ...form, roleEn: v })} />
          <FieldInput label="Rôle (ES)" value={form.roleEs} onChange={(v) => setForm({ ...form, roleEs: v })} />
          <div className="sm:col-span-2"><FieldTextarea label="Bio (FR)" value={form.bioFr} onChange={(v) => setForm({ ...form, bioFr: v })} rows={3} /></div>
          <div className="sm:col-span-2"><FieldTextarea label="Bio (EN)" value={form.bioEn} onChange={(v) => setForm({ ...form, bioEn: v })} rows={3} /></div>
          <div className="sm:col-span-2"><FieldTextarea label="Bio (ES)" value={form.bioEs} onChange={(v) => setForm({ ...form, bioEs: v })} rows={3} /></div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="px-6 py-2.5 rounded-md text-[13px] font-semibold border border-[#E8ECF1] text-[#5C6573] hover:bg-[#F4F6F9]">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 rounded-md text-[13px] font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> {saving ? "..." : "Enregistrer"}</button>
        </div>
      </div>
    </div>
  );
}

