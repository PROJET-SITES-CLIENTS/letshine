"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LayoutDashboard, Users, BookOpen, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Star, Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { useAuth } from "@/hooks/use-auth";
import { useApi } from "@/hooks/use-api";
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
  const { data, refresh: refreshStats } = useApi<AdminData>("/api/admin/stats", { skip: !isAuthenticated || !isAdmin });
  const [view, setView] = useState<"overview" | "users" | "products" | "programs" | "formations" | "articles" | "events" | "services" | "partners" | "case-studies" | "media" | "team" | "donation-goals" | "orders" | "donations" | "registrations" | "messages">("overview");

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
        </div>
      </section>
    </div>
  );
}

function UsersManager() {
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

function ProductsManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const { data, loading, refresh } = useApi<{ products: any[] }>("/api/products");
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const products = data?.products || [];

  const toggleStock = async (slug: string, current: boolean) => {
    const res = await fetch(`/api/products/${slug}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ inStock: !current }) });
    if (res.ok) { toast.success("Produit mis à jour"); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  const deleteProduct = async (slug: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
    if (res.ok) { toast.success("Produit supprimé"); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-[#003366] text-sm">Gestion des produits ({products.length})</h3>
        <button onClick={() => setCreating(true)} className="btn-gold px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Ajouter</button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
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
              {loading ? <tr><td colSpan={6} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
               products.map((p) => (
                <tr key={p.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover" /><span className="font-medium text-[#003366]">{p.name}</span></div></td>
                  <td className="px-4 py-3 text-[#5C6573]">{p.brand}</td>
                  <td className="px-4 py-3 font-display font-semibold text-[#003366]">{new Intl.NumberFormat("fr-FR").format(p.price)} GNF</td>
                  <td className="px-4 py-3"><button onClick={() => toggleStock(p.id, p.inStock)} className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.inStock ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{p.inStock ? "En stock" : "Rupture"}</button></td>
                  <td className="px-4 py-3 text-[#5C6573]"><Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700] inline mr-1" />{p.rating}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(p)} className="p-1.5 rounded text-[#003366] hover:bg-[#F4F6F9] transition-colors mr-1"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(editing || creating) && <ProductEditor product={editing} creating={creating} onClose={() => { setEditing(null); setCreating(false); refresh(); onRefresh(); }} />}
    </div>
  );
}

function ProductEditor({ product, creating, onClose }: { product: any; creating: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category || "",
    price: product?.price || 0,
    oldPrice: product?.oldPrice || "",
    image: product?.image || "",
    descriptionFr: product?.description?.fr || "",
    warranty: product?.warranty || "12 mois",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    badge: product?.badge || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      image: form.image,
      description: { fr: form.descriptionFr, en: form.descriptionFr, es: form.descriptionFr },
      warranty: form.warranty,
      inStock: form.inStock,
      featured: form.featured,
      badge: form.badge || null,
      slug: creating ? form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : undefined,
      gallery: [form.image],
      specs: [],
    };
    const url = creating ? "/api/products" : `/api/products/${product.id}`;
    const method = creating ? "POST" : "PATCH";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      toast.success(creating ? "Produit créé" : "Produit mis à jour");
      onClose();
    } else {
      toast.error("Erreur");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-premium-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-[#003366]">{creating ? "Nouveau produit" : "Modifier le produit"}</h3>
          <button onClick={onClose} className="p-1.5 rounded text-[#5C6573] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldInput label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <FieldInput label="Marque" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} />
          <FieldInput label="Catégorie" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
          <FieldInput label="Prix (GNF)" value={String(form.price)} onChange={(v) => setForm({ ...form, price: v })} type="number" />
          <FieldInput label="Ancien prix (optionnel)" value={String(form.oldPrice)} onChange={(v) => setForm({ ...form, oldPrice: v })} type="number" />
          <FieldInput label="Garantie" value={form.warranty} onChange={(v) => setForm({ ...form, warranty: v })} />
          <div className="sm:col-span-2"><FieldInput label="Image (URL)" value={form.image} onChange={(v) => setForm({ ...form, image: v })} /></div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Description</label>
            <textarea value={form.descriptionFr} onChange={(e) => setForm({ ...form, descriptionFr: e.target.value })} rows={3} className="input-shine rounded-md px-3 py-2 text-sm w-full resize-none" />
          </div>
          <div className="sm:col-span-2 flex gap-4">
            <label className="flex items-center gap-2 text-[13px] text-[#003366]"><input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="rounded" /> En stock</label>
            <label className="flex items-center gap-2 text-[13px] text-[#003366]"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" /> Produit vedette</label>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 rounded-md text-[13px] font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> {saving ? "..." : "Enregistrer"}</button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-md text-[13px] font-semibold border border-[#E8ECF1] text-[#5C6573] hover:bg-[#F4F6F9]">Annuler</button>
        </div>
      </div>
    </div>
  );
}

function ContentManager({ type, label, onRefresh }: { type: "programs" | "formations" | "articles" | "events" | "services" | "case-studies" | "media"; label: string; onRefresh: () => Promise<void> }) {
  const { data, loading, refresh } = useApi<{ [key: string]: any[] }>(`/api/${type}`);
  const items = (data as any)?.[type] || [];
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const deleteItem = async (slug: string) => {
    if (!confirm(`Supprimer ce ${label} ?`)) return;
    const res = await fetch(`/api/${type}/${slug}`, { method: "DELETE" });
    if (res.ok) { toast.success(`${label} supprimé`); refresh(); onRefresh(); } else { toast.error("Erreur"); }
  };

  const getTitle = (item: any) => {
    if (type === "programs") return item.title?.fr || item.titleFr || "";
    if (type === "formations") return item.title?.fr || item.titleFr || "";
    if (type === "articles") return item.title?.fr || item.titleFr || "";
    if (type === "events") return item.title?.fr || item.titleFr || "";
    return "";
  };
  const getImage = (item: any) => item.image || "";
  const getDate = (item: any) => {
    if (type === "articles") return item.date ? new Date(item.date).toLocaleDateString("fr-FR") : "";
    if (type === "events") return item.date ? new Date(item.date).toLocaleDateString("fr-FR") : "";
    return item.createdAt ? new Date(item.createdAt).toLocaleDateString("fr-FR") : "";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-[#003366] text-sm">Gestion des {label}s ({items.length})</h3>
        <button onClick={() => setCreating(true)} className="btn-gold px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Ajouter</button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Titre</th>
                {type === "articles" && <th className="text-left px-4 py-3">Auteur</th>}
                {type === "events" && <th className="text-left px-4 py-3">Date</th>}
                <th className="text-left px-4 py-3">Créé le</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECF1]">
              {loading ? <tr><td colSpan={4} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
               items.length === 0 ? <tr><td colSpan={4} className="text-center py-8 text-[#5C6573]">Aucun {label}</td></tr> :
               items.map((item: any) => (
                <tr key={item.id} className="hover:bg-[#F4F6F9]/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2">{getImage(item) && <img src={getImage(item)} alt={getTitle(item)} className="w-10 h-10 rounded-md object-cover" />}<span className="font-medium text-[#003366]">{getTitle(item)}</span></div></td>
                  {type === "articles" && <td className="px-4 py-3 text-[#5C6573]">{item.author || item.authorName || "—"}</td>}
                  {type === "events" && <td className="px-4 py-3 text-[#5C6573]">{getDate(item)}</td>}
                  <td className="px-4 py-3 text-[#5C6573] text-[12px]">{item.createdAt ? new Date(item.createdAt).toLocaleDateString("fr-FR") : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(item)} className="p-1.5 rounded text-[#003366] hover:bg-[#F4F6F9] transition-colors mr-1"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(creating || editing) && <FullContentEditor type={type} label={label} item={editing} creating={creating} onClose={() => { setCreating(false); setEditing(null); refresh(); onRefresh(); }} />}
    </div>
  );
}

function FullContentEditor({ type, label, item, creating, onClose }: { type: string; label: string; item: any; creating: boolean; onClose: () => void }) {
  const [lang, setLang] = useState<"fr" | "en" | "es">("fr");
  const [saving, setSaving] = useState(false);

  // Helper to get nested value: getField(item, "title.fr") or default ""
  const get = (path: string) => {
    if (!item) return "";
    const parts = path.split(".");
    let val: any = item;
    for (const p of parts) { val = val?.[p]; if (val === undefined) return ""; }
    return typeof val === "string" ? val : "";
  };
  const getArr = (path: string) => {
    if (!item) return [];
    const parts = path.split(".");
    let val: any = item;
    for (const p of parts) { val = val?.[p]; if (val === undefined) return []; }
    return Array.isArray(val) ? val : [];
  };

  // Form state — localized fields stored as { fr, en, es }
  const [form, setForm] = useState<any>(() => {
    const base: any = {
      image: item?.image || "",
    };
    if (type === "programs") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.short = { fr: get("short.fr"), en: get("short.en"), es: get("short.es") };
      base.description = { fr: get("description.fr"), en: get("description.en"), es: get("description.es") };
      base.target = { fr: get("target.fr"), en: get("target.en"), es: get("target.es") };
      base.objectives = { fr: getArr("objectives.fr").join("\n"), en: getArr("objectives.en").join("\n"), es: getArr("objectives.es").join("\n") };
      base.results = { fr: getArr("results.fr").join("\n"), en: getArr("results.en").join("\n"), es: getArr("results.es").join("\n") };
      base.icon = item?.icon || "Sparkles";
      base.gradient = item?.gradient || "from-amber-500 via-yellow-500 to-orange-500";
      base.color = item?.color || "text-amber-500";
      base.gallery = getArr("gallery").join("\n");
    }
    if (type === "formations") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.description = { fr: get("description.fr"), en: get("description.en"), es: get("description.es") };
      base.category = { fr: get("category.fr"), en: get("category.en"), es: get("category.es") };
      base.duration = { fr: get("duration.fr"), en: get("duration.en"), es: get("duration.es") };
      base.program = { fr: getArr("program.fr").join("\n"), en: getArr("program.en").join("\n"), es: getArr("program.es").join("\n") };
      base.icon = item?.icon || "GraduationCap";
      base.level = item?.level || "Débutant";
      base.mode = (item?.mode || ["online"]).join(",");
      base.price = item?.price ?? 250000;
      base.certificate = item?.certificate ?? true;
      base.popular = item?.popular ?? false;
    }
    if (type === "articles") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.excerpt = { fr: get("excerpt.fr"), en: get("excerpt.en"), es: get("excerpt.es") };
      base.content = { fr: get("content.fr"), en: get("content.en"), es: get("content.es") };
      base.category = { fr: get("category.fr"), en: get("category.en"), es: get("category.es") };
      base.authorRole = { fr: get("authorRole.fr"), en: get("authorRole.en"), es: get("authorRole.es") };
      base.authorName = item?.author || item?.authorName || "Admin";
      base.tag = item?.tag || "blog";
      base.readTime = item?.readTime ?? 5;
      base.date = item?.date ? new Date(item.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
    }
    if (type === "events") {
      base.title = { fr: get("title.fr"), en: get("title.en"), es: get("title.es") };
      base.description = { fr: get("description.fr"), en: get("description.en"), es: get("description.es") };
      base.location = { fr: get("location.fr"), en: get("location.en"), es: get("location.es") };
      base.type = item?.type || "webinar";
      base.time = item?.time || "16:00";
      base.date = item?.date ? new Date(item.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
      base.mode = item?.mode || "online";
      base.price = item?.price ?? 0;
      base.seats = item?.seats ?? 1000;
    }
    return base;
  });

  const setField = (field: string, lang: "fr" | "en" | "es", value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
  };
  const setCommon = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const linesToArray = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

    const payload: any = {};

    if (type === "programs") {
      payload.title = form.title;
      payload.short = form.short;
      payload.description = form.description;
      payload.target = form.target;
      payload.objectives = { fr: linesToArray(form.objectives.fr), en: linesToArray(form.objectives.en), es: linesToArray(form.objectives.es) };
      payload.results = { fr: linesToArray(form.results.fr), en: linesToArray(form.results.en), es: linesToArray(form.results.es) };
      payload.image = form.image || "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80";
      payload.icon = form.icon;
      payload.gradient = form.gradient;
      payload.color = form.color;
      payload.gallery = linesToArray(form.gallery);
    }
    if (type === "formations") {
      payload.title = form.title;
      payload.description = form.description;
      payload.category = form.category;
      payload.duration = form.duration;
      payload.program = { fr: linesToArray(form.program.fr), en: linesToArray(form.program.en), es: linesToArray(form.program.es) };
      payload.image = form.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80";
      payload.icon = form.icon;
      payload.level = form.level;
      payload.mode = form.mode.split(",").map((s: string) => s.trim()).filter(Boolean);
      payload.price = Number(form.price);
      payload.certificate = form.certificate;
      payload.popular = form.popular;
    }
    if (type === "articles") {
      payload.title = form.title;
      payload.excerpt = form.excerpt;
      payload.content = form.content;
      payload.category = form.category;
      payload.authorRole = form.authorRole;
      payload.authorName = form.authorName;
      payload.tag = form.tag;
      payload.readTime = Number(form.readTime);
      payload.image = form.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80";
      payload.date = form.date ? new Date(form.date).toISOString() : new Date().toISOString();
    }
    if (type === "events") {
      payload.title = form.title;
      payload.description = form.description;
      payload.location = form.location;
      payload.image = form.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";
      payload.type = form.type;
      payload.time = form.time;
      payload.mode = form.mode;
      payload.price = Number(form.price);
      payload.seats = Number(form.seats);
      payload.date = form.date ? new Date(form.date).toISOString() : new Date().toISOString();
    }

    if (creating) {
      payload.slug = form.title.fr.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;
    }

    const url = creating ? `/api/${type}` : `/api/${type}/${item.id}`;
    const method = creating ? "POST" : "PATCH";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { toast.success(creating ? `${label} créé` : `${label} mis à jour`); onClose(); } else { toast.error("Erreur"); }
    setSaving(false);
  };

  const langTabs = [
    { code: "fr" as const, label: "Français", flag: "🇫🇷" },
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "es" as const, label: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-premium-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-[#E8ECF1] px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-display font-bold text-[#003366]">{creating ? `Nouveau ${label}` : `Modifier le ${label}`}</h3>
          <button onClick={onClose} className="p-1.5 rounded text-[#5C6573] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Language tabs */}
          <div className="flex gap-1 p-1 rounded-lg bg-[#F4F6F9]">
            {langTabs.map((lt) => (
              <button key={lt.code} onClick={() => setLang(lt.code)} className={`flex-1 py-2 rounded-md text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 ${lang === lt.code ? "bg-white text-[#003366] shadow-premium" : "text-[#5C6573]"}`}>
                <span>{lt.flag}</span> {lt.label}
              </button>
            ))}
          </div>

          {/* Localized fields */}
          <div className="space-y-4">
            <FieldInput label={`Titre (${lang.toUpperCase()})`} value={form.title?.[lang] || ""} onChange={(v) => setField("title", lang, v)} />

            {type === "programs" && (
              <>
                <FieldTextarea label={`Description courte (${lang.toUpperCase()})`} value={form.short?.[lang] || ""} onChange={(v) => setField("short", lang, v)} rows={2} />
                <FieldTextarea label={`Description (${lang.toUpperCase()})`} value={form.description?.[lang] || ""} onChange={(v) => setField("description", lang, v)} rows={4} />
                <FieldTextarea label={`Public cible (${lang.toUpperCase()})`} value={form.target?.[lang] || ""} onChange={(v) => setField("target", lang, v)} rows={2} />
                <FieldTextarea label={`Objectifs (${lang.toUpperCase()}) — un par ligne`} value={form.objectives?.[lang] || ""} onChange={(v) => setField("objectives", lang, v)} rows={4} />
                <FieldTextarea label={`Résultats (${lang.toUpperCase()}) — un par ligne`} value={form.results?.[lang] || ""} onChange={(v) => setField("results", lang, v)} rows={4} />
              </>
            )}

            {type === "formations" && (
              <>
                <FieldTextarea label={`Description (${lang.toUpperCase()})`} value={form.description?.[lang] || ""} onChange={(v) => setField("description", lang, v)} rows={4} />
                <FieldInput label={`Catégorie (${lang.toUpperCase()})`} value={form.category?.[lang] || ""} onChange={(v) => setField("category", lang, v)} />
                <FieldInput label={`Durée (${lang.toUpperCase()})`} value={form.duration?.[lang] || ""} onChange={(v) => setField("duration", lang, v)} />
                <FieldTextarea label={`Programme détaillé (${lang.toUpperCase()}) — un point par ligne`} value={form.program?.[lang] || ""} onChange={(v) => setField("program", lang, v)} rows={5} />
              </>
            )}

            {type === "articles" && (
              <>
                <FieldTextarea label={`Extrait (${lang.toUpperCase()})`} value={form.excerpt?.[lang] || ""} onChange={(v) => setField("excerpt", lang, v)} rows={3} />
                <FieldTextarea label={`Contenu (${lang.toUpperCase()})`} value={form.content?.[lang] || ""} onChange={(v) => setField("content", lang, v)} rows={8} />
                <FieldInput label={`Catégorie (${lang.toUpperCase()})`} value={form.category?.[lang] || ""} onChange={(v) => setField("category", lang, v)} />
                <FieldInput label={`Rôle de l'auteur (${lang.toUpperCase()})`} value={form.authorRole?.[lang] || ""} onChange={(v) => setField("authorRole", lang, v)} />
              </>
            )}

            {type === "events" && (
              <>
                <FieldTextarea label={`Description (${lang.toUpperCase()})`} value={form.description?.[lang] || ""} onChange={(v) => setField("description", lang, v)} rows={4} />
                <FieldInput label={`Lieu (${lang.toUpperCase()})`} value={form.location?.[lang] || ""} onChange={(v) => setField("location", lang, v)} />
              </>
            )}
          </div>

          {/* Common fields */}
          <div className="border-t border-[#E8ECF1] pt-6">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6573] mb-4">Champs communs</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><FieldInput label="Image (URL)" value={form.image} onChange={(v) => setCommon("image", v)} /></div>

              {type === "programs" && (
                <>
                  <FieldInput label="Icône (Lucide)" value={form.icon} onChange={(v) => setCommon("icon", v)} />
                  <FieldInput label="Gradient (Tailwind)" value={form.gradient} onChange={(v) => setCommon("gradient", v)} />
                  <FieldInput label="Couleur texte" value={form.color} onChange={(v) => setCommon("color", v)} />
                  <div className="sm:col-span-2"><FieldTextarea label="Galerie d'images — une URL par ligne" value={form.gallery} onChange={(v) => setCommon("gallery", v)} rows={3} /></div>
                </>
              )}

              {type === "formations" && (
                <>
                  <FieldInput label="Icône (Lucide)" value={form.icon} onChange={(v) => setCommon("icon", v)} />
                  <FieldInput label="Niveau" value={form.level} onChange={(v) => setCommon("level", v)} />
                  <FieldInput label="Mode (online,offline)" value={form.mode} onChange={(v) => setCommon("mode", v)} />
                  <FieldInput label="Prix (GNF)" value={String(form.price)} onChange={(v) => setCommon("price", v)} type="number" />
                  <label className="flex items-center gap-2 text-[13px] text-[#003366]"><input type="checkbox" checked={form.certificate} onChange={(e) => setCommon("certificate", e.target.checked)} className="rounded" /> Certificat inclus</label>
                  <label className="flex items-center gap-2 text-[13px] text-[#003366]"><input type="checkbox" checked={form.popular} onChange={(e) => setCommon("popular", e.target.checked)} className="rounded" /> Populaire</label>
                </>
              )}

              {type === "articles" && (
                <>
                  <FieldInput label="Nom de l'auteur" value={form.authorName} onChange={(v) => setCommon("authorName", v)} />
                  <FieldInput label="Tag (interview, report, press, blog)" value={form.tag} onChange={(v) => setCommon("tag", v)} />
                  <FieldInput label="Temps de lecture (min)" value={String(form.readTime)} onChange={(v) => setCommon("readTime", v)} type="number" />
                  <FieldInput label="Date (YYYY-MM-DD)" value={form.date} onChange={(v) => setCommon("date", v)} />
                </>
              )}

              {type === "events" && (
                <>
                  <FieldInput label="Type (webinar, conference, workshop)" value={form.type} onChange={(v) => setCommon("type", v)} />
                  <FieldInput label="Heure" value={form.time} onChange={(v) => setCommon("time", v)} />
                  <FieldInput label="Date (YYYY-MM-DD)" value={form.date} onChange={(v) => setCommon("date", v)} />
                  <FieldInput label="Mode (online, offline, hybrid)" value={form.mode} onChange={(v) => setCommon("mode", v)} />
                  <FieldInput label="Prix (GNF, 0=gratuit)" value={String(form.price)} onChange={(v) => setCommon("price", v)} type="number" />
                  <FieldInput label="Places disponibles" value={String(form.seats)} onChange={(v) => setCommon("seats", v)} type="number" />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-[#E8ECF1] px-6 py-4 flex gap-2 justify-end">
          <button onClick={onClose} className="px-6 py-2.5 rounded-md text-[13px] font-semibold border border-[#E8ECF1] text-[#5C6573] hover:bg-[#F4F6F9]">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 rounded-md text-[13px] font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> {saving ? "..." : creating ? "Créer" : "Enregistrer"}</button>
        </div>
      </div>
    </div>
  );
}

function MessagesManager() {
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

function PartnersManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
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

function PartnerEditor({ partner, creating, onClose }: { partner: any; creating: boolean; onClose: () => void }) {
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
          <FieldInput label="Logo (texte court)" value={form.logo} onChange={(v) => setForm({ ...form, logo: v })} />
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

function TeamManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
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

function TeamEditor({ member, creating, onClose }: { member: any; creating: boolean; onClose: () => void }) {
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
          <div className="sm:col-span-2"><FieldInput label="Image (URL)" value={form.image} onChange={(v) => setForm({ ...form, image: v })} /></div>
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

function DonationGoalsManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
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

function DonationGoalEditor({ goal, creating, onClose }: { goal: any; creating: boolean; onClose: () => void }) {
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

function OrdersManager() {
  const { data, loading } = useApi<{ orders: any[] }>("/api/admin/orders");
  const orders = data?.orders || [];

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) { toast.success("Statut mis à jour"); } else { toast.error("Erreur"); }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
      <div className="p-4 border-b border-[#E8ECF1]"><h3 className="font-display font-bold text-[#003366] text-sm">Commandes ({orders.length})</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">N° commande</th>
              <th className="text-left px-4 py-3">Client</th>
              <th className="text-left px-4 py-3">Montant</th>
              <th className="text-left px-4 py-3">Statut</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECF1]">
            {loading ? <tr><td colSpan={5} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
             orders.length === 0 ? <tr><td colSpan={5} className="text-center py-8 text-[#5C6573]">Aucune commande</td></tr> :
             orders.map((o) => (
              <tr key={o.id} className="hover:bg-[#F4F6F9]/50">
                <td className="px-4 py-3 font-medium text-[#003366]">{o.orderNumber}</td>
                <td className="px-4 py-3 text-[#5C6573]">{o.user?.name || o.guestEmail || "Invité"}</td>
                <td className="px-4 py-3 font-display font-semibold text-[#003366]">{new Intl.NumberFormat("fr-FR").format(o.totalAmount)} GNF</td>
                <td className="px-4 py-3">
                  <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="text-[11px] font-semibold rounded px-2 py-1 border border-[#E8ECF1] bg-white">
                    <option value="PENDING">En attente</option>
                    <option value="PAID">Payée</option>
                    <option value="SHIPPED">Expédiée</option>
                    <option value="DELIVERED">Livrée</option>
                    <option value="CANCELLED">Annulée</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-[#5C6573] text-[12px]">{new Date(o.createdAt).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DonationsManager() {
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

function RegistrationsManager() {
  const { data, loading } = useApi<{ registrations: any[] }>("/api/admin/registrations");
  const registrations = data?.registrations || [];

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/registrations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) { toast.success("Statut mis à jour"); } else { toast.error("Erreur"); }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF1] shadow-premium overflow-hidden">
      <div className="p-4 border-b border-[#E8ECF1]"><h3 className="font-display font-bold text-[#003366] text-sm">Inscriptions ({registrations.length})</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-[#F4F6F9] text-[#5C6573] uppercase text-[10px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Membre</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Détail</th>
              <th className="text-left px-4 py-3">Statut</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECF1]">
            {loading ? <tr><td colSpan={5} className="text-center py-8 text-[#5C6573]">Chargement...</td></tr> :
             registrations.length === 0 ? <tr><td colSpan={5} className="text-center py-8 text-[#5C6573]">Aucune inscription</td></tr> :
             registrations.map((r) => (
              <tr key={r.id} className="hover:bg-[#F4F6F9]/50">
                <td className="px-4 py-3 font-medium text-[#003366]">{r.user?.name || r.user?.email || "—"}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F4F6F9] text-[#5C6573]">{r.type}</span></td>
                <td className="px-4 py-3 text-[#5C6573]">{r.program?.titleFr || r.formation?.titleFr || r.event?.titleFr || "—"}</td>
                <td className="px-4 py-3">
                  <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)} className="text-[11px] font-semibold rounded px-2 py-1 border border-[#E8ECF1] bg-white">
                    <option value="PENDING">En attente</option>
                    <option value="CONFIRMED">Confirmée</option>
                    <option value="IN_PROGRESS">En cours</option>
                    <option value="COMPLETED">Terminée</option>
                    <option value="CANCELLED">Annulée</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-[#5C6573] text-[12px]">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminLogin() {
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

function FieldInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-shine rounded-md px-3 py-2 text-sm w-full" />
    </div>
  );
}

function FieldTextarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="input-shine rounded-md px-3 py-2 text-sm w-full resize-none" />
    </div>
  );
}
