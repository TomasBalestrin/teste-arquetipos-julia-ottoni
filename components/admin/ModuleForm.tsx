"use client";

import { useState } from "react";
import type { Module } from "@/types";

interface ModuleFormProps {
  module?: Module;
  onSubmit: (data: { name: string; sort_order: number; status: "active" | "inactive" }) => void;
  onCancel: () => void;
}

export default function ModuleForm({ module, onSubmit, onCancel }: ModuleFormProps) {
  const [name, setName] = useState(module?.name ?? "");
  const [sortOrder, setSortOrder] = useState(module?.sort_order ?? 0);
  const [status, setStatus] = useState<"active" | "inactive">(
    (module?.status as "active" | "inactive") ?? "active"
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, sort_order: sortOrder, status });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[520px] rounded-lg bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-[24px] font-bold text-text">
          {module ? "Editar Módulo" : "Novo Módulo"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            placeholder="Nome do módulo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]"
          />
          <input
            type="number"
            placeholder="Ordem"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            min={0}
            className="w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
            className="w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]"
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-pill bg-primary-dark py-3 font-body text-[15px] font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-pill border border-border py-3 font-body text-[15px] font-medium text-text-soft transition-colors hover:bg-surface-soft"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
