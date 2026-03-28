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
    <div className="mx-auto my-5 max-w-[300px]">
      <div className="h-[5px] w-full overflow-hidden rounded-pill bg-[rgba(221,212,200,0.5)]">
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
