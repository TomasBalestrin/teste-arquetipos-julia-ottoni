/** Emoji icons for each archetype (used in mobile result cards) */
export const ARCHETYPE_ICONS: Record<string, string> = {
  heroi: "\u{1F6E1}\uFE0F",
  mago: "\u2728",
  sabio: "\uD83D\uDCDA",
  explorador: "\uD83E\uDDED",
  criador: "\uD83C\uDFA8",
  amante: "\u2764\uFE0F",
  rebelde: "\uD83D\uDD25",
  cuidador: "\uD83E\uDE77",
  governante: "\uD83D\uDC51",
  cara_comum: "\uD83E\uDEF6",
  bobo_da_corte: "\uD83D\uDE04",
  inocente: "\u2600\uFE0F",
};

const MEDAL_STYLES = [
  "bg-gradient-to-br from-[#CDA328] to-[#E1BE56]",
  "bg-gradient-to-br from-[#A8A8A8] to-[#C0C0C0]",
  "bg-gradient-to-br from-[#B87333] to-[#CD853F]",
];

export function getMedalClass(rank: number): string {
  return MEDAL_STYLES[rank - 1] ?? MEDAL_STYLES[2];
}
