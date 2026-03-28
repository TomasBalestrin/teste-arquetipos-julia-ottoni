/**
 * Seed do admin — cria usuário admin no Supabase Auth + tabela users.
 *
 * Uso:
 *   npx tsx scripts/seed-admin.ts
 *
 * Variáveis de ambiente necessárias (.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";

const ADMIN_UUID = "517d5ca1-d3b7-451c-b95a-e190eb1f0b43";
const ADMIN_EMAIL = "tauapomicinski@gmail.com";
const ADMIN_PASSWORD = "Th270801@";

async function seedAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error(
      "Missing env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
    );
    process.exit(1);
  }

  const supabase = createClient(url, key);

  // Check if admin already exists (by UUID or email)
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .or(`id.eq.${ADMIN_UUID},email.eq.${ADMIN_EMAIL}`)
    .limit(1)
    .single();

  if (existing) {
    console.log("Admin já existe — nenhuma ação necessária.");
    console.log(`  UUID: ${existing.id}`);
    console.log(`  Email: ${ADMIN_EMAIL}`);
    return;
  }

  // 1. Create auth user with fixed UUID
  const { error: authError } =
    await supabase.auth.admin.createUser({
      id: ADMIN_UUID,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });

  if (authError) {
    console.error("Erro ao criar auth user:", authError.message);
    process.exit(1);
  }

  console.log("Auth user criado:", ADMIN_UUID);

  // 2. Insert into users table with same UUID
  const { error: dbError } = await supabase.from("users").insert({
    id: ADMIN_UUID,
    email: ADMIN_EMAIL,
    name: "Admin",
    role: "admin",
    access_granted: true,
    password_hash: "supabase-auth-managed",
    must_reset_password: false,
  });

  if (dbError) {
    console.error("Erro ao inserir na tabela users:", dbError.message);
    process.exit(1);
  }

  console.log("Admin criado com sucesso!");
  console.log(`  UUID: ${ADMIN_UUID}`);
  console.log(`  Email: ${ADMIN_EMAIL}`);
  console.log(`  Role: admin`);
}

seedAdmin();
