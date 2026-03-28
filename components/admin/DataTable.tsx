interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, unknown>[];
}

export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-[rgba(221,212,200,0.8)] bg-[rgba(255,255,255,0.78)]">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-[rgba(221,212,200,0.5)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-[18px] py-[14px] text-left font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6A6258]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={(row.id as string) ?? i}
              className="border-b border-[rgba(221,212,200,0.5)] last:border-0 hover:bg-[rgba(205,163,40,0.04)]"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-[18px] py-[14px] font-body text-[14px] text-text"
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-[18px] py-8 text-center font-body text-[14px] text-text-soft"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
