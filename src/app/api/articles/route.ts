import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");

    const where: any = { published: true };
    if (tag) {
      where.tag = tag;
    }

    const articles = await db.article.findMany({
      where,
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ articles });
  } catch (e) {
    console.error("[ARTICLES_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
