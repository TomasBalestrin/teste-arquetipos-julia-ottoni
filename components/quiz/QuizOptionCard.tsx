"use client";

import type { OptionLetter } from "@/lib/archetypes/questions";

interface QuizOptionCardProps {
  letter: OptionLetter;
  text: string;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function QuizOptionCard({
  letter,
  text,
  selected,
  onClick,
  disabled,
}: QuizOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-start gap-3 rounded-[18px] px-5 py-4 text-left transition-all duration-[180ms] ease-out ${
        selected
          ? "border-2 border-primary bg-[rgba(205,163,40,0.08)] shadow-[0_0_0_4px_rgba(205,163,40,0.12)]"
          : "border border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)] hover:-translate-y-px hover:border-[rgba(205,163,40,0.4)] hover:bg-[rgba(255,255,255,0.92)]"
      } ${disabled && !selected ? "opacity-60" : ""}`}
      style={{ backdropFilter: "blur(12px)", minHeight: 48 }}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] font-body text-[13px] font-semibold transition-colors duration-[180ms] ${
          selected
            ? "bg-primary text-white"
            : "bg-[rgba(221,212,200,0.3)] text-text-soft"
        }`}
      >
        {letter}
      </span>
      <span
        className={`font-body text-[15px] leading-[1.5] ${
          selected ? "font-medium text-text" : "text-text"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
