import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await db.product.findUnique({
      where: { slug },
    });
    if (!product) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ product });
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
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const { slug: paramSlug } = await params;
    const body = await req.json();
    const {
      slug,
      category,
      name,
      brand,
      price,
      oldPrice,
      rating,
      reviews,
      inStock,
      stockQty,
      warranty,
      featured,
      badge,
      image,
      gallery,
      descFr,
      descEn,
      descEs,
      specs,
    } = body;

    const existing = await db.product.findUnique({
      where: { slug: paramSlug },
    });
    if (!existing) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    const data: any = {};
    if (slug !== undefined) data.slug = slug;
    if (category !== undefined) data.category = category;
    if (name !== undefined) data.name = name;
    if (brand !== undefined) data.brand = brand;
    if (price !== undefined) data.price = Number(price);
    if (oldPrice !== undefined) data.oldPrice = oldPrice === null ? null : Number(oldPrice);
    if (rating !== undefined) data.rating = Number(rating);
    if (reviews !== undefined) data.reviews = Number(reviews);
    if (inStock !== undefined) data.inStock = Boolean(inStock);
    if (stockQty !== undefined) data.stockQty = Number(stockQty);
    if (warranty !== undefined) data.warranty = warranty;
    if (featured !== undefined) data.featured = Boolean(featured);
    if (badge !== undefined) data.badge = badge;
    if (image !== undefined) data.image = image;
    if (gallery !== undefined) data.gallery = gallery;
    if (descFr !== undefined) data.descFr = descFr;
    if (descEn !== undefined) data.descEn = descEn;
    if (descEs !== undefined) data.descEs = descEs;
    if (specs !== undefined) data.specs = specs;

    const updated = await db.product.update({
      where: { slug: paramSlug },
      data,
    });

    return NextResponse.json({ product: updated });
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
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const { slug } = await params;
    const existing = await db.product.findUnique({
      where: { slug },
    });
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
