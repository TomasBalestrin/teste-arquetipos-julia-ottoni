"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResponse, Top3Entry, Module } from "@/types";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  must_reset_password: boolean;
  top3: Top3Entry[] | null;
}

export async function getUserProfile(
  userId: string
): Promise<ActionResponse<UserProfile>> {
  const supabase = createAdminClient();

  const { data: user, error: userErr } = await supabase
    .from("users")
    .select("id, email, name, must_reset_password")
    .eq("id", userId)
    .single();

  if (userErr || !user) {
    return { success: false, error: "Usuário não encontrado" };
  }

  const { data: session } = await supabase
    .from("test_sessions")
    .select("top_3")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return {
    success: true,
    data: {
      ...user,
      top3: (session?.top_3 as Top3Entry[] | null) ?? null,
    },
  };
}

export async function getModules(): Promise<ActionResponse<Module[]>> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (error) return { success: false, error: "Erro ao buscar módulos" };
  return { success: true, data: data as Module[] };
}

export async function createRetakeSession(): Promise<
  ActionResponse<{ sessionId: string }>
> {
  const { createClient } = await import("@/lib/supabase/server");
  const serverSupabase = createClient();
  const { data: { user: authUser } } = await serverSupabase.auth.getUser();

  if (!authUser) return { success: false, error: "Não autenticado" };

  const supabase = createAdminClient();

  const { data: dbUser } = await supabase
    .from("users")
    .select("email")
    .eq("id", authUser.id)
    .single();

  if (!dbUser) return { success: false, error: "Usuário não encontrado" };

  const { data, error } = await supabase
    .from("test_sessions")
    .insert({
      email: dbUser.email,
      user_id: authUser.id,
      status: "started",
      current_step: 1,
    })
    .select("id")
    .single();

  if (error) return { success: false, error: "Erro ao criar sessão" };
  return { success: true, data: { sessionId: data.id } };
}

export async function resetPassword(
  newPassword: string
): Promise<ActionResponse> {
  if (newPassword.length < 6) {
    return { success: false, error: "Senha deve ter no mínimo 6 caracteres" };
  }

  const { createClient } = await import("@/lib/supabase/server");
  const serverSupabase = createClient();
  const { data: { user } } = await serverSupabase.auth.getUser();

  if (!user) return { success: false, error: "Não autenticado" };

  const supabase = createAdminClient();

  const { error: authErr } = await supabase.auth.admin.updateUserById(
    user.id,
    { password: newPassword }
  );

  if (authErr) {
    console.error("resetPassword auth error:", authErr.message);
    return { success: false, error: "Erro ao atualizar senha" };
  }

  await supabase
    .from("users")
    .update({ must_reset_password: false })
    .eq("id", user.id);

  return { success: true };
}
