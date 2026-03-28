"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdminLessons, getAdminModules, createLesson, updateLesson, deleteLesson } from "@/actions/adminCrud";
import StatusBadge from "@/components/admin/StatusBadge";
import LessonForm from "@/components/admin/LessonForm";
import type { Lesson, Module } from "@/types";

type LessonRow = Lesson & { module_name: string };

export default function AulasAdminPage() {
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [editing, setEditing] = useState<Lesson | null>(null);
  const [creating, setCreating] = useState(false);

  function load() {
    getAdminLessons().then((r) => { if (r.success && r.data) setLessons(r.data); });
    getAdminModules().then((r) => { if (r.success && r.data) setModules(r.data); });
  }
  useEffect(load, []);

  async function handleCreate(data: Parameters<typeof createLesson>[0]) {
    const res = await createLesson(data);
    if (!res.success) { toast.error(res.error); return; }
    toast.success("Aula criada!"); setCreating(false); load();
  }

  async function handleUpdate(data: Parameters<typeof updateLesson>[1]) {
    if (!editing) return;
    const res = await updateLesson(editing.id, data);
    if (!res.success) { toast.error(res.error); return; }
    toast.success("Aula atualizada!"); setEditing(null); load();
  }

  async function handleDelete(lesson: Lesson) {
    if (!confirm(`Excluir aula "${lesson.title}"?`)) return;
    const res = await deleteLesson(lesson.id);
    if (!res.success) { toast.error(res.error); return; }
    toast.success("Aula excluída!"); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">Aulas</h1>
        <button onClick={() => setCreating(true)} disabled={modules.length === 0} className="rounded-pill bg-primary px-5 py-3 font-body text-[14px] font-semibold text-[#17120a] transition-transform hover:-translate-y-px disabled:opacity-40">
          Nova Aula
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between rounded-[20px] border border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)] px-5 py-4">
            <div>
              <p className="font-body text-[16px] font-semibold text-text">{lesson.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="font-body text-[12px] text-text-soft">{lesson.module_name}</span>
                <StatusBadge status={lesson.status} />
                <span className="font-body text-[12px] text-text-soft">{lesson.content_type}</span>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => setEditing(lesson)} className="rounded-pill border border-border px-3 py-1.5 font-body text-[13px] text-text-soft hover:bg-surface-soft">Editar</button>
              <button onClick={() => handleDelete(lesson)} className="rounded-pill border border-[rgba(239,68,68,0.3)] px-3 py-1.5 font-body text-[13px] text-[#991B1B] hover:bg-[rgba(239,68,68,0.06)]">Excluir</button>
            </div>
          </div>
        ))}
        {lessons.length === 0 && <p className="font-body text-text-soft">Nenhuma aula cadastrada.</p>}
      </div>

      {creating && <LessonForm modules={modules} onSubmit={handleCreate} onCancel={() => setCreating(false)} />}
      {editing && <LessonForm lesson={editing} modules={modules} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />}
    </div>
  );
}
