import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformMediaItem } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.mediaItem.findUnique({ where: { slug } });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ mediaItem: transformMediaItem(item) });
  } catch (e) {
    console.error("[MEDIA_ITEM_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: paramSlug } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const body = await req.json();
    const existing = await db.mediaItem.findUnique({
      where: { slug: paramSlug },
    });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    data.type = body.type ?? existing.type;
    data.titleFr = body.title?.fr ?? body.titleFr ?? existing.titleFr;
    data.titleEn = body.title?.en ?? body.titleEn ?? existing.titleEn;
    data.titleEs = body.title?.es ?? body.titleEs ?? existing.titleEs;
    data.category = body.category ?? existing.category;
    data.thumb = body.thumb ?? existing.thumb;
    if (body.date !== undefined) data.date = new Date(body.date);

    const updated = await db.mediaItem.update({
      where: { slug: paramSlug },
      data,
    });
    return NextResponse.json({ mediaItem: transformMediaItem(updated) });
  } catch (e) {
    console.error("[MEDIA_ITEM_UPDATE_ERROR]", e);
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

    const existing = await db.mediaItem.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.mediaItem.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[MEDIA_ITEM_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
