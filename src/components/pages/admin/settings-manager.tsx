"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";

export function SettingsManager() {
  const { data, loading } = useApi<{ settings: any }>("/api/settings");
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.settings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(data.settings);
    }
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { toast.success("Paramètres mis à jour"); } else { toast.error("Erreur"); }
    setSaving(false);
  };

  if (loading || !form) {
    return <div className="text-center py-12 text-[#5C6573]">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium p-6">
        <h3 className="font-display font-bold text-[#003366] text-sm mb-4">Informations de contact</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldInput label="Téléphone (FR)" value={form.phoneFr || ""} onChange={(v) => setForm({ ...form, phoneFr: v })} />
          <FieldInput label="Téléphone (EN)" value={form.phoneEn || ""} onChange={(v) => setForm({ ...form, phoneEn: v })} />
          <FieldInput label="Téléphone (ES)" value={form.phoneEs || ""} onChange={(v) => setForm({ ...form, phoneEs: v })} />
          <FieldInput label="WhatsApp" value={form.whatsapp || ""} onChange={(v) => setForm({ ...form, whatsapp: v })} />
          <div className="sm:col-span-2"><FieldInput label="Email" value={form.email || ""} onChange={(v) => setForm({ ...form, email: v })} /></div>
          <FieldInput label="Adresse (FR)" value={form.addressFr || ""} onChange={(v) => setForm({ ...form, addressFr: v })} />
          <FieldInput label="Adresse (EN)" value={form.addressEn || ""} onChange={(v) => setForm({ ...form, addressEn: v })} />
          <FieldInput label="Adresse (ES)" value={form.addressEs || ""} onChange={(v) => setForm({ ...form, addressEs: v })} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium p-6">
        <h3 className="font-display font-bold text-[#003366] text-sm mb-4">Réseaux sociaux</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldInput label="Facebook URL" value={form.facebookUrl || ""} onChange={(v) => setForm({ ...form, facebookUrl: v })} />
          <FieldInput label="LinkedIn URL" value={form.linkedinUrl || ""} onChange={(v) => setForm({ ...form, linkedinUrl: v })} />
          <FieldInput label="Instagram URL" value={form.instagramUrl || ""} onChange={(v) => setForm({ ...form, instagramUrl: v })} />
          <FieldInput label="YouTube URL" value={form.youtubeUrl || ""} onChange={(v) => setForm({ ...form, youtubeUrl: v })} />
          <FieldInput label="TikTok URL" value={form.tiktokUrl || ""} onChange={(v) => setForm({ ...form, tiktokUrl: v })} />
          <FieldInput label="X (Twitter) URL" value={form.twitterUrl || ""} onChange={(v) => setForm({ ...form, twitterUrl: v })} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium p-6">
        <h3 className="font-display font-bold text-[#003366] text-sm mb-4">WhatsApp</h3>
        <label className="flex items-center gap-2 text-[13px] text-[#003366]">
          <input type="checkbox" checked={form.whatsappEnabled ?? true} onChange={(e) => setForm({ ...form, whatsappEnabled: e.target.checked })} className="rounded" />
          Rediriger les messages du formulaire de contact vers WhatsApp
        </label>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="btn-gold px-8 py-3 rounded-md text-[13px] font-semibold flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? "..." : "Enregistrer les paramètres"}
        </button>
      </div>
    </div>
  );
}

