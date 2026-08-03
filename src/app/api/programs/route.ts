import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const programs = await db.program.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ programs });
  } catch (e) {
    console.error("[PROGRAMS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
