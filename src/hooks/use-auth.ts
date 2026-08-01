"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback } from "react";

type LoginResult = { ok: boolean; error: string | null };

type RegisterData = {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  country?: string;
};

export function useAuth() {
  const { data: session, status, update } = useSession();
  const user = session?.user as
    | { id?: string; email?: string; name?: string | null; role?: string }
    | undefined;

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (res?.error) return { ok: false, error: res.error };
        await update?.();
        return { ok: true, error: null };
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Erreur de connexion";
        return { ok: false, error: message };
      }
    },
    [update],
  );

  const register = useCallback(
    async (data: RegisterData): Promise<LoginResult> => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) {
          return { ok: false, error: json?.error || "Erreur à l'inscription" };
        }
        // Auto-login after successful registration
        const loginRes = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (loginRes?.error) {
          return { ok: false, error: loginRes.error };
        }
        await update?.();
        return { ok: true, error: null };
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Erreur réseau";
        return { ok: false, error: message };
      }
    },
    [update],
  );

  const logout = useCallback(async (): Promise<void> => {
    // Custom logout endpoint that reliably clears HttpOnly cookies
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // ignore
    }
    // Force full page reload to clear all cached session state
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);

  const refresh = useCallback(async () => {
    await update?.();
  }, [update]);

  return {
    user: user ?? null,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isAdmin: user?.role === "ADMIN",
    login,
    register,
    logout,
    refresh,
  };
}
