import crypto from "crypto";

const DJOMY_API_URL = (process.env.DJOMY_API_URL || "https://api.jomi.store").replace(/\/v1\/?$/, "");
const DJOMY_CLIENT_ID = process.env.DJOMY_CLIENT_ID || "";
const DJOMY_CLIENT_SECRET = process.env.DJOMY_CLIENT_SECRET || "";
const DJOMY_PARTNER_KEY = process.env.DJOMY_PARTNER_KEY || "1ea68662cf1b280ee2821c151b257f274204c22e1f8b980a85cd829d3e451d13";

/**
 * Generate HMAC SHA256 signature for Djomy
 */
export function generateHmac(stringToSign: string, clientSecret: string): string {
  try {
    const hmacSignature = crypto
      .createHmac("sha256", clientSecret)
      .update(stringToSign)
      .digest("hex");
    return hmacSignature;
  } catch (error) {
    throw new Error("Erreur de chiffrement HMAC : " + error);
  }
}

/**
 * Generate the X-API-KEY header value
 */
export function getXApiKey(): string {
  const signature = generateHmac(DJOMY_CLIENT_ID, DJOMY_CLIENT_SECRET);
  return `${DJOMY_CLIENT_ID}:${signature}`;
}

/**
 * Get Djomy Access Token
 */
export async function getAccessToken(): Promise<string> {
  const response = await fetch(`${DJOMY_API_URL}/v1/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": getXApiKey(),
      "X-Partner-Domain": DJOMY_PARTNER_KEY,
    },
    body: JSON.stringify({}),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    console.error("Djomy Auth Error:", json);
    throw new Error(json.message || "Impossible de récupérer le token Djomy");
  }

  return json.data?.accessToken || json.data?.token || "";
}

/**
 * Clean phone number to Djomy format (00 + countryCode + number)
 */
export function formatDjomyPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\s+/g, "");
  if (cleaned.startsWith("+")) {
    cleaned = "00" + cleaned.substring(1);
  } else if (!cleaned.startsWith("00")) {
    if (cleaned.length === 9) {
      cleaned = "00224" + cleaned;
    }
  }
  return cleaned;
}

export interface PaymentGatewayRequest {
  amount: number;
  countryCode: string;
  payerNumber: string;
  description?: string;
  merchantPaymentReference: string;
  returnUrl: string;
  cancelUrl?: string;
  metadata?: any;
}

/**
 * Initialize a payment with redirect to Djomy Gateway
 */
export async function createPaymentGateway(data: PaymentGatewayRequest): Promise<string> {
  const token = await getAccessToken();

  const payload = {
    amount: data.amount,
    countryCode: data.countryCode.toUpperCase(),
    payerNumber: formatDjomyPhoneNumber(data.payerNumber),
    description: data.description || "Paiement Let's Shine",
    merchantPaymentReference: data.merchantPaymentReference,
    returnUrl: data.returnUrl,
    cancelUrl: data.cancelUrl || data.returnUrl,
    allowedPaymentMethods: ["OM", "MOMO", "CARD", "PAYCARD", "SOUTRA_MONEY"],
    metadata: data.metadata || {},
  };

  const response = await fetch(`${DJOMY_API_URL}/v1/payments/gateway`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": getXApiKey(),
      "X-Partner-Domain": DJOMY_PARTNER_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    console.error("Djomy Payment Error:", json);
    throw new Error(json.message || "Erreur lors de l'initialisation du paiement");
  }

  const url = json.data?.redirectUrl || json.data?.paymentUrl || json.data?.url;
  if (!url) {
    console.error("Missing URL in Djomy response:", json.data);
    throw new Error("L'URL de paiement n'a pas été retournée par Djomy.");
  }

  return url;
}

/**
 * Verify Webhook Signature
 */
export function verifyWebhookSignature(headerSignature: string, rawBody: string): boolean {
  if (!headerSignature || !headerSignature.startsWith("v1:")) return false;
  
  const extractedSignature = headerSignature.substring(3);
  const expectedSignature = generateHmac(rawBody, DJOMY_CLIENT_SECRET);
  
  return extractedSignature === expectedSignature;
}
