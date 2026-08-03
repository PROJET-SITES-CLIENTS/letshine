import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    const { id } = await params;
    const body = await req.json();
    const updated = await db.contactMessage.update({
      where: { id },
      data: { handled: body.handled ?? true },
    });
    return NextResponse.json({ message: updated });
  } catch (e) {
    console.error("[ADMIN_MESSAGE_UPDATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
