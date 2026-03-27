import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateHottok } from "@/lib/hotmart/validate";
import { processApprovedPurchase, processRefund } from "@/actions/webhook";

const payloadSchema = z.object({
  hottok: z.string(),
  event: z.string(),
  data: z.object({
    buyer: z.object({
      email: z.string().email(),
      name: z.string().optional(),
    }),
    purchase: z.object({
      transaction: z.string(),
      status: z.string(),
      price: z.object({ value: z.number() }),
    }),
    product: z.object({ id: z.number() }),
  }),
});

const APPROVED_EVENTS = ["PURCHASE_APPROVED", "PURCHASE_COMPLETE"];
const REFUND_EVENTS = ["PURCHASE_REFUNDED", "PURCHASE_CANCELED"];

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const payload = parsed.data;

  // Validar hottok
  const supabase = createAdminClient();
  const { data: setting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "hotmart_webhook_secret")
    .single();

  if (!setting || !validateHottok(payload.hottok, setting.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { event, data } = payload;

  if (APPROVED_EVENTS.includes(event)) {
    const amountCents = Math.round(data.purchase.price.value * 100);
    const result = await processApprovedPurchase(
      data.buyer.email,
      data.purchase.transaction,
      String(data.product.id),
      amountCents
    );

    if (!result.success) {
      console.error("Webhook processApprovedPurchase failed:", result.error);
    }
  } else if (REFUND_EVENTS.includes(event)) {
    const result = await processRefund(data.purchase.transaction);

    if (!result.success) {
      console.error("Webhook processRefund failed:", result.error);
    }
  }

  // Sempre retornar 200 para a Hotmart não reenviar
  return NextResponse.json({ received: true }, { status: 200 });
}
