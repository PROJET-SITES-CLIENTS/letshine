import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;

    const body = await req.json();
    const { type, programId, formationId, eventId, paid, amount, phone, countryCode, method } = body;

    if (!type || !["PROGRAM", "FORMATION", "EVENT"].includes(type)) {
      return NextResponse.json(
        { error: "Type invalide (PROGRAM, FORMATION ou EVENT requis)" },
        { status: 400 }
      );
    }

    // Validate that the right reference id is provided for the type
    if (type === "PROGRAM" && !programId) {
      return NextResponse.json(
        { error: "programId requis pour une inscription PROGRAM" },
        { status: 400 }
      );
    }
    if (type === "FORMATION" && !formationId) {
      return NextResponse.json(
        { error: "formationId requis pour une inscription FORMATION" },
        { status: 400 }
      );
    }
    if (type === "EVENT" && !eventId) {
      return NextResponse.json(
        { error: "eventId requis pour une inscription EVENT" },
        { status: 400 }
      );
    }

    const registration = await db.registration.create({
      data: {
        userId,
        type: String(type),
        programId: programId ? String(programId) : null,
        formationId: formationId ? String(formationId) : null,
        eventId: eventId ? String(eventId) : null,
        paid: false, // will become true upon Djomy webhook success
        amount: amount !== undefined ? Number(amount) : 0,
        status: "PENDING",
      },
    });

    let redirectUrl = "";
    // If the registration requires payment (amount > 0 and not a free program)
    if (amount > 0 && phone && countryCode) {
      const origin = req.headers.get("origin") || "https://letshine.vercel.app";
      try {
        const { createPaymentGateway } = await import("@/lib/djomy");
        redirectUrl = await createPaymentGateway({
          amount: Number(amount),
          countryCode: String(countryCode),
          payerNumber: String(phone),
          merchantPaymentReference: `REG-${registration.id}`,
          description: `Inscription Let's Shine (${type})`,
          returnUrl: `${origin}/member/dashboard?success=true&ref=REG-${registration.id}`,
          cancelUrl: `${origin}/member/dashboard?cancel=true`,
        });
      } catch (paymentError: any) {
        console.error("[REG_PAYMENT_INIT_ERROR]", paymentError);
        return NextResponse.json({ error: paymentError.message || "Erreur de paiement Djomy" }, { status: 500 });
      }
    } else if (amount === 0) {
      // Free program, immediately confirm
      await db.registration.update({
        where: { id: registration.id },
        data: {
          paid: true,
          status: "CONFIRMED",
        }
      });
    }

    return NextResponse.json(
      { 
        message: redirectUrl ? "Redirection vers le paiement" : "Inscription enregistrée", 
        registration,
        redirectUrl
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("[REGISTRATION_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
