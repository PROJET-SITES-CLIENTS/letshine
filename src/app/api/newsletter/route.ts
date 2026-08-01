import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const existing = await db.newsletterSubscription.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { message: "Déjà abonné", subscription: existing },
          { status: 200 }
        );
      }
      const reactivated = await db.newsletterSubscription.update({
        where: { email: normalizedEmail },
        data: { active: true },
      });
      return NextResponse.json(
        { message: "Abonnement réactivé", subscription: reactivated },
        { status: 201 }
      );
    }

    const subscription = await db.newsletterSubscription.create({
      data: { email: normalizedEmail, active: true },
    });

    return NextResponse.json(
      { message: "Inscription confirmée", subscription },
      { status: 201 }
    );
  } catch (e) {
    console.error("[NEWSLETTER_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
