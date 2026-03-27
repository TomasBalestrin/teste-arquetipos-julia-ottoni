"use client";

import { useEffect, useCallback } from "react";
import type { Lesson } from "@/types";

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
}

export default function LessonModal({ lesson, onClose }: LessonModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-[800px] rounded-lg bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface-soft font-body text-[18px] text-text-soft transition-colors hover:bg-border"
          aria-label="Fechar"
        >
          &times;
        </button>

        <h2 className="pr-12 font-display text-[22px] font-bold tracking-[-0.02em] text-text">
          {lesson.title}
        </h2>

        <div className="mt-6">
          {lesson.content_type === "iframe" ? (
            <iframe
              src={lesson.content_url}
              className="aspect-video w-full rounded-[14px]"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <a
              href={lesson.content_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-pill bg-primary-dark px-8 py-4 font-body text-[15px] font-semibold text-white transition-transform duration-[180ms] hover:-translate-y-px"
            >
              Assistir aula &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
