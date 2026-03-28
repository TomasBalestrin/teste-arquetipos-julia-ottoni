"use client";

import { useState } from "react";
import type { Lesson, Module } from "@/types";

interface LessonFormProps {
  lesson?: Lesson;
  modules: Module[];
  onSubmit: (data: {
    module_id: string;
    title: string;
    content_type: "link" | "iframe";
    content_url: string;
    cover_image_url: string;
    sort_order: number;
    status: "active" | "inactive";
  }) => void;
  onCancel: () => void;
}

export default function LessonForm({ lesson, modules, onSubmit, onCancel }: LessonFormProps) {
  const [moduleId, setModuleId] = useState(lesson?.module_id ?? modules[0]?.id ?? "");
  const [title, setTitle] = useState(lesson?.title ?? "");
  const [contentType, setContentType] = useState<"link" | "iframe">(
    (lesson?.content_type as "link" | "iframe") ?? "link"
  );
  const [contentUrl, setContentUrl] = useState(lesson?.content_url ?? "");
  const [coverUrl, setCoverUrl] = useState(lesson?.cover_image_url ?? "");
  const [sortOrder, setSortOrder] = useState(lesson?.sort_order ?? 0);
  const [status, setStatus] = useState<"active" | "inactive">(
    (lesson?.status as "active" | "inactive") ?? "active"
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      module_id: moduleId, title, content_type: contentType,
      content_url: contentUrl, cover_image_url: coverUrl,
      sort_order: sortOrder, status,
    });
  }

  const inputCls = "w-full rounded-[18px] border border-border bg-[rgba(255,255,255,0.92)] px-[18px] py-[15px] font-body text-[15px] outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(205,163,40,0.14)]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div className="w-full max-w-[520px] rounded-lg bg-white p-8" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-display text-[24px] font-bold text-text">
          {lesson ? "Editar Aula" : "Nova Aula"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} className={inputCls} required>
            {modules.map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}
          </select>
          <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} />
          <select value={contentType} onChange={(e) => setContentType(e.target.value as "link" | "iframe")} className={inputCls}>
            <option value="link">Link externo</option>
            <option value="iframe">Iframe (VTurb)</option>
          </select>
          <input placeholder="URL do conteúdo" value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} required className={inputCls} />
          <input placeholder="URL da imagem de capa (opcional)" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className={inputCls} />
          <input type="number" placeholder="Ordem" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} min={0} className={inputCls} />
          <select value={status} onChange={(e) => setStatus(e.target.value as "active" | "inactive")} className={inputCls}>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
          <div className="mt-2 flex gap-3">
            <button type="submit" className="flex-1 rounded-pill bg-primary-dark py-3 font-body text-[15px] font-semibold text-white transition-transform hover:-translate-y-px">Salvar</button>
            <button type="button" onClick={onCancel} className="flex-1 rounded-pill border border-border py-3 font-body text-[15px] font-medium text-text-soft hover:bg-surface-soft">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
