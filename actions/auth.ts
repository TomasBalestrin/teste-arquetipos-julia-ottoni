"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { ActionResponse } from "@/types";

export async function signIn(
  email: string,
  password: string
): Promise<ActionResponse<{ redirectTo: string }>> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: "Email ou senha inválidos" };
  }

  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("email", email)
    .single();

  const redirectTo =
    userData?.role === "admin" ? "/admin" : "/dashboard";

  return { success: true, data: { redirectTo } };
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
