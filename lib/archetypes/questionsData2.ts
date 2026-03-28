import type { Question } from "./questions";

/** Perguntas 6-9 */
export const QUESTIONS_PART2: Question[] = [
  {
    id: "q6",
    text: "O que mais te representa num fim de semana ideal?",
    options: [
      { label: "A", text: "Uma viagem sem roteiro para um lugar que nunca visitei", primary_archetype: "explorador", secondary_archetype: "rebelde" },
      { label: "B", text: "Um dia inteiro dedicado a criar algo com as minhas próprias mãos", primary_archetype: "criador", secondary_archetype: "sabio" },
      { label: "C", text: "Um jantar íntimo e profundo com quem eu amo de verdade", primary_archetype: "amante", secondary_archetype: "cara_comum" },
      { label: "D", text: "Nada planejado — só confiar que tudo vai dar certo e descansar em paz", primary_archetype: "inocente", secondary_archetype: "bobo_da_corte" },
      { label: "E", text: "Planejar a próxima semana e organizar minha vida para que tudo flua melhor", primary_archetype: "governante", secondary_archetype: "criador" },
      { label: "F", text: "Sair sem destino com amigos, rindo de tudo e aproveitando o momento", primary_archetype: "bobo_da_corte", secondary_archetype: "explorador" },
    ],
  },
  {
    id: "q7",
    text: "Qual frase mais te define?",
    options: [
      { label: "A", text: "\u201CO mundo precisa de mais coragem e menos desculpas\u201D", primary_archetype: "heroi", secondary_archetype: "rebelde" },
      { label: "B", text: "\u201CTudo pode ser transformado se você acreditar no impossível\u201D", primary_archetype: "mago", secondary_archetype: "inocente" },
      { label: "C", text: "\u201CEu só quero um lugar onde eu pertença de verdade\u201D", primary_archetype: "cara_comum", secondary_archetype: "amante" },
      { label: "D", text: "\u201CControle é liberdade — quem organiza sua vida, prospera\u201D", primary_archetype: "governante", secondary_archetype: "sabio" },
      { label: "E", text: "\u201CMinhas mãos existem pra deixar algo bonito nesse mundo\u201D", primary_archetype: "criador", secondary_archetype: "mago" },
      { label: "F", text: "\u201CA melhor coisa da vida é o caminho, não o destino\u201D", primary_archetype: "explorador", secondary_archetype: "heroi" },
    ],
  },
  {
    id: "q8",
    text: "O que você mais valoriza em alguém?",
    options: [
      { label: "A", text: "A generosidade genuína e o cuidado com os outros sem esperar nada", primary_archetype: "cuidador", secondary_archetype: "inocente" },
      { label: "B", text: "A autenticidade e a coragem de ser diferente do que esperam dela", primary_archetype: "rebelde", secondary_archetype: "explorador" },
      { label: "C", text: "A inteligência e a capacidade de ensinar o que sabe com generosidade", primary_archetype: "sabio", secondary_archetype: "criador" },
      { label: "D", text: "O bom humor e a capacidade de tornar qualquer momento mais leve", primary_archetype: "bobo_da_corte", secondary_archetype: "cara_comum" },
      { label: "E", text: "A intensidade e a entrega verdadeira nos sentimentos e relações", primary_archetype: "amante", secondary_archetype: "cuidador" },
      { label: "F", text: "A bondade pura e a fé de que o mundo pode ser melhor", primary_archetype: "inocente", secondary_archetype: "governante" },
    ],
  },
  {
    id: "q9",
    text: "Se sua vida fosse um filme, qual gênero seria?",
    options: [
      { label: "A", text: "Épico de aventura com uma missão heroica que muda tudo", primary_archetype: "heroi", secondary_archetype: "explorador" },
      { label: "B", text: "Drama romântico com conexões profundas que marcam a alma", primary_archetype: "amante", secondary_archetype: "cuidador" },
      { label: "C", text: "Ficção científica com reviravoltas inesperadas e realidades paralelas", primary_archetype: "mago", secondary_archetype: "criador" },
      { label: "D", text: "Comédia sobre pessoas reais e as belezas simples do dia a dia", primary_archetype: "cara_comum", secondary_archetype: "bobo_da_corte" },
      { label: "E", text: "Thriller de resistência contra um sistema injusto e opressor", primary_archetype: "rebelde", secondary_archetype: "heroi" },
      { label: "F", text: "Documentário sobre grandes líderes que transformaram nações", primary_archetype: "governante", secondary_archetype: "amante" },
    ],
  },
];
