import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformProduct } from "@/lib/transformers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = await db.product.findUnique({
      where: { slug },
    });
    if (!item) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ product: transformProduct(item) });
  } catch (e) {
    console.error("[PRODUCT_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: paramSlug } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const body = await req.json();
    const existing = await db.product.findUnique({
      where: { slug: paramSlug },
    });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.category !== undefined) data.category = body.category;
    if (body.name !== undefined) data.name = body.name;
    if (body.brand !== undefined) data.brand = body.brand;
    if (body.price !== undefined) data.price = Number(body.price);
    if (body.oldPrice !== undefined) {
      data.oldPrice = body.oldPrice === null ? null : Number(body.oldPrice);
    }
    if (body.rating !== undefined) data.rating = Number(body.rating);
    if (body.reviews !== undefined) data.reviews = Number(body.reviews);
    if (body.inStock !== undefined) data.inStock = Boolean(body.inStock);
    if (body.stockQty !== undefined) data.stockQty = Number(body.stockQty);
    if (body.warranty !== undefined) data.warranty = body.warranty;
    if (body.featured !== undefined) data.featured = Boolean(body.featured);
    if (body.badge !== undefined) data.badge = body.badge;
    if (body.image !== undefined) data.image = body.image;
    if (body.gallery !== undefined) data.gallery = JSON.stringify(body.gallery);
    if (body.description) {
      data.descFr = body.description.fr;
      data.descEn = body.description.en;
      data.descEs = body.description.es;
    }
    // Backwards-compat: also accept flat descFr/descEn/descEs
    if (body.descFr !== undefined) data.descFr = body.descFr;
    if (body.descEn !== undefined) data.descEn = body.descEn;
    if (body.descEs !== undefined) data.descEs = body.descEs;
    if (body.specs !== undefined) data.specs = JSON.stringify(body.specs);

    const updated = await db.product.update({
      where: { slug: paramSlug },
      data,
    });

    return NextResponse.json({ product: transformProduct(updated) });
  } catch (e) {
    console.error("[PRODUCT_UPDATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const existing = await db.product.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    await db.product.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[PRODUCT_DELETE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
