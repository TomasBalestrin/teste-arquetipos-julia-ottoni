/**
 * Seed do admin — cria usuário admin no Supabase Auth + tabela users.
 *
 * Uso:
 *   npx tsx scripts/seed-admin.ts
 *
 * Variáveis de ambiente necessárias:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 */

import { createClient } from "@supabase/supabase-js";

async function seedAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!url || !key || !email || !password) {
    console.error(
      "Missing env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, ADMIN_PASSWORD"
    );
    process.exit(1);
  }

  const supabase = createClient(url, key);

  // 1. Create auth user
  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) {
    console.error("Erro ao criar auth user:", authError.message);
    process.exit(1);
  }

  console.log("Auth user criado:", authData.user.id);

  // 2. Insert into users table
  const { error: dbError } = await supabase.from("users").insert({
    id: authData.user.id,
    email,
    name: "Admin",
    role: "admin",
    access_granted: true,
    password_hash: "managed-by-supabase-auth",
    must_reset_password: false,
  });

  if (dbError) {
    console.error("Erro ao inserir na tabela users:", dbError.message);
    process.exit(1);
  }

  console.log("Admin criado com sucesso!");
  console.log(`  Email: ${email}`);
  console.log(`  Role: admin`);
}

seedAdmin();
