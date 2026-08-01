"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LayoutDashboard, Users, BookOpen, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { useAuth } from "@/hooks/use-auth";
import { SectionHeader } from "@/components/layout/section-header";
import { toast } from "sonner";

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
  const [data, setData] = useState<AdminData | null>(null);
  const [view, setView] = useState<"overview" | "users" | "products" | "messages">("overview");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetch("/api/admin/stats")
        .then((r) => r.json())
        .then((d) => { if (!d.error) setData(d); })
        .catch(() => {});
    }
  }, [isAuthenticated, isAdmin]);

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#5C6573]">Chargement...</div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center mx-auto mb-5">
            <Icons.Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#003366] mb-2">Accès refusé</h2>
          <p className="text-[13px] text-[#5C6573] mb-6">Vous devez être connecté en tant qu'administrateur pour accéder à cet espace.</p>
          <button onClick={() => navigate("member")} className="btn-shine px-6 py-3 rounded-md text-[13px] font-semibold inline-flex items-center gap-2">
            <Icons.LogIn className="w-4 h-4" /> Se connecter
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    { key: "users", label: "Utilisateurs", value: data?.stats.users || 0, icon: Users, color: "from-[#003366] to-[#1E3A5F]" },
    { key: "programs", label: "Programmes", value: data?.stats.programs || 0, icon: BookOpen, color: "from-[#FFD700] to-[#FFC107]" },
    { key: "formations", label: "Formations", value: data?.stats.formations || 0, icon: Icons.GraduationCap, color: "from-emerald-500 to-teal-600" },
    { key: "products", label: "Produits", value: data?.stats.products || 0, icon: Package, color: "from-purple-500 to-indigo-600" },
    { key: "articles", label: "Articles", value: data?.stats.articles || 0, icon: FileText, color: "from-rose-500 to-pink-600" },
    { key: "events", label: "Événements", value: data?.stats.events || 0, icon: Calendar, color: "from-cyan-500 to-blue-600" },
    { key: "orders", label: "Commandes", value: data?.stats.orders || 0, icon: ShoppingCart, color: "from-orange-500 to-red-600" },
    { key: "donations", label: "Dons (€)", value: data?.stats.donationsTotal || 0, icon: Heart, color: "from-[#FFD700] to-[#FFC107]" },
    { key: "registrations", label: "Inscriptions", value: data?.stats.registrations || 0, icon: Icons.UserCheck, color: "from-[#003366] to-[#1E3A5F]" },
    { key: "messages", label: "Messages non traités", value: data?.stats.unreadContact || 0, icon: MessageSquare, color: "from-rose-500 to-red-600" },
  ];

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
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
          <div className="flex flex-wrap gap-1 mb-8 bg-white rounded-xl p-1 border border-[#E8ECF1] shadow-premium max-w-md">
            {[
              { key: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
              { key: "users", label: "Utilisateurs", icon: Users },
              { key: "products", label: "Produits", icon: Package },
              { key: "messages", label: "Messages", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = view === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setView(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all ${isActive ? "bg-[#003366] text-white shadow-premium" : "text-[#5C6573] hover:bg-[#F4F6F9]"}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {view === "overview" && data && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {statCards.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-white rounded-xl p-4 border border-[#E8ECF1] shadow-premium hover:shadow-premium-lg transition-shadow">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-2xl font-display font-bold text-[#003366] tabular-nums">{stat.value}</div>
                      <div className="text-[10px] text-[#5C6573] uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Recent activity */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-5 border border-[#E8ECF1] shadow-premium">
                  <h4 className="font-display font-bold text-[#003366] text-sm mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#FFD700]" /> Nouveaux utilisateurs
                  </h4>
                  <div className="space-y-2">
                    {data.recent.users.map((u: any) => (
                      <div key={u.id} className="flex items-center gap-2 text-[12px]">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#003366] to-[#1E3A5F] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {(u.name || u.email).charAt(0).toUpperCase()}
                        </div>
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
                  <h4 className="font-display font-bold text-[#003366] text-sm mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-[#FFD700]" /> Commandes récentes
                  </h4>
                  <div className="space-y-2">
                    {data.recent.orders.length === 0 ? (
                      <p className="text-[12px] text-[#5C6573] text-center py-4">Aucune commande</p>
                    ) : (
                      data.recent.orders.map((o: any) => (
                        <div key={o.id} className="flex items-center gap-2 text-[12px]">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                            <ShoppingCart className="w-3 h-3" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#003366] font-medium truncate">{o.orderNumber}</p>
                            <p className="text-[10px] text-[#5C6573]">{o.user?.name || o.guestEmail || "Invité"}</p>
                          </div>
                          <span className="font-display font-bold text-[#003366]">{new Intl.NumberFormat("fr-FR").format(o.totalAmount)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-[#E8ECF1] shadow-premium">
                  <h4 className="font-display font-bold text-[#003366] text-sm mb-4 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#FFD700]" /> Dons récents
                  </h4>
                  <div className="space-y-2">
                    {data.recent.donations.length === 0 ? (
                      <p className="text-[12px] text-[#5C6573] text-center py-4">Aucun don</p>
                    ) : (
                      data.recent.donations.map((d: any) => (
                        <div key={d.id} className="flex items-center gap-2 text-[12px]">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFC107] flex items-center justify-center text-[#0A1929] text-[10px] font-bold flex-shrink-0">
                            <Heart className="w-3 h-3" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#003366] font-medium truncate">{d.donorName}</p>
                            <p className="text-[10px] text-[#5C6573]">{d.mode === "MONTHLY" ? "Mensuel" : "Unique"}</p>
                          </div>
                          <span className="font-display font-bold text-[#003366]">{d.amount}€</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === "users" && <UsersManager search={search} setSearch={setSearch} />}
          {view === "products" && <ProductsManager />}
          {view === "messages" && <MessagesManager />}
        </div>
      </section>
    </div>
  );
}

function UsersManager({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
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
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });
    if (res.ok) {
      toast.success(`Rôle modifié en ${newRole}`);
      load();
    } else {
      toast.error("Erreur");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Supprimer cet utilisateur ? Cette action est irréversible.")) return;
    const res = await fetch(`/api/admin/users?userId=${userId}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Utilisateur supprimé");
      load();
    } else {
      toast.error("Erreur");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
      <div className="p-4 border-b border-[#E8ECF1] flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email..."
            className="input-shine rounded-md pl-10 pr-4 py-2 text-sm w-full"
          />
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
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-[#5C6573]">Aucun utilisateur</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003366] to-[#1E3A5F] flex items-center justify-center text-white text-[11px] font-bold">
                        {(u.name || u.email).charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-[#003366]">{u.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5C6573]">{u.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleRole(u.id, u.role)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === "ADMIN" ? "bg-[#FFD700]/20 text-[#B8860B]" : "bg-[#F4F6F9] text-[#5C6573]"}`}
                    >
                      {u.role}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[#5C6573] text-[12px]">{new Date(u.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-3 text-[#5C6573] text-[12px]">
                    {u._count.orders} cmd · {u._count.registrations} insc · {u._count.donations} dons
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => deleteUser(u.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductsManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    if (!data.error) setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const toggleStock = async (slug: string, current: boolean) => {
    const res = await fetch(`/api/products/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !current }),
    });
    if (res.ok) {
      toast.success("Produit mis à jour");
      load();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
      <div className="p-4 border-b border-[#E8ECF1] flex items-center justify-between">
        <h3 className="font-display font-bold text-[#003366] text-sm">Gestion des produits ({products.length})</h3>
        <button className="btn-gold px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-1.5">
          <Icons.Plus className="w-3.5 h-3.5" /> Ajouter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Produit</th>
              <th className="text-left px-4 py-3">Marque</th>
              <th className="text-left px-4 py-3">Prix</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Note</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECF1]">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                      <span className="font-medium text-[#003366]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5C6573]">{p.brand}</td>
                  <td className="px-4 py-3 font-display font-semibold text-[#003366]">{new Intl.NumberFormat("fr-FR").format(p.price)} GNF</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStock(p.slug, p.inStock)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.inStock ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                    >
                      {p.inStock ? "En stock" : "Rupture"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[#5C6573]"><Icons.Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700] inline mr-1" />{p.rating}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 rounded text-[#003366] hover:bg-[#F4F6F9] transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MessagesManager() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    // Note: this would need an admin messages API — for now we show contact messages count from stats
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium p-8 text-center">
      <MessageSquare className="w-12 h-12 text-[#5C6573]/40 mx-auto mb-3" />
      <h3 className="font-display font-bold text-[#003366] text-sm mb-2">Messages de contact</h3>
      <p className="text-[12px] text-[#5C6573]">Les messages envoyés via le formulaire de contact apparaîtront ici.</p>
    </div>
  );
}
