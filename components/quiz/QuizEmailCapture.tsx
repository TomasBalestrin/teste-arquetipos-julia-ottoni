"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createTestSession } from "@/actions/quiz";

interface QuizEmailCaptureProps {
  onSubmit: (sessionId: string, email: string) => void;
}

export default function QuizEmailCapture({ onSubmit }: QuizEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const result = await createTestSession(email);

    if (!result.success) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    onSubmit(result.data!.sessionId, email);
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(205,163,40,0.12)]">
        <span className="font-body text-[22px]">&#9993;</span>
      </div>

      <h2 className="font-display text-[clamp(24px,4vw,32px)] font-bold leading-[1.08] tracking-[-0.02em] text-text">
        Antes de começar...
      </h2>
      <p className="mt-3 max-w-sm font-body text-[15px] leading-[1.65] text-text-soft">
        Informe seu e-mail para salvar seu resultado e acessá-lo depois
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex w-full max-w-[380px] flex-col gap-4"
      >
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] text-text outline-none transition-shadow placeholder:text-text-soft/60 focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-pill bg-primary px-6 py-4 font-body text-[16px] font-semibold text-[#17120a] transition-all duration-[180ms] ease-out hover:-translate-y-px disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Continuar"}
        </button>
      </form>

      <p className="mt-4 max-w-xs font-body text-[12px] leading-[1.5] text-text-soft/50">
        Seus dados estão seguros. Não enviamos spam.
      </p>
    </div>
  );
}
