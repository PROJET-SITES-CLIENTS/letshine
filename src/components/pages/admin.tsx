"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LayoutDashboard, Users, BookOpen, Package, FileText, Calendar, Heart, ShoppingCart, MessageSquare, TrendingUp, Search, Trash2, Edit3, ArrowLeft, Plus, X, Save, Star } from "lucide-react";
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
  const { data, refresh: refreshStats } = useApi<AdminData>("/api/admin/stats");
  const [view, setView] = useState<"overview" | "users" | "products" | "programs" | "formations" | "articles" | "events" | "messages">("overview");

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

function ContentManager({ type, label, onRefresh }: { type: "programs" | "formations" | "articles" | "events"; label: string; onRefresh: () => Promise<void> }) {
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
        <h3 className="font-display font-bold text-[#003366] text-sm">Gestion des {type} ({items.length})</h3>
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
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {creating && <SimpleContentCreator type={type} label={label} onClose={() => { setCreating(false); refresh(); onRefresh(); }} />}
    </div>
  );
}

function SimpleContentCreator({ type, label, onClose }: { type: string; label: string; onClose: () => void }) {
  const [form, setForm] = useState({ titleFr: "", descFr: "", image: "", date: "" });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const slug = form.titleFr.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const payload: any = {
      slug,
      title: { fr: form.titleFr, en: form.titleFr, es: form.titleFr },
      description: { fr: form.descFr, en: form.descFr, es: form.descFr },
      image: form.image || "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80",
    };
    if (type === "programs") {
      payload.short = { fr: form.descFr.slice(0, 100), en: form.descFr.slice(0, 100), es: form.descFr.slice(0, 100) };
      payload.icon = "Sparkles";
      payload.gradient = "from-amber-500 via-yellow-500 to-orange-500";
      payload.color = "text-amber-500";
      payload.gallery = [];
      payload.objectives = { fr: [], en: [], es: [] };
      payload.target = { fr: "", en: "", es: "" };
      payload.results = { fr: [], en: [], es: [] };
    }
    if (type === "formations") {
      payload.category = { fr: "Général", en: "General", es: "General" };
      payload.duration = { fr: "3 mois", en: "3 months", es: "3 meses" };
      payload.level = "Débutant";
      payload.mode = ["online"];
      payload.price = 250000;
      payload.program = { fr: [], en: [], es: [] };
      payload.certificate = true;
    }
    if (type === "articles") {
      payload.excerpt = { fr: form.descFr.slice(0, 150), en: form.descFr.slice(0, 150), es: form.descFr.slice(0, 150) };
      payload.content = { fr: form.descFr, en: form.descFr, es: form.descFr };
      payload.category = { fr: "Blog", en: "Blog", es: "Blog" };
      payload.readTime = 5;
      payload.authorName = "Admin";
      payload.authorRole = { fr: "Rédaction", en: "Editorial", es: "Redacción" };
      payload.tag = "blog";
      payload.date = form.date || new Date().toISOString();
    }
    if (type === "events") {
      payload.type = "webinar";
      payload.time = "16:00 GMT";
      payload.location = { fr: "En ligne", en: "Online", es: "En línea" };
      payload.mode = "online";
      payload.price = 0;
      payload.seats = 1000;
      payload.registered = 0;
      payload.date = form.date || new Date().toISOString();
    }
    const res = await fetch(`/api/${type}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { toast.success(`${label} créé`); onClose(); } else { toast.error("Erreur"); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-premium-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-[#003366]">Nouveau {label}</h3>
          <button onClick={onClose} className="p-1.5 rounded text-[#5C6573] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <FieldInput label="Titre (FR)" value={form.titleFr} onChange={(v) => setForm({ ...form, titleFr: v })} />
          <div>
            <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Description (FR)</label>
            <textarea value={form.descFr} onChange={(e) => setForm({ ...form, descFr: e.target.value })} rows={4} className="input-shine rounded-md px-3 py-2 text-sm w-full resize-none" />
          </div>
          <FieldInput label="Image (URL)" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
          {(type === "articles" || type === "events") && <FieldInput label="Date (YYYY-MM-DD)" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />}
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 rounded-md text-[13px] font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> {saving ? "..." : "Créer"}</button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-md text-[13px] font-semibold border border-[#E8ECF1] text-[#5C6573] hover:bg-[#F4F6F9]">Annuler</button>
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

function FieldInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-shine rounded-md px-3 py-2 text-sm w-full" />
    </div>
  );
}
