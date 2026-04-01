"use client";

import { useEffect } from "react";
import type { Top3Entry } from "@/types";
import { ARCHETYPES } from "@/lib/archetypes/archetypes";
import { ARCHETYPE_ICONS, getMedalClass } from "@/lib/archetypes/icons";
import { trackViewResult } from "@/lib/pixel/pixel";
import QuizLogo from "./QuizLogo";

interface QuizResultPreviewProps {
  top3: Top3Entry[];
  onNext: () => void;
}

export default function QuizResultPreview({ top3, onNext }: QuizResultPreviewProps) {
  useEffect(() => { trackViewResult(); }, []);

  return (
    <div className="flex flex-col items-center pb-16 pt-4">
      <QuizLogo />

      <h2 className="text-center font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-text">
        Seu Perfil de Arquétipos
      </h2>

      {/* 3 cards side by side */}
      <div className="mt-8 flex w-full justify-center gap-4 overflow-x-auto px-2 md:gap-6">
        {top3.map((entry) => (
          <ArchetypeCard key={entry.rank} entry={entry} />
        ))}
      </div>

      {/* Persuasive text */}
      <div className="mx-auto mt-10 max-w-[600px] text-center">
        <h3 className="font-display text-[24px] font-bold text-text">
          Parabéns por chegar até aqui!
        </h3>
        <div className="mt-5 space-y-4 font-body text-[15px] leading-[1.7] text-text-soft">
          <p>Você já deu o primeiro passo para entender quem você realmente é.</p>
          <p>
            Mas conhecer seus arquétipos é só o começo. Para ter resultados
            reais no seu posicionamento, você precisa aprender a aplicar
            isso na prática.
          </p>
          <p>
            No próximo nível, você vai descobrir seu arquétipo dominante e
            receber todo o material necessário para transformar esse
            conhecimento em ação.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-8 rounded-pill bg-primary-dark px-8 py-4 font-body text-[16px] font-bold text-white transition-all duration-[180ms] hover:-translate-y-0.5"
      >
        Quero ir para o próximo nível &rarr;
      </button>
    </div>
  );
}

function ArchetypeCard({ entry }: { entry: Top3Entry }) {
  const archetype = ARCHETYPES.find((a) => a.slug === entry.archetype);
  if (!archetype) return null;

  const icon = ARCHETYPE_ICONS[entry.archetype] ?? "✦";
  const isFirst = entry.rank === 1;
  const medalCls = getMedalClass(entry.rank);

  const borderColor = isFirst
    ? "border-2 border-primary"
    : entry.rank === 2
    ? "border-[1.5px] border-[#C0C0C0]"
    : "border-[1.5px] border-[#CD7F32]";

  const bg = isFirst
    ? "bg-[rgba(205,163,40,0.08)]"
    : "bg-[rgba(255,255,255,0.78)]";

  return (
    <div
      className={`relative flex min-w-[110px] flex-col items-center gap-3 rounded-[28px] px-5 py-6 text-center ${borderColor} ${bg}`}
      style={{ boxShadow: "0 8px 30px rgba(17, 17, 17, 0.06)" }}
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-full font-body text-[14px] font-bold text-white ${medalCls}`}>
        {entry.rank}
      </div>

      {isFirst ? (
        <>
          <span
            className="select-none text-[28px]"
            style={{ filter: "blur(8px)", pointerEvents: "none" }}
          >{icon}</span>
          <p
            className="select-none font-display text-[18px] font-semibold text-text"
            style={{ filter: "blur(8px)", pointerEvents: "none" }}
          >{archetype.name}</p>
          <span className="font-body text-[13px] font-semibold text-primary-dark">
            &#128274; Seu arquétipo dominante
          </span>
        </>
      ) : (
        <>
          <span className="text-[28px]">{icon}</span>
          <p className="font-display text-[18px] font-semibold text-text md:text-[20px]">
            {archetype.name}
          </p>
        </>
      )}
    </div>
  );
}
