"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { QUESTIONS } from "@/lib/archetypes/questions";
import { saveAnswer, completeQuiz } from "@/actions/quiz";
import type { Top3Entry } from "@/types";
import QuizIntro from "./QuizIntro";
import QuizEmailCapture from "./QuizEmailCapture";
import QuizStep from "./QuizStep";
import QuizProgress from "./QuizProgress";
import QuizResult from "./QuizResult";

export default function QuizFlow() {
  const searchParams = useSearchParams();
  const retakeSessionId = searchParams.get("session");

  const [step, setStep] = useState(retakeSessionId ? 3 : 1);
  const [sessionId, setSessionId] = useState(retakeSessionId ?? "");
  const [top3, setTop3] = useState<Top3Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"in" | "out">("in");

  const advanceStep = useCallback((nextStep: number) => {
    setSlideDir("out");
    setAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setSlideDir("in");
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  }, []);

  function handleStart() {
    advanceStep(2);
  }

  function handleEmail(id: string) {
    setSessionId(id);
    advanceStep(3);
  }

  async function handleAnswer(option: string) {
    const questionIndex = step - 3;
    const question = QUESTIONS[questionIndex];
    setLoading(true);

    const result = await saveAnswer(sessionId, question.id, option);
    if (!result.success) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    if (step === 11) {
      const completeResult = await completeQuiz(sessionId);
      if (!completeResult.success) {
        toast.error(completeResult.error);
        setLoading(false);
        return;
      }
      setTop3(completeResult.data!.top3);
      setLoading(false);
      advanceStep(12);
    } else {
      setLoading(false);
      advanceStep(step + 1);
    }
  }

  const showProgress = step >= 3 && step <= 11;

  const transitionCls = animating
    ? slideDir === "out"
      ? "translate-x-[-30px] opacity-0"
      : "translate-x-[30px] opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div className="mx-auto max-w-[760px] px-4 pb-16 pt-10">
      {showProgress && <QuizProgress currentStep={step} />}

      <div className={`transition-all duration-300 ease-out ${transitionCls}`}>
        {step === 1 && <QuizIntro onStart={handleStart} />}
        {step === 2 && <QuizEmailCapture onSubmit={handleEmail} />}
        {step >= 3 && step <= 11 && (
          <QuizStep
            key={step}
            question={QUESTIONS[step - 3]}
            questionNumber={step - 2}
            onAnswer={handleAnswer}
            loading={loading}
          />
        )}
        {step === 12 && <QuizResult top3={top3} />}
      </div>
    </div>
  );
}
