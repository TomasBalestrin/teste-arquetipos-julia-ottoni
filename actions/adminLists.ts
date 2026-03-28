"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "./admin";
import type { ActionResponse } from "@/types";

const PAGE_SIZE = 20;

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getLeads(
  page: number = 1
): Promise<ActionResponse<PaginatedResult<Record<string, unknown>>>> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }

  const supabase = createAdminClient();
  const from = (page - 1) * PAGE_SIZE;

  const { data, count, error } = await supabase
    .from("test_sessions")
    .select("id, email, status, top_3, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (error) return { success: false, error: "Erro ao buscar leads" };

  return {
    success: true,
    data: {
      items: data ?? [],
      total: count ?? 0,
      page,
      totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
    },
  };
}

export async function getPurchases(
  page: number = 1
): Promise<ActionResponse<PaginatedResult<Record<string, unknown>>>> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }

  const supabase = createAdminClient();
  const from = (page - 1) * PAGE_SIZE;

  const { data, count, error } = await supabase
    .from("purchases")
    .select("id, email, transaction_id, status, amount_cents, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (error) return { success: false, error: "Erro ao buscar compras" };

  return {
    success: true,
    data: {
      items: data ?? [],
      total: count ?? 0,
      page,
      totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
    },
  };
}

export async function getUsers(
  page: number = 1
): Promise<ActionResponse<PaginatedResult<Record<string, unknown>>>> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }

  const supabase = createAdminClient();
  const from = (page - 1) * PAGE_SIZE;

  const { data, count, error } = await supabase
    .from("users")
    .select("id, email, name, access_granted, must_reset_password, created_at", { count: "exact" })
    .eq("role", "user")
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (error) return { success: false, error: "Erro ao buscar usuários" };

  return {
    success: true,
    data: {
      items: data ?? [],
      total: count ?? 0,
      page,
      totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
    },
  };
}
