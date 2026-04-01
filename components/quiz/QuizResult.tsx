"use client";

import QuizLogo from "./QuizLogo";
import OfferSection from "./OfferSection";

export default function QuizResult() {
  return (
    <div className="flex flex-col items-center pb-16 pt-4">
      <QuizLogo />

      <span className="mb-4 inline-flex rounded-pill bg-[rgba(205,163,40,0.12)] px-4 py-2 font-body text-[13px] font-semibold text-primary-dark">
        &#9989; Análise concluída
      </span>

      <h2 className="text-center font-display text-[clamp(25px,4vw,38px)] font-bold leading-[1.15] tracking-[-0.02em] text-text">
        Seu teste está pronto!
      </h2>

      <p className="mx-auto mt-3 max-w-[600px] text-center font-body text-[15px] leading-[1.65] text-text-soft">
        Desbloqueie agora para descobrir seu arquétipo dominante e
        transformar esse conhecimento em um posicionamento magnético.
      </p>

      <OfferSection />
    </div>
  );
}
