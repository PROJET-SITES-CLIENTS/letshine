"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, Heart, User, ShoppingCart } from "lucide-react";
import { LetsShineLogo } from "./logo";
import { useLanguage } from "@/components/providers/language-provider";
import { useRouter } from "@/components/providers/router-provider";
import { LANGUAGES, type Language } from "@/lib/i18n";
import { navItems, type PageId } from "@/lib/data";
import { useCart } from "@/hooks/use-cart";

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { page, navigate } = useRouter();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleNav = navItems.slice(0, 7);
  const hiddenNav = navItems.slice(7);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "py-2.5 bg-white/85 backdrop-blur-xl border-b border-[#E8ECF1]/60"
            : "py-4 bg-white/60 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-4">
            <button onClick={() => navigate("home")} className="flex-shrink-0">
              <LetsShineLogo size={36} animated={!scrolled} variant="light" />
            </button>

            {/* Desktop nav */}
            <div className="hidden xl:flex items-center gap-1">
              {visibleNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as PageId)}
                  className={`relative px-3.5 py-2 text-[13px] font-medium tracking-tight transition-all duration-300 group ${
                    page === item.id
                      ? "text-[#003366]"
                      : "text-[#5C6573] hover:text-[#003366]"
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-px bg-[#FFD700] transition-all duration-400 ${
                      page === item.id ? "w-5" : "w-0 group-hover:w-3"
                    }`}
                  />
                </button>
              ))}

              {hiddenNav.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setMoreOpen(!moreOpen)}
                    className="relative flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium tracking-tight text-[#5C6573] hover:text-[#003366] transition-all duration-300 group"
                  >
                    Plus
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {moreOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-[#E8ECF1] overflow-hidden z-20 shadow-premium-lg flex flex-col py-1.5"
                        >
                          {hiddenNav.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                navigate(item.id as PageId);
                                setMoreOpen(false);
                              }}
                              className={`text-left px-4 py-2.5 text-[13px] transition-all ${
                                page === item.id
                                  ? "bg-[#FFF8DC]/50 text-[#003366] font-semibold"
                                  : "text-[#5C6573] hover:bg-[#F4F6F9]/60 hover:text-[#003366]"
                              }`}
                            >
                              {t(item.key)}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-md text-[13px] font-medium text-[#5C6573] hover:text-[#003366] hover:bg-[#F4F6F9]/60 transition-all"
                  aria-label="Language"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline uppercase font-semibold text-[11px] tracking-wider">{lang}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-[#E8ECF1] overflow-hidden z-20 shadow-premium-lg"
                      >
                        {LANGUAGES.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => {
                              setLang(l.code as Language);
                              setLangOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-2.5 text-[13px] transition-all ${
                              lang === l.code
                                ? "bg-[#FFF8DC]/50 text-[#003366] font-semibold"
                                : "text-[#5C6573] hover:bg-[#F4F6F9]/60"
                            }`}
                          >
                            <span className="text-base">{l.flag}</span>
                            <span>{l.label}</span>
                            {lang === l.code && (
                              <span className="ml-auto w-1 h-1 rounded-full bg-[#FFD700]" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:block w-px h-5 bg-[#E8ECF1] mx-1" />

              {/* Cart */}
              <button
                onClick={() => navigate("checkout")}
                className="relative flex items-center gap-1.5 px-2.5 py-2 rounded-md text-[13px] font-medium text-[#5C6573] hover:text-[#003366] hover:bg-[#F4F6F9]/60 transition-all"
                aria-label="Panier"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold text-[12px]">
                  Panier
                </span>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FFD700] text-[#003366] text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </button>

              {/* Donate CTA */}
              <button
                onClick={() => navigate("donate")}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-md btn-gold text-[13px] font-semibold"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>{t("nav.donate")}</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden p-2 rounded-md text-[#003366] hover:bg-[#F4F6F9]/60 transition-all"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
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
              className="fixed inset-0 z-[110] bg-[#003366]/30 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-[85%] max-w-sm xl:hidden bg-white border-l border-[#E8ECF1] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#E8ECF1]/60">
                <LetsShineLogo size={34} variant="light" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md text-[#5C6573] hover:bg-[#F4F6F9]/60"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-0.5">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.025 }}
                    onClick={() => { navigate(item.id as PageId); setMobileOpen(false); }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-left text-[14px] font-medium transition-all ${
                      page === item.id
                        ? "bg-[#FFF8DC]/40 text-[#003366]"
                        : "text-[#5C6573] hover:bg-[#F4F6F9]/40 hover:text-[#003366]"
                    }`}
                  >
                    <span>{t(item.key)}</span>
                    <span className="text-[10px] text-[#FFD700] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  </motion.button>
                ))}

                <div className="h-px bg-[#E8ECF1]/60 my-4" />

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => { navigate("checkout"); setMobileOpen(false); }}
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#E8ECF1] text-[14px] font-semibold text-[#003366] hover:bg-[#F4F6F9]/40 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Panier
                    </span>
                    {count > 0 && (
                      <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#FFD700] text-[#003366] text-[11px] font-bold flex items-center justify-center">
                        {count > 99 ? "99+" : count}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => { navigate("donate"); setMobileOpen(false); }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg btn-gold text-[13px] font-semibold"
                  >
                    <Heart className="w-4 h-4" />
                    {t("nav.donate")}
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
