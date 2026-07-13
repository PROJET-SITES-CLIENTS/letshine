"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Facebook, Linkedin, Instagram, Youtube, Music2, Twitter, Send, ArrowUp, MapPin, Phone, Mail } from "lucide-react";
import { LetsShineLogo } from "./logo";
import { useLanguage } from "@/components/providers/language-provider";
import { navItems } from "@/lib/data";
import { toast } from "sonner";

export function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const socials = [
    { name: "Facebook", icon: Facebook },
    { name: "LinkedIn", icon: Linkedin },
    { name: "Instagram", icon: Instagram },
    { name: "YouTube", icon: Youtube },
    { name: "TikTok", icon: Music2 },
    { name: "X", icon: Twitter },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inscription à la newsletter réussie !");
    (e.target as HTMLFormElement).reset();
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden bg-[#070b16] border-t border-yellow-400/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80rem] h-[40rem] bg-gradient-to-b from-yellow-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Top: brand + newsletter */}
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-10 mb-14">
          {/* Brand */}
          <div>
            <LetsShineLogo size={48} withSlogan />
            <p className="text-sm text-slate-400 leading-relaxed mt-5 mb-6 max-w-xs">
              {t("footer.about")}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                Avenue de la République, Conakry, Guinea
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Phone className="w-3.5 h-3.5 text-yellow-400" />
                +224 622 33 44 55
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="w-3.5 h-3.5 text-yellow-400" />
                contact@letsshine.africa
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-5">{t("footer.links")}</h4>
            <ul className="space-y-2.5">
              {navItems.slice(0, 6).map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)} className="text-sm text-slate-400 hover:text-yellow-300 transition-colors link-underline">
                    {t(n.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-5">{t("footer.programs")}</h4>
            <ul className="space-y-2.5">
              {navItems.slice(6).map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)} className="text-sm text-slate-400 hover:text-yellow-300 transition-colors link-underline">
                    {t(n.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-3">{t("footer.newsletter")}</h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{t("footer.newsletter.text")}</p>
            <form onSubmit={handleNewsletter} className="flex gap-2 mb-6">
              <input
                type="email"
                required
                placeholder="vous@email.com"
                className="input-shine rounded-xl px-4 py-2.5 text-sm flex-1"
              />
              <button type="submit" className="btn-shine px-4 rounded-xl font-bold flex items-center justify-center">
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Socials */}
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-3 font-medium">{t("contact.follow")}</p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.name}
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-all"
                    aria-label={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent mb-8" />

        {/* Bottom: legal + back to top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} LET'S SHINE. {t("footer.rights")}</span>
            <button className="hover:text-yellow-300 transition-colors">{t("footer.terms")}</button>
            <button className="hover:text-yellow-300 transition-colors">{t("footer.privacy")}</button>
            <button className="hover:text-yellow-300 transition-colors">{t("footer.cookies")}</button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 italic">{t("footer.madeWith")} 💛</span>
            <button
              onClick={scrollTop}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 flex items-center justify-center font-bold hover:scale-110 transition-transform shadow-lg shadow-yellow-400/20"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
