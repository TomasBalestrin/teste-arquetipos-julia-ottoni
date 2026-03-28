"use client";

import { Suspense } from "react";
import QuizFlow from "@/components/quiz/QuizFlow";

export default function QuizPage() {
  return (
    <Suspense>
      <QuizFlow />
    </Suspense>
  );
}
