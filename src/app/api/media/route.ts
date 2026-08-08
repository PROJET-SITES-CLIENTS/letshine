import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformMediaItem } from "@/lib/transformers";

export async function GET() {
  try {
    const items = await db.mediaItem.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ mediaItems: items.map(transformMediaItem) });
  } catch (e) {
    console.error("[MEDIA_ERROR]", e);
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
    const slug =
      body.slug ||
      slugify(body.title?.fr || body.titleFr || `media-${Date.now()}`);

    const item = await db.mediaItem.create({
      data: {
        slug,
        type: body.type || "photo",
        titleFr: body.title?.fr ?? body.titleFr ?? "",
        titleEn: body.title?.en ?? body.titleEn ?? "",
        titleEs: body.title?.es ?? body.titleEs ?? "",
        category: body.category ?? "",
        thumb: body.thumb ?? "",
        date: body.date ? new Date(body.date) : new Date(),
      },
    });

    return NextResponse.json(
      { mediaItem: transformMediaItem(item) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[MEDIA_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
