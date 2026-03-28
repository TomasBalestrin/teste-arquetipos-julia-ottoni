"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/pixel/pixel";
import QuizLogo from "./QuizLogo";

interface QuizIntroProps {
  onStart: () => void;
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div
      className="mx-auto max-w-[640px] rounded-[28px] border border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)] px-6 py-10 text-center sm:px-8 sm:py-12"
      style={{ boxShadow: "0 18px 50px rgba(17, 17, 17, 0.08)" }}
    >
      <QuizLogo />

      <h1 className="mx-auto max-w-[600px] font-display text-[clamp(23px,4vw,38px)] font-bold leading-[1.15] tracking-[-0.02em] text-text">
        Descubra seus{" "}
        <span className="text-primary">Arquétipos Dominantes</span> e a
        imagem que faz seu negócio valer mais
      </h1>

      <p className="mx-auto mt-5 max-w-[520px] font-body text-[15px] leading-[1.65] text-text-soft">
        Qual é a paleta de cores, o estilo de roupas e o posicionamento
        visual que fazem o cliente perceber o real valor do que você oferece?
      </p>

      <span
        className="mt-7 inline-block rounded-pill border border-[rgba(221,212,200,0.6)] bg-[rgba(255,255,255,0.7)] px-5 py-[10px] font-body text-[13px] font-medium text-text-soft"
        style={{ backdropFilter: "blur(8px)" }}
      >
        ⏱ Leva menos de 2 minutos
      </span>

      <div className="mt-6">
        <button
          onClick={onStart}
          className="w-full max-w-[400px] rounded-pill py-[18px] font-body text-[15px] font-bold uppercase tracking-[0.05em] text-white transition-all duration-[180ms] hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #CDA328 0%, #B8911E 100%)",
            boxShadow: "0 8px 30px rgba(205, 163, 40, 0.3)",
          }}
        >
          Descobrir meus arquétipos
        </button>
      </div>

      <p className="mt-4 font-body text-[13px] text-text-soft/70">
        &#128274; Teste seguro e confidencial
      </p>
    </div>
  );
}
