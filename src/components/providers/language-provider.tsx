"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations, type Language } from "@/lib/i18n";

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("ls-lang") : null;
    if (stored && ["fr", "en", "es"].includes(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored as Language);
    }
  }, []);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("ls-lang", l);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[lang]?.[key] ?? translations.fr[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
