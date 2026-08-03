"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { User, Lock, Mail, Phone, Globe, Eye, EyeOff, LogIn, UserPlus, LayoutDashboard, Award, History, BookOpen, MessageSquare, Bell, LogOut, Edit3, Save, X, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { useAuth } from "@/hooks/use-auth";
import { SectionHeader } from "@/components/layout/section-header";
import { toast } from "sonner";

type DashboardData = {
  user: any;
  registrations: any[];
  certificates: any[];
  messages: any[];
  donations: any[];
  orders: any[];
  stats: {
    unreadMessages: number;
    activeFormations: number;
    completedFormations: number;
    totalDonated: number;
    totalOrders: number;
    totalCertificates: number;
  };
};

export function EspaceMembrePage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { navigate } = useRouter();
  const { user, isAuthenticated, isAdmin, isLoading, login, register, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [view, setView] = useState<"dashboard" | "profile" | "messages" | "formations" | "certificates" | "history">("dashboard");
  const [editingProfile, setEditingProfile] = useState(false);

  // Fetch dashboard data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/member/dashboard")
        .then((r) => r.json())
        .then((data) => {
          if (!data.error) setDashboard(data);
        })
        .catch(() => {});
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDashboard(null);
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await login(email, password);
    setSubmitting(false);
    if (result.ok) {
      toast.success("Connexion réussie ! Bienvenue.");
    } else {
      toast.error(result.error || "Échec de connexion");
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      password: formData.get("password") as string,
    };
    const result = await register(data);
    setSubmitting(false);
    if (result.ok) {
      toast.success("Compte créé ! Bienvenue dans la communauté LET'S SHINE.");
    } else {
      toast.error(result.error || "Échec de l'inscription");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Déconnexion réussie.");
    setView("dashboard");
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#5C6573]">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#0A1929]/80 to-[#003366]/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center py-12">
          <SectionHeader badge={t("member.tag")} title={t("member.title")} subtitle={t("member.subtitle")} variant="dark" />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto"
              >
                {/* Mode toggle */}
                <div className="flex gap-2 p-1 rounded-lg bg-[#F4F6F9] mb-7">
                  <button
                    onClick={() => setMode("login")}
                    className={`flex-1 py-2.5 rounded-md text-[13px] font-semibold transition-all flex items-center justify-center gap-2 ${mode === "login" ? "bg-white text-[#003366] shadow-premium" : "text-[#5C6573]"}`}
                  >
                    <LogIn className="w-4 h-4" />
                    {t("cta.login")}
                  </button>
                  <button
                    onClick={() => setMode("register")}
                    className={`flex-1 py-2.5 rounded-md text-[13px] font-semibold transition-all flex items-center justify-center gap-2 ${mode === "register" ? "bg-white text-[#003366] shadow-premium" : "text-[#5C6573]"}`}
                  >
                    <UserPlus className="w-4 h-4" />
                    {t("cta.register")}
                  </button>
                </div>

                <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="glass-strong rounded-2xl p-7 space-y-4">
                  {mode === "register" && (
                    <div>
                      <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{t("member.fullName")}</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
                        <input name="name" required className="input-shine rounded-md pl-10 pr-4 py-2.5 text-sm w-full" placeholder="Aïssatou Diallo" />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{t("member.email")}</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
                      <input name="email" type="email" required className="input-shine rounded-md pl-10 pr-4 py-2.5 text-sm w-full" placeholder="vous@email.com" />
                    </div>
                  </div>

                  {mode === "register" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{t("member.phone")}</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
                          <input name="phone" required className="input-shine rounded-md pl-10 pr-4 py-2.5 text-sm w-full" placeholder="+224 ..." />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{t("member.country")}</label>
                        <div className="relative">
                          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
                          <input name="country" required className="input-shine rounded-md pl-10 pr-4 py-2.5 text-sm w-full" placeholder="Guinée" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{t("member.password")}</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6573]" />
                      <input name="password" type={showPwd ? "text" : "password"} required minLength={6} className="input-shine rounded-md pl-10 pr-10 py-2.5 text-sm w-full" placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6573] hover:text-[#FFD700]">
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={submitting} className="w-full btn-gold py-3 rounded-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                    {submitting ? (
                      <>{t("common.loading")}</>
                    ) : mode === "login" ? (
                      <><LogIn className="w-4 h-4" /> {t("cta.login")}</>
                    ) : (
                      <><UserPlus className="w-4 h-4" /> {t("cta.register")}</>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-[11px] text-[#5C6573]">
                      {mode === "login" ? t("member.noAccount") : t("member.hasAccount")}{" "}
                      <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-[#003366] font-semibold hover:underline">
                        {mode === "login" ? t("cta.register") : t("cta.login")}
                      </button>
                    </p>
                  </div>

                  {mode === "login" && (
                    <div className="mt-4 p-3 rounded-md bg-[#FFF8DC]/40 border border-[#FFD700]/20">
                      <p className="text-[10px] text-[#5C6573] mb-1 font-semibold uppercase tracking-wider">Comptes de démonstration</p>
                      <p className="text-[11px] text-[#003366]"><strong>Membre :</strong> member@letsshine.africa / member123</p>
                      <p className="text-[11px] text-[#003366]"><strong>Admin :</strong> admin@letsshine.africa / admin123</p>
                    </div>
                  )}
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-6xl mx-auto"
              >
                {/* Welcome banner */}
                <div className="bg-gradient-to-br from-[#003366] to-[#1E3A5F] rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden shadow-premium-lg">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFD700]/8 rounded-full blur-3xl" />
                  <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFC107] flex items-center justify-center text-[#0A1929] font-display font-extrabold text-2xl shadow-lg">
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-[11px] text-[#FFD700] uppercase tracking-wider font-semibold">{isAdmin ? "Administrateur" : "Membre"}</p>
                        <h3 className="font-display text-2xl font-bold text-white">{user?.name || user?.email}</h3>
                        <p className="text-[13px] text-slate-300">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isAdmin && (
                        <button onClick={() => navigate("admin")} className="px-4 py-2 rounded-md bg-white/10 backdrop-blur border border-white/20 text-white text-[13px] font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4" /> Admin
                        </button>
                      )}
                      <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-white/10 backdrop-blur border border-white/20 text-white text-[13px] font-semibold hover:bg-rose-500/30 hover:border-rose-400/30 transition-all flex items-center gap-2">
                        <LogOut className="w-4 h-4" /> Déconnexion
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar + content */}
                <div className="grid lg:grid-cols-[220px_1fr] gap-6">
                  {/* Sidebar */}
                  <aside className="space-y-1">
                    {[
                      { key: "dashboard", icon: LayoutDashboard, label: t("member.dashboard") },
                      { key: "profile", icon: User, label: t("member.profile") },
                      { key: "formations", icon: BookOpen, label: t("member.trainings") },
                      { key: "certificates", icon: Award, label: t("member.certificates") },
                      { key: "messages", icon: MessageSquare, label: t("member.messages") },
                      { key: "history", icon: History, label: t("member.history") },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isActive = view === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => setView(item.key as any)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all w-full ${isActive ? "bg-[#003366] text-white shadow-premium" : "text-[#5C6573] hover:bg-[#F4F6F9]"}`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                          {item.key === "messages" && dashboard?.stats.unreadMessages ? (
                            <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">{dashboard.stats.unreadMessages}</span>
                          ) : null}
                        </button>
                      );
                    })}
                  </aside>

                  {/* Content */}
                  <div className="min-h-[400px]">
                    {view === "dashboard" && dashboard && (
                      <div className="space-y-6">
                        {/* Stats grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { label: "Formations actives", value: dashboard.stats.activeFormations, icon: BookOpen, color: "from-emerald-500 to-teal-600" },
                            { label: "Certificats", value: dashboard.stats.totalCertificates, icon: Award, color: "from-[#FFD700] to-[#FFC107]" },
                            { label: "Messages non lus", value: dashboard.stats.unreadMessages, icon: MessageSquare, color: "from-rose-500 to-pink-600" },
                            { label: "Dons cumulés", value: `${dashboard.stats.totalDonated}€`, icon: Icons.Heart, color: "from-[#003366] to-[#1E3A5F]" },
                          ].map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                              <div key={i} className="bg-white rounded-xl p-4 border border-[#E8ECF1] shadow-premium">
                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-xl font-display font-bold text-[#003366] tabular-nums">{stat.value}</div>
                                <div className="text-[10px] text-[#5C6573] uppercase tracking-wider">{stat.label}</div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Recent activity */}
                        <div className="bg-white rounded-xl p-6 border border-[#E8ECF1] shadow-premium">
                          <h4 className="font-display font-bold text-[#003366] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Bell className="w-4 h-4 text-[#FFD700]" /> Activité récente
                          </h4>
                          <div className="space-y-2">
                            {dashboard.registrations.slice(0, 3).map((reg: any) => (
                              <div key={reg.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#F4F6F9]/50">
                                <BookOpen className="w-4 h-4 text-[#003366]" />
                                <div className="flex-1">
                                  <p className="text-[13px] text-[#003366] font-medium">
                                    {reg.formation?.titleFr || reg.program?.titleFr || reg.event?.titleFr || "Formation"}
                                  </p>
                                  <p className="text-[11px] text-[#5C6573]">
                                    Statut : <span className="font-semibold">{reg.status}</span> · {new Date(reg.createdAt).toLocaleDateString("fr-FR")}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {dashboard.messages.slice(0, 2).map((msg: any) => (
                              <div key={msg.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#F4F6F9]/50">
                                <MessageSquare className="w-4 h-4 text-[#003366]" />
                                <div className="flex-1">
                                  <p className="text-[13px] text-[#003366] font-medium">{msg.subject}</p>
                                  <p className="text-[11px] text-[#5C6573]">De : {msg.sender?.name || msg.sender?.email}</p>
                                </div>
                                {!msg.read && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                              </div>
                            ))}
                            {dashboard.registrations.length === 0 && dashboard.messages.length === 0 && (
                              <p className="text-[13px] text-[#5C6573] text-center py-6">Aucune activité récente pour le moment.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {view === "profile" && dashboard?.user && (
                      <ProfileEditor user={dashboard.user} editing={editingProfile} setEditing={setEditingProfile} />
                    )}

                    {view === "formations" && dashboard && (
                      <div className="space-y-3">
                        {dashboard.registrations.filter((r: any) => r.type === "FORMATION").length === 0 ? (
                          <EmptyState icon={BookOpen} text="Aucune formation pour le moment." cta="Découvrir les formations" onClick={() => navigate("formations")} />
                        ) : (
                          dashboard.registrations.filter((r: any) => r.type === "FORMATION").map((reg: any) => (
                            <div key={reg.id} className="bg-white rounded-xl p-4 border border-[#E8ECF1] shadow-premium flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#003366] to-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-display font-semibold text-[#003366] text-sm">{reg.formation?.titleFr}</h4>
                                <p className="text-[11px] text-[#5C6573]">Inscrit le {new Date(reg.createdAt).toLocaleDateString("fr-FR")}</p>
                              </div>
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                reg.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700" :
                                reg.status === "IN_PROGRESS" ? "bg-[#FFF8DC] text-[#B8860B]" :
                                "bg-slate-100 text-slate-600"
                              }`}>{reg.status}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {view === "certificates" && dashboard && (
                      <div className="space-y-3">
                        {dashboard.certificates.length === 0 ? (
                          <EmptyState icon={Award} text="Aucun certificat obtenu pour le moment." cta="Voir les formations" onClick={() => navigate("formations")} />
                        ) : (
                          dashboard.certificates.map((cert: any) => (
                            <div key={cert.id} className="bg-white rounded-xl p-5 border border-[#E8ECF1] shadow-premium flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFC107] flex items-center justify-center flex-shrink-0">
                                <Award className="w-6 h-6 text-[#0A1929]" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-display font-semibold text-[#003366] text-sm">{cert.title}</h4>
                                <p className="text-[11px] text-[#5C6573]">Délivré le {new Date(cert.issueDate).toLocaleDateString("fr-FR")}</p>
                              </div>
                              <button className="px-3 py-1.5 rounded-md bg-[#003366] text-white text-[12px] font-semibold hover:bg-[#1E3A5F] transition-all flex items-center gap-1.5">
                                <Icons.Download className="w-3.5 h-3.5" /> Télécharger
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {view === "messages" && dashboard && (
                      <div className="space-y-3">
                        {dashboard.messages.length === 0 ? (
                          <EmptyState icon={MessageSquare} text="Aucun message pour le moment." cta="" onClick={() => {}} />
                        ) : (
                          dashboard.messages.map((msg: any) => (
                            <div key={msg.id} className={`bg-white rounded-xl p-4 border shadow-premium ${!msg.read ? "border-[#FFD700]/40" : "border-[#E8ECF1]"}`}>
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div>
                                  <h4 className="font-display font-semibold text-[#003366] text-sm">{msg.subject}</h4>
                                  <p className="text-[11px] text-[#5C6573]">De : {msg.sender?.name || msg.sender?.email}</p>
                                </div>
                                <span className="text-[10px] text-[#5C6573]">{new Date(msg.createdAt).toLocaleDateString("fr-FR")}</span>
                              </div>
                              <p className="text-[13px] text-[#5C6573] leading-relaxed whitespace-pre-line">{msg.content}</p>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {view === "history" && dashboard && (
                      <div className="space-y-3">
                        {dashboard.orders.length === 0 && dashboard.donations.length === 0 ? (
                          <EmptyState icon={History} text="Aucun historique pour le moment." cta="" onClick={() => {}} />
                        ) : (
                          <>
                            {dashboard.orders.map((order: any) => (
                              <div key={order.id} className="bg-white rounded-xl p-4 border border-[#E8ECF1] shadow-premium flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#003366] to-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                                  <Icons.ShoppingBag className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-display font-semibold text-[#003366] text-sm">Commande {order.orderNumber}</h4>
                                  <p className="text-[11px] text-[#5C6573]">{order.items.length} article(s) · {new Date(order.createdAt).toLocaleDateString("fr-FR")}</p>
                                </div>
                                <span className="font-display font-bold text-[#003366]">{new Intl.NumberFormat("fr-FR").format(order.totalAmount)} GNF</span>
                              </div>
                            ))}
                            {dashboard.donations.map((don: any) => (
                              <div key={don.id} className="bg-white rounded-xl p-4 border border-[#E8ECF1] shadow-premium flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFC107] flex items-center justify-center flex-shrink-0">
                                  <Icons.Heart className="w-5 h-5 text-[#0A1929]" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-display font-semibold text-[#003366] text-sm">Don {don.mode === "MONTHLY" ? "mensuel" : "unique"}</h4>
                                  <p className="text-[11px] text-[#5C6573]">{new Date(don.createdAt).toLocaleDateString("fr-FR")}</p>
                                </div>
                                <span className="font-display font-bold text-[#003366]">{don.amount}€</span>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function EmptyState({ icon: Icon, text, cta, onClick }: { icon: any; text: string; cta: string; onClick: () => void }) {
  return (
    <div className="bg-white rounded-xl p-10 border border-[#E8ECF1] shadow-premium text-center">
      <Icon className="w-10 h-10 text-[#5C6573]/40 mx-auto mb-3" />
      <p className="text-[13px] text-[#5C6573] mb-4">{text}</p>
      {cta && (
        <button onClick={onClick} className="btn-outline-shine px-5 py-2 rounded-md text-[12px] font-semibold">{cta}</button>
      )}
    </div>
  );
}

function ProfileEditor({ user, editing, setEditing }: { user: any; editing: boolean; setEditing: (v: boolean) => void }) {
  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    country: user.country || "",
    bio: user.profile?.bio || "",
    occupation: user.profile?.occupation || "",
    skills: user.profile?.skills ? JSON.parse(user.profile.skills).join(", ") : "",
    languages: user.profile?.languages ? JSON.parse(user.profile.languages).join(", ") : "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          country: form.country,
          bio: form.bio,
          occupation: form.occupation,
          skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
          languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        toast.success("Profil mis à jour !");
        setEditing(false);
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    } catch {
      toast.error("Erreur réseau");
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-[#E8ECF1] shadow-premium">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-[#003366] text-sm uppercase tracking-wider">Mon profil</h3>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="text-[12px] font-semibold text-[#003366] hover:underline flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5" /> Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="text-[12px] font-semibold text-[#5C6573] hover:underline flex items-center gap-1.5">
              <X className="w-3.5 h-3.5" /> Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="text-[12px] font-semibold text-[#FFD700] hover:underline flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" /> {saving ? "..." : "Enregistrer"}
            </button>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nom complet" value={form.name} onChange={(v) => setForm({ ...form, name: v })} editing={editing} />
        <Field label="Email" value={user.email} editing={false} />
        <Field label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} editing={editing} />
        <Field label="Pays" value={form.country} onChange={(v) => setForm({ ...form, country: v })} editing={editing} />
        <Field label="Occupation" value={form.occupation} onChange={(v) => setForm({ ...form, occupation: v })} editing={editing} />
        <Field label="Compétences (séparées par virgules)" value={form.skills} onChange={(v) => setForm({ ...form, skills: v })} editing={editing} />
        <Field label="Langues (séparées par virgules)" value={form.languages} onChange={(v) => setForm({ ...form, languages: v })} editing={editing} />
        <div className="sm:col-span-2">
          <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">Bio</label>
          {editing ? (
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="input-shine rounded-md px-3 py-2 text-sm w-full resize-none" />
          ) : (
            <p className="text-[13px] text-[#003366] min-h-[2.5rem]">{form.bio || "—"}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, editing }: { label: string; value: string; onChange?: (v: string) => void; editing: boolean }) {
  return (
    <div>
      <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{label}</label>
      {editing && onChange ? (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="input-shine rounded-md px-3 py-2 text-sm w-full" />
      ) : (
        <p className="text-[13px] text-[#003366] min-h-[2.5rem]">{value || "—"}</p>
      )}
    </div>
  );
}
