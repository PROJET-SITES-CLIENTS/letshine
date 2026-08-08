import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformCaseStudy } from "@/lib/transformers";

export async function GET() {
  try {
    const items = await db.caseStudy.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ caseStudies: items.map(transformCaseStudy) });
  } catch (e) {
    console.error("[CASE_STUDIES_ERROR]", e);
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
      slugify(body.title?.fr || body.titleFr || `case-${Date.now()}`).slice(0, 50);

    const item = await db.caseStudy.create({
      data: {
        slug,
        titleFr: body.title?.fr ?? body.titleFr ?? "",
        titleEn: body.title?.en ?? body.titleEn ?? "",
        titleEs: body.title?.es ?? body.titleEs ?? "",
        partner: body.partner ?? "",
        result: body.result ?? "",
        metric: body.metric ?? "",
        image: body.image ?? "",
        descFr: body.description?.fr ?? body.descFr ?? "",
        descEn: body.description?.en ?? body.descEn ?? "",
        descEs: body.description?.es ?? body.descEs ?? "",
      },
    });

    return NextResponse.json(
      { caseStudy: transformCaseStudy(item) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[CASE_STUDY_CREATE_ERROR]", e);
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
