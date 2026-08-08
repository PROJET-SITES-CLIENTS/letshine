import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    let settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });
    if (!settings) {
      settings = await db.siteSettings.create({ data: { id: "singleton" } });
    }
    return NextResponse.json({ settings });
  } catch (e) {
    console.error("[SETTINGS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    const body = await req.json();
    const settings = await db.siteSettings.upsert({
      where: { id: "singleton" },
      update: body,
      create: { id: "singleton", ...body },
    });
    return NextResponse.json({ settings });
  } catch (e) {
    console.error("[SETTINGS_UPDATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
