import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const events = await db.event.findMany({
      orderBy: { date: "asc" },
    });
    return NextResponse.json({ events });
  } catch (e) {
    console.error("[EVENTS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
