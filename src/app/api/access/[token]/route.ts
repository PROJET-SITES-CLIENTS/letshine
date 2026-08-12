import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/access/[token]
// Valide le token d'accès et redirige l'utilisateur vers le contenu de la formation (ZIP, PDF, ou Vidéo)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    if (!token) {
      return new NextResponse("Token manquant", { status: 400 });
    }

    const registration = await db.registration.findFirst({
      where: { accessToken: token },
      include: { formation: true },
    });

    if (!registration) {
      return new NextResponse("Accès non valide ou introuvable", { status: 404 });
    }

    if (registration.status !== "CONFIRMED" && registration.status !== "COMPLETED") {
      return new NextResponse("L'accès à cette formation n'est pas encore confirmé (statut: " + registration.status + ")", { status: 403 });
    }

    const formation = registration.formation;
    if (!formation) {
      return new NextResponse("Formation introuvable", { status: 404 });
    }

    // On priorise le documentUrl (souvent utilisé pour les ZIP / PDF de formation en bloc)
    // Sinon on se rabat sur la vidéo
    const downloadUrl = formation.documentUrl || formation.videoUrl;

    if (!downloadUrl) {
      return new NextResponse("Le contenu de la formation n'a pas encore été importé par l'administrateur.", { status: 404 });
    }

    // Rediriger vers l'URL du fichier. 
    // Si c'est un ZIP, le navigateur lancera automatiquement le téléchargement.
    return NextResponse.redirect(new URL(downloadUrl, req.url));
  } catch (error) {
    console.error("[ACCESS_ERROR]", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}
