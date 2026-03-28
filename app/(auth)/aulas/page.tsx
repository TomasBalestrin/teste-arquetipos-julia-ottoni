"use client";

import { useEffect, useState } from "react";
import { getAllLessons } from "@/actions/lessons";
import type { Lesson, Module } from "@/types";
import LessonCard from "@/components/members/LessonCard";
import LessonModal from "@/components/members/LessonModal";

interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export default function AulasPage() {
  const [modules, setModules] = useState<ModuleWithLessons[]>([]);
  const [selected, setSelected] = useState<Lesson | null>(null);

  useEffect(() => {
    getAllLessons().then((res) => {
      if (res.success && res.data) setModules(res.data);
    });
  }, []);

  if (modules.length === 0) {
    return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">
          Aulas
        </h1>
        <p className="mt-4 font-body text-[15px] text-text-soft">
          Em breve novos conteúdos.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">
        Aulas
      </h1>

      <div className="mt-8 space-y-10">
        {modules.map((mod) => (
          <section key={mod.id}>
            <h2 className="font-display text-xl font-bold text-text">
              {mod.name}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {mod.lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onOpen={setSelected}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {selected && (
        <LessonModal lesson={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
