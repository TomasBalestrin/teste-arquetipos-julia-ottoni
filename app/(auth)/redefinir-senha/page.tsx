"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetPassword } from "@/actions/members";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("As senhas não conferem");
      return;
    }

    setLoading(true);
    const result = await resetPassword(password);

    if (!result.success) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    toast.success("Senha atualizada com sucesso!");
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center">
      <div
        className="w-full max-w-[420px] rounded-[28px] p-8 sm:p-10"
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(221, 212, 200, 0.8)",
          boxShadow: "0 18px 50px rgba(17, 17, 17, 0.08)",
        }}
      >
        <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-text">
          Crie sua nova senha
        </h1>
        <p className="mt-1 font-body text-sm text-text-soft">
          Essa é sua primeira vez aqui. Escolha uma senha segura para continuar.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nova senha (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] text-text outline-none transition-shadow placeholder:text-text-soft/60 focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]"
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] text-text outline-none transition-shadow placeholder:text-text-soft/60 focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-pill bg-primary-dark py-4 px-6 font-body text-[15px] font-semibold text-white transition-transform duration-[180ms] ease-out hover:-translate-y-px disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Definir senha e entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
