import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformFormation } from "@/lib/transformers";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const popular = searchParams.get("popular");

    const where: any = {};
    if (category) {
      where.categoryFr = { contains: category };
    }
    if (popular === "true") {
      where.popular = true;
    }

    const items = await db.formation.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ formations: items.map(transformFormation) });
  } catch (e) {
    console.error("[FORMATIONS_ERROR]", e);
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
    const formation = await db.formation.create({
      data: {
        slug: body.slug || body.id,
        icon: body.icon || "GraduationCap",
        image: body.image,
        categoryFr: body.category?.fr || body.categoryFr || "",
        categoryEn: body.category?.en || body.categoryEn || "",
        categoryEs: body.category?.es || body.categoryEs || "",
        titleFr: body.title?.fr || body.titleFr || "",
        titleEn: body.title?.en || body.titleEn || "",
        titleEs: body.title?.es || body.titleEs || "",
        descFr: body.description?.fr || body.descFr || "",
        descEn: body.description?.en || body.descEn || "",
        descEs: body.description?.es || body.descEs || "",
        durationFr: body.duration?.fr || body.durationFr || "",
        durationEn: body.duration?.en || body.durationEn || "",
        durationEs: body.duration?.es || body.durationEs || "",
        level: body.level || "Tous niveaux",
        mode: JSON.stringify(body.mode || []),
        price: Number(body.price ?? 0),
        rating: Number(body.rating ?? 0),
        students: Number(body.students ?? 0),
        program: JSON.stringify(body.program?.fr || body.program || []),
        certificate: body.certificate !== undefined ? Boolean(body.certificate) : true,
        popular: body.popular !== undefined ? Boolean(body.popular) : false,
      },
    });

    return NextResponse.json(
      { formation: transformFormation(formation) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[FORMATION_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
