import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformPartner } from "@/lib/transformers";

export async function GET() {
  try {
    const items = await db.partner.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ partners: items.map(transformPartner) });
  } catch (e) {
    console.error("[PARTNERS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const body = await req.json();
    const name = body.name || `Partenaire ${Date.now()}`;
    const slug =
      body.slug ||
      slugify(name);

    const item = await db.partner.create({
      data: {
        slug,
        name,
        tier: body.tier || "bronze",
        logo: body.logo || "",
        sector: body.sector || "",
        image: body.image || "",
      },
    });

    return NextResponse.json(
      { partner: transformPartner(item) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[PARTNER_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
