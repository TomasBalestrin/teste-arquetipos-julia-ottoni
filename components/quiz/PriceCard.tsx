"use client";

import { trackClickCTA } from "@/lib/pixel/pixel";
import { OFFER_TOTAL, OFFER_FINAL_PRICE } from "@/lib/offerData";

interface PriceCardProps {
  checkoutUrl: string | null;
}

export default function PriceCard({ checkoutUrl }: PriceCardProps) {
  function handleCTA() {
    trackClickCTA();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }

  return (
    <div
      className="mx-auto mt-8 max-w-[560px] rounded-[28px] border border-[rgba(205,163,40,0.25)] px-8 py-11 text-center"
      style={{
        background: "linear-gradient(180deg, #1a1510 0%, #0f0c08 100%)",
        boxShadow: "0 24px 60px rgba(17, 17, 17, 0.25)",
      }}
    >
      <span className="inline-block rounded-pill bg-[rgba(205,163,40,0.2)] px-[18px] py-[10px] font-body text-[13px] font-semibold text-primary">
        Teste dos Arquétipos
      </span>

      <p className="mx-auto mt-6 max-w-[400px] font-body text-[17px] leading-[1.65] text-[rgba(255,255,255,0.85)]">
        Acesse o Teste dos Arquétipos e construa um posicionamento magnético.
      </p>

      <p className="mt-6 font-body text-[15px] text-[rgba(255,255,255,0.5)]">
        de{" "}
        <span className="line-through">{OFFER_TOTAL}</span>
        {" "}por apenas:
      </p>

      <p
        className="mt-3 font-display text-[56px] font-bold text-primary"
        style={{ textShadow: "0 2px 20px rgba(205, 163, 40, 0.3)" }}
      >
        {OFFER_FINAL_PRICE}
      </p>

      <button
        onClick={handleCTA}
        disabled={!checkoutUrl}
        className="mx-auto mt-7 block w-full max-w-[420px] rounded-pill bg-primary px-10 py-[18px] font-body text-[16px] font-bold text-[#17120a] transition-all duration-[180ms] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ boxShadow: "0 8px 30px rgba(205, 163, 40, 0.35)" }}
      >
        Sim, quero desbloquear meu resultado!
      </button>

      {!checkoutUrl && (
        <p className="mt-3 font-body text-[13px] text-[rgba(255,255,255,0.4)]">
          Checkout será liberado em breve
        </p>
      )}
    </div>
  );
}
