import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, phone, country } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        password: hashedPassword,
        phone: phone || null,
        country: country || null,
        role: "MEMBER",
      },
    });

    await db.memberProfile.create({
      data: { userId: user.id },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }, { status: 201 });
  } catch (e) {
    console.error("[REGISTER_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
