"use client";

import Link from "next/link";
import type { Module } from "@/types";

interface ModuleCarouselProps {
  modules: Module[];
}

export default function ModuleCarousel({ modules }: ModuleCarouselProps) {
  if (modules.length === 0) {
    return (
      <p className="mt-4 font-body text-[15px] text-text-soft">
        Em breve novos conteúdos
      </p>
    );
  }

  return (
    <div
      className="flex gap-6 overflow-x-auto pb-2"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {modules.map((mod) => (
        <Link
          key={mod.id}
          href={`/aulas/${mod.id}`}
          className="flex min-w-[280px] shrink-0 flex-col justify-between rounded-lg p-6 text-white transition-transform duration-[180ms] hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #CDA328 0%, #d9b144 100%)",
            scrollSnapAlign: "start",
          }}
        >
          <p className="font-body text-[18px] font-semibold">{mod.name}</p>
          <span className="mt-4 font-body text-[14px] font-medium opacity-80">
            Acessar &rarr;
          </span>
        </Link>
      ))}
    </div>
  );
}
