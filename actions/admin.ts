"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResponse } from "@/types";

/** Verifies current user is admin. Returns userId or throws. */
export async function requireAdmin(): Promise<string> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const admin = createAdminClient();
  const { data } = await admin
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!data || data.role !== "admin") throw new Error("Not admin");
  return user.id;
}

interface DashboardData {
  totalLeads: number;
  totalPurchases: number;
  totalUsers: number;
  conversionRate: number;
  recentLeads: { email: string; status: string; created_at: string }[];
  recentPurchases: { email: string; transaction_id: string; created_at: string }[];
}

export async function getAdminDashboard(): Promise<ActionResponse<DashboardData>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Sem permissão" };
  }

  const supabase = createAdminClient();

  const [leadsRes, purchasesRes, usersRes, recentLeadsRes, recentPurchasesRes] =
    await Promise.all([
      supabase.from("test_sessions").select("id", { count: "exact", head: true }),
      supabase.from("purchases").select("id", { count: "exact", head: true }).eq("status", "approved"),
      supabase.from("users").select("id", { count: "exact", head: true }).eq("role", "user"),
      supabase.from("test_sessions").select("email, status, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("purchases").select("email, transaction_id, created_at").order("created_at", { ascending: false }).limit(5),
    ]);

  const totalLeads = leadsRes.count ?? 0;
  const totalPurchases = purchasesRes.count ?? 0;
  const totalUsers = usersRes.count ?? 0;
  const conversionRate = totalLeads > 0
    ? Math.round((totalPurchases / totalLeads) * 1000) / 10
    : 0;

  return {
    success: true,
    data: {
      totalLeads,
      totalPurchases,
      totalUsers,
      conversionRate,
      recentLeads: recentLeadsRes.data ?? [],
      recentPurchases: recentPurchasesRes.data ?? [],
    },
  };
}
