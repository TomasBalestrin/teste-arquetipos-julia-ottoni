"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "./admin";
import type { ActionResponse } from "@/types";

interface SiteSettingsData {
  checkout_url: string;
  facebook_pixel_id: string;
}

export async function getSiteSettings(): Promise<ActionResponse<SiteSettingsData>> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["checkout_url", "facebook_pixel_id"]);

  if (error) return { success: false, error: "Erro ao buscar configurações" };

  const settings: SiteSettingsData = { checkout_url: "", facebook_pixel_id: "" };
  for (const row of data ?? []) {
    if (row.key === "checkout_url") settings.checkout_url = row.value;
    if (row.key === "facebook_pixel_id") settings.facebook_pixel_id = row.value;
  }

  return { success: true, data: settings };
}

export async function updateSiteSetting(
  key: string,
  value: string
): Promise<ActionResponse> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }

  const allowed = ["checkout_url", "facebook_pixel_id"];
  if (!allowed.includes(key)) {
    return { success: false, error: "Configuração não permitida" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ value })
    .eq("key", key);

  if (error) return { success: false, error: "Erro ao salvar configuração" };
  return { success: true };
}
