"use client";

import { trackClickCTA } from "@/lib/pixel/pixel";
import { OFFER_TOTAL, OFFER_FINAL_PRICE, OFFER_INSTALLMENT } from "@/lib/offerData";

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
      className="relative mx-auto mt-8 max-w-[560px] overflow-hidden rounded-[28px] border-2 border-[rgba(205,163,40,0.35)] px-8 py-11 text-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(205,163,40,0.08) 0%, rgba(205,163,40,0.03) 100%)",
        boxShadow:
          "0 18px 50px rgba(205,163,40,0.12), 0 4px 20px rgba(17,17,17,0.06)",
      }}
    >
      <div className="pointer-events-none absolute -bottom-[60px] -right-[60px] h-[200px] w-[200px] rounded-full bg-[rgba(205,163,40,0.06)]" />
      <div className="pointer-events-none absolute -left-[40px] -top-[40px] h-[120px] w-[120px] rounded-full bg-[rgba(205,163,40,0.04)]" />

      <p className="relative font-body text-[15px] font-medium text-text-soft">
        Valor padrão:{" "}
        <span className="text-[#C0392B] line-through">{OFFER_TOTAL}</span>
      </p>

      <p className="relative mt-2 font-body text-[16px] font-semibold text-text">
        Mas você não irá pagar isso hoje.
      </p>

      <p className="relative mt-4 font-body text-[15px] text-text-soft">
        Ao revelar seu teste agora, você paga apenas:
      </p>

      <div className="relative mt-2">
        <span className="font-body text-[22px] font-medium text-text">12x </span>
        <span className="font-display text-[48px] font-bold text-primary-dark sm:text-[52px]">
          R$ 6,70
        </span>
      </div>

      <p className="relative mt-1 font-body text-[14px] text-text-soft">
        ou {OFFER_FINAL_PRICE} à vista
      </p>

      <div className="relative mx-auto mt-6 max-w-[300px] border-t border-[rgba(205,163,40,0.2)] pt-6">
        <button
          onClick={handleCTA}
          disabled={!checkoutUrl}
          className="mx-auto block w-full max-w-[400px] rounded-pill py-[18px] font-body text-[16px] font-bold text-white transition-all duration-[180ms] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg, #CDA328 0%, #B8911E 100%)",
            boxShadow: "0 8px 30px rgba(205, 163, 40, 0.3)",
          }}
        >
          Sim, quero desbloquear meu resultado!
        </button>
      </div>

      {!checkoutUrl && (
        <p className="relative mt-3 font-body text-[13px] text-text-soft/50">
          Checkout será liberado em breve
        </p>
      )}
    </div>
  );
}
