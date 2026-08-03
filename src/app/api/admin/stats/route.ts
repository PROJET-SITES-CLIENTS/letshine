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
    const role = (session.user as any).role;
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const [usersCount, programsCount, formationsCount, productsCount, articlesCount, eventsCount, ordersCount, donationsTotal, registrationsCount, unreadContact] = await Promise.all([
      db.user.count(),
      db.program.count(),
      db.formation.count(),
      db.product.count(),
      db.article.count(),
      db.event.count(),
      db.order.count(),
      db.donation.aggregate({ _sum: { amount: true }, where: { status: "SUCCESS" } }),
      db.registration.count(),
      db.contactMessage.count({ where: { handled: false } }),
    ]);

    const recentUsers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    const recentOrders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true, user: { select: { name: true, email: true } } },
    });

    const recentDonations = await db.donation.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({
      stats: {
        users: usersCount,
        programs: programsCount,
        formations: formationsCount,
        products: productsCount,
        articles: articlesCount,
        events: eventsCount,
        orders: ordersCount,
        donationsTotal: donationsTotal._sum.amount || 0,
        registrations: registrationsCount,
        unreadContact,
      },
      recent: {
        users: recentUsers,
        orders: recentOrders,
        donations: recentDonations,
      },
    });
  } catch (e) {
    console.error("[ADMIN_STATS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
