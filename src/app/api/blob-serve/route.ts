import { get } from '@vercel/blob';
import { type NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname');

  if (!pathname) {
    return NextResponse.json({ error: 'Paramètre pathname manquant' }, { status: 400 });
  }

  try {
    const result = await get(pathname, {
      access: 'private',
    });

    if (result === null) {
      return new NextResponse('Fichier non trouvé', { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Type': result.blob.contentType,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('Blob serve error:', error);
    return new NextResponse('Erreur lors du chargement du fichier', { status: 500 });
  }
}
