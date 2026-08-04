import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    const registrations = await db.registration.findMany({
      include: {
        user: { select: { name: true, email: true } },
        program: { select: { titleFr: true } },
        formation: { select: { titleFr: true } },
        event: { select: { titleFr: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ registrations });
  } catch (e) {
    console.error("[ADMIN_REGISTRATIONS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
