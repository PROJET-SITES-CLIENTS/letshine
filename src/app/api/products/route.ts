import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { transformProduct } from "@/lib/transformers";

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

    const items = await db.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ products: items.map(transformProduct) });
  } catch (e) {
    console.error("[PRODUCTS_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const body = await req.json();
    const slug = body.slug;
    const category = body.category;
    const name = body.name;
    const brand = body.brand;
    const price = body.price;
    const image = body.image;

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
        oldPrice: body.oldPrice !== undefined ? Number(body.oldPrice) : null,
        rating: body.rating !== undefined ? Number(body.rating) : 0,
        reviews: body.reviews !== undefined ? Number(body.reviews) : 0,
        inStock: body.inStock !== undefined ? Boolean(body.inStock) : true,
        stockQty: body.stockQty !== undefined ? Number(body.stockQty) : 0,
        warranty: body.warranty ?? "",
        featured: body.featured !== undefined ? Boolean(body.featured) : false,
        badge: body.badge ?? null,
        image,
        gallery: JSON.stringify(body.gallery || []),
        descFr: body.description?.fr || body.descFr || "",
        descEn: body.description?.en || body.descEn || "",
        descEs: body.description?.es || body.descEs || "",
        specs: JSON.stringify(body.specs || []),
      },
    });

    return NextResponse.json(
      { product: transformProduct(product) },
      { status: 201 }
    );
  } catch (e) {
    console.error("[PRODUCT_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
