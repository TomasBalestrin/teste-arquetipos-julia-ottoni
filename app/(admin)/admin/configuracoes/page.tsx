"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSiteSettings, updateSiteSetting } from "@/actions/adminSettings";

export default function ConfiguracoesPage() {
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [pixelId, setPixelId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSiteSettings().then((res) => {
      if (res.success && res.data) {
        setCheckoutUrl(res.data.checkout_url);
        setPixelId(res.data.facebook_pixel_id);
      }
    });
  }, []);

  async function handleSave() {
    setLoading(true);
    const [r1, r2] = await Promise.all([
      updateSiteSetting("checkout_url", checkoutUrl),
      updateSiteSetting("facebook_pixel_id", pixelId),
    ]);

    if (!r1.success || !r2.success) {
      toast.error("Erro ao salvar configurações");
    } else {
      toast.success("Configurações salvas!");
    }
    setLoading(false);
  }

  const inputCls =
    "w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]";

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">
        Configurações
      </h1>

      <div className="mt-8 max-w-lg space-y-6">
        <div>
          <label className="mb-2 block font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6A6258]">
            Checkout URL (Hotmart)
          </label>
          <input
            value={checkoutUrl}
            onChange={(e) => setCheckoutUrl(e.target.value)}
            placeholder="https://pay.hotmart.com/..."
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-2 block font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6A6258]">
            Facebook Pixel ID
          </label>
          <input
            value={pixelId}
            onChange={(e) => setPixelId(e.target.value)}
            placeholder="123456789012345"
            className={inputCls}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-pill bg-primary-dark px-6 py-3 font-body text-[15px] font-semibold text-white transition-transform hover:-translate-y-px disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar Tudo"}
        </button>
      </div>
    </div>
  );
}
