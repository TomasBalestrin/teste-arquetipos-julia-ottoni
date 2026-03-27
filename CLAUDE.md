# Teste dos Arquétipos — Regras do projeto

## Stack
- Frontend: Next.js 14 App Router
- UI: Tailwind CSS + shadcn/ui
- Backend: Server Actions + API Routes
- Banco: Supabase (PostgreSQL)
- Auth: Supabase Auth (email + password)
- Pagamentos: Hotmart (checkout externo + webhook)
- Tracking: Facebook Pixel (PageView + ClickCTA)
- Deploy: Vercel

## Regras inegociáveis
1. Nunca instalar lib/pacote sem minha aprovação
2. Máximo 150 linhas por arquivo — se passar, quebre em componentes menores
3. TypeScript strict — nunca usar 'any', tipar TUDO
4. Ler progress.md antes de cada sessão para saber onde paramos
5. Commitar cada feature/fix que funciona antes de seguir para a próxima
6. Toda Server Action retorna { success: boolean, data?: T, error?: string }
7. Nunca fazer fetch client-side para dados que podem ser Server Component
8. Consultar design-system.md antes de criar ou modificar qualquer componente visual
9. RLS ativo em TODA tabela com dados de usuário

## Estrutura de pastas
```
/app                      → Rotas e páginas (App Router)
  /app/(public)           → Quiz, resultado parcial, landing
  /app/(auth)             → Dashboard, aulas, resultado completo
  /app/(admin)            → Painel administrativo
  /app/api                → API Routes (webhooks Hotmart)
/components               → Componentes React reutilizáveis
  /components/ui          → shadcn/ui components
  /components/quiz        → Componentes do quiz (steps, progress, options)
  /components/members     → Componentes da área de membros (cards, carousel, player)
  /components/admin       → Componentes do painel admin
/lib                      → Utilitários, clients, helpers
  /lib/supabase           → Client e server Supabase
  /lib/archetypes         → Dados dos arquétipos, perguntas, scoring
  /lib/pixel              → Helpers do Facebook Pixel
/actions                  → Server Actions organizadas por entidade
/types                    → TypeScript types e interfaces
```

## Naming conventions
- Arquivos de componente: PascalCase (ex: QuizStep.tsx)
- Arquivos de utility: camelCase (ex: calculateScores.ts)
- Server Actions: camelCase com prefixo de ação (ex: saveAnswer, createUser, getModules)
- Tabelas do banco: snake_case plural (ex: test_sessions, site_settings)
- Campos do banco: snake_case (ex: created_at, user_id)
- Variáveis de ambiente: SCREAMING_SNAKE (ex: NEXT_PUBLIC_SUPABASE_URL)
- CSS classes: Tailwind utilities — nunca CSS custom salvo exceções do design system

## Segurança (inegociável)
1. TODA secret em variável de ambiente — NUNCA hardcoded
2. Auth obrigatória em TODA rota dentro de /(auth) e /(admin) — verificar sessão no layout
3. Validar TODA input do usuário com Zod antes de processar
4. .gitignore DEVE conter: .env, .env.local, node_modules, .next
5. Webhook da Hotmart: SEMPRE verificar hottok antes de processar
6. Admin: verificar role = 'admin' em TODA rota e action do painel

## UI / Design system
- Consultar design-system.md para TODAS as decisões visuais
- Font primária: Plus Jakarta Sans (via next/font/google)
- Font mono/dados: Poppins (via next/font/google)
- Cores, espaçamento, componentes: seguir tokens do design-system.md
- Responsivo: mobile-first, breakpoints sm/md/lg do Tailwind
- Quiz deve funcionar perfeitamente em mobile (80%+ do tráfego é mobile)

## Padrão de tratamento de erros
- Server Actions: sempre retornar { success, data, error }
- Client: toast de sucesso/erro usando sonner
- Nunca mostrar stack trace ou erro técnico pro usuário final
- Console.error em development, silencioso em production

## Facebook Pixel
- Carregar pixel via script no layout principal (usando pixel_id do site_settings)
- Evento PageView: ao abrir a página do quiz (etapa 1)
- Evento ClickCTA: ao clicar no botão de oferta (etapa 12)
- Usar fbq('track', ...) padrão do pixel

## Git
- Commit a cada feature/fix que funciona
- Formato: "feat: [o que fez]" ou "fix: [o que corrigiu]"
- Branch main = produção
- NUNCA commitar com erros no build
