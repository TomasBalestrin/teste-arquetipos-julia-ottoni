"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "./admin";
import type { ActionResponse, Module, Lesson } from "@/types";

const moduleSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  sort_order: z.number().int().min(0),
  status: z.enum(["active", "inactive"]),
});

const lessonSchema = z.object({
  module_id: z.string().uuid(),
  title: z.string().min(1, "Título obrigatório"),
  content_type: z.enum(["link", "iframe"]),
  content_url: z.string().url("URL inválida"),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  sort_order: z.number().int().min(0),
  status: z.enum(["active", "inactive"]),
});

export async function getAdminModules(): Promise<ActionResponse<Module[]>> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("modules").select("*").order("sort_order");
  if (error) return { success: false, error: "Erro ao buscar módulos" };
  return { success: true, data: data as Module[] };
}

export async function createModule(
  input: z.infer<typeof moduleSchema>
): Promise<ActionResponse> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const parsed = moduleSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };
  const supabase = createAdminClient();
  const { error } = await supabase.from("modules").insert(parsed.data);
  if (error) return { success: false, error: "Erro ao criar módulo" };
  return { success: true };
}

export async function updateModule(
  id: string, input: z.infer<typeof moduleSchema>
): Promise<ActionResponse> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const parsed = moduleSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };
  const supabase = createAdminClient();
  const { error } = await supabase.from("modules").update(parsed.data).eq("id", id);
  if (error) return { success: false, error: "Erro ao atualizar módulo" };
  return { success: true };
}

export async function deleteModule(id: string): Promise<ActionResponse> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const supabase = createAdminClient();
  const { error } = await supabase.from("modules").delete().eq("id", id);
  if (error) return { success: false, error: "Erro ao excluir módulo" };
  return { success: true };
}

export async function getAdminLessons(): Promise<ActionResponse<(Lesson & { module_name: string })[]>> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lessons").select("*, modules(name)").order("sort_order");
  if (error) return { success: false, error: "Erro ao buscar aulas" };
  const mapped = (data ?? []).map((l) => ({
    ...l,
    module_name: (l.modules as { name: string } | null)?.name ?? "",
  }));
  return { success: true, data: mapped as (Lesson & { module_name: string })[] };
}

export async function createLesson(
  input: z.infer<typeof lessonSchema>
): Promise<ActionResponse> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const parsed = lessonSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };
  const supabase = createAdminClient();
  const payload = { ...parsed.data, cover_image_url: parsed.data.cover_image_url || null };
  const { error } = await supabase.from("lessons").insert(payload);
  if (error) return { success: false, error: "Erro ao criar aula" };
  return { success: true };
}

export async function updateLesson(
  id: string, input: z.infer<typeof lessonSchema>
): Promise<ActionResponse> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const parsed = lessonSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };
  const supabase = createAdminClient();
  const payload = { ...parsed.data, cover_image_url: parsed.data.cover_image_url || null };
  const { error } = await supabase.from("lessons").update(payload).eq("id", id);
  if (error) return { success: false, error: "Erro ao atualizar aula" };
  return { success: true };
}

export async function deleteLesson(id: string): Promise<ActionResponse> {
  try { await requireAdmin(); } catch { return { success: false, error: "Sem permissão" }; }
  const supabase = createAdminClient();
  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if (error) return { success: false, error: "Erro ao excluir aula" };
  return { success: true };
}
