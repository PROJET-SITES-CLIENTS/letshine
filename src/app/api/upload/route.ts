import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Augmenter la limite de taille du body pour cette route
export const maxDuration = 60; // 60 secondes max

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    const filename = file.name || `upload-${Date.now()}`;

    // Upload côté serveur vers Vercel Blob — aucun problème CORS
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error?.message || 'Erreur lors de l\'upload' },
      { status: 500 }
    );
  }
}
