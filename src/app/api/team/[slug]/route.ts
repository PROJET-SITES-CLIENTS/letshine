import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformTeamMember } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.teamMember.findUnique({ where: { slug } });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ teamMember: transformTeamMember(item) });
  } catch (e) {
    console.error("[TEAM_MEMBER_ERROR]", e);
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
    const existing = await db.teamMember.findUnique({
      where: { slug: paramSlug },
    });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    data.name = body.name ?? existing.name;
    data.initials = body.initials ?? existing.initials;
    data.color = body.color ?? existing.color;
    data.image = body.image ?? existing.image;
    data.category = body.category ?? existing.category;
    data.roleFr = body.role?.fr ?? body.roleFr ?? existing.roleFr;
    data.roleEn = body.role?.en ?? body.roleEn ?? existing.roleEn;
    data.roleEs = body.role?.es ?? body.roleEs ?? existing.roleEs;
    data.bioFr = body.bio?.fr ?? body.bioFr ?? existing.bioFr;
    data.bioEn = body.bio?.en ?? body.bioEn ?? existing.bioEn;
    data.bioEs = body.bio?.es ?? body.bioEs ?? existing.bioEs;

    const updated = await db.teamMember.update({
      where: { slug: paramSlug },
      data,
    });
    return NextResponse.json({ teamMember: transformTeamMember(updated) });
  } catch (e) {
    console.error("[TEAM_MEMBER_UPDATE_ERROR]", e);
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

    const existing = await db.teamMember.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.teamMember.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[TEAM_MEMBER_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
