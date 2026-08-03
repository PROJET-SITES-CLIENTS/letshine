import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis (name, email, subject, message)" },
        { status: 400 }
      );
    }

    const contactMessage = await db.contactMessage.create({
      data: {
        name: String(name),
        email: String(email).toLowerCase(),
        subject: String(subject),
        message: String(message),
      },
    });

    return NextResponse.json(
      { message: "Message envoyé", contactMessage },
      { status: 201 }
    );
  } catch (e) {
    console.error("[CONTACT_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
