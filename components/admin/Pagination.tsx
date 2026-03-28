interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-pill border border-border px-4 py-2 font-body text-[13px] font-medium text-text-soft transition-colors hover:bg-surface-soft disabled:opacity-40"
      >
        Anterior
      </button>
      <span className="font-body text-[13px] text-text-soft">
        {page} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-pill border border-border px-4 py-2 font-body text-[13px] font-medium text-text-soft transition-colors hover:bg-surface-soft disabled:opacity-40"
      >
        Próxima
      </button>
    </div>
  );
}
