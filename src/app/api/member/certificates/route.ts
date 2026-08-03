import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const certificates = await db.certificate.findMany({
      where: { userId },
      include: { registration: { include: { formation: true, program: true } } },
      orderBy: { issueDate: "desc" },
    });
    return NextResponse.json({ certificates });
  } catch (e) {
    console.error("[CERTIFICATES_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
