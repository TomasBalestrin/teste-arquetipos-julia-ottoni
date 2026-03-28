const STYLES: Record<string, string> = {
  approved: "bg-[rgba(34,197,94,0.12)] text-[#166534]",
  completed: "bg-[rgba(34,197,94,0.12)] text-[#166534]",
  active: "bg-[rgba(34,197,94,0.12)] text-[#166534]",
  Ativo: "bg-[rgba(34,197,94,0.12)] text-[#166534]",
  refunded: "bg-[rgba(239,68,68,0.12)] text-[#991B1B]",
  cancelled: "bg-[rgba(239,68,68,0.12)] text-[#991B1B]",
  Bloqueado: "bg-[rgba(239,68,68,0.12)] text-[#991B1B]",
  started: "bg-[rgba(156,163,175,0.15)] text-[#4B5563]",
  inactive: "bg-[rgba(156,163,175,0.15)] text-[#4B5563]",
  in_progress: "bg-[rgba(205,163,40,0.15)] text-[#8B6800]",
};

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = STYLES[status] ?? STYLES["started"];
  return (
    <span className={`inline-block rounded-pill px-3 py-1 font-body text-[12px] font-semibold ${style}`}>
      {label ?? status}
    </span>
  );
}
