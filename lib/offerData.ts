export interface OfferItem {
  name: string;
  originalPrice: string;
}

export const OFFER_ITEMS: OfferItem[] = [
  { name: "Teste dos Arquétipos", originalPrice: "R$ 197,00" },
  { name: "Aulas explicando cada arquétipo na prática", originalPrice: "R$ 97,00" },
  { name: "Identidade Fotográfica de cada Arquétipo", originalPrice: "R$ 67,00" },
  { name: "Identidade Visual de cada Arquétipo", originalPrice: "R$ 87,00" },
  { name: "Paleta de cores de cada Arquétipo", originalPrice: "R$ 97,00" },
  { name: "Aula explicando a estrutura correta da BIO", originalPrice: "R$ 67,00" },
];

export const OFFER_TOTAL = "R$ 612,00";
export const OFFER_FINAL_PRICE = "R$ 67,00";
