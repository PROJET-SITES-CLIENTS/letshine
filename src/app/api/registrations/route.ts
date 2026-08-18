import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifi?" }, { status: 401 });
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

    // Since frontend might send SLUG instead of ID, we need to resolve it!
    let realProgramId = programId;
    let realFormationId = formationId;
    let realEventId = eventId;

    if (type === "PROGRAM" && programId) {
      const p = await db.program.findUnique({ where: { slug: programId } });
      if (p) realProgramId = p.id;
    }
    if (type === "FORMATION" && formationId) {
      const f = await db.formation.findUnique({ where: { slug: formationId } });
      if (f) realFormationId = f.id;
    }
    if (type === "EVENT" && eventId) {
      const e = await db.event.findUnique({ where: { slug: eventId } });
      if (e) realEventId = e.id;
    }

    // Validate that the right reference id is provided for the type
    if (type === "PROGRAM" && !realProgramId) {
      return NextResponse.json(
        { error: "programId valide requis pour une inscription PROGRAM" },
        { status: 400 }
      );
    }
    if (type === "FORMATION" && !realFormationId) {
      return NextResponse.json(
        { error: "formationId valide requis pour une inscription FORMATION" },
        { status: 400 }
      );
    }
    if (type === "EVENT" && !realEventId) {
      return NextResponse.json(
        { error: "eventId valide requis pour une inscription EVENT" },
        { status: 400 }
      );
    }

    const registration = await db.registration.create({
      data: {
        userId,
        type: String(type),
        programId: realProgramId ? String(realProgramId) : null,
        formationId: realFormationId ? String(realFormationId) : null,
        eventId: realEventId ? String(realEventId) : null,
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
          merchantPaymentReference: "REG-" + registration.id,
          description: "Inscription Let's Shine (" + type + ")",
          returnUrl: origin + "/#formation-checkout?success=true&ref=REG-" + registration.id,
          cancelUrl: origin + "/#formation-checkout?cancel=true",
        });
      } catch (paymentError: any) {
        console.error("[REG_PAYMENT_INIT_ERROR]", paymentError);
        return NextResponse.json({ error: paymentError.message || "Erreur lors de l'initialisation du paiement" }, { status: 500 });
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
        message: redirectUrl ? "Redirection vers le paiement" : "Inscription enregistr?e", 
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
