"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";

export function DonationGoalsManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const { data, loading, refresh } = useApi<{ donationGoals: any[] }>("/api/donation-goals");
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const goals = data?.donationGoals || [];

  const deleteItem = async (slug: string) => {
    if (!confirm("Supprimer cet objectif ?")) return;
    const res = await fetch(`/api/donation-goals/${slug}`, { method: "DELETE" });
    if (res.ok) { toast.success("Objectif supprimé"); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-[#003366] text-sm">Objectifs de don ({goals.length})</h3>
        <button onClick={() => setCreating(true)} className="btn-gold px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Ajouter</button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Objectif</th>
                <th className="text-left px-4 py-3">Progression</th>
                <th className="text-left px-4 py-3">Cible</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECF1]">
              {loading ? <tr><td colSpan={4} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
               goals.map((g) => (
                <tr key={g.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3 font-medium text-[#003366]">{g.goal?.fr || "—"}</td>
                  <td className="px-4 py-3 text-[#5C6573]">{g.current}€ / {g.target}€ ({Math.round((g.current / g.target) * 100)}%)</td>
                  <td className="px-4 py-3 text-[#5C6573]">{g.target}€</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(g)} className="p-1.5 rounded text-[#003366] hover:bg-[#F4F6F9] transition-colors mr-1"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteItem(g.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(editing || creating) && <DonationGoalEditor goal={editing} creating={creating} onClose={() => { setEditing(null); setCreating(false); refresh(); onRefresh(); }} />}
    </div>
  );
}

export function DonationGoalEditor({ goal, creating, onClose }: { goal: any; creating: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    goalFr: goal?.goal?.fr || "",
    goalEn: goal?.goal?.en || "",
    goalEs: goal?.goal?.es || "",
    current: goal?.current ?? 0,
    target: goal?.target ?? 100000,
    color: goal?.color || "from-amber-400 to-yellow-500",
    image: goal?.image || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const slug = form.goalFr.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
    const payload = {
      slug,
      goal: { fr: form.goalFr, en: form.goalEn, es: form.goalEs },
      current: Number(form.current),
      target: Number(form.target),
      color: form.color,
      image: form.image,
    };
    const url = creating ? "/api/donation-goals" : `/api/donation-goals/${goal.id}`;
    const method = creating ? "POST" : "PATCH";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { toast.success(creating ? "Objectif créé" : "Objectif mis à jour"); onClose(); } else { toast.error("Erreur"); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-premium-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-[#003366]">{creating ? "Nouvel objectif" : "Modifier l'objectif"}</h3>
          <button onClick={onClose} className="p-1.5 rounded text-[#5C6573] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <FieldInput label="Objectif (FR)" value={form.goalFr} onChange={(v) => setForm({ ...form, goalFr: v })} />
          <FieldInput label="Objectif (EN)" value={form.goalEn} onChange={(v) => setForm({ ...form, goalEn: v })} />
          <FieldInput label="Objectif (ES)" value={form.goalEs} onChange={(v) => setForm({ ...form, goalEs: v })} />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Actuel (€)" value={String(form.current)} onChange={(v) => setForm({ ...form, current: v })} type="number" />
            <FieldInput label="Cible (€)" value={String(form.target)} onChange={(v) => setForm({ ...form, target: v })} type="number" />
          </div>
          <FieldInput label="Couleur (gradient)" value={form.color} onChange={(v) => setForm({ ...form, color: v })} />
          <FieldInput label="Image (URL)" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="px-6 py-2.5 rounded-md text-[13px] font-semibold border border-[#E8ECF1] text-[#5C6573] hover:bg-[#F4F6F9]">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 rounded-md text-[13px] font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> {saving ? "..." : "Enregistrer"}</button>
        </div>
      </div>
    </div>
  );
}

