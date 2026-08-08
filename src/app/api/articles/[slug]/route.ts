import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformArticle } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.article.findUnique({
      where: {
        slug,
        published: true,
      },
    });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ article: transformArticle(item) });
  } catch (e) {
    console.error("[ARTICLE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const body = await req.json();
    const existing = await db.article.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.category) {
      data.categoryFr = body.category.fr;
      data.categoryEn = body.category.en;
      data.categoryEs = body.category.es;
    }
    if (body.title) {
      data.titleFr = body.title.fr;
      data.titleEn = body.title.en;
      data.titleEs = body.title.es;
    }
    if (body.excerpt) {
      data.excerptFr = body.excerpt.fr;
      data.excerptEn = body.excerpt.en;
      data.excerptEs = body.excerpt.es;
    }
    if (body.content) {
      data.contentFr = body.content.fr;
      data.contentEn = body.content.en;
      data.contentEs = body.content.es;
    }
    if (body.date !== undefined) data.date = new Date(body.date);
    if (body.readTime !== undefined) data.readTime = Number(body.readTime);
    if (body.authorId !== undefined) data.authorId = body.authorId;
    if (body.author !== undefined) data.authorName = body.author;
    if (body.authorName !== undefined) data.authorName = body.authorName;
    if (body.authorRole) {
      data.authorRoleFr = body.authorRole.fr;
      data.authorRoleEn = body.authorRole.en;
      data.authorRoleEs = body.authorRole.es;
    }
    if (body.tag !== undefined) data.tag = body.tag;
    if (body.image !== undefined) data.image = body.image;
    if (body.published !== undefined) data.published = Boolean(body.published);

    const updated = await db.article.update({ where: { slug }, data });
    return NextResponse.json({ article: transformArticle(updated) });
  } catch (e) {
    console.error("[ARTICLE_UPDATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const existing = await db.article.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.article.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[ARTICLE_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
