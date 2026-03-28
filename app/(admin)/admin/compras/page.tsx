"use client";

import { useEffect, useState } from "react";
import { getPurchases } from "@/actions/adminLists";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";

function formatDate(d: string) { return new Date(d).toLocaleDateString("pt-BR"); }
function formatCurrency(v: unknown) {
  const cents = v as number | null;
  if (cents == null) return "—";
  return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
}

const columns = [
  { key: "email", label: "Email" },
  { key: "transaction_id", label: "Transação" },
  { key: "status", label: "Status", render: (v: unknown) => <StatusBadge status={v as string} /> },
  { key: "amount_cents", label: "Valor", render: formatCurrency },
  { key: "created_at", label: "Data", render: (v: unknown) => formatDate(v as string) },
];

export default function ComprasPage() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getPurchases(page).then((res) => {
      if (res.success && res.data) {
        setRows(res.data.items);
        setTotalPages(res.data.totalPages);
      }
    });
  }, [page]);

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold tracking-[-0.02em] text-text">
        Compras
      </h1>
      <DataTable columns={columns} rows={rows} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
