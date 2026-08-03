import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformEvent } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.event.findUnique({
      where: { slug },
    });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ event: transformEvent(item) });
  } catch (e) {
    console.error("[EVENT_ERROR]", e);
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
    const existing = await db.event.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.type) data.type = body.type;
    if (body.image) data.image = body.image;
    if (body.title) {
      data.titleFr = body.title.fr;
      data.titleEn = body.title.en;
      data.titleEs = body.title.es;
    }
    if (body.date !== undefined) data.date = new Date(body.date);
    if (body.time !== undefined) data.time = body.time;
    if (body.location) {
      data.locationFr = body.location.fr;
      data.locationEn = body.location.en;
      data.locationEs = body.location.es;
    }
    if (body.mode !== undefined) data.mode = body.mode;
    if (body.price !== undefined) data.price = Number(body.price);
    if (body.seats !== undefined) data.seats = Number(body.seats);
    if (body.registered !== undefined) data.registered = Number(body.registered);
    if (body.description) {
      data.descFr = body.description.fr;
      data.descEn = body.description.en;
      data.descEs = body.description.es;
    }
    if (body.organizerId !== undefined) data.organizerId = body.organizerId;

    const updated = await db.event.update({ where: { slug }, data });
    return NextResponse.json({ event: transformEvent(updated) });
  } catch (e) {
    console.error("[EVENT_UPDATE_ERROR]", e);
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

    const existing = await db.event.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.event.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[EVENT_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
