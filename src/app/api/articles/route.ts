import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformArticle } from "@/lib/transformers";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");

    const where: any = { published: true };
    if (tag) {
      where.tag = tag;
    }

    const items = await db.article.findMany({
      where,
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ articles: items.map(transformArticle) });
  } catch (e) {
    console.error("[ARTICLES_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const body = await req.json();
    const article = await db.article.create({
      data: {
        slug: body.slug || body.id,
        categoryFr: body.category?.fr || body.categoryFr || "",
        categoryEn: body.category?.en || body.categoryEn || "",
        categoryEs: body.category?.es || body.categoryEs || "",
        titleFr: body.title?.fr || body.titleFr || "",
        titleEn: body.title?.en || body.titleEn || "",
        titleEs: body.title?.es || body.titleEs || "",
        excerptFr: body.excerpt?.fr || body.excerptFr || "",
        excerptEn: body.excerpt?.en || body.excerptEn || "",
        excerptEs: body.excerpt?.es || body.excerptEs || "",
        contentFr: body.content?.fr || body.contentFr || "",
        contentEn: body.content?.en || body.contentEn || "",
        contentEs: body.content?.es || body.contentEs || "",
        date: body.date ? new Date(body.date) : new Date(),
        readTime: Number(body.readTime ?? 5),
        authorId: body.authorId || (session.user as any).id || null,
        authorName: body.author || body.authorName || session.user?.name || "Rédaction",
        authorRoleFr: body.authorRole?.fr || body.authorRoleFr || "",
        authorRoleEn: body.authorRole?.en || body.authorRoleEn || "",
        authorRoleEs: body.authorRole?.es || body.authorRoleEs || "",
        tag: body.tag || "blog",
        image: body.image,
        published: body.published !== undefined ? Boolean(body.published) : true,
      },
    });

    return NextResponse.json(
      { article: transformArticle(article) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[ARTICLE_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
