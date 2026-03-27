# PRD — Teste dos Arquétipos

## O que é
Plataforma web que oferece um teste de personalidade baseado nos 12 arquétipos de Jung, com captura de lead, resultado parcial gratuito (Top 3), checkout externo (Hotmart) e área de membros com conteúdo em vídeo liberado após pagamento.

## Pra quem
Público interessado em autoconhecimento, majoritariamente feminino, com nível técnico básico. A dor principal é não entender seus padrões de comportamento e personalidade. Espera uma experiência visual bonita, fluida e que pareça "premium".

## Features do MVP
1. **Quiz de arquétipos em 12 etapas** — Introdução → captura de email → 9 perguntas → resultado parcial com oferta
2. **Cálculo automático de Top 3** — Sistema de pontuação por arquétipo com ranking determinístico
3. **Área de membros** — Dashboard com resultado completo, módulos em carrossel e aulas com player de vídeo (link externo ou iframe VTurb)
4. **Painel admin** — Gestão de leads, módulos, aulas, config de checkout URL e pixel
5. **Integração Hotmart webhook** — Criação automática de usuário e liberação de acesso após compra

## Anti-escopo (NÃO faz na v1)
- Não edita perguntas nem lógica do quiz pelo admin
- Não tem checkout embutido (redireciona para Hotmart)
- Não bloqueia conteúdo por arquétipo (tudo é igual para todos)
- Não tem planos/assinaturas (compra única)
- Não tem integração com email marketing (Mailchimp, ActiveCampaign, etc.)
- Não tem app mobile nativo
- Não tem gamificação ou progresso de aulas
- Não tem chat/suporte dentro da plataforma
- Não tem Google Ads pixel (apenas Facebook Pixel)
- Não tem exportação PDF do resultado

## Monetização
Venda única de acesso à área de membros. Checkout via Hotmart (link externo configurável pelo admin). O teste é gratuito, o resultado completo + conteúdo é pago.

## Fluxo principal
1. Usuário acessa a página do quiz e vê a introdução (dispara PageView no pixel)
2. Usuário informa email → sistema cria test_session e salva o lead
3. Usuário responde 9 perguntas, uma por etapa, com barra de progresso
4. Sistema calcula scores e gera Top 3 arquétipos
5. Tela de resultado parcial mostra Top 3 (nome + ícone, sem descrição completa) + CTA de compra (dispara ClickCTA no pixel)
6. Usuário clica no CTA → redireciona para checkout Hotmart
7. Hotmart processa pagamento → envia webhook → sistema cria usuário com senha padrão (julia123) e libera acesso
8. Usuário faz login → acessa dashboard com resultado completo + módulos de conteúdo
