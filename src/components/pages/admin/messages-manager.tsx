"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";

export function MessagesManager() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact-messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const markHandled = async (id: string) => {
    const res = await fetch(`/api/admin/contact-messages/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ handled: true }) });
    if (res.ok) { toast.success("Message marqué comme traité"); load(); }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
      <div className="p-4 border-b border-[#E8ECF1]">
        <h3 className="font-display font-bold text-[#003366] text-sm">Messages de contact ({messages.length})</h3>
      </div>
      <div className="divide-y divide-[#E8ECF1] max-h-[600px] overflow-y-auto">
        {loading ? <div className="p-8 text-center text-[#5C6573]">Chargement...</div> :
         messages.length === 0 ? <div className="p-8 text-center text-[#5C6573]">Aucun message</div> :
         messages.map((m) => (
          <div key={m.id} className={`p-4 ${!m.handled ? "bg-[#FFF8DC]/20" : ""}`}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="font-semibold text-[#003366] text-sm">{m.subject}</h4>
                <p className="text-[11px] text-[#5C6573]">{m.name} · {m.email} · {new Date(m.createdAt).toLocaleString("fr-FR")}</p>
              </div>
              {!m.handled && <button onClick={() => markHandled(m.id)} className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Traiter</button>}
            </div>
            <p className="text-[13px] text-[#5C6573] leading-relaxed">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

