"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdminModules, createModule, updateModule, deleteModule } from "@/actions/adminCrud";
import StatusBadge from "@/components/admin/StatusBadge";
import ModuleForm from "@/components/admin/ModuleForm";
import type { Module } from "@/types";

export default function ModulosPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [editing, setEditing] = useState<Module | null>(null);
  const [creating, setCreating] = useState(false);

  function load() {
    getAdminModules().then((r) => { if (r.success && r.data) setModules(r.data); });
  }
  useEffect(load, []);

  async function handleCreate(data: { name: string; sort_order: number; status: "active" | "inactive" }) {
    const res = await createModule(data);
    if (!res.success) { toast.error(res.error); return; }
    toast.success("Módulo criado!"); setCreating(false); load();
  }

  async function handleUpdate(data: { name: string; sort_order: number; status: "active" | "inactive" }) {
    if (!editing) return;
    const res = await updateModule(editing.id, data);
    if (!res.success) { toast.error(res.error); return; }
    toast.success("Módulo atualizado!"); setEditing(null); load();
  }

  async function handleDelete(mod: Module) {
    if (!confirm(`Excluir "${mod.name}"? Todas as aulas deste módulo serão excluídas.`)) return;
    const res = await deleteModule(mod.id);
    if (!res.success) { toast.error(res.error); return; }
    toast.success("Módulo excluído!"); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">Módulos</h1>
        <button onClick={() => setCreating(true)} className="rounded-pill bg-primary px-5 py-3 font-body text-[14px] font-semibold text-[#17120a] transition-transform hover:-translate-y-px">
          Novo Módulo
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {modules.map((mod) => (
          <div key={mod.id} className="flex items-center justify-between rounded-[20px] border border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)] px-5 py-4">
            <div>
              <p className="font-body text-[16px] font-semibold text-text">{mod.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <StatusBadge status={mod.status} />
                <span className="font-body text-[12px] text-text-soft">Ordem: {mod.sort_order}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(mod)} className="rounded-pill border border-border px-3 py-1.5 font-body text-[13px] text-text-soft hover:bg-surface-soft">Editar</button>
              <button onClick={() => handleDelete(mod)} className="rounded-pill border border-[rgba(239,68,68,0.3)] px-3 py-1.5 font-body text-[13px] text-[#991B1B] hover:bg-[rgba(239,68,68,0.06)]">Excluir</button>
            </div>
          </div>
        ))}
        {modules.length === 0 && <p className="font-body text-text-soft">Nenhum módulo cadastrado.</p>}
      </div>

      {creating && <ModuleForm onSubmit={handleCreate} onCancel={() => setCreating(false)} />}
      {editing && <ModuleForm module={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />}
    </div>
  );
}
