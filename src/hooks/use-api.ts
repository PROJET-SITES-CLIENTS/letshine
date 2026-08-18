"use client";

import { useState, useEffect, useCallback } from "react";

type UseApiResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  mutate: () => Promise<void>;
};

export function useApi<T>(url: string, options?: { skip?: boolean }): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!options?.skip);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (options?.skip) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("HTTP " + res.status);
      }
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, [url, options?.skip]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh, mutate: refresh };
}

// Convenience hook for single-item fetch (by slug/id)
export function useApiItem<T>(url: string | null): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!url) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) {
          setData(null);
        } else {
          throw new Error("HTTP " + res.status);
        }
      } else {
        const json = await res.json();
        setData(json);
      }
    } catch (e: any) {
      setError(e.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh, mutate: refresh };
}
