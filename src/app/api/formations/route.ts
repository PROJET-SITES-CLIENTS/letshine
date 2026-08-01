import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const popular = searchParams.get("popular");

    const where: any = {};
    if (category) {
      where.categoryFr = { contains: category };
    }
    if (popular === "true") {
      where.popular = true;
    }

    const formations = await db.formation.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ formations });
  } catch (e) {
    console.error("[FORMATIONS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
