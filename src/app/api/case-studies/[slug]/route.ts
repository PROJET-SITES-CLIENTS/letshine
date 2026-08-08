import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformCaseStudy } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.caseStudy.findUnique({ where: { slug } });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ caseStudy: transformCaseStudy(item) });
  } catch (e) {
    console.error("[CASE_STUDY_ERROR]", e);
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
    const existing = await db.caseStudy.findUnique({
      where: { slug: paramSlug },
    });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    data.titleFr = body.title?.fr ?? body.titleFr ?? existing.titleFr;
    data.titleEn = body.title?.en ?? body.titleEn ?? existing.titleEn;
    data.titleEs = body.title?.es ?? body.titleEs ?? existing.titleEs;
    data.partner = body.partner ?? existing.partner;
    data.result = body.result ?? existing.result;
    data.metric = body.metric ?? existing.metric;
    data.image = body.image ?? existing.image;
    data.descFr = body.description?.fr ?? body.descFr ?? existing.descFr;
    data.descEn = body.description?.en ?? body.descEn ?? existing.descEn;
    data.descEs = body.description?.es ?? body.descEs ?? existing.descEs;

    const updated = await db.caseStudy.update({
      where: { slug: paramSlug },
      data,
    });
    return NextResponse.json({ caseStudy: transformCaseStudy(updated) });
  } catch (e) {
    console.error("[CASE_STUDY_UPDATE_ERROR]", e);
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

    const existing = await db.caseStudy.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.caseStudy.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[CASE_STUDY_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
