"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResponse, Module, Lesson } from "@/types";

interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export async function getModuleWithLessons(
  moduleId: string
): Promise<ActionResponse<ModuleWithLessons>> {
  const supabase = createAdminClient();

  const { data: mod, error: modErr } = await supabase
    .from("modules")
    .select("*")
    .eq("id", moduleId)
    .single();

  if (modErr || !mod) {
    return { success: false, error: "Módulo não encontrado" };
  }

  const { data: lessons, error: lessErr } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", moduleId)
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (lessErr) return { success: false, error: "Erro ao buscar aulas" };

  return {
    success: true,
    data: { ...(mod as Module), lessons: lessons as Lesson[] },
  };
}

export async function getAllLessons(): Promise<
  ActionResponse<ModuleWithLessons[]>
> {
  const supabase = createAdminClient();

  const { data: modules, error: modErr } = await supabase
    .from("modules")
    .select("*")
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (modErr) return { success: false, error: "Erro ao buscar módulos" };

  const result: ModuleWithLessons[] = [];
  for (const mod of modules as Module[]) {
    const { data: lessons } = await supabase
      .from("lessons")
      .select("*")
      .eq("module_id", mod.id)
      .eq("status", "active")
      .order("sort_order", { ascending: true });

    result.push({ ...mod, lessons: (lessons as Lesson[]) ?? [] });
  }

  return { success: true, data: result };
}
