export type ArchetypeSlug =
  | "inocente" | "sabio" | "explorador" | "heroi"
  | "mago" | "rebelde" | "cara_comum" | "amante"
  | "bobo_da_corte" | "cuidador" | "criador" | "governante";

export type OptionLetter = "A" | "B" | "C" | "D" | "E" | "F";

export interface QuestionOption {
  label: OptionLetter;
  text: string;
  primary_archetype: ArchetypeSlug;
  secondary_archetype: ArchetypeSlug;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

import { QUESTIONS_PART1 } from "./questionsData";
import { QUESTIONS_PART2 } from "./questionsData2";

export const QUESTIONS: Question[] = [
  ...QUESTIONS_PART1,
  ...QUESTIONS_PART2,
];
