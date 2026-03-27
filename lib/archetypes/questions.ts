export interface QuestionOption {
  label: string;
  text: string;
  primary_archetype: string;
  secondary_archetype: string;
}

export interface Question {
  id: string;
  text: string;
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "O que te motiva a sair da cama todos os dias?",
    options: [
      { label: "A", text: "Aprender algo novo que mude minha visão de mundo", primary_archetype: "sabio", secondary_archetype: "explorador" },
      { label: "B", text: "Construir algo que tenha meu nome e minha essência", primary_archetype: "criador", secondary_archetype: "governante" },
      { label: "C", text: "Ajudar alguém que precisa de mim", primary_archetype: "cuidador", secondary_archetype: "inocente" },
      { label: "D", text: "Viver uma experiência que me faça sentir vivo", primary_archetype: "amante", secondary_archetype: "bobo_da_corte" },
    ],
  },
  {
    id: "q2",
    text: "Em um grupo, qual papel você naturalmente assume?",
    options: [
      { label: "A", text: "O que organiza e toma decisões", primary_archetype: "governante", secondary_archetype: "heroi" },
      { label: "B", text: "O que faz todo mundo rir e relaxar", primary_archetype: "bobo_da_corte", secondary_archetype: "cara_comum" },
      { label: "C", text: "O que escuta e acolhe quem precisa", primary_archetype: "cuidador", secondary_archetype: "amante" },
      { label: "D", text: "O que questiona as regras e propõe algo diferente", primary_archetype: "rebelde", secondary_archetype: "mago" },
    ],
  },
  {
    id: "q3",
    text: "O que mais te incomoda no mundo?",
    options: [
      { label: "A", text: "A injustiça e a covardia diante dos problemas", primary_archetype: "heroi", secondary_archetype: "rebelde" },
      { label: "B", text: "A superficialidade e a falta de profundidade", primary_archetype: "sabio", secondary_archetype: "mago" },
      { label: "C", text: "A solidão e a frieza nas relações", primary_archetype: "amante", secondary_archetype: "cuidador" },
      { label: "D", text: "A mesmice e a falta de criatividade", primary_archetype: "criador", secondary_archetype: "explorador" },
    ],
  },
  {
    id: "q4",
    text: "Se pudesse escolher um superpoder, qual seria?",
    options: [
      { label: "A", text: "Transformar qualquer situação com um estalar de dedos", primary_archetype: "mago", secondary_archetype: "criador" },
      { label: "B", text: "Ser invulnerável e proteger quem amo", primary_archetype: "heroi", secondary_archetype: "cuidador" },
      { label: "C", text: "Teletransporte para qualquer lugar do mundo", primary_archetype: "explorador", secondary_archetype: "bobo_da_corte" },
      { label: "D", text: "Ler a mente das pessoas e entender tudo", primary_archetype: "sabio", secondary_archetype: "governante" },
    ],
  },
  {
    id: "q5",
    text: "Como você lida com conflitos?",
    options: [
      { label: "A", text: "Enfrento de frente, sem medo", primary_archetype: "heroi", secondary_archetype: "governante" },
      { label: "B", text: "Busco um acordo que deixe todos bem", primary_archetype: "cara_comum", secondary_archetype: "cuidador" },
      { label: "C", text: "Questiono se as regras estão erradas e provoco a mudança", primary_archetype: "rebelde", secondary_archetype: "mago" },
      { label: "D", text: "Levo na leveza e tento descontrair o ambiente", primary_archetype: "bobo_da_corte", secondary_archetype: "inocente" },
    ],
  },
  {
    id: "q6",
    text: "O que mais te representa num fim de semana ideal?",
    options: [
      { label: "A", text: "Uma viagem sem roteiro para um lugar novo", primary_archetype: "explorador", secondary_archetype: "rebelde" },
      { label: "B", text: "Um dia em casa criando algo com as mãos", primary_archetype: "criador", secondary_archetype: "sabio" },
      { label: "C", text: "Um jantar íntimo com quem eu amo", primary_archetype: "amante", secondary_archetype: "cara_comum" },
      { label: "D", text: "Acreditar que tudo vai dar certo e simplesmente descansar", primary_archetype: "inocente", secondary_archetype: "bobo_da_corte" },
    ],
  },
  {
    id: "q7",
    text: "Qual frase mais te define?",
    options: [
      { label: "A", text: "\u201CO mundo precisa de mais coragem e menos desculpas\u201D", primary_archetype: "heroi", secondary_archetype: "rebelde" },
      { label: "B", text: "\u201CTudo pode ser transformado se você acreditar\u201D", primary_archetype: "mago", secondary_archetype: "inocente" },
      { label: "C", text: "\u201CEu só quero um lugar onde eu pertença\u201D", primary_archetype: "cara_comum", secondary_archetype: "amante" },
      { label: "D", text: "\u201CControle é liberdade — quem organiza, prospera\u201D", primary_archetype: "governante", secondary_archetype: "sabio" },
    ],
  },
  {
    id: "q8",
    text: "O que você mais valoriza em alguém?",
    options: [
      { label: "A", text: "A generosidade e o cuidado com os outros", primary_archetype: "cuidador", secondary_archetype: "inocente" },
      { label: "B", text: "A autenticidade e a coragem de ser diferente", primary_archetype: "rebelde", secondary_archetype: "explorador" },
      { label: "C", text: "A inteligência e a capacidade de ensinar", primary_archetype: "sabio", secondary_archetype: "criador" },
      { label: "D", text: "O bom humor e a capacidade de viver leve", primary_archetype: "bobo_da_corte", secondary_archetype: "cara_comum" },
    ],
  },
  {
    id: "q9",
    text: "Se sua vida fosse um filme, qual gênero seria?",
    options: [
      { label: "A", text: "Épico de aventura com missão heroica", primary_archetype: "heroi", secondary_archetype: "explorador" },
      { label: "B", text: "Drama romântico com conexões profundas", primary_archetype: "amante", secondary_archetype: "cuidador" },
      { label: "C", text: "Ficção científica com reviravoltas inesperadas", primary_archetype: "mago", secondary_archetype: "criador" },
      { label: "D", text: "Comédia sobre pessoas reais e situações do dia a dia", primary_archetype: "cara_comum", secondary_archetype: "bobo_da_corte" },
    ],
  },
];
