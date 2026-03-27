"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResponse } from "@/types";

const DEFAULT_PASSWORD = "julia123";

export async function processApprovedPurchase(
  email: string,
  transactionId: string,
  productId: string,
  amountCents: number
): Promise<ActionResponse> {
  const supabase = createAdminClient();

  // Idempotência: verificar se transaction_id já existe
  const { data: existing } = await supabase
    .from("purchases")
    .select("id")
    .eq("transaction_id", transactionId)
    .single();

  if (existing) return { success: true };

  // Buscar test_session mais recente pelo email
  const { data: session } = await supabase
    .from("test_sessions")
    .select("id")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Verificar se user já existe
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  let userId: string;

  if (existingUser) {
    userId = existingUser.id;
    await supabase
      .from("users")
      .update({ access_granted: true })
      .eq("id", userId);
  } else {
    // Criar user no Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password: DEFAULT_PASSWORD,
        email_confirm: true,
      });

    if (authError) {
      console.error("Auth createUser error:", authError.message);
      return { success: false, error: "Erro ao criar usuário" };
    }

    userId = authData.user.id;

    // Inserir na tabela users com mesmo id do auth
    const { error: insertErr } = await supabase.from("users").insert({
      id: userId,
      email,
      role: "user",
      access_granted: true,
      password_hash: "managed_by_supabase_auth",
      must_reset_password: true,
    });

    if (insertErr) {
      console.error("Insert user error:", insertErr.message);
      return { success: false, error: "Erro ao registrar usuário" };
    }
  }

  // Vincular test_session ao user
  if (session) {
    await supabase
      .from("test_sessions")
      .update({ user_id: userId })
      .eq("id", session.id);
  }

  // Criar purchase
  const { error: purchaseErr } = await supabase.from("purchases").insert({
    session_id: session?.id ?? null,
    user_id: userId,
    email,
    transaction_id: transactionId,
    hotmart_product_id: productId,
    status: "approved",
    amount_cents: amountCents,
  });

  if (purchaseErr) {
    console.error("Insert purchase error:", purchaseErr.message);
    return { success: false, error: "Erro ao registrar compra" };
  }

  return { success: true };
}

export async function processRefund(
  transactionId: string
): Promise<ActionResponse> {
  const supabase = createAdminClient();

  const { data: purchase } = await supabase
    .from("purchases")
    .select("id, user_id")
    .eq("transaction_id", transactionId)
    .single();

  if (!purchase) return { success: true };

  await supabase
    .from("purchases")
    .update({ status: "refunded" })
    .eq("id", purchase.id);

  if (purchase.user_id) {
    await supabase
      .from("users")
      .update({ access_granted: false })
      .eq("id", purchase.user_id);
  }

  return { success: true };
}
