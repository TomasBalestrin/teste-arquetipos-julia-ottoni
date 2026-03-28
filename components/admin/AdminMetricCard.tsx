interface AdminMetricCardProps {
  label: string;
  value: string | number;
}

export default function AdminMetricCard({ label, value }: AdminMetricCardProps) {
  return (
    <div className="rounded-[24px] border border-[rgba(221,212,200,0.8)] bg-white p-5">
      <span className="font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6A6258]">
        {label}
      </span>
      <p className="mt-2 font-display text-[30px] font-bold leading-tight tracking-[-0.02em] text-text">
        {value}
      </p>
    </div>
  );
}
