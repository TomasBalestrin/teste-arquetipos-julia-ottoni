import type { Top3Entry } from "@/types";
import { ARCHETYPES } from "@/lib/archetypes/archetypes";

interface ArchetypeDetailProps {
  entry: Top3Entry;
}

export default function ArchetypeDetail({ entry }: ArchetypeDetailProps) {
  const archetype = ARCHETYPES.find((a) => a.slug === entry.archetype);
  if (!archetype) return null;

  const isFirst = entry.rank === 1;

  return (
    <div
      className={`rounded-lg p-8 ${
        isFirst
          ? "border-2 border-primary bg-[rgba(205,163,40,0.04)]"
          : "border border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)]"
      }`}
    >
      <div className="flex items-center gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-body text-[18px] font-bold text-white">
          {entry.rank}º
        </div>
        <h3
          className={`font-display font-bold tracking-[-0.02em] text-text ${
            isFirst ? "text-[32px]" : "text-[26px]"
          }`}
        >
          {archetype.name}
        </h3>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <span className="font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-dark">
            Motivação central
          </span>
          <p className="mt-1 font-body text-[15px] leading-[1.65] text-text-soft">
            {archetype.motivation}
          </p>
        </div>
        <div>
          <span className="font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-dark">
            Medo central
          </span>
          <p className="mt-1 font-body text-[15px] leading-[1.65] text-text-soft">
            {archetype.fear}
          </p>
        </div>
      </div>
    </div>
  );
}
