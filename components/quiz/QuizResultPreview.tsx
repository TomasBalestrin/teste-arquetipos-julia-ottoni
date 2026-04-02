"use client";

import { useEffect } from "react";
import type { Top3Entry } from "@/types";
import { ARCHETYPES } from "@/lib/archetypes/archetypes";
import { ARCHETYPE_ICONS } from "@/lib/archetypes/icons";
import { trackViewResult } from "@/lib/pixel/pixel";
import QuizLogo from "./QuizLogo";

interface QuizResultPreviewProps {
  top3: Top3Entry[];
  onNext: () => void;
}

export default function QuizResultPreview({
  top3,
  onNext,
}: QuizResultPreviewProps) {
  useEffect(() => { trackViewResult(); }, []);

  return (
    <div className="flex flex-col items-center pb-16 pt-4">
      <QuizLogo />

      {/* Badge */}
      <span className="mb-6 inline-flex items-center gap-2 rounded-pill bg-[#111111] px-4 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-white">
        &#9989; Análise concluída
      </span>

      <h2 className="text-center font-display text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-text md:text-[36px]">
        Seu Perfil de Arquétipos
      </h2>

      {/* 3 cards - NO horizontal scroll */}
      <div className="mt-6 grid w-full grid-cols-3 gap-3 md:gap-4">
        {top3.map((entry) => (
          <ArchetypeCard key={entry.rank} entry={entry} />
        ))}
      </div>

      {/* Persuasive text */}
      <div className="mx-auto mt-8 max-w-[560px] text-center md:text-left">
        <h3 className="font-display text-[22px] font-bold text-text md:text-[26px]">
          Parabéns por chegar até aqui!
        </h3>
        <div className="mt-4 space-y-4 font-body text-[15px] leading-[1.7] text-text-soft">
          <p>
            Você já deu o primeiro passo para entender quem você
            realmente é.
          </p>
          <p>
            Mas conhecer seus arquétipos é só o começo. Para ter
            resultados reais no seu posicionamento, você precisa
            aprender a aplicar isso na prática.
          </p>
          <p>
            No próximo nível, você vai descobrir seu arquétipo dominante
            e receber todo o material necessário para transformar esse
            conhecimento em ação.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-7 w-full max-w-[400px] rounded-pill bg-primary-dark px-8 py-4 font-body text-[15px] font-bold text-white transition-all duration-[180ms] hover:-translate-y-px hover:opacity-90 md:w-auto"
      >
        Quero ir para o próximo nível
      </button>
    </div>
  );
}

function ArchetypeCard({ entry }: { entry: Top3Entry }) {
  const archetype = ARCHETYPES.find((a) => a.slug === entry.archetype);
  if (!archetype) return null;

  const icon = ARCHETYPE_ICONS[entry.archetype] ?? "✦";
  const isFirst = entry.rank === 1;

  const border = isFirst
    ? "border-2 border-primary"
    : "border-[1.5px] border-border";

  const bg = isFirst ? "bg-[rgba(205,163,40,0.06)]" : "bg-white";

  const label = isFirst
    ? "Seu arquétipo dominante."
    : entry.rank === 2
    ? "Seu arquétipo secundário."
    : "Seu arquétipo terciário.";

  return (
    <div className={`relative flex flex-col items-center gap-2 rounded-[16px] p-4 text-center ${border} ${bg}`}>
      {isFirst && (
        <span className="absolute right-2 top-2 text-[14px]">&#128274;</span>
      )}

      {isFirst ? (
        <div className="pointer-events-none select-none" style={{ filter: "blur(6px)" }}>
          <span className="block text-[40px] md:text-[48px]">{icon}</span>
          <p className="font-display text-[16px] font-bold text-text md:text-[18px]">
            {archetype.name}
          </p>
        </div>
      ) : (
        <>
          <span className="text-[40px] md:text-[48px]">{icon}</span>
          <p className="font-display text-[16px] font-bold text-text md:text-[18px]">
            {archetype.name}
          </p>
        </>
      )}

      <span className={`font-body text-[11px] font-medium md:text-[12px] ${isFirst ? "text-primary-dark" : "text-text-soft"}`}>
        {label}
      </span>
    </div>
  );
}
