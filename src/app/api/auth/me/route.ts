import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    const userId = (session.user as any).id;
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    // Strip password from response
    const { password: _pw, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch (e) {
    console.error("[ME_ERROR]", e);
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
    const { name, phone, country, bio, occupation, skills, languages, linkedinUrl, twitterUrl } = body;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: name ?? undefined,
        phone: phone ?? undefined,
        country: country ?? undefined,
      },
    });

    await db.memberProfile.upsert({
      where: { userId },
      update: {
        bio: bio ?? undefined,
        occupation: occupation ?? undefined,
        skills: skills ? JSON.stringify(skills) : undefined,
        languages: languages ? JSON.stringify(languages) : undefined,
        linkedinUrl: linkedinUrl ?? undefined,
        twitterUrl: twitterUrl ?? undefined,
      },
      create: {
        userId,
        bio: bio ?? null,
        occupation: occupation ?? null,
        skills: skills ? JSON.stringify(skills) : null,
        languages: languages ? JSON.stringify(languages) : null,
        linkedinUrl: linkedinUrl ?? null,
        twitterUrl: twitterUrl ?? null,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (e) {
    console.error("[ME_UPDATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
