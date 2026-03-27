"use client";

import { useState } from "react";
import type { Question } from "@/lib/archetypes/questions";

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  onAnswer: (option: string) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(label: string) {
    if (selected) return;
    setSelected(label);
    setTimeout(() => onAnswer(label), 600);
  }

  return (
    <div className="flex flex-col items-center">
      <span className="mb-3 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-dark">
        Pergunta {questionNumber} de 9
      </span>

      <h2 className="mb-8 max-w-lg text-center font-display text-[clamp(24px,4vw,32px)] font-bold leading-[1.08] tracking-[-0.02em] text-text">
        {question.text}
      </h2>

      <div className="flex w-full max-w-lg flex-col gap-3">
        {question.options.map((opt) => {
          const isSelected = selected === opt.label;
          return (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              disabled={selected !== null}
              className={`w-full cursor-pointer rounded-md border px-6 py-5 text-left font-body text-[15px] text-text transition-all duration-[180ms] ease-out ${
                isSelected
                  ? "border-2 border-primary bg-[rgba(205,163,40,0.08)]"
                  : "border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)] hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              } disabled:cursor-default`}
            >
              <span className="mr-3 font-semibold text-primary-dark">
                {opt.label})
              </span>
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
