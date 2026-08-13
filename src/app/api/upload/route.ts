import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Vous pouvez ajouter une vérification de session/admin ici si nécessaire.
        return {
          allowedContentTypes: [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf', 'application/zip', 'application/x-zip-compressed'
          ],
          maximumSizeInBytes: 50 * 1024 * 1024, // 50 MB
          tokenPayload: JSON.stringify({
            // Vous pouvez stocker des infos ici
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Callback une fois l'upload terminé
        console.log("Upload terminé avec succès :", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Vercel Blob upload error:", error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 400 });
  }
}
