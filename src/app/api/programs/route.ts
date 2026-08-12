import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformProgram } from "@/lib/transformers";

export async function GET() {
  try {
    const items = await db.program.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ programs: items.map(transformProgram) });
  } catch (e) {
    console.error("[PROGRAMS_ERROR]", e);
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
    const program = await db.program.create({
      data: {
        slug: body.slug || body.id,
        icon: body.icon || "Sparkles",
        color: body.color || "text-amber-500",
        gradient:
          body.gradient || "from-amber-500 via-yellow-500 to-orange-500",
        image: body.image,
        gallery: JSON.stringify(body.gallery || []),
        titleFr: body.title?.fr || body.titleFr || "",
        titleEn: body.title?.en || body.titleEn || "",
        titleEs: body.title?.es || body.titleEs || "",
        shortFr: body.short?.fr || body.shortFr || "",
        shortEn: body.short?.en || body.shortEn || "",
        shortEs: body.short?.es || body.shortEs || "",
        descFr: body.description?.fr || body.descFr || "",
        descEn: body.description?.en || body.descEn || "",
        descEs: body.description?.es || body.descEs || "",
        objectives: JSON.stringify(
          body.objectives?.fr || body.objectives || []
        ),
        target: body.target?.fr ?? (typeof body.target === "string" ? body.target : "") ?? "",
        results: JSON.stringify(body.results?.fr || body.results || []),
        documentUrl: body.documentUrl || null,
      },
    });

    return NextResponse.json(
      { program: transformProgram(program) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[PROGRAM_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
