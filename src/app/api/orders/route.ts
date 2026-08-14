import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

type OrderItemInput = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CreateOrderBody = {
  items: OrderItemInput[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  countryCode: string;
  shippingAddress: string;
  shippingCity: string;
  paymentOption: "full" | "partial" | "delivery";
  paymentMethod?: "CARD" | "ORANGE_MONEY" | "MTN_MONEY";
};

const VALID_PAYMENT_OPTIONS = ["full", "partial", "delivery"] as const;
const VALID_PAYMENT_METHODS = ["CARD", "ORANGE_MONEY", "MTN_MONEY"] as const;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateOrderBody;

    // --- Validation ---
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Le panier est vide (items manquants)" },
        { status: 400 }
      );
    }
    if (!body.customerName || !body.customerEmail || !body.customerPhone) {
      return NextResponse.json(
        {
          error:
            "Champs client requis manquants (customerName, customerEmail, customerPhone)",
        },
        { status: 400 }
      );
    }
    if (!body.shippingAddress || !body.shippingCity) {
      return NextResponse.json(
        { error: "Adresse de livraison requise (shippingAddress, shippingCity)" },
        { status: 400 }
      );
    }
    if (!VALID_PAYMENT_OPTIONS.includes(body.paymentOption)) {
      return NextResponse.json(
        {
          error:
            "Option de paiement invalide (attendu: full | partial | delivery)",
        },
        { status: 400 }
      );
    }

    // Payment method required for full / partial; not for delivery
    const needsPaymentMethod = body.paymentOption !== "delivery";
    if (
      needsPaymentMethod &&
      (!body.paymentMethod || !VALID_PAYMENT_METHODS.includes(body.paymentMethod))
    ) {
      return NextResponse.json(
        {
          error:
            "Méthode de paiement requise (CARD | ORANGE_MONEY | MTN_MONEY) pour un paiement en ligne",
        },
        { status: 400 }
      );
    }

    // --- Normalize items ---
    const items = body.items.map((it) => ({
      productId: String(it.id),
      name: String(it.name),
      price: Math.max(0, Math.floor(Number(it.price) || 0)),
      quantity: Math.max(1, Math.floor(Number(it.quantity) || 1)),
    }));

    // Verify products exist (so we don't create orphan OrderItem rows)
    const productIds = Array.from(new Set(items.map((i) => i.productId)));
    const existingProducts = await db.product.findMany({
      where: { OR: [{ id: { in: productIds } }, { slug: { in: productIds } }] },
      select: { id: true, slug: true },
    });
    
    // Create a map to resolve frontend ID (which might be a slug or DB ID) to the actual DB ID
    const dbIdMap = new Map<string, string>();
    existingProducts.forEach((p) => {
      dbIdMap.set(p.id, p.id);
      dbIdMap.set(p.slug, p.id);
    });

    if (existingProducts.length === 0) {
      return NextResponse.json(
        { error: "Aucun produit valide dans le panier" },
        { status: 400 }
      );
    }
    
    const validItems = items.filter((i) => dbIdMap.has(i.productId));
    if (validItems.length === 0) {
      return NextResponse.json(
        { error: "Aucun produit valide dans le panier" },
        { status: 400 }
      );
    }

    // --- Compute total ---
    const totalAmount = validItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    // --- Resolve current user (optional — orders can be guest checkouts) ---
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as
      | { id?: string; email?: string | null; name?: string | null; role?: string }
      | undefined;
    const userId = sessionUser?.id ? String(sessionUser.id) : null;
    const guestEmail = String(body.customerEmail).toLowerCase();

    // --- Generate order number ---
    const orderNumber = `LS-${Date.now()}`;

    // --- Determine status & payment amount ---
    const isDelivery = body.paymentOption === "delivery";
    const orderStatus = isDelivery ? "PENDING_CONFIRMATION" : "PENDING";
    // Partial = 30% now, rest on delivery. Full = 100% now. Delivery = 0 now.
    const paymentAmount =
      body.paymentOption === "full"
        ? totalAmount
        : body.paymentOption === "partial"
        ? Math.round(totalAmount * 0.3)
        : 0;

    const paymentMethod = isDelivery ? null : (body.paymentMethod as string);

    // --- Create order (transactional) ---
    const order = await db.order.create({
      data: {
        orderNumber,
        userId,
        guestEmail,
        status: orderStatus,
        totalAmount,
        paymentMethod,
        shippingAddr: String(body.shippingAddress),
        shippingCity: String(body.shippingCity),
        shippingPhone: String(body.customerPhone),
        items: {
          create: validItems.map((i) => ({
            productId: dbIdMap.get(i.productId)!,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: true },
    });

    // --- Create Payment record only for online payment options ---
    let payment: {
      id: string;
      amount: number;
      method: string;
      status: string;
      reference: string | null;
    } | null = null;
    
    let redirectUrl = "";
    
    if (!isDelivery && paymentMethod) {
      payment = await db.payment.create({
        data: {
          orderId: order.id,
          amount: paymentAmount,
          method: paymentMethod,
          status: "PENDING",
          reference: `PAY-${order.orderNumber}`,
        },
      });
      
      const origin = req.headers.get("origin") || "https://letshine.vercel.app";
      try {
        const { createPaymentGateway } = await import("@/lib/djomy");
        redirectUrl = await createPaymentGateway({
          amount: paymentAmount,
          countryCode: String(body.countryCode),
          payerNumber: String(body.customerPhone),
          merchantPaymentReference: `PAY-${order.orderNumber}`,
          description: `Commande Let's Shine (${order.orderNumber})`,
          returnUrl: `${origin}/#checkout?success=true&ref=${order.orderNumber}`,
          cancelUrl: `${origin}/#checkout?cancel=true`,
        });
      } catch (paymentError: any) {
        console.error("[ORDER_PAYMENT_INIT_ERROR]", paymentError);
        return NextResponse.json({ error: paymentError.message || "Erreur de paiement Djomy" }, { status: 500 });
      }
    }

    return NextResponse.json(
      {
        message: isDelivery
          ? "Commande enregistrée — nous vous contacterons pour confirmer."
          : "Redirection vers le paiement",
        redirectUrl,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          totalAmount: order.totalAmount,
          paymentOption: body.paymentOption,
          paymentMethod,
          paymentAmount,
          items: order.items,
          payment: payment
            ? {
                id: payment.id,
                amount: payment.amount,
                method: payment.method,
                status: payment.status,
                reference: payment.reference,
              }
            : null,
        },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("[ORDER_CREATE_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Public endpoint: return only the current user's orders
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as
      | { id?: string; email?: string | null; name?: string | null; role?: string }
      | undefined;
    if (!sessionUser?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }
    const orders = await db.order.findMany({
      where: { userId: String(sessionUser.id) },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    return NextResponse.json({ orders });
  } catch (e) {
    console.error("[ORDERS_LIST_ERROR]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
