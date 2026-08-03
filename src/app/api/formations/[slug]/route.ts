import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const formation = await db.formation.findUnique({
      where: { slug },
    });
    if (!formation) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ formation });
  } catch (e) {
    console.error("[FORMATION_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
