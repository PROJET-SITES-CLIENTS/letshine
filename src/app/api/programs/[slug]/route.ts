import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformProgram } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.program.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ program: transformProgram(item) });
  } catch (e) {
    console.error("[PROGRAM_ERROR]", e);
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
    const existing = await db.program.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.icon) data.icon = body.icon;
    if (body.color) data.color = body.color;
    if (body.gradient) data.gradient = body.gradient;
    if (body.image) data.image = body.image;
    if (body.gallery !== undefined) data.gallery = JSON.stringify(body.gallery);
    if (body.title) {
      data.titleFr = body.title.fr;
      data.titleEn = body.title.en;
      data.titleEs = body.title.es;
    }
    if (body.short) {
      data.shortFr = body.short.fr;
      data.shortEn = body.short.en;
      data.shortEs = body.short.es;
    }
    if (body.description) {
      data.descFr = body.description.fr;
      data.descEn = body.description.en;
      data.descEs = body.description.es;
    }
    if (body.objectives !== undefined) {
      data.objectives = JSON.stringify(body.objectives.fr || body.objectives);
    }
    if (body.target !== undefined) {
      data.target = body.target.fr || body.target;
    }
    if (body.results !== undefined) {
      data.results = JSON.stringify(body.results.fr || body.results);
    }
    if (body.duration !== undefined) data.duration = body.duration;

    const updated = await db.program.update({ where: { slug }, data });
    return NextResponse.json({ program: transformProgram(updated) });
  } catch (e) {
    console.error("[PROGRAM_UPDATE_ERROR]", e);
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

    const existing = await db.program.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.program.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[PROGRAM_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
