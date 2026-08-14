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
      phone,
      countryCode,
      amount,
      currency,
      mode,
      method,
      goal,
      userId,
    } = body;

    if (!donorName || !donorEmail || !phone || !countryCode || amount === undefined || !mode || !method) {
      return NextResponse.json(
        {
          error:
            "Champs requis manquants (donorName, donorEmail, phone, countryCode, amount, mode, method)",
        },
        { status: 400 }
      );
    }

    // Generate a unique, human-readable reference
    const reference = `DON-${Date.now()}`;

    // Create donation as PENDING
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
        status: "PENDING",
      },
    });

    const origin = req.headers.get("origin") || "https://letshine.vercel.app";
    let redirectUrl = "";

    try {
      const { createPaymentGateway } = await import("@/lib/djomy");
      redirectUrl = await createPaymentGateway({
        amount: Number(amount),
        countryCode: String(countryCode),
        payerNumber: String(phone),
        merchantPaymentReference: reference,
        description: `Don à Let's Shine (${reference})`,
        returnUrl: `${origin}/don?success=true&ref=${reference}`,
        cancelUrl: `${origin}/don?cancel=true`,
      });
    } catch (paymentError: any) {
      console.error("[DONATION_PAYMENT_INIT_ERROR]", paymentError);
      return NextResponse.json({ error: paymentError.message || "Erreur de paiement Djomy" }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Redirection vers le paiement",
        donation,
        reference: donation.reference,
        redirectUrl,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("[DONATION_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
