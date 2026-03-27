"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Top3Entry } from "@/types";
import { getArchetypeName } from "@/lib/archetypes/archetypes";
import { trackClickCTA } from "@/lib/pixel/pixel";
import { getCheckoutUrl } from "@/actions/quiz";

interface QuizResultProps {
  top3: Top3Entry[];
}

export default function QuizResult({ top3 }: QuizResultProps) {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    getCheckoutUrl().then((res) => {
      if (res.success && res.data?.url) setCheckoutUrl(res.data.url);
    });
  }, []);

  function handleCTA() {
    trackClickCTA();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      toast.info("Em breve! O checkout será liberado em breve.");
    }
  }

  return (
    <div className="flex flex-col items-center pt-4">
      <h2 className="text-center font-display text-[clamp(26px,4vw,36px)] font-bold leading-[1.08] tracking-[-0.02em] text-text">
        Seus 3 Arquétipos Principais
      </h2>

      <div className="mt-10 flex w-full max-w-lg flex-col gap-4">
        {top3.map((entry) => (
          <ResultCard key={entry.rank} entry={entry} />
        ))}
      </div>

      <p className="mt-10 max-w-md text-center font-body text-[15px] leading-[1.65] text-text-soft">
        Quer entender o que seus arquétipos revelam sobre você?
      </p>

      <button
        onClick={handleCTA}
        className="mt-6 w-full max-w-md rounded-pill bg-primary-dark px-8 py-[18px] font-body text-[17px] font-semibold text-white transition-all duration-[180ms] ease-out hover:-translate-y-0.5 hover:shadow-lg"
      >
        Desbloquear Resultado Completo
      </button>
    </div>
  );
}

function ResultCard({ entry }: { entry: Top3Entry }) {
  const isFirst = entry.rank === 1;
  return (
    <div
      className={`flex items-center gap-5 rounded-lg ${
        isFirst
          ? "border-2 border-primary p-7"
          : "border border-[rgba(221,212,200,0.8)] p-6"
      }`}
      style={
        isFirst
          ? {
              background:
                "linear-gradient(180deg, rgba(205,163,40,0.06) 0%, transparent 100%)",
            }
          : { background: "rgba(255,255,255,0.78)" }
      }
    >
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-primary font-body text-[16px] font-bold text-white">
        {entry.rank}º
      </div>
      <div>
        <p
          className={`font-display font-bold tracking-[-0.02em] text-text ${
            isFirst ? "text-[28px]" : "text-[22px]"
          }`}
        >
          {getArchetypeName(entry.archetype)}
        </p>
        <p className="mt-0.5 font-body text-[13px] text-text-soft">
          {entry.score} pontos
        </p>
      </div>
    </div>
  );
}
