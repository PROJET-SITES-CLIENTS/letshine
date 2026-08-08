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

    // Generate a unique, human-readable reference so the donor can be
    // identified later (receipts, accounting, support tickets, etc.).
    const reference = `DON-${Date.now()}`;

    // Placeholder payment gateway — we treat the donation as SUCCESSFUL on
    // creation. When the real Jomi/payment integration lands, this will move
    // into a webhook handler that flips PENDING → SUCCESS.
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
        reference,
        status: "SUCCESS",
      },
    });

    // Auto-update the corresponding donation goal progress bar.
    // We look the goal up by slug and increment `current` by the donated
    // amount. Wrapped in a try/catch so a missing goal never breaks the
    // donation flow (it's a nice-to-have, not critical).
    if (goal) {
      try {
        const existingGoal = await db.donationGoal.findUnique({
          where: { slug: String(goal) },
        });
        if (existingGoal) {
          await db.donationGoal.update({
            where: { slug: String(goal) },
            data: { current: existingGoal.current + Number(amount) },
          });
        }
      } catch (ge) {
        console.error("[DONATION_GOAL_UPDATE_ERROR]", ge);
      }
    }

    return NextResponse.json(
      {
        message: "Don enregistré",
        donation,
        reference: donation.reference,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("[DONATION_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
