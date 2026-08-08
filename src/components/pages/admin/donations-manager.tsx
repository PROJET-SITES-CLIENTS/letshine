"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";

export function DonationsManager() {
  const { data, loading } = useApi<{ donations: any[] }>("/api/admin/donations");
  const donations = data?.donations || [];

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/donations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) { toast.success("Statut mis à jour"); } else { toast.error("Erreur"); }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
      <div className="p-4 border-b border-[#E8ECF1]"><h3 className="font-display font-bold text-[#003366] text-sm">Dons reçus ({donations.length})</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Donateur</th>
              <th className="text-left px-4 py-3">Montant</th>
              <th className="text-left px-4 py-3">Mode</th>
              <th className="text-left px-4 py-3">Statut</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECF1]">
            {loading ? <tr><td colSpan={5} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
             donations.length === 0 ? <tr><td colSpan={5} className="text-center py-8 text-[#5C6573]">Aucun don</td></tr> :
             donations.map((d) => (
              <tr key={d.id} className="hover:bg-[#F4F6F9]/50">
                <td className="px-4 py-3"><div><p className="font-medium text-[#003366]">{d.donorName}</p><p className="text-[10px] text-[#5C6573]">{d.donorEmail}</p></div></td>
                <td className="px-4 py-3 font-display font-semibold text-[#003366]">{d.amount}€</td>
                <td className="px-4 py-3 text-[#5C6573]">{d.mode === "MONTHLY" ? "Mensuel" : "Unique"}</td>
                <td className="px-4 py-3">
                  <select value={d.status} onChange={(e) => updateStatus(d.id, e.target.value)} className="text-[11px] font-semibold rounded px-2 py-1 border border-[#E8ECF1] bg-white">
                    <option value="PENDING">En attente</option>
                    <option value="SUCCESS">Réussi</option>
                    <option value="FAILED">Échoué</option>
                    <option value="REFUNDED">Remboursé</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-[#5C6573] text-[12px]">{new Date(d.createdAt).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

