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
    const messages = await db.message.findMany({
      where: { recipientId: userId },
      include: { sender: { select: { id: true, name: true, email: true, avatarUrl: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ messages });
  } catch (e) {
    console.error("[MESSAGES_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const body = await req.json();
    const { recipientId, subject, content } = body;

    if (!recipientId || !subject || !content) {
      return NextResponse.json({ error: "Destinataire, sujet et contenu requis" }, { status: 400 });
    }

    const message = await db.message.create({
      data: { senderId: userId, recipientId, subject, content },
    });
    return NextResponse.json({ message }, { status: 201 });
  } catch (e) {
    console.error("[MESSAGE_SEND_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const body = await req.json();
    const { messageId, read } = body;

    const message = await db.message.findFirst({
      where: { id: messageId, recipientId: userId },
    });
    if (!message) {
      return NextResponse.json({ error: "Message non trouvé" }, { status: 404 });
    }

    const updated = await db.message.update({
      where: { id: messageId },
      data: { read: read ?? !message.read },
    });
    return NextResponse.json({ message: updated });
  } catch (e) {
    console.error("[MESSAGE_UPDATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
