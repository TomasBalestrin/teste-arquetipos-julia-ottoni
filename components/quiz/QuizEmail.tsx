"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createTestSession } from "@/actions/quiz";

interface QuizEmailProps {
  onSubmit: (sessionId: string, email: string) => void;
}

export default function QuizEmail({ onSubmit }: QuizEmailProps) {
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
      <h2 className="font-display text-[clamp(24px,4vw,32px)] font-bold leading-[1.08] tracking-[-0.02em] text-text">
        Antes de começar, qual seu melhor e-mail?
      </h2>
      <p className="mt-3 font-body text-[15px] text-text-soft">
        Enviaremos seu resultado para este e-mail
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
          className="rounded-pill bg-primary-dark px-6 py-4 font-body text-[15px] font-semibold text-white transition-transform duration-[180ms] ease-out hover:-translate-y-px disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}
