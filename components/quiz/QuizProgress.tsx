interface QuizProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export default function QuizProgress({
  currentStep,
  totalSteps = 10,
}: QuizProgressProps) {
  const progress = currentStep - 1;
  const pct = Math.min((progress / totalSteps) * 100, 100);

  return (
    <div className="mb-10 flex flex-col items-center gap-2.5">
      <span className="font-body text-[13px] font-medium text-text-soft">
        Pergunta {Math.min(progress, 9)} de 9
      </span>
      <div className="h-[6px] w-full max-w-[320px] overflow-hidden rounded-pill bg-[rgba(221,212,200,0.5)]">
        <div
          className="h-full rounded-pill transition-all duration-[400ms] ease-out"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #CDA328, #8B6800)",
          }}
        />
      </div>
    </div>
  );
}
