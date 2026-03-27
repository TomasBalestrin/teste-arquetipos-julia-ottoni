export interface Archetype {
  slug: string;
  name: string;
  motivation: string;
  fear: string;
}

export const ARCHETYPES: Archetype[] = [
  { slug: "inocente", name: "Inocente", motivation: "Ser feliz e viver em harmonia", fear: "Ser punido por algo errado" },
  { slug: "sabio", name: "Sábio", motivation: "Compreender o mundo pela verdade", fear: "Ser enganado ou ignorante" },
  { slug: "explorador", name: "Explorador", motivation: "Liberdade para descobrir quem é", fear: "Ficar preso ou se conformar" },
  { slug: "heroi", name: "Herói", motivation: "Provar seu valor por ações corajosas", fear: "Fraqueza e vulnerabilidade" },
  { slug: "mago", name: "Mago", motivation: "Transformar a realidade pela visão", fear: "Consequências negativas imprevistas" },
  { slug: "rebelde", name: "Rebelde", motivation: "Romper o que não funciona", fear: "Ser impotente ou irrelevante" },
  { slug: "cara_comum", name: "Cara Comum", motivation: "Pertencer e se conectar com todos", fear: "Ser excluído ou se destacar demais" },
  { slug: "amante", name: "Amante", motivation: "Criar conexão íntima e profunda", fear: "Ficar sozinho e não ser amado" },
  { slug: "bobo_da_corte", name: "Bobo da Corte", motivation: "Viver o momento com leveza e alegria", fear: "Ser entediante ou entediado" },
  { slug: "cuidador", name: "Cuidador", motivation: "Proteger e ajudar quem precisa", fear: "Egoísmo e ingratidão" },
  { slug: "criador", name: "Criador", motivation: "Dar forma a algo com significado duradouro", fear: "Mediocridade e falta de visão" },
  { slug: "governante", name: "Governante", motivation: "Criar ordem e prosperidade", fear: "Caos e perda de controle" },
];

/** Ordem de desempate — índice menor = maior prioridade */
export const TIEBREAK_ORDER: string[] = [
  "heroi", "mago", "sabio", "explorador", "criador", "amante",
  "rebelde", "cuidador", "governante", "cara_comum", "bobo_da_corte", "inocente",
];

export function getArchetypeName(slug: string): string {
  return ARCHETYPES.find((a) => a.slug === slug)?.name ?? slug;
}
