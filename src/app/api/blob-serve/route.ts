import { type NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const blobUrl = request.nextUrl.searchParams.get('url');

  if (!blobUrl) {
    return NextResponse.json({ error: 'Paramètre url manquant' }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return new NextResponse('Configuration manquante', { status: 500 });
  }

  try {
    // 1. Fetch direct avec Token (plus fiable que le SDK pour extraire le buffer)
    const response = await fetch(blobUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new NextResponse('Fichier non trouvé', { status: 404 });
    }

    // 2. Récupération des bytes et de la taille exacte
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const arrayBuffer = await response.arrayBuffer();

    // 3. Renvoi avec Content-Length explicite (requis par next/image)
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': arrayBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('Blob serve error:', error?.message);
    return new NextResponse(`Erreur: ${error?.message}`, { status: 500 });
  }
}
