"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/actions/adminLists";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";

function formatDate(d: string) { return new Date(d).toLocaleDateString("pt-BR"); }

const columns = [
  { key: "email", label: "Email" },
  { key: "name", label: "Nome", render: (v: unknown) => (v as string) || "—" },
  {
    key: "access_granted",
    label: "Acesso",
    render: (v: unknown) => (
      <StatusBadge
        status={v ? "Ativo" : "Bloqueado"}
        label={v ? "Ativo" : "Bloqueado"}
      />
    ),
  },
  {
    key: "must_reset_password",
    label: "Reset senha",
    render: (v: unknown) => (v ? "Sim" : "Não"),
  },
  { key: "created_at", label: "Data", render: (v: unknown) => formatDate(v as string) },
];

export default function UsuariosPage() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getUsers(page).then((res) => {
      if (res.success && res.data) {
        setRows(res.data.items);
        setTotalPages(res.data.totalPages);
      }
    });
  }, [page]);

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold tracking-[-0.02em] text-text">
        Usuários
      </h1>
      <DataTable columns={columns} rows={rows} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
