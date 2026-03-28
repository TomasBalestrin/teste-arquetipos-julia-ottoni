# Schema do banco de dados — Teste dos Arquétipos

## Tabelas

### users
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| email | text | unique, not null |
| name | text | nullable |
| role | text | default 'user', check in ('user', 'admin') |
| access_granted | boolean | default false |
| password_hash | text | not null |
| must_reset_password | boolean | default true |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### test_sessions
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | FK → users.id, nullable (vincula após compra) |
| email | text | not null |
| current_step | integer | default 1, check 1-12 |
| status | text | default 'started', check in ('started', 'in_progress', 'completed') |
| answers | jsonb | default '{}' |
| scores | jsonb | default '{}' |
| top_3 | jsonb | nullable |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

**Estrutura do campo `answers` (jsonb):**
```json
{
  "q1": { "option": "A", "archetype_scores": { "heroi": 3, "explorador": 1 } },
  "q2": { "option": "C", "archetype_scores": { "mago": 3, "sabio": 1 } }
}
```

**Estrutura do campo `scores` (jsonb):**
```json
{
  "heroi": 12,
  "mago": 9,
  "sabio": 7,
  "explorador": 6,
  "criador": 5,
  "cuidador": 4,
  "inocente": 3,
  "amante": 3,
  "governante": 2,
  "cara_comum": 1,
  "rebelde": 1,
  "bobo_da_corte": 0
}
```

**Estrutura do campo `top_3` (jsonb):**
```json
[
  { "rank": 1, "archetype": "heroi", "score": 12 },
  { "rank": 2, "archetype": "mago", "score": 9 },
  { "rank": 3, "archetype": "sabio", "score": 7 }
]
```

### purchases
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| session_id | uuid | FK → test_sessions.id, nullable |
| user_id | uuid | FK → users.id, nullable |
| email | text | not null |
| transaction_id | text | unique, not null |
| hotmart_product_id | text | nullable |
| status | text | default 'approved', check in ('approved', 'refunded', 'cancelled') |
| amount_cents | integer | nullable |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### modules
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| name | text | not null |
| sort_order | integer | default 0 |
| status | text | default 'active', check in ('active', 'inactive') |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### lessons
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| module_id | uuid | FK → modules.id, not null |
| title | text | not null |
| cover_image_url | text | nullable |
| content_type | text | not null, check in ('link', 'iframe') |
| content_url | text | not null |
| sort_order | integer | default 0 |
| status | text | default 'active', check in ('active', 'inactive') |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### site_settings
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| key | text | unique, not null |
| value | text | not null |
| updated_at | timestamptz | default now() |

**Chaves usadas em site_settings:**
- `checkout_url` — URL do checkout Hotmart
- `facebook_pixel_id` — ID do pixel do Facebook
- `hotmart_webhook_secret` — Secret para validar webhooks (hottok)

## Relações
- users 1:N test_sessions (via user_id, após compra)
- users 1:N purchases (via user_id)
- test_sessions 1:1 purchases (via session_id)
- modules 1:N lessons (via module_id)

## Enums
- user role: 'user' | 'admin'
- test status: 'started' | 'in_progress' | 'completed'
- purchase status: 'approved' | 'refunded' | 'cancelled'
- content type: 'link' | 'iframe'
- module/lesson status: 'active' | 'inactive'

## RLS (Row Level Security) — Supabase
- **users:** cada usuário vê/edita apenas seu próprio registro. Admin vê todos.
- **test_sessions:** usuário vê apenas sessões vinculadas ao seu user_id. Sessões sem user_id (pré-compra) são acessadas via token da sessão. Admin vê todas.
- **purchases:** usuário vê apenas suas compras. Admin vê todas.
- **modules:** leitura pública para módulos ativos. Escrita apenas admin.
- **lessons:** leitura apenas para usuários com access_granted = true. Escrita apenas admin.
- **site_settings:** leitura/escrita apenas admin.

## Regras de dados
- Deletar user NÃO deleta test_sessions (manter histórico de leads)
- Deletar module faz cascade em lessons
- Campo `scores` é recalculado a cada resposta salva — nunca editado manualmente
- Campo `top_3` é gerado apenas quando status = 'completed'
- Ao receber webhook de compra: buscar test_session pelo email → criar user → vincular session → setar access_granted = true
- Se user já existe (refez teste), apenas vincular nova session ao user existente

## Lógica do Quiz — Arquétipos e Pontuação

### Os 12 arquétipos

| Slug | Nome | Motivação central | Medo central |
|------|------|-------------------|--------------|
| inocente | Inocente | Ser feliz e viver em harmonia | Ser punido por algo errado |
| sabio | Sábio | Compreender o mundo pela verdade | Ser enganado ou ignorante |
| explorador | Explorador | Liberdade para descobrir quem é | Ficar preso ou se conformar |
| heroi | Herói | Provar seu valor por ações corajosas | Fraqueza e vulnerabilidade |
| mago | Mago | Transformar a realidade pela visão | Consequências negativas imprevistas |
| rebelde | Rebelde | Romper o que não funciona | Ser impotente ou irrelevante |
| cara_comum | Cara Comum | Pertencer e se conectar com todos | Ser excluído ou se destacar demais |
| amante | Amante | Criar conexão íntima e profunda | Ficar sozinho e não ser amado |
| bobo_da_corte | Bobo da Corte | Viver o momento com leveza e alegria | Ser entediante ou entediado |
| cuidador | Cuidador | Proteger e ajudar quem precisa | Egoísmo e ingratidão |
| criador | Criador | Dar forma a algo com significado duradouro | Mediocridade e falta de visão |
| governante | Governante | Criar ordem e prosperidade | Caos e perda de controle |

### Estrutura das perguntas (9 perguntas, 6 opções cada)

Cada opção dá **3 pontos** ao arquétipo primário e **1 ponto** ao arquétipo secundário. Com 6 opções por pergunta, a cobertura dos 12 arquétipos é mais equilibrada e o resultado mais preciso.

**Pergunta 1 — "O que te motiva a sair da cama todos os dias?"**
- A) Aprender algo que mude minha forma de ver o mundo → Sábio (3) + Explorador (1)
- B) Dar vida a algo que tenha meu nome e minha essência → Criador (3) + Governante (1)
- C) Saber que alguém conta comigo — cuidar das pessoas dá sentido → Cuidador (3) + Inocente (1)
- D) Viver intensamente, sentir tudo — cada dia é uma chance de conexão → Amante (3) + Bobo da Corte (1)
- E) Superar mais um desafio e provar do que sou capaz → Herói (3) + Rebelde (1)
- F) A sensação de que existe um mundo imenso esperando ser descoberto → Explorador (3) + Mago (1)

**Pergunta 2 — "Em um grupo, qual papel você naturalmente assume?"**
- A) Organizo tudo e garanto que as coisas aconteçam → Governante (3) + Herói (1)
- B) Faço todo mundo rir e transformo o clima pesado em leve → Bobo da Corte (3) + Cara Comum (1)
- C) Escuto de verdade e acolho quem precisa → Cuidador (3) + Amante (1)
- D) Questiono o que não faz sentido e proponho caminhos novos → Rebelde (3) + Mago (1)
- E) Trago referências e ajudo o grupo a decidir com inteligência → Sábio (3) + Criador (1)
- F) Conecto as pessoas e garanto que todos se sintam incluídos → Cara Comum (3) + Inocente (1)

**Pergunta 3 — "O que mais te incomoda no mundo?"**
- A) A covardia diante da injustiça — quem pode agir e se omite → Herói (3) + Rebelde (1)
- B) A superficialidade — as pessoas não querem pensar com profundidade → Sábio (3) + Mago (1)
- C) A frieza nas relações — como as pessoas se tornaram tão distantes → Amante (3) + Cuidador (1)
- D) A mesmice e a falta de originalidade em tudo → Criador (3) + Explorador (1)
- E) A maldade gratuita — por que não podemos viver em paz? → Inocente (3) + Cara Comum (1)
- F) O caos e a desorganização — sem estrutura, nada funciona → Governante (3) + Sábio (1)

**Pergunta 4 — "Se pudesse escolher um superpoder, qual seria?"**
- A) Transformar qualquer situação com um estalar de dedos → Mago (3) + Criador (1)
- B) Ser invulnerável e proteger quem eu amo de todo mal → Herói (3) + Cuidador (1)
- C) Teletransporte instantâneo para qualquer lugar do planeta → Explorador (3) + Bobo da Corte (1)
- D) Ler a mente das pessoas e compreender tudo por trás das palavras → Sábio (3) + Governante (1)
- E) Quebrar qualquer barreira que limite a liberdade das pessoas → Rebelde (3) + Explorador (1)
- F) Fazer toda dor e sofrimento desaparecerem do mundo → Inocente (3) + Amante (1)

**Pergunta 5 — "Como você lida com um conflito difícil?"**
- A) Enfrento de frente, com coragem — não fujo de nada → Herói (3) + Governante (1)
- B) Busco um acordo que funcione pra todo mundo → Cara Comum (3) + Cuidador (1)
- C) Questiono se as regras estão erradas e provoco a mudança → Rebelde (3) + Mago (1)
- D) Levo na leveza e tento descontrair com bom humor → Bobo da Corte (3) + Inocente (1)
- E) Analiso com calma e busco a solução mais racional → Mago (3) + Sábio (1)
- F) Priorizo os sentimentos das pessoas, mesmo que custe mais tempo → Cuidador (3) + Amante (1)

**Pergunta 6 — "O que mais te representa num fim de semana ideal?"**
- A) Uma viagem sem roteiro para um lugar que nunca visitei → Explorador (3) + Rebelde (1)
- B) Um dia inteiro dedicado a criar algo com as mãos → Criador (3) + Sábio (1)
- C) Um jantar íntimo e profundo com quem eu amo → Amante (3) + Cara Comum (1)
- D) Nada planejado — só confiar que tudo vai dar certo e descansar → Inocente (3) + Bobo da Corte (1)
- E) Planejar a próxima semana e organizar a vida para tudo fluir → Governante (3) + Criador (1)
- F) Sair sem destino com amigos, rindo e aproveitando o momento → Bobo da Corte (3) + Explorador (1)

**Pergunta 7 — "Qual frase mais te define?"**
- A) "O mundo precisa de mais coragem e menos desculpas" → Herói (3) + Rebelde (1)
- B) "Tudo pode ser transformado se você acreditar no impossível" → Mago (3) + Inocente (1)
- C) "Eu só quero um lugar onde eu pertença de verdade" → Cara Comum (3) + Amante (1)
- D) "Controle é liberdade — quem organiza sua vida, prospera" → Governante (3) + Sábio (1)
- E) "Minhas mãos existem pra deixar algo bonito nesse mundo" → Criador (3) + Mago (1)
- F) "A melhor coisa da vida é o caminho, não o destino" → Explorador (3) + Herói (1)

**Pergunta 8 — "O que você mais valoriza em alguém?"**
- A) A generosidade genuína e o cuidado sem esperar nada em troca → Cuidador (3) + Inocente (1)
- B) A autenticidade e a coragem de ser diferente → Rebelde (3) + Explorador (1)
- C) A inteligência e a capacidade de ensinar com generosidade → Sábio (3) + Criador (1)
- D) O bom humor e a capacidade de tornar qualquer momento leve → Bobo da Corte (3) + Cara Comum (1)
- E) A intensidade e a entrega verdadeira nos sentimentos → Amante (3) + Cuidador (1)
- F) A bondade pura e a fé de que o mundo pode ser melhor → Inocente (3) + Governante (1)

**Pergunta 9 — "Se sua vida fosse um filme, qual gênero seria?"**
- A) Épico de aventura com uma missão heroica que muda tudo → Herói (3) + Explorador (1)
- B) Drama romântico com conexões profundas que marcam a alma → Amante (3) + Cuidador (1)
- C) Ficção científica com reviravoltas e realidades paralelas → Mago (3) + Criador (1)
- D) Comédia sobre pessoas reais e as belezas simples do dia a dia → Cara Comum (3) + Bobo da Corte (1)
- E) Thriller de resistência contra um sistema injusto → Rebelde (3) + Herói (1)
- F) Documentário sobre grandes líderes que transformaram nações → Governante (3) + Amante (1)

### Distribuição de cobertura

Com 9 perguntas × 6 opções = 54 slots primários:
- Cada arquétipo aparece como primário em 4-6 perguntas (mín 4, máx 6)
- Cada arquétipo aparece como secundário em pelo menos 3 perguntas
- Score máximo possível por arquétipo: 18 pontos (se aparecer como primário 6 vezes)
- Score mínimo possível: 0

### Cálculo do resultado
1. Somar scores de todas as respostas por arquétipo
2. Ordenar do maior para o menor
3. Extrair Top 3
4. Em caso de empate no 3º lugar, priorizar pela ordem: Herói > Mago > Sábio > Explorador > Criador > Amante > Rebelde > Cuidador > Governante > Cara Comum > Bobo da Corte > Inocente
