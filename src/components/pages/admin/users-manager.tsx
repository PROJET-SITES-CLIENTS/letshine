"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";

export function UsersManager() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/users?search=${encodeURIComponent(search)}`);
    const data = await res.json();
    if (!data.error) setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [search]);

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "MEMBER" : "ADMIN";
    const res = await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, role: newRole }) });
    if (res.ok) { toast.success(`Rôle modifié en ${newRole}`); load(); } else { toast.error("Erreur"); }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    const res = await fetch(`/api/admin/users?userId=${userId}`, { method: "DELETE" });
    if (res.ok) { toast.success("Utilisateur supprimé"); load(); } else { toast.error("Erreur"); }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
      <div className="p-4 border-b border-[#E8ECF1] flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher par nom ou email..." className="input-shine rounded-md pl-10 pr-4 py-2 text-sm w-full" />
        </div>
        <span className="text-[12px] text-[#5C6573]">{users.length} utilisateur(s)</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Utilisateur</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Rôle</th>
              <th className="text-left px-4 py-3">Inscrit le</th>
              <th className="text-left px-4 py-3">Activité</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECF1]">
            {loading ? <tr><td colSpan={6} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
             users.length === 0 ? <tr><td colSpan={6} className="text-center py-8 text-[#5C6573]">Aucun utilisateur</td></tr> :
             users.map((u) => (
              <tr key={u.id} className="hover:bg-[#F4F6F9]/50">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003366] to-[#1E3A5F] flex items-center justify-center text-white text-[11px] font-bold">{(u.name || u.email).charAt(0).toUpperCase()}</div><span className="font-medium text-[#003366]">{u.name || "—"}</span></div></td>
                <td className="px-4 py-3 text-[#5C6573]">{u.email}</td>
                <td className="px-4 py-3"><button onClick={() => toggleRole(u.id, u.role)} className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === "ADMIN" ? "bg-[#FFD700]/20 text-[#B8860B]" : "bg-[#F4F6F9] text-[#5C6573]"}`}>{u.role}</button></td>
                <td className="px-4 py-3 text-[#5C6573] text-[12px]">{new Date(u.createdAt).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3 text-[#5C6573] text-[12px]">{u._count.orders} cmd · {u._count.registrations} insc · {u._count.donations} dons</td>
                <td className="px-4 py-3 text-right"><button onClick={() => deleteUser(u.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

