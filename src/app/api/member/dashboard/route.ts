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

    const [user, registrations, certificates, messages, donations, orders] = await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        include: { profile: true },
      }),
      db.registration.findMany({
        where: { userId },
        include: { program: true, formation: true, event: true },
        orderBy: { createdAt: "desc" },
      }),
      db.certificate.findMany({
        where: { userId },
        include: { registration: { include: { formation: true, program: true } } },
        orderBy: { issueDate: "desc" },
      }),
      db.message.findMany({
        where: { recipientId: userId },
        include: { sender: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      db.donation.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      db.order.findMany({
        where: { userId },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    const unreadMessages = messages.filter((m) => !m.read).length;
    const activeFormations = registrations.filter((r) => r.type === "FORMATION" && r.status === "IN_PROGRESS").length;
    const completedFormations = registrations.filter((r) => r.type === "FORMATION" && r.status === "COMPLETED").length;
    const totalDonated = donations.filter((d) => d.status === "SUCCESS").reduce((sum, d) => sum + d.amount, 0);
    const totalOrders = orders.length;

    return NextResponse.json({
      user,
      registrations,
      certificates,
      messages,
      donations,
      orders,
      stats: {
        unreadMessages,
        activeFormations,
        completedFormations,
        totalDonated,
        totalOrders,
        totalCertificates: certificates.length,
      },
    });
  } catch (e) {
    console.error("[DASHBOARD_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
