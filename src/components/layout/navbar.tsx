"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, Heart, User } from "lucide-react";
import { LetsShineLogo } from "./logo";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { LANGUAGES, type Language } from "@/lib/i18n";
import { navItems, type PageId } from "@/lib/data";

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { page, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Limit visible nav items on desktop to avoid overflow
  const visibleNav = navItems.slice(0, 8);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "py-2 bg-white/85 backdrop-blur-xl border-b border-yellow-500/20 shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
            : "py-3 bg-white/70 backdrop-blur-md border-b border-slate-200/50"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between gap-4">
            <button onClick={() => navigate("home")} className="flex-shrink-0">
              <LetsShineLogo size={40} animated={!scrolled} variant="light" />
            </button>

            {/* Desktop nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              {visibleNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as PageId)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    page === item.id
                      ? "text-blue-800"
                      : "text-slate-700 hover:text-blue-800"
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-blue-700 to-yellow-500 transition-all duration-300 ${
                      page === item.id ? "w-6" : "w-0 group-hover:w-4"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-800 transition-all"
                  aria-label="Language"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline uppercase font-semibold">{lang}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-slate-200 overflow-hidden z-20 shadow-premium-lg"
                      >
                        {LANGUAGES.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => {
                              setLang(l.code as Language);
                              setLangOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-all ${
                              lang === l.code
                                ? "bg-yellow-50 text-blue-800 font-semibold"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-base">{l.flag}</span>
                            <span>{l.label}</span>
                            {lang === l.code && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Donate CTA */}
              <button
                onClick={() => navigate("donate")}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg btn-gold text-sm font-bold"
              >
                <Heart className="w-4 h-4" />
                <span>{t("nav.donate")}</span>
              </button>

              {/* Member */}
              <button
                onClick={() => navigate("member")}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white transition-all"
              >
                <User className="w-4 h-4" />
                <span>{t("nav.member")}</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-all"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-[85%] max-w-sm xl:hidden bg-white border-l border-yellow-500/20 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <LetsShineLogo size={36} variant="light" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-5 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.03 }}
                    onClick={() => { navigate(item.id as PageId); setMobileOpen(false); }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all ${
                      page === item.id
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50 text-blue-800 border border-yellow-500/20"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{t(item.key)}</span>
                    <span className="text-xs text-slate-400">0{i + 1}</span>
                  </motion.button>
                ))}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { navigate("donate"); setMobileOpen(false); }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-gold text-sm font-bold"
                  >
                    <Heart className="w-4 h-4" />
                    {t("nav.donate")}
                  </button>
                  <button
                    onClick={() => { navigate("member"); setMobileOpen(false); }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border-2 border-blue-800 text-blue-800"
                  >
                    <User className="w-4 h-4" />
                    {t("nav.member")}
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
