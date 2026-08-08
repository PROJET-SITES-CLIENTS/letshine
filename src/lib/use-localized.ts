"use client";

import { useLanguage } from "@/components/providers/language-provider";
import type { Locale } from "@/lib/data";

export function useLocalized() {
  const { lang } = useLanguage();
  return lang as Locale;
}

export function useT() {
  const { t } = useLanguage();
  return t;
}
