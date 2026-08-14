import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/djomy";

export async function POST(req: Request) {
  try {
    // 1. Read the raw body as text to verify HMAC signature
    const rawBody = await req.text();
    const signatureHeader = req.headers.get("x-webhook-signature") || "";

    if (!verifyWebhookSignature(signatureHeader, rawBody)) {
      console.error("[DJOMY_WEBHOOK] Signature invalide", { signatureHeader });
      return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    }

    // 2. Parse the payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch (err) {
      return NextResponse.json({ error: "Payload JSON invalide" }, { status: 400 });
    }

    const { eventType, eventId, data } = payload;
    
    console.log(`[DJOMY_WEBHOOK] Reçu event: ${eventType} (${eventId})`, data);

    const { transactionId, status, merchantPaymentReference } = data || {};

    if (!merchantPaymentReference) {
      return NextResponse.json({ message: "Ignoré: merchantPaymentReference manquant" });
    }

    // We only care about payment.success and payment.failed
    if (eventType === "payment.success" || status === "SUCCESS") {
      await handlePaymentSuccess(merchantPaymentReference, transactionId);
    } else if (eventType === "payment.failed" || status === "FAILED") {
      await handlePaymentFailed(merchantPaymentReference, transactionId);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[DJOMY_WEBHOOK_ERROR]", e);
    return NextResponse.json({ error: "Erreur interne du webhook" }, { status: 500 });
  }
}

async function handlePaymentSuccess(merchantRef: string, transactionId: string) {
  // Check if it's a donation, order, or registration
  if (merchantRef.startsWith("DON-")) {
    const donation = await db.donation.findFirst({ where: { reference: merchantRef } });
    if (donation && donation.status !== "SUCCESS") {
      await db.donation.update({
        where: { id: donation.id },
        data: { status: "SUCCESS" },
      });

      // Update goal
      if (donation.goal) {
        try {
          const existingGoal = await db.donationGoal.findUnique({
            where: { slug: donation.goal },
          });
          if (existingGoal) {
            await db.donationGoal.update({
              where: { slug: donation.goal },
              data: { current: existingGoal.current + donation.amount },
            });
          }
        } catch (e) {
          console.error("[DJOMY_WEBHOOK] Erreur màj goal", e);
        }
      }
    }
  } else if (merchantRef.startsWith("PAY-")) {
    // Orders
    const orderNumber = merchantRef.replace("PAY-", "");
    const order = await db.order.findUnique({ where: { orderNumber } });
    
    if (order && order.status === "PENDING") {
      await db.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      });

      // Update payment record
      await db.payment.updateMany({
        where: { orderId: order.id, reference: merchantRef },
        data: { status: "SUCCESS", reference: transactionId }, // Save transactionId instead
      });
    }
  } else if (merchantRef.startsWith("REG-")) {
    // Registration
    const regId = merchantRef.replace("REG-", "");
    const reg = await db.registration.findUnique({ where: { id: regId } });
    if (reg && !reg.paid) {
      await db.registration.update({
        where: { id: reg.id },
        data: { paid: true, status: "CONFIRMED" }, // Or whatever your success status is
      });
    }
  }
}

async function handlePaymentFailed(merchantRef: string, transactionId: string) {
  if (merchantRef.startsWith("DON-")) {
    const donation = await db.donation.findFirst({ where: { reference: merchantRef } });
    if (donation && donation.status === "PENDING") {
      await db.donation.update({
        where: { id: donation.id },
        data: { status: "FAILED" },
      });
    }
  } else if (merchantRef.startsWith("PAY-")) {
    const orderNumber = merchantRef.replace("PAY-", "");
    const order = await db.order.findUnique({ where: { orderNumber } });
    if (order && order.status === "PENDING") {
      // Maybe we don't fail the order directly so user can retry?
      // Just update the payment record to FAILED
      await db.payment.updateMany({
        where: { orderId: order.id, reference: merchantRef },
        data: { status: "FAILED" },
      });
    }
  } else if (merchantRef.startsWith("REG-")) {
    const regId = merchantRef.replace("REG-", "");
    const reg = await db.registration.findUnique({ where: { id: regId } });
    if (reg && !reg.paid) {
      await db.registration.update({
        where: { id: reg.id },
        data: { status: "CANCELLED" },
      });
    }
  }
}
