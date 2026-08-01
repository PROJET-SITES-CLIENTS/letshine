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
    const { type, programId, formationId, eventId, paid, amount } = body;

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
        paid: paid !== undefined ? Boolean(paid) : false,
        amount: amount !== undefined ? Number(amount) : 0,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { message: "Inscription enregistrée", registration },
      { status: 201 }
    );
  } catch (e) {
    console.error("[REGISTRATION_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
