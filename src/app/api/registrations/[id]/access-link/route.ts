import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// POST /api/registrations/[id]/access-link
// Generates (or returns the existing) personal access URL for a registration.
// The token is a long random string; the URL is /api/access/{token} which can
// be validated by a future access endpoint. We store both on the Registration
// row so the link is stable across sessions and can be re-sent by email.
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    const userId = (session.user as any).id as string;
    const { id } = await params;

    const registration = await db.registration.findUnique({ where: { id } });
    if (!registration) {
      return NextResponse.json(
        { error: "Inscription introuvable" },
        { status: 404 }
      );
    }

    // Only the owner (or an admin) may generate an access link for this registration.
    if (registration.userId !== userId && (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    // Reuse the existing token if we already generated one — keeps the link stable
    // so it can be shared/bookmarked without invalidating previous emails.
    let accessToken = registration.accessToken;
    if (!accessToken) {
      accessToken = generateToken();
    }

    const origin =
      typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_URL
        ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
        : "";

    // When NEXT_PUBLIC_APP_URL is not set we fall back to a relative path. The
    // frontend can still display the link (it will resolve against the current
    // origin at runtime) and copy it to the clipboard.
    const accessUrl = origin
      ? `${origin}/api/access/${accessToken}`
      : `/api/access/${accessToken}`;

    const updated = await db.registration.update({
      where: { id },
      data: { accessToken, accessUrl },
    });

    return NextResponse.json({
      accessUrl: updated.accessUrl ?? accessUrl,
      accessToken: updated.accessToken ?? accessToken,
      registrationId: updated.id,
    });
  } catch (e) {
    console.error("[ACCESS_LINK_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// 32-byte token encoded as base64url (URL-safe, ~43 chars).
function generateToken(): string {
  const bytes = new Uint8Array(32);
  // Use the Web Crypto API when available (Node 18+/Edge). Falls back to a
  // timestamp + random string for very old runtimes.
  const g = globalThis as any;
  if (g?.crypto?.getRandomValues) {
    g.crypto.getRandomValues(bytes);
    const bin = Array.from(bytes, (b: number) => String.fromCharCode(b)).join("");
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 18)}-${Math.random().toString(36).slice(2, 18)}`;
}
