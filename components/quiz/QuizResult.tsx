"use client";

import type { Top3Entry } from "@/types";
import ResultCard from "./ResultCard";
import ResultCardMobile from "./ResultCardMobile";
import OfferSection from "./OfferSection";

interface QuizResultProps {
  top3: Top3Entry[];
}

export default function QuizResult({ top3 }: QuizResultProps) {
  return (
    <div className="flex flex-col items-center pb-16 pt-4">
      <h2 className="text-center font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.08] tracking-[-0.02em] text-text">
        Seu resultado está pronto
      </h2>
      <p className="mt-3 font-body text-[16px] text-text-soft">
        Desbloqueie para ver seu perfil completo
      </p>

      {/* Mobile: 3 compact cards in a row */}
      <div className="mt-8 grid w-full grid-cols-3 gap-[10px] md:hidden">
        {top3.map((entry) => (
          <ResultCardMobile key={entry.rank} entry={entry} />
        ))}
      </div>

      {/* Desktop: full cards with blur + description */}
      <div className="mt-8 hidden w-full max-w-[900px] grid-cols-3 gap-5 md:grid">
        {top3.map((entry) => (
          <ResultCard key={entry.rank} entry={entry} />
        ))}
      </div>

      <OfferSection />
    </div>
  );
}
