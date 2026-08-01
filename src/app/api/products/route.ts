import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
      ];
    }

    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ products });
  } catch (e) {
    console.error("[PRODUCTS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

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

    if (!slug || !category || !name || !brand || price === undefined || !image) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        slug,
        category,
        name,
        brand,
        price: Number(price),
        oldPrice: oldPrice !== undefined ? Number(oldPrice) : null,
        rating: rating !== undefined ? Number(rating) : 0,
        reviews: reviews !== undefined ? Number(reviews) : 0,
        inStock: inStock !== undefined ? Boolean(inStock) : true,
        stockQty: stockQty !== undefined ? Number(stockQty) : 0,
        warranty: warranty ?? "",
        featured: featured !== undefined ? Boolean(featured) : false,
        badge: badge ?? null,
        image,
        gallery: gallery ?? "[]",
        descFr: descFr ?? "",
        descEn: descEn ?? "",
        descEs: descEs ?? "",
        specs: specs ?? "[]",
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (e) {
    console.error("[PRODUCT_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
