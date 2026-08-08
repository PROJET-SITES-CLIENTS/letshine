import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformFormation } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.formation.findUnique({
      where: { slug },
    });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ formation: transformFormation(item) });
  } catch (e) {
    console.error("[FORMATION_ERROR]", e);
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
    const existing = await db.formation.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.icon) data.icon = body.icon;
    if (body.image) data.image = body.image;
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
    if (body.description) {
      data.descFr = body.description.fr;
      data.descEn = body.description.en;
      data.descEs = body.description.es;
    }
    if (body.duration) {
      data.durationFr = body.duration.fr;
      data.durationEn = body.duration.en;
      data.durationEs = body.duration.es;
    }
    if (body.level !== undefined) data.level = body.level;
    if (body.mode !== undefined) data.mode = JSON.stringify(body.mode);
    if (body.price !== undefined) data.price = Number(body.price);
    if (body.rating !== undefined) data.rating = Number(body.rating);
    if (body.students !== undefined) data.students = Number(body.students);
    if (body.program !== undefined) {
      data.program = JSON.stringify(body.program.fr || body.program);
    }
    if (body.certificate !== undefined) data.certificate = Boolean(body.certificate);
    if (body.popular !== undefined) data.popular = Boolean(body.popular);

    const updated = await db.formation.update({ where: { slug }, data });
    return NextResponse.json({ formation: transformFormation(updated) });
  } catch (e) {
    console.error("[FORMATION_UPDATE_ERROR]", e);
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

    const existing = await db.formation.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.formation.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[FORMATION_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
