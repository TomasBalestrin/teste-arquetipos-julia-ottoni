"use client";

import type { Lesson } from "@/types";

interface LessonCardProps {
  lesson: Lesson;
  onOpen: (lesson: Lesson) => void;
}

export default function LessonCard({ lesson, onOpen }: LessonCardProps) {
  return (
    <button
      onClick={() => onOpen(lesson)}
      className="group w-full rounded-lg border border-[rgba(221,212,200,0.85)] bg-[rgba(255,255,255,0.78)] p-[14px] text-left transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-lg"
      style={{ boxShadow: "0 18px 50px rgba(17, 17, 17, 0.08)" }}
    >
      <div
        className="relative h-[190px] w-full overflow-hidden rounded-[22px]"
        style={
          lesson.cover_image_url
            ? undefined
            : {
                background:
                  "linear-gradient(135deg, rgba(205,163,40,0.15) 0%, rgba(205,163,40,0.05) 100%)",
              }
        }
      >
        {lesson.cover_image_url && (
          <img
            src={lesson.cover_image_url}
            alt={lesson.title}
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute left-3 top-3 rounded-pill bg-[rgba(17,17,17,0.18)] px-3 py-1.5 font-body text-[12px] font-semibold uppercase text-white">
          Aula
        </span>
      </div>
      <p className="mt-3 font-body text-[18px] font-semibold text-text">
        {lesson.title}
      </p>
    </button>
  );
}
