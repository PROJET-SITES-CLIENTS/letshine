import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const donations = await db.donation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ donations });
  } catch (e) {
    console.error("[DONATIONS_LIST_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      donorName,
      donorEmail,
      amount,
      currency,
      mode,
      method,
      goal,
      userId,
      reference,
    } = body;

    if (!donorName || !donorEmail || amount === undefined || !mode || !method) {
      return NextResponse.json(
        {
          error:
            "Champs requis manquants (donorName, donorEmail, amount, mode, method)",
        },
        { status: 400 }
      );
    }

    const donation = await db.donation.create({
      data: {
        donorName: String(donorName),
        donorEmail: String(donorEmail).toLowerCase(),
        amount: Number(amount),
        currency: currency ?? "EUR",
        mode: String(mode),
        method: String(method),
        goal: goal ? String(goal) : null,
        userId: userId ? String(userId) : null,
        reference: reference ? String(reference) : null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { message: "Don enregistré", donation },
      { status: 201 }
    );
  } catch (e) {
    console.error("[DONATION_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
