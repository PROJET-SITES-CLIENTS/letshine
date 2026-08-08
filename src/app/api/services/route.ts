import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformService } from "@/lib/transformers";

export async function GET() {
  try {
    const items = await db.service.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ services: items.map(transformService) });
  } catch (e) {
    console.error("[SERVICES_ERROR]", e);
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
      slugify(body.title?.fr || body.titleFr || `service-${Date.now()}`);

    const item = await db.service.create({
      data: {
        slug,
        icon: body.icon || "Star",
        image: body.image || "",
        gradient: body.gradient || "from-blue-500 to-indigo-600",
        titleFr: body.title?.fr ?? body.titleFr ?? "",
        titleEn: body.title?.en ?? body.titleEn ?? "",
        titleEs: body.title?.es ?? body.titleEs ?? "",
        descFr: body.description?.fr ?? body.descFr ?? "",
        descEn: body.description?.en ?? body.descEn ?? "",
        descEs: body.description?.es ?? body.descEs ?? "",
        features: JSON.stringify(body.features?.fr || body.features || []),
      },
    });

    return NextResponse.json(
      { service: transformService(item) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[SERVICE_CREATE_ERROR]", e);
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
