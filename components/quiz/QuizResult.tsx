"use client";

import type { Top3Entry } from "@/types";
import QuizLogo from "./QuizLogo";
import ResultCard from "./ResultCard";
import ResultCardMobile from "./ResultCardMobile";
import ResultCopy from "./ResultCopy";
import OfferSection from "./OfferSection";

interface QuizResultProps {
  top3: Top3Entry[];
}

export default function QuizResult({ top3 }: QuizResultProps) {
  return (
    <div className="flex flex-col items-center pb-16 pt-4">
      <QuizLogo />

      {/* Tag */}
      <span className="mb-4 inline-flex rounded-pill bg-[rgba(205,163,40,0.12)] px-4 py-2 font-body text-[13px] font-semibold text-primary-dark">
        &#9989; Análise concluída
      </span>

      {/* Title */}
      <h2 className="text-center font-display text-[clamp(28px,4vw,38px)] font-bold leading-[1.15] tracking-[-0.02em] text-text">
        Seus arquétipos foram revelados.
      </h2>

      {/* Subtitle */}
      <p className="mx-auto mt-3 max-w-[600px] text-center font-body text-[15px] leading-[1.65] text-text-soft">
        Identificamos os arquétipos que controlam a forma como você pensa,
        se comunica e atrai ou repele as pessoas ao seu redor.{" "}
        <span className="italic font-medium">Mesmo sem você perceber.</span>
      </p>

      {/* Mobile: 3 compact cards in a row */}
      <div className="mt-9 grid w-full grid-cols-3 gap-[10px] md:hidden">
        {top3.map((entry) => (
          <ResultCardMobile key={entry.rank} entry={entry} />
        ))}
      </div>

      {/* Desktop: full cards with blur + shimmer */}
      <div className="mt-9 hidden w-full max-w-[900px] grid-cols-3 gap-5 md:grid">
        {top3.map((entry) => (
          <ResultCard key={entry.rank} entry={entry} />
        ))}
      </div>

      {/* Persuasive copy */}
      <ResultCopy />

      {/* Offer section */}
      <OfferSection />
    </div>
  );
}
