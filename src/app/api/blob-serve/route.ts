import { get } from '@vercel/blob';
import { type NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const blobUrl = request.nextUrl.searchParams.get('url');

  if (!blobUrl) {
    return NextResponse.json({ error: 'Paramètre url manquant' }, { status: 400 });
  }

  try {
    // Récupère le blob privé via le SDK Vercel (gère l'auth automatiquement)
    const result = await get(blobUrl, {
      access: 'private',
    });

    if (!result) {
      return new NextResponse('Fichier non trouvé', { status: 404 });
    }

    // arrayBuffer() est une MÉTHODE (comme l'API Fetch), pas une propriété
    const arrayBuffer = await result.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': result.contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('Blob serve error:', error?.message);
    return new NextResponse(`Erreur: ${error?.message}`, { status: 500 });
  }
}
