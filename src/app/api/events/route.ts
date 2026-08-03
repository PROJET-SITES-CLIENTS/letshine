import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformEvent } from "@/lib/transformers";

export async function GET() {
  try {
    const items = await db.event.findMany({
      orderBy: { date: "asc" },
    });
    return NextResponse.json({ events: items.map(transformEvent) });
  } catch (e) {
    console.error("[EVENTS_ERROR]", e);
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
    const event = await db.event.create({
      data: {
        slug: body.slug || body.id,
        type: body.type || "webinar",
        image: body.image,
        titleFr: body.title?.fr || body.titleFr || "",
        titleEn: body.title?.en || body.titleEn || "",
        titleEs: body.title?.es || body.titleEs || "",
        date: body.date ? new Date(body.date) : new Date(),
        time: body.time || "",
        locationFr: body.location?.fr || body.locationFr || "",
        locationEn: body.location?.en || body.locationEn || "",
        locationEs: body.location?.es || body.locationEs || "",
        mode: body.mode || "online",
        price: Number(body.price ?? 0),
        seats: Number(body.seats ?? 0),
        registered: Number(body.registered ?? 0),
        descFr: body.description?.fr || body.descFr || "",
        descEn: body.description?.en || body.descEn || "",
        descEs: body.description?.es || body.descEs || "",
        organizerId:
          body.organizerId || (session.user as any).id || null,
      },
    });

    return NextResponse.json(
      { event: transformEvent(event) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[EVENT_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
