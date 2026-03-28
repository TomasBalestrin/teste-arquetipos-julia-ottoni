"use client";

import { useEffect, useState } from "react";
import { OFFER_ITEMS, OFFER_TOTAL } from "@/lib/offerData";
import { getCheckoutUrl } from "@/actions/quiz";
import BonusItem from "./BonusItem";
import PriceCard from "./PriceCard";

export default function OfferSection() {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    getCheckoutUrl().then((res) => {
      if (res.success && res.data?.url) setCheckoutUrl(res.data.url);
    });
  }, []);

  return (
    <section className="mt-12">
      <h2 className="text-center font-display text-[clamp(24px,4vw,32px)] font-semibold leading-[1.08] tracking-[-0.02em] text-text">
        O que você recebe ao desbloquear:
      </h2>

      <div className="mx-auto mt-8 flex max-w-[560px] flex-col gap-3">
        {OFFER_ITEMS.map((item) => (
          <BonusItem
            key={item.name}
            name={item.name}
            originalPrice={item.originalPrice}
          />
        ))}
      </div>

      <p className="mt-6 text-center font-body text-[16px] font-semibold text-text">
        Tudo isso deveria custar:{" "}
        <span className="text-[#C0392B] line-through">{OFFER_TOTAL}</span>
      </p>

      <PriceCard checkoutUrl={checkoutUrl} />

      <div className="mt-5 flex flex-col items-center gap-1 text-center">
        <span className="font-body text-[13px] text-text-soft">
          &#128274; Pagamento 100% seguro via Hotmart
        </span>
        <span className="font-body text-[13px] text-text-soft">
          Satisfação garantida — 7 dias de reembolso
        </span>
      </div>
    </section>
  );
}
