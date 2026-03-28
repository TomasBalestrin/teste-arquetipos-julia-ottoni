"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createRetakeSession } from "@/actions/members";

export default function RefazerTestePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRetake() {
    setLoading(true);
    const result = await createRetakeSession();

    if (!result.success) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    router.push(`/quiz?session=${result.data!.sessionId}`);
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">
        Refazer o Teste
      </h1>
      <p className="mt-3 max-w-md font-body text-[15px] leading-[1.65] text-text-soft">
        Quer descobrir se seus arquétipos mudaram? Refaça o teste sem
        precisar preencher seu e-mail novamente.
      </p>
      <button
        onClick={handleRetake}
        disabled={loading}
        className="mt-8 rounded-pill bg-primary-dark px-8 py-4 font-body text-[17px] font-semibold text-white transition-transform duration-[180ms] ease-out hover:-translate-y-px disabled:opacity-50"
      >
        {loading ? "Criando sessão..." : "Começar Novo Teste"}
      </button>
    </div>
  );
}
