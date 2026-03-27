"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const result = await signIn(email, password);

    if (!result.success) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    toast.success("Login realizado!");
    router.push(result.data!.redirectTo);
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
          Entrar
        </h1>
        <p className="mt-1 font-body text-sm text-text-soft">
          Acesse sua área de membros
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <LoginInput
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={setEmail}
            required
          />
          <LoginInput
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={setPassword}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-pill bg-primary-dark py-4 px-6 font-body text-[15px] font-semibold text-white transition-transform duration-[180ms] ease-out hover:-translate-y-px disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}

function LoginInput({
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] text-text outline-none transition-shadow placeholder:text-text-soft/60 focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]"
    />
  );
}
