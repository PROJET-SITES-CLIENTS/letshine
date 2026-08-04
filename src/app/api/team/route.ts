import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformTeamMember } from "@/lib/transformers";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    const items = await db.teamMember.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ team: items.map(transformTeamMember) });
  } catch (e) {
    console.error("[TEAM_ERROR]", e);
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
    const name = body.name || `Membre ${Date.now()}`;
    const slug =
      body.slug ||
      slugify(name);

    const item = await db.teamMember.create({
      data: {
        slug,
        name,
        initials: body.initials || name.slice(0, 2).toUpperCase(),
        color: body.color || "from-blue-500 to-indigo-600",
        image: body.image || "",
        category: body.category || "national",
        roleFr: body.role?.fr ?? body.roleFr ?? "",
        roleEn: body.role?.en ?? body.roleEn ?? "",
        roleEs: body.role?.es ?? body.roleEs ?? "",
        bioFr: body.bio?.fr ?? body.bioFr ?? "",
        bioEn: body.bio?.en ?? body.bioEn ?? "",
        bioEs: body.bio?.es ?? body.bioEs ?? "",
      },
    });

    return NextResponse.json(
      { teamMember: transformTeamMember(item) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[TEAM_CREATE_ERROR]", e);
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
