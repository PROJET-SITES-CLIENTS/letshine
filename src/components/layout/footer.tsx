"use client";

import { Facebook, Linkedin, Instagram, Youtube, Music2, Twitter, Send, ArrowUp, MapPin, Phone, Mail } from "lucide-react";
import { LetsShineLogo } from "./logo";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { navItems, type PageId } from "@/lib/data";
import { toast } from "sonner";
import { useState } from "react";

export function Footer() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const [subscribing, setSubscribing] = useState(false);

  const socials = [
    { name: "Facebook", icon: Facebook },
    { name: "LinkedIn", icon: Linkedin },
    { name: "Instagram", icon: Instagram },
    { name: "YouTube", icon: Youtube },
    { name: "TikTok", icon: Music2 },
    { name: "X", icon: Twitter },
  ];

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || "Inscription réussie !");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Erreur");
      }
    } catch {
      toast.error("Erreur réseau");
    }
    setSubscribing(false);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden bg-[#0A1929] text-slate-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80rem] h-[40rem] bg-gradient-to-b from-[#FFD700]/6 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12 mb-14">
          {/* Brand */}
          <div>
            <LetsShineLogo size={36} withSlogan variant="dark" />
            <p className="text-[13px] text-slate-400 leading-relaxed mt-6 mb-6 max-w-xs font-light">
              {t("footer.about")}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[12px] text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#FFC107]" />
                Avenue de la République, Conakry, Guinea
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-400">
                <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
                +224 622 33 44 55
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-400">
                <Mail className="w-3.5 h-3.5 text-[#FFC107]" />
                contact@letsshine.africa
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-display font-semibold text-white text-[11px] uppercase tracking-[0.2em] mb-5">{t("footer.links")}</h4>
            <ul className="space-y-2.5">
              {navItems.slice(0, 6).map((n) => (
                <li key={n.id}>
                  <button onClick={() => navigate(n.id as PageId)} className="text-[13px] text-slate-400 hover:text-[#FFC107] transition-colors duration-300 link-underline">
                    {t(n.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-[11px] uppercase tracking-[0.2em] mb-5">{t("footer.programs")}</h4>
            <ul className="space-y-2.5">
              {navItems.slice(6).map((n) => (
                <li key={n.id}>
                  <button onClick={() => navigate(n.id as PageId)} className="text-[13px] text-slate-400 hover:text-[#FFC107] transition-colors duration-300 link-underline">
                    {t(n.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-white text-[11px] uppercase tracking-[0.2em] mb-3">{t("footer.newsletter")}</h4>
            <p className="text-[13px] text-slate-400 leading-relaxed mb-5 font-light">{t("footer.newsletter.text")}</p>
            <form onSubmit={handleNewsletter} className="flex gap-2 mb-6">
              <input
                type="email"
                name="email"
                required
                placeholder="vous@email.com"
                className="input-dark rounded-md px-3.5 py-2.5 text-[13px] flex-1"
              />
              <button type="submit" disabled={subscribing} className="btn-gold px-3.5 rounded-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-3 font-medium">{t("contact.follow")}</p>
            <div className="flex flex-wrap gap-1.5">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.name}
                    className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-[#FFC107] hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5 transition-all duration-300"
                    aria-label={s.name}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-500">
            <span>© {new Date().getFullYear()} LET'S SHINE. {t("footer.rights")}</span>
            <button className="hover:text-[#FFC107] transition-colors">{t("footer.terms")}</button>
            <button className="hover:text-[#FFC107] transition-colors">{t("footer.privacy")}</button>
            <button className="hover:text-[#FFC107] transition-colors">{t("footer.cookies")}</button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500 italic font-light">{t("footer.madeWith")}</span>
            <button
              onClick={scrollTop}
              className="w-9 h-9 rounded-md bg-gradient-to-br from-[#FFD700] to-[#FFC107] text-white flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-gold"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
