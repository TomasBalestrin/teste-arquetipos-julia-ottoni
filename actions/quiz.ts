"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { calculateScores, calculateTop3 } from "@/lib/archetypes/scoring";
import { QUESTIONS } from "@/lib/archetypes/questions";
import type { ActionResponse, Answers, Top3Entry } from "@/types";

const emailSchema = z.string().email("Email inválido");

const answerSchema = z.object({
  sessionId: z.string().uuid(),
  questionId: z.string().regex(/^q[1-9]$/),
  option: z.enum(["A", "B", "C", "D"]),
});

export async function createTestSession(
  email: string
): Promise<ActionResponse<{ sessionId: string }>> {
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return { success: false, error: "Email inválido" };
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("test_sessions")
    .insert({ email: parsed.data, status: "started", current_step: 1 })
    .select("id")
    .single();

  if (error) {
    console.error("createTestSession error:", error.message);
    return { success: false, error: "Erro ao iniciar o teste" };
  }

  return { success: true, data: { sessionId: data.id } };
}

export async function saveAnswer(
  sessionId: string,
  questionId: string,
  option: string
): Promise<ActionResponse> {
  const parsed = answerSchema.safeParse({ sessionId, questionId, option });
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos" };
  }

  const question = QUESTIONS.find((q) => q.id === parsed.data.questionId);
  if (!question) return { success: false, error: "Pergunta não encontrada" };

  const selected = question.options.find((o) => o.label === parsed.data.option);
  if (!selected) return { success: false, error: "Opção inválida" };

  const supabase = createAdminClient();

  const { data: session, error: fetchErr } = await supabase
    .from("test_sessions")
    .select("answers")
    .eq("id", parsed.data.sessionId)
    .single();

  if (fetchErr || !session) {
    return { success: false, error: "Sessão não encontrada" };
  }

  const answers: Answers = {
    ...(session.answers as Answers),
    [parsed.data.questionId]: {
      option: parsed.data.option,
      archetype_scores: {
        [selected.primary_archetype]: 3,
        [selected.secondary_archetype]: 1,
      },
    },
  };

  const scores = calculateScores(answers);
  const questionIndex = QUESTIONS.findIndex((q) => q.id === parsed.data.questionId);
  const currentStep = questionIndex + 3; // etapas 3-11

  const { error: updateErr } = await supabase
    .from("test_sessions")
    .update({ answers, scores, current_step: currentStep, status: "in_progress" })
    .eq("id", parsed.data.sessionId);

  if (updateErr) {
    console.error("saveAnswer error:", updateErr.message);
    return { success: false, error: "Erro ao salvar resposta" };
  }

  return { success: true };
}

export async function completeQuiz(
  sessionId: string
): Promise<ActionResponse<{ top3: Top3Entry[] }>> {
  const parsed = z.string().uuid().safeParse(sessionId);
  if (!parsed.success) return { success: false, error: "ID inválido" };

  const supabase = createAdminClient();

  const { data: session, error: fetchErr } = await supabase
    .from("test_sessions")
    .select("scores")
    .eq("id", parsed.data)
    .single();

  if (fetchErr || !session) {
    return { success: false, error: "Sessão não encontrada" };
  }

  const top3 = calculateTop3(session.scores as Record<string, number>);

  const { error: updateErr } = await supabase
    .from("test_sessions")
    .update({ top_3: top3, status: "completed", current_step: 12 })
    .eq("id", parsed.data);

  if (updateErr) {
    console.error("completeQuiz error:", updateErr.message);
    return { success: false, error: "Erro ao finalizar o teste" };
  }

  return { success: true, data: { top3 } };
}

export async function getCheckoutUrl(): Promise<ActionResponse<{ url: string }>> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "checkout_url")
    .single();

  if (error || !data) {
    return { success: false, error: "URL não configurada" };
  }

  return { success: true, data: { url: data.value } };
}
