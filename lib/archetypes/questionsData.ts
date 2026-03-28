import type { Question } from "./questions";

/** Perguntas 1-5 */
export const QUESTIONS_PART1: Question[] = [
  {
    id: "q1",
    text: "O que te motiva a sair da cama todos os dias?",
    options: [
      { label: "A", text: "A possibilidade de aprender algo que mude minha forma de ver o mundo", primary_archetype: "sabio", secondary_archetype: "explorador" },
      { label: "B", text: "Dar vida a algo que tenha meu nome e minha essência", primary_archetype: "criador", secondary_archetype: "governante" },
      { label: "C", text: "Saber que alguém conta comigo — cuidar das pessoas dá sentido a tudo", primary_archetype: "cuidador", secondary_archetype: "inocente" },
      { label: "D", text: "Viver intensamente, sentir tudo — cada dia é uma chance de conexão real", primary_archetype: "amante", secondary_archetype: "bobo_da_corte" },
      { label: "E", text: "Superar mais um desafio e provar do que sou capaz", primary_archetype: "heroi", secondary_archetype: "rebelde" },
      { label: "F", text: "A sensação de que existe um mundo imenso esperando ser descoberto", primary_archetype: "explorador", secondary_archetype: "mago" },
    ],
  },
  {
    id: "q2",
    text: "Em um grupo, qual papel você naturalmente assume?",
    options: [
      { label: "A", text: "Organizo tudo e garanto que as coisas aconteçam do jeito certo", primary_archetype: "governante", secondary_archetype: "heroi" },
      { label: "B", text: "Faço todo mundo rir e transformo qualquer clima pesado em algo leve", primary_archetype: "bobo_da_corte", secondary_archetype: "cara_comum" },
      { label: "C", text: "Escuto de verdade e acolho quem precisa de apoio", primary_archetype: "cuidador", secondary_archetype: "amante" },
      { label: "D", text: "Questiono o que não faz sentido e proponho caminhos novos", primary_archetype: "rebelde", secondary_archetype: "mago" },
      { label: "E", text: "Trago referências e ajudo o grupo a tomar decisões mais inteligentes", primary_archetype: "sabio", secondary_archetype: "criador" },
      { label: "F", text: "Conecto as pessoas e garanto que todos se sintam incluídos", primary_archetype: "cara_comum", secondary_archetype: "inocente" },
    ],
  },
  {
    id: "q3",
    text: "O que mais te incomoda no mundo?",
    options: [
      { label: "A", text: "A covardia diante da injustiça — quem pode agir e se omite", primary_archetype: "heroi", secondary_archetype: "rebelde" },
      { label: "B", text: "A superficialidade — as pessoas não querem pensar com profundidade", primary_archetype: "sabio", secondary_archetype: "mago" },
      { label: "C", text: "A frieza nas relações — como as pessoas se tornaram tão distantes", primary_archetype: "amante", secondary_archetype: "cuidador" },
      { label: "D", text: "A mesmice e a falta de originalidade em tudo", primary_archetype: "criador", secondary_archetype: "explorador" },
      { label: "E", text: "A maldade gratuita — por que não podemos viver em paz?", primary_archetype: "inocente", secondary_archetype: "cara_comum" },
      { label: "F", text: "O caos e a desorganização — sem estrutura, nada funciona", primary_archetype: "governante", secondary_archetype: "sabio" },
    ],
  },
  {
    id: "q4",
    text: "Se pudesse escolher um superpoder, qual seria?",
    options: [
      { label: "A", text: "Transformar qualquer situação com um estalar de dedos", primary_archetype: "mago", secondary_archetype: "criador" },
      { label: "B", text: "Ser invulnerável e proteger quem eu amo de todo mal", primary_archetype: "heroi", secondary_archetype: "cuidador" },
      { label: "C", text: "Teletransporte instantâneo para qualquer lugar do planeta", primary_archetype: "explorador", secondary_archetype: "bobo_da_corte" },
      { label: "D", text: "Ler a mente das pessoas e compreender tudo por trás das palavras", primary_archetype: "sabio", secondary_archetype: "governante" },
      { label: "E", text: "Quebrar qualquer barreira ou sistema que limite a liberdade das pessoas", primary_archetype: "rebelde", secondary_archetype: "explorador" },
      { label: "F", text: "Fazer toda dor e sofrimento desaparecerem do mundo", primary_archetype: "inocente", secondary_archetype: "amante" },
    ],
  },
  {
    id: "q5",
    text: "Como você lida com um conflito difícil?",
    options: [
      { label: "A", text: "Enfrento de frente, com coragem — não fujo de nada", primary_archetype: "heroi", secondary_archetype: "governante" },
      { label: "B", text: "Busco um acordo que funcione pra todo mundo, sem deixar ninguém de fora", primary_archetype: "cara_comum", secondary_archetype: "cuidador" },
      { label: "C", text: "Questiono se as regras estão erradas e provoco a mudança necessária", primary_archetype: "rebelde", secondary_archetype: "mago" },
      { label: "D", text: "Levo na leveza e tento descontrair o ambiente com bom humor", primary_archetype: "bobo_da_corte", secondary_archetype: "inocente" },
      { label: "E", text: "Analiso a situação com calma e busco a solução mais racional possível", primary_archetype: "mago", secondary_archetype: "sabio" },
      { label: "F", text: "Priorizo os sentimentos das pessoas envolvidas, mesmo que custe mais tempo", primary_archetype: "cuidador", secondary_archetype: "amante" },
    ],
  },
];
