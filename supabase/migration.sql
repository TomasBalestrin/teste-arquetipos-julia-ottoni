-- ============================================================
-- Migration: Teste dos Arquétipos — Todas as tabelas + RLS
-- Executar no SQL Editor do Supabase
-- ============================================================

-- ============================================================
-- 1. FUNÇÃO: trigger de updated_at automático
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 2. TABELAS
-- ============================================================

-- users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  access_granted boolean NOT NULL DEFAULT false,
  password_hash text NOT NULL,
  must_reset_password boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- test_sessions
CREATE TABLE test_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  email text NOT NULL,
  current_step integer NOT NULL DEFAULT 1 CHECK (current_step BETWEEN 1 AND 12),
  status text NOT NULL DEFAULT 'started'
    CHECK (status IN ('started', 'in_progress', 'completed')),
  answers jsonb NOT NULL DEFAULT '{}',
  scores jsonb NOT NULL DEFAULT '{}',
  top_3 jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- purchases
CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES test_sessions(id) ON DELETE SET NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  email text NOT NULL,
  transaction_id text UNIQUE NOT NULL,
  hotmart_product_id text,
  status text NOT NULL DEFAULT 'approved'
    CHECK (status IN ('approved', 'refunded', 'cancelled')),
  amount_cents integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- modules
CREATE TABLE modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- lessons (CASCADE on module delete)
CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  cover_image_url text,
  content_type text NOT NULL CHECK (content_type IN ('link', 'iframe')),
  content_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- site_settings
CREATE TABLE site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. TRIGGERS de updated_at
-- ============================================================

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_test_sessions_updated_at
  BEFORE UPDATE ON test_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_purchases_updated_at
  BEFORE UPDATE ON purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_modules_updated_at
  BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 4. HABILITAR RLS em todas as tabelas
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 5. POLÍTICAS RLS
-- ============================================================

-- Helper: verificar se o usuário autenticado é admin
-- Usado em todas as políticas de admin abaixo

-- ----- users -----

-- Usuário lê próprio registro
CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);

-- Admin lê todos
CREATE POLICY "users_select_admin" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Usuário edita próprio registro
CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Admin edita todos
CREATE POLICY "users_update_admin" ON users
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin insere usuários (webhook cria users via service role)
CREATE POLICY "users_insert_admin" ON users
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ----- test_sessions -----

-- INSERT público (quiz funciona sem login — anon e authenticated)
CREATE POLICY "test_sessions_insert_anon" ON test_sessions
  FOR INSERT WITH CHECK (true);

-- Usuário lê próprias sessões
CREATE POLICY "test_sessions_select_own" ON test_sessions
  FOR SELECT USING (user_id = auth.uid());

-- Admin lê todas
CREATE POLICY "test_sessions_select_admin" ON test_sessions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- UPDATE público (quiz salva respostas sem login)
CREATE POLICY "test_sessions_update_anon" ON test_sessions
  FOR UPDATE USING (true);

-- ----- purchases -----

-- Usuário lê próprias compras
CREATE POLICY "purchases_select_own" ON purchases
  FOR SELECT USING (user_id = auth.uid());

-- Admin lê todas
CREATE POLICY "purchases_select_admin" ON purchases
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin insere/atualiza (webhook via service role)
CREATE POLICY "purchases_insert_admin" ON purchases
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "purchases_update_admin" ON purchases
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ----- modules -----

-- Leitura pública para módulos ativos
CREATE POLICY "modules_select_active" ON modules
  FOR SELECT USING (status = 'active');

-- Admin lê todos (incluindo inativos)
CREATE POLICY "modules_select_admin" ON modules
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin insere
CREATE POLICY "modules_insert_admin" ON modules
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin atualiza
CREATE POLICY "modules_update_admin" ON modules
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin deleta
CREATE POLICY "modules_delete_admin" ON modules
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ----- lessons -----

-- Leitura apenas para usuários com access_granted = true
CREATE POLICY "lessons_select_granted" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND access_granted = true
    )
  );

-- Admin lê todas
CREATE POLICY "lessons_select_admin" ON lessons
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin insere
CREATE POLICY "lessons_insert_admin" ON lessons
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin atualiza
CREATE POLICY "lessons_update_admin" ON lessons
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin deleta
CREATE POLICY "lessons_delete_admin" ON lessons
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ----- site_settings -----

-- Admin lê
CREATE POLICY "site_settings_select_admin" ON site_settings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin insere
CREATE POLICY "site_settings_insert_admin" ON site_settings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin atualiza
CREATE POLICY "site_settings_update_admin" ON site_settings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin deleta
CREATE POLICY "site_settings_delete_admin" ON site_settings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 6. SEED: valores iniciais de site_settings
-- ============================================================

INSERT INTO site_settings (key, value) VALUES
  ('checkout_url', ''),
  ('facebook_pixel_id', ''),
  ('hotmart_webhook_secret', '');
