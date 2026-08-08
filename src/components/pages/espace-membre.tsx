"use client";

import { useEffect } from "react";
import { useRouter } from "@/components/providers/router-provider";

// The member page is no longer publicly accessible — redirect to admin login
export function EspaceMembrePage() {
  const { navigate } = useRouter();
  useEffect(() => {
    navigate("admin");
  }, [navigate]);
  return null;
}
