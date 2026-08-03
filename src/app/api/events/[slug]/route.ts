import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const event = await db.event.findUnique({
      where: { slug },
    });
    if (!event) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ event });
  } catch (e) {
    console.error("[EVENT_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
