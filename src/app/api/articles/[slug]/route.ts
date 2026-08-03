import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const article = await db.article.findUnique({
      where: {
        slug,
        published: true,
      },
    });
    if (!article) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ article });
  } catch (e) {
    console.error("[ARTICLE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
