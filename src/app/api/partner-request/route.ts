import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          error:
            "Champs requis manquants (name, email, subject, message)",
        },
        { status: 400 }
      );
    }

    const partnerRequest = await db.partnerRequest.create({
      data: {
        name: String(name),
        email: String(email).toLowerCase(),
        phone: phone ? String(phone) : null,
        organization: organization ? String(organization) : null,
        subject: String(subject),
        message: String(message),
      },
    });

    return NextResponse.json(
      { message: "Demande envoyée", partnerRequest },
      { status: 201 }
    );
  } catch (e) {
    console.error("[PARTNER_REQUEST_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
