# Progress — Teste dos Arquétipos

## Status geral
MILESTONE ATUAL: 3 — Completo
INÍCIO: Março 2026
ÚLTIMA SESSÃO: 2026-03-28

---

## Milestone 1 — Fundação
**Objetivo:** Auth + layout base + banco configurado + quiz estático + deploy em staging
**Entregável:** Usuário consegue acessar o quiz, capturar email, e ver a estrutura base do sistema

FEITO:
- [x] Inicializar projeto Next.js 14 com App Router + Tailwind + shadcn/ui
- [x] Configurar repositório Git + .gitignore

- [x] Setup Supabase: criar tabelas (users, test_sessions, purchases, modules, lessons, site_settings)
- [x] Configurar RLS em todas as tabelas

- [x] Auth com Supabase Auth (email + password)
- [x] Layout público (quiz pages)
- [x] Layout autenticado (sidebar + header + área de conteúdo)
- [x] Layout admin (sidebar admin + proteção de rota)
- [x] Criar admin seed (usuário admin manual no banco)

- [x] Deploy em staging na Vercel
- [x] Testar login/logout em staging

---

## Milestone 2 — Quiz + Resultado + Webhook
**Objetivo:** Fluxo completo do quiz funcionando com cálculo de arquétipos, resultado parcial, e integração Hotmart
**Entregável:** Usuário faz o teste, vê Top 3, clica no CTA, paga na Hotmart, e o sistema cria o acesso automaticamente

FEITO:
- [x] Tela de introdução do quiz (etapa 1)
- [x] Tela de captura de email (etapa 2) + criação de test_session
- [x] Componente de pergunta com 4 opções (etapas 3-11)
- [x] Barra de progresso visual do quiz
- [x] Lógica de scoring por arquétipo (salvar a cada resposta)
- [x] Cálculo do Top 3 ao finalizar (etapa 11 → 12)
- [x] Tela de resultado parcial (etapa 12) com Top 3 + CTA
- [x] Facebook Pixel: PageView na etapa 1 + ClickCTA no botão de oferta
- [x] API Route para webhook Hotmart
- [x] Lógica de criação de usuário automática pós-webhook (senha: julia123)
- [x] Vincular test_session ao user criado
- [x] Testes manuais do fluxo completo (quiz → Hotmart → webhook → login)

---

## Milestone 3 — Área de Membros + Admin + Lançamento
**Objetivo:** Área logada completa com conteúdo + painel admin funcional + pronto para produção
**Entregável:** Sistema completo funcionando com gestão de conteúdo e acesso pago

FEITO:
- [x] Dashboard do membro: resumo dos 3 arquétipos com descrições completas
- [x] Carrossel de módulos na dashboard
- [x] Página de aulas: cards com imagem + título
- [x] Modal/popup de aula com player (link externo ou iframe VTurb)
- [x] Funcionalidade de refazer teste (sem pagar, sem email)
- [x] Tela de redefinição de senha (primeiro acesso)

- [x] Painel admin: listagem de leads (test_sessions)
- [x] Painel admin: listagem de compras
- [x] Painel admin: listagem de usuários
- [x] Painel admin: CRUD de módulos (criar, editar nome, ordenar)
- [x] Painel admin: CRUD de aulas (criar, editar, upload imagem, tipo, conteúdo, ordem)
- [x] Painel admin: configurações (checkout URL, pixel ID)

- [x] Checklist de segurança validado
- [x] Deploy em produção

---

## Decisões técnicas
(Preencher conforme o projeto evolui — decisões que a IA NÃO deve reverter)

- Dados dos 12 arquétipos (nome, descrição, características) ficam hardcoded em /lib/archetypes — não são editáveis pelo admin
- Perguntas e matriz de pontuação ficam hardcoded em /lib/archetypes — não são editáveis pelo admin
- Scores salvos como JSONB para flexibilidade de consulta
- Senha padrão de novos usuários: julia123 (com flag must_reset_password = true)
- Checkout é EXTERNO (Hotmart) — apenas um redirect com URL configurável
- Facebook Pixel carregado dinamicamente a partir de site_settings
- Conteúdo das aulas é igual para todos os usuários — não há filtro por arquétipo
- Layouts auth/admin usam service role (admin client) para queries de role/must_reset_password — bypassa RLS circular

---

## Prompts que funcionaram bem
(Salvar prompts que geraram resultado excelente para reusar)

- (vazio — preencher conforme usar)
