import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    const filename = file.name || `upload-${Date.now()}`;

    // Upload en mode privé pour correspondre à la configuration du store
    const blob = await put(filename, file, {
      access: 'private',
      addRandomSuffix: true,
    });

    // On retourne une URL de service interne qui stream le fichier
    // Le pathname est la partie après le domaine du blob store
    const blobPathname = blob.pathname;
    const serveUrl = `/api/blob-serve?pathname=${encodeURIComponent(blobPathname)}`;

    return NextResponse.json({ url: serveUrl, blobUrl: blob.url, pathname: blobPathname });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error?.message || "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}
