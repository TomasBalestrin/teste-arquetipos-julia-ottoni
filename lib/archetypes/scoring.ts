import type { ArchetypeScore, Answers, Top3Entry } from "@/types";
import { ARCHETYPES, TIEBREAK_ORDER } from "./archetypes";
import { QUESTIONS } from "./questions";

const PRIMARY_POINTS = 3;
const SECONDARY_POINTS = 1;

/** Calcula scores totais a partir de todas as respostas */
export function calculateScores(answers: Answers): ArchetypeScore {
  const scores: ArchetypeScore = {};
  ARCHETYPES.forEach((a) => (scores[a.slug] = 0));

  for (const questionId of Object.keys(answers)) {
    const answer = answers[questionId];
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (!question || !answer) continue;

    const option = question.options.find(
      (o) => o.label === answer.option
    );
    if (!option) continue;

    scores[option.primary_archetype] =
      (scores[option.primary_archetype] ?? 0) + PRIMARY_POINTS;
    scores[option.secondary_archetype] =
      (scores[option.secondary_archetype] ?? 0) + SECONDARY_POINTS;
  }

  return scores;
}

/** Extrai Top 3 com regra de desempate */
export function calculateTop3(scores: ArchetypeScore): Top3Entry[] {
  const sorted = Object.entries(scores).sort(([slugA, a], [slugB, b]) => {
    if (b !== a) return b - a;
    return TIEBREAK_ORDER.indexOf(slugA) - TIEBREAK_ORDER.indexOf(slugB);
  });

  return sorted.slice(0, 3).map(([archetype, score], i) => ({
    rank: i + 1,
    archetype,
    score,
  }));
}
