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

    // Fetch WhatsApp number from site settings to optionally redirect the message
    const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });
    let whatsappUrl: string | null = null;
    if (settings?.whatsappEnabled && settings.whatsapp) {
      const phone = settings.whatsapp.replace(/[^0-9]/g, "");
      const text = encodeURIComponent(
        `Nouveau message de ${name}\nEmail: ${email}\nSujet: ${subject}\n\n${message}`
      );
      whatsappUrl = `https://wa.me/${phone}?text=${text}`;
    }

    return NextResponse.json(
      { success: true, message: "Message envoyé", whatsappUrl, contactMessage },
      { status: 201 }
    );
  } catch (e) {
    console.error("[CONTACT_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
