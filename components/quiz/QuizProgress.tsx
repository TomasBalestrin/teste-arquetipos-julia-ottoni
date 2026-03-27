interface QuizProgressProps {
  /** Etapa atual do quiz (2–11 visível) */
  currentStep: number;
}

export default function QuizProgress({ currentStep }: QuizProgressProps) {
  // Etapas 2-11 mapeiam para progresso 1/10 até 10/10
  const progress = currentStep - 1;
  const total = 10;
  const pct = (progress / total) * 100;

  return (
    <div className="mb-8 flex flex-col items-center gap-2">
      <span className="font-body text-[13px] font-medium text-text-soft">
        Etapa {progress} de {total}
      </span>
      <div className="h-[6px] w-full max-w-[320px] overflow-hidden rounded-pill bg-[rgba(205,163,40,0.15)]">
        <div
          className="h-full rounded-pill bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
