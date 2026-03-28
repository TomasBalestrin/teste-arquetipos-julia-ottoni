import type { Top3Entry } from "@/types";
import { ARCHETYPES } from "@/lib/archetypes/archetypes";

interface ResultCardProps {
  entry: Top3Entry;
}

export default function ResultCard({ entry }: ResultCardProps) {
  const archetype = ARCHETYPES.find((a) => a.slug === entry.archetype);
  if (!archetype) return null;

  return (
    <div
      className="relative min-h-[200px] overflow-hidden rounded-[24px] border border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)] p-7"
      style={{ boxShadow: "0 18px 50px rgba(17, 17, 17, 0.08)" }}
    >
      {/* Visible label */}
      <span className="font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-primary-dark">
        Top {entry.rank}
      </span>

      {/* Blurred content */}
      <div
        className="mt-3 select-none pointer-events-none"
        style={{ filter: "blur(8px)", WebkitFilter: "blur(8px)" }}
        aria-hidden="true"
      >
        <p className="font-display text-[26px] font-semibold text-text">
          {archetype.name}
        </p>
        <p className="mt-2 font-body text-[14px] leading-[1.65] text-text-soft">
          {archetype.motivation}. Seu medo central é: {archetype.fear.toLowerCase()}.
          Este arquétipo influencia suas escolhas mais profundas.
        </p>
      </div>

      {/* Lock overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(2px)",
          top: 50,
        }}
      >
        <span className="text-[20px]">&#128274;</span>
        <span className="mt-1 font-body text-[13px] font-medium text-primary-dark">
          Desbloquear
        </span>
      </div>
    </div>
  );
}
