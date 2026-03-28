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
      {/* Decorative icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] bg-[rgba(205,163,40,0.12)]">
        <span className="font-display text-[28px] font-bold text-primary-dark">
          A
        </span>
      </div>

      <h1 className="max-w-lg font-display text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.02em] text-text">
        Descubra seus Arquétipos
      </h1>

      <p className="mt-5 max-w-md font-body text-[17px] leading-[1.65] text-text-soft">
        Responda 9 perguntas e descubra quais arquétipos guiam
        sua personalidade, suas escolhas e seus padrões mais profundos.
      </p>

      <button
        onClick={onStart}
        className="mt-10 rounded-pill bg-primary px-10 py-[18px] font-body text-[17px] font-semibold text-[#17120a] transition-all duration-[180ms] ease-out hover:-translate-y-px hover:shadow-lg"
      >
        Começar o Teste
      </button>

      <p className="mt-4 font-body text-[13px] text-text-soft/60">
        Leva menos de 3 minutos
      </p>
    </div>
  );
}
