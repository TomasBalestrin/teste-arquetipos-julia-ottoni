"use client";

import { useState } from "react";
import type { Question, OptionLetter } from "@/lib/archetypes/questions";
import QuizLogo from "./QuizLogo";
import QuizProgress from "./QuizProgress";
import QuizOptionCard from "./QuizOptionCard";

interface QuizStepProps {
  question: Question;
  questionNumber: number;
  currentStep: number;
  onAnswer: (option: string) => void;
  loading: boolean;
}

export default function QuizStep({
  question,
  questionNumber,
  currentStep,
  onAnswer,
  loading,
}: QuizStepProps) {
  const [selected, setSelected] = useState<OptionLetter | null>(null);

  function handleNext() {
    if (!selected) return;
    onAnswer(selected);
  }

  return (
    <div className="flex flex-col items-center">
      <QuizLogo />

      <h2 className="max-w-xl text-center font-display text-[clamp(22px,4vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
        {question.text}
      </h2>

      <QuizProgress currentStep={currentStep} />

      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 md:grid-cols-2 md:gap-[14px]">
        {question.options.map((opt) => (
          <QuizOptionCard
            key={opt.label}
            letter={opt.label}
            text={opt.text}
            selected={selected === opt.label}
            onClick={() => setSelected(opt.label)}
            disabled={loading}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selected || loading}
        className="mt-8 rounded-pill bg-primary px-8 py-4 font-body text-[16px] font-semibold text-[#17120a] transition-all duration-[180ms] ease-out hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "Salvando..." : "Próxima"}
      </button>
    </div>
  );
}
