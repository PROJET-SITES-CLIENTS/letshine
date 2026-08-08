import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformDonationGoal } from "@/lib/transformers";

export async function GET() {
  try {
    const items = await db.donationGoal.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({
      donationGoals: items.map(transformDonationGoal),
    });
  } catch (e) {
    console.error("[DONATION_GOALS_ERROR]", e);
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
      slugify(body.goal?.fr || body.goalFr || `goal-${Date.now()}`).slice(0, 50);

    const item = await db.donationGoal.create({
      data: {
        slug,
        goalFr: body.goal?.fr ?? body.goalFr ?? "",
        goalEn: body.goal?.en ?? body.goalEn ?? "",
        goalEs: body.goal?.es ?? body.goalEs ?? "",
        current: Number(body.current ?? 0),
        target: Number(body.target ?? 0),
        color: body.color || "from-amber-400 to-yellow-500",
        image: body.image || "",
      },
    });

    return NextResponse.json(
      { donationGoal: transformDonationGoal(item) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[DONATION_GOAL_CREATE_ERROR]", e);
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
