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
    // Récupère le blob privé en s'authentifiant avec le token
    const response = await fetch(blobUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new NextResponse('Fichier non trouvé', { status: 404 });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const body = await response.arrayBuffer();

    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('Blob serve error:', error);
    return new NextResponse('Erreur lors du chargement du fichier', { status: 500 });
  }
}
