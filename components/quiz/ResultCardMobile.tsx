import type { Top3Entry } from "@/types";
import { ARCHETYPES } from "@/lib/archetypes/archetypes";
import { ARCHETYPE_ICONS, getMedalClass } from "@/lib/archetypes/icons";

interface ResultCardMobileProps {
  entry: Top3Entry;
}

export default function ResultCardMobile({ entry }: ResultCardMobileProps) {
  const archetype = ARCHETYPES.find((a) => a.slug === entry.archetype);
  if (!archetype) return null;

  const icon = ARCHETYPE_ICONS[entry.archetype] ?? "✦";
  const medalCls = getMedalClass(entry.rank);

  return (
    <div
      className="flex flex-col items-center gap-[10px] rounded-[20px] border border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)] px-3 py-5"
      style={{ boxShadow: "0 8px 30px rgba(17, 17, 17, 0.06)" }}
    >
      {/* Medal */}
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full font-body text-[14px] font-bold text-white ${medalCls}`}
      >
        {entry.rank}
      </div>

      {/* Icon */}
      <span className="text-[28px]">{icon}</span>

      {/* Blurred name */}
      <p
        className="select-none font-display text-[14px] font-semibold text-text"
        style={{
          filter: "blur(5px)",
          WebkitFilter: "blur(5px)",
          pointerEvents: "none",
        }}
      >
        {archetype.name}
      </p>
    </div>
  );
}
