"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getModuleWithLessons } from "@/actions/lessons";
import type { Lesson, Module } from "@/types";
import LessonCard from "@/components/members/LessonCard";
import LessonModal from "@/components/members/LessonModal";

interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export default function ModuleLessonsPage() {
  const params = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<ModuleWithLessons | null>(null);
  const [selected, setSelected] = useState<Lesson | null>(null);

  useEffect(() => {
    getModuleWithLessons(params.moduleId).then((res) => {
      if (res.success && res.data) setModule(res.data);
    });
  }, [params.moduleId]);

  if (!module) {
    return (
      <p className="font-body text-text-soft">Carregando...</p>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">
        {module.name}
      </h1>

      {module.lessons.length === 0 ? (
        <p className="mt-4 font-body text-[15px] text-text-soft">
          Nenhuma aula disponível neste módulo.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {module.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onOpen={setSelected}
            />
          ))}
        </div>
      )}

      {selected && (
        <LessonModal lesson={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
