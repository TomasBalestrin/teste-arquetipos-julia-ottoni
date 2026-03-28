interface BonusItemProps {
  name: string;
  originalPrice: string;
}

export default function BonusItem({ name, originalPrice }: BonusItemProps) {
  return (
    <div className="flex items-center justify-between rounded-[16px] border border-[rgba(221,212,200,0.6)] bg-[rgba(255,255,255,0.78)] px-5 py-4 transition-all duration-[180ms] hover:-translate-y-px hover:border-[rgba(205,163,40,0.3)]">
      <div className="flex items-center gap-[14px]">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(205,163,40,0.15)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-primary-dark"
          >
            <path
              d="M3 8.5L6.5 12L13 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-body text-[15px] font-medium text-text">
          {name}
        </span>
      </div>
      <span className="shrink-0 font-body text-[14px] font-medium text-[#C0392B] line-through">
        {originalPrice}
      </span>
    </div>
  );
}
