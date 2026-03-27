"use client";

import { useState } from "react";
import { toast } from "sonner";
import { QUESTIONS } from "@/lib/archetypes/questions";
import { saveAnswer, completeQuiz } from "@/actions/quiz";
import type { Top3Entry } from "@/types";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizEmail from "@/components/quiz/QuizEmail";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizResult from "@/components/quiz/QuizResult";

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [sessionId, setSessionId] = useState("");
  const [top3, setTop3] = useState<Top3Entry[]>([]);

  function handleStart() {
    setStep(2);
  }

  function handleEmail(id: string) {
    setSessionId(id);
    setStep(3);
  }

  async function handleAnswer(option: string) {
    const questionIndex = step - 3;
    const question = QUESTIONS[questionIndex];

    const result = await saveAnswer(sessionId, question.id, option);
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    if (step === 11) {
      const completeResult = await completeQuiz(sessionId);
      if (!completeResult.success) {
        toast.error(completeResult.error);
        return;
      }
      setTop3(completeResult.data!.top3);
      setStep(12);
    } else {
      setStep(step + 1);
    }
  }

  const showProgress = step >= 2 && step <= 11;

  return (
    <div className="mx-auto max-w-[680px] pb-16 pt-12">
      {showProgress && <QuizProgress currentStep={step} />}

      {step === 1 && <QuizIntro onStart={handleStart} />}

      {step === 2 && (
        <QuizEmail onSubmit={handleEmail} />
      )}

      {step >= 3 && step <= 11 && (
        <QuizQuestion
          key={step}
          question={QUESTIONS[step - 3]}
          questionNumber={step - 2}
          onAnswer={handleAnswer}
        />
      )}

      {step === 12 && <QuizResult top3={top3} />}
    </div>
  );
}
