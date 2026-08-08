import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformDonationGoal } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.donationGoal.findUnique({ where: { slug } });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ donationGoal: transformDonationGoal(item) });
  } catch (e) {
    console.error("[DONATION_GOAL_ERROR]", e);
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
    const existing = await db.donationGoal.findUnique({
      where: { slug: paramSlug },
    });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    data.goalFr = body.goal?.fr ?? body.goalFr ?? existing.goalFr;
    data.goalEn = body.goal?.en ?? body.goalEn ?? existing.goalEn;
    data.goalEs = body.goal?.es ?? body.goalEs ?? existing.goalEs;
    if (body.current !== undefined) data.current = Number(body.current);
    if (body.target !== undefined) data.target = Number(body.target);
    data.color = body.color ?? existing.color;
    data.image = body.image ?? existing.image;

    const updated = await db.donationGoal.update({
      where: { slug: paramSlug },
      data,
    });
    return NextResponse.json({ donationGoal: transformDonationGoal(updated) });
  } catch (e) {
    console.error("[DONATION_GOAL_UPDATE_ERROR]", e);
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

    const existing = await db.donationGoal.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.donationGoal.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[DONATION_GOAL_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
