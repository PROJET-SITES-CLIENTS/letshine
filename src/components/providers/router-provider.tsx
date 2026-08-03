"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { PageId } from "@/lib/data";

type RouterContextType = {
  page: PageId;
  params: Record<string, string>;
  navigate: (page: PageId, params?: Record<string, string>) => void;
};

const RouterContext = createContext<RouterContextType>({
  page: "home",
  params: {},
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<PageId>("home");
  const [params, setParams] = useState<Record<string, string>>({});

  const navigate = useCallback((p: PageId, prm: Record<string, string> = {}) => {
    setPage(p);
    setParams(prm);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
      // Update hash for shareability
      const hash = prm && Object.keys(prm).length > 0
        ? `#${p}?${new URLSearchParams(prm).toString()}`
        : `#${p}`;
      window.history.replaceState(null, "", hash);
    }
  }, []);

  // Restore from hash on first load + listen to hashchange (browser back/forward, manual URL change)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const restore = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setPage("home");
        setParams({});
        return;
      }
      const [p, qs] = hash.split("?");
      const validPages: PageId[] = ["home", "about", "programs", "program-detail", "formations", "formation-detail", "shop", "product-detail", "services", "partners", "news", "article-detail", "media", "events", "donate", "member", "contact", "admin"];
      if (validPages.includes(p as PageId)) {
        setPage(p as PageId);
        if (qs) {
          const prm = Object.fromEntries(new URLSearchParams(qs));
          setParams(prm);
        } else {
          setParams({});
        }
      }
    };
    restore();
    window.addEventListener("hashchange", restore);
    return () => window.removeEventListener("hashchange", restore);
  }, []);

  return (
    <RouterContext.Provider value={{ page, params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
