"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/pixel/pixel";

interface QuizIntroProps {
  onStart: () => void;
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.02em] text-text">
        Descubra seus Arquétipos
      </h1>
      <p className="mt-5 max-w-md font-body text-[17px] leading-[1.65] text-text-soft">
        Responda 9 perguntas e descubra quais arquétipos
        guiam sua personalidade
      </p>
      <button
        onClick={onStart}
        className="mt-10 rounded-pill bg-primary-dark px-8 py-[18px] font-body text-[17px] font-semibold text-white transition-transform duration-[180ms] ease-out hover:-translate-y-px"
      >
        Começar o Teste
      </button>
    </div>
  );
}
