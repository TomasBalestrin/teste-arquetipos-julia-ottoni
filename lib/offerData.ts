export interface OfferItem {
  name: string;
  originalPrice: string;
}

export const OFFER_ITEMS: OfferItem[] = [
  { name: "Seus 3 arquétipos dominantes, por ordem de influência", originalPrice: "R$ 197" },
  { name: "12 aulas rápidas explicando cada arquétipo", originalPrice: "R$ 247" },
  { name: "1 aula de identidade fotográfica de cada arquétipo", originalPrice: "R$ 67" },
  { name: "1 aula de identidade visual de cada arquétipo", originalPrice: "R$ 67" },
  { name: "1 aula de paleta de cores de cada arquétipo", originalPrice: "R$ 67" },
  { name: "1 aula estrutura correta da bio do Insta", originalPrice: "R$ 67" },
];

export const OFFER_TOTAL = "R$ 712";
export const OFFER_FINAL_PRICE = "R$ 67";
export const OFFER_INSTALLMENT = "9x R$ 8,56";
