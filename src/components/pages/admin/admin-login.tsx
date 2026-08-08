"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Users, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";
import { FieldInput, FieldTextarea } from "./shared-fields";
import { useRouter } from "@/components/providers/router-provider";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

export function AdminLogin() {
  const { login } = useAuth();
  const { navigate } = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await login(email, password);
    setSubmitting(false);
    if (result.ok) {
      toast.success("Connexion réussie !");
    } else {
      toast.error(result.error || "Échec de connexion");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929] via-[#003366] to-[#1E3A5F]" />
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#FFD700]/8 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-premium-xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003366] to-[#1E3A5F] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-7 h-7 text-[#FFD700]" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[#003366] mb-1">Administration</h1>
            <p className="text-[13px] text-[#5C6573]">Connectez-vous pour gérer le site LET'S SHINE</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
                <input name="email" type="email" required className="input-shine rounded-md pl-10 pr-4 py-3 text-sm w-full" placeholder="admin@letsshine.africa" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
                <input name="password" type={showPwd ? "text" : "password"} required minLength={6} className="input-shine rounded-md pl-10 pr-10 py-3 text-sm w-full" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6573] hover:text-[#003366]">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={submitting} className="w-full btn-shine py-3 rounded-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
              {submitting ? "Connexion..." : <><LogIn className="w-4 h-4" /> Se connecter</>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E8ECF1]">
            <button onClick={() => navigate("home")} className="text-[12px] text-[#5C6573] hover:text-[#003366] flex items-center gap-1.5 mx-auto">
              <ArrowLeft className="w-3.5 h-3.5" /> Retour au site
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

