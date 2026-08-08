"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LayoutDashboard, Users, BookOpen, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Settings, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { useAuth } from "@/hooks/use-auth";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

import { UsersManager } from "./admin/users-manager";
import { ProductsManager } from "./admin/products-manager";
import { ContentManager } from "./admin/content-manager";
import { PartnersManager } from "./admin/partners-manager";
import { TeamManager } from "./admin/team-manager";
import { DonationGoalsManager } from "./admin/donation-goals-manager";
import { OrdersManager } from "./admin/orders-manager";
import { DonationsManager } from "./admin/donations-manager";
import { RegistrationsManager } from "./admin/registrations-manager";
import { MessagesManager } from "./admin/messages-manager";
import { SettingsManager } from "./admin/settings-manager";
import { AdminLogin } from "./admin/admin-login";

type AdminStats = {
  users: number;
  programs: number;
  formations: number;
  products: number;
  articles: number;
  events: number;
  orders: number;
  donationsTotal: number;
  registrations: number;
  unreadContact: number;
};

type AdminData = {
  stats: AdminStats;
  recent: {
    users: any[];
    orders: any[];
    donations: any[];
  };
};

export function AdminPage() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const { data, refresh: refreshStats } = useApi<AdminData>("/api/admin/stats", { skip: !isAuthenticated || !isAdmin });
  const [view, setView] = useState<"overview" | "users" | "products" | "programs" | "formations" | "articles" | "events" | "services" | "partners" | "case-studies" | "media" | "team" | "donation-goals" | "orders" | "donations" | "registrations" | "messages" | "settings">("overview");

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#5C6573]">Chargement...</div>
      </div>
    );
  }

  // Show login form when not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <AdminLogin />;
  }

  const statCards = [
    { key: "users", label: "Utilisateurs", value: data?.stats.users || 0, icon: Users, color: "from-[#003366] to-[#1E3A5F]", tab: "users" as const },
    { key: "programs", label: "Programmes", value: data?.stats.programs || 0, icon: BookOpen, color: "from-[#FFD700] to-[#FFC107]", tab: "programs" as const },
    { key: "formations", label: "Formations", value: data?.stats.formations || 0, icon: Icons.GraduationCap, color: "from-emerald-500 to-teal-600", tab: "formations" as const },
    { key: "products", label: "Produits", value: data?.stats.products || 0, icon: Package, color: "from-purple-500 to-indigo-600", tab: "products" as const },
    { key: "articles", label: "Articles", value: data?.stats.articles || 0, icon: FileText, color: "from-rose-500 to-pink-600", tab: "articles" as const },
    { key: "events", label: "Événements", value: data?.stats.events || 0, icon: Calendar, color: "from-cyan-500 to-blue-600", tab: "events" as const },
    { key: "orders", label: "Commandes", value: data?.stats.orders || 0, icon: ShoppingCart, color: "from-orange-500 to-red-600" },
    { key: "donations", label: "Dons (€)", value: data?.stats.donationsTotal || 0, icon: Heart, color: "from-[#FFD700] to-[#FFC107]" },
    { key: "registrations", label: "Inscriptions", value: data?.stats.registrations || 0, icon: Icons.UserCheck, color: "from-[#003366] to-[#1E3A5F]" },
    { key: "messages", label: "Messages non traités", value: data?.stats.unreadContact || 0, icon: MessageSquare, color: "from-rose-500 to-red-600", tab: "messages" as const },
  ];

  const tabs = [
    { key: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
    { key: "users", label: "Utilisateurs", icon: Users },
    { key: "products", label: "Produits", icon: Package },
    { key: "programs", label: "Programmes", icon: BookOpen },
    { key: "formations", label: "Formations", icon: Icons.GraduationCap },
    { key: "articles", label: "Articles", icon: FileText },
    { key: "events", label: "Événements", icon: Calendar },
    { key: "services", label: "Services", icon: Icons.Briefcase },
    { key: "partners", label: "Partenaires", icon: Icons.HeartHandshake },
    { key: "case-studies", label: "Études", icon: Icons.Trophy },
    { key: "media", label: "Médiathèque", icon: Icons.Image },
    { key: "team", label: "Équipe", icon: Icons.Users2 },
    { key: "donation-goals", label: "Dons", icon: Heart },
    { key: "orders", label: "Commandes", icon: ShoppingCart },
    { key: "donations", label: "Dons reçus", icon: Icons.Gift },
    { key: "registrations", label: "Inscriptions", icon: Icons.UserCheck },
    { key: "messages", label: "Messages", icon: MessageSquare },
    { key: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="animate-page-enter pt-20">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929] via-[#003366] to-[#1E3A5F]" />
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button onClick={() => navigate("home")} className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFC107] text-[13px] font-semibold mb-4">
            <ArrowLeft className="w-4 h-4" /> Retour au site
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFC107] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#0A1929]" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#FFD700] font-semibold">Espace Administration</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">Tableau de bord</h1>
          <p className="text-slate-300 mt-2 text-sm">Gérez le contenu, les utilisateurs et l'activité de LET'S SHINE</p>
        </div>
      </section>

      <section className="py-12 bg-[#F4F6F9] min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mb-8 bg-white rounded-xl p-1 border border-[#E8ECF1] shadow-premium">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = view === tab.key;
              return (
                <button key={tab.key} onClick={() => setView(tab.key as any)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all ${isActive ? "bg-[#003366] text-white shadow-premium" : "text-[#5C6573] hover:bg-[#F4F6F9]"}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {view === "overview" && data && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {statCards.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <button key={i} onClick={() => stat.tab && setView(stat.tab)} className="bg-white rounded-xl p-4 border border-[#E8ECF1] shadow-premium hover:shadow-premium-lg hover:border-[#FFD700]/30 transition-all text-left">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-2xl font-display font-bold text-[#003366] tabular-nums">{stat.value}</div>
                      <div className="text-[10px] text-[#5C6573] uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </button>
                  );
                })}
              </div>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-5 border border-[#E8ECF1] shadow-premium">
                  <h4 className="font-display font-bold text-[#003366] text-sm mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-[#FFD700]" /> Nouveaux utilisateurs</h4>
                  <div className="space-y-2">
                    {data.recent.users.map((u: any) => (
                      <div key={u.id} className="flex items-center gap-2 text-[12px]">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#003366] to-[#1E3A5F] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">{(u.name || u.email).charAt(0).toUpperCase()}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#003366] font-medium truncate">{u.name || u.email}</p>
                          <p className="text-[10px] text-[#5C6573]">{new Date(u.createdAt).toLocaleDateString("fr-FR")}</p>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${u.role === "ADMIN" ? "bg-[#FFD700]/20 text-[#B8860B]" : "bg-[#F4F6F9] text-[#5C6573]"}`}>{u.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E8ECF1] shadow-premium">
                  <h4 className="font-display font-bold text-[#003366] text-sm mb-4 flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-[#FFD700]" /> Commandes récentes</h4>
                  <div className="space-y-2">
                    {data.recent.orders.length === 0 ? <p className="text-[12px] text-[#5C6573] text-center py-4">Aucune commande</p> : data.recent.orders.map((o: any) => (
                      <div key={o.id} className="flex items-center gap-2 text-[12px]">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"><ShoppingCart className="w-3 h-3" /></div>
                        <div className="flex-1 min-w-0"><p className="text-[#003366] font-medium truncate">{o.orderNumber}</p><p className="text-[10px] text-[#5C6573]">{o.user?.name || o.guestEmail || "Invité"}</p></div>
                        <span className="font-display font-bold text-[#003366]">{new Intl.NumberFormat("fr-FR").format(o.totalAmount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E8ECF1] shadow-premium">
                  <h4 className="font-display font-bold text-[#003366] text-sm mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-[#FFD700]" /> Dons récents</h4>
                  <div className="space-y-2">
                    {data.recent.donations.length === 0 ? <p className="text-[12px] text-[#5C6573] text-center py-4">Aucun don</p> : data.recent.donations.map((d: any) => (
                      <div key={d.id} className="flex items-center gap-2 text-[12px]">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFC107] flex items-center justify-center text-[#0A1929] text-[10px] font-bold flex-shrink-0"><Heart className="w-3 h-3" /></div>
                        <div className="flex-1 min-w-0"><p className="text-[#003366] font-medium truncate">{d.donorName}</p><p className="text-[10px] text-[#5C6573]">{d.mode === "MONTHLY" ? "Mensuel" : "Unique"}</p></div>
                        <span className="font-display font-bold text-[#003366]">{d.amount}€</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === "users" && <UsersManager />}
          {view === "products" && <ProductsManager onRefresh={refreshStats} />}
          {view === "programs" && <ContentManager type="programs" label="programme" onRefresh={refreshStats} />}
          {view === "formations" && <ContentManager type="formations" label="formation" onRefresh={refreshStats} />}
          {view === "articles" && <ContentManager type="articles" label="article" onRefresh={refreshStats} />}
          {view === "events" && <ContentManager type="events" label="événement" onRefresh={refreshStats} />}
          {view === "services" && <ContentManager type="services" label="service" onRefresh={refreshStats} />}
          {view === "partners" && <PartnersManager onRefresh={refreshStats} />}
          {view === "case-studies" && <ContentManager type="case-studies" label="étude de cas" onRefresh={refreshStats} />}
          {view === "media" && <ContentManager type="media" label="média" onRefresh={refreshStats} />}
          {view === "team" && <TeamManager onRefresh={refreshStats} />}
          {view === "donation-goals" && <DonationGoalsManager onRefresh={refreshStats} />}
          {view === "orders" && <OrdersManager />}
          {view === "donations" && <DonationsManager />}
          {view === "registrations" && <RegistrationsManager />}
          {view === "messages" && <MessagesManager />}
          {view === "settings" && <SettingsManager />}
        </div>
      </section>
    </div>
  );
}

