"use client";

import { useEffect, useState } from "react";
import { getLeads } from "@/actions/adminLists";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import type { Top3Entry } from "@/types";
import { getArchetypeName } from "@/lib/archetypes/archetypes";

function formatDate(d: string) { return new Date(d).toLocaleDateString("pt-BR"); }

function renderTop3(v: unknown) {
  const arr = v as Top3Entry[] | null;
  if (!arr || arr.length === 0) return "—";
  return arr.map((e) => getArchetypeName(e.archetype)).join(", ");
}

const columns = [
  { key: "email", label: "Email" },
  { key: "status", label: "Status", render: (v: unknown) => <StatusBadge status={v as string} /> },
  { key: "top_3", label: "Top 3", render: renderTop3 },
  { key: "created_at", label: "Data", render: (v: unknown) => formatDate(v as string) },
];

export default function LeadsPage() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getLeads(page).then((res) => {
      if (res.success && res.data) {
        setRows(res.data.items);
        setTotalPages(res.data.totalPages);
      }
    });
  }, [page]);

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold tracking-[-0.02em] text-text">
        Leads
      </h1>
      <DataTable columns={columns} rows={rows} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
