import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const program = await db.program.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });
    if (!program) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ program });
  } catch (e) {
    console.error("[PROGRAM_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
