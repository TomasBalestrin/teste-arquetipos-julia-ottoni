import { getAdminDashboard } from "@/actions/admin";
import AdminMetricCard from "@/components/admin/AdminMetricCard";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR");
}

export default async function AdminDashboardPage() {
  const res = await getAdminDashboard();
  const data = res.data;

  if (!data) {
    return <p className="font-body text-text-soft">Erro ao carregar dashboard.</p>;
  }

  const leadCols = [
    { key: "email", label: "Email" },
    { key: "status", label: "Status", render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: "created_at", label: "Data", render: (v: unknown) => formatDate(v as string) },
  ];

  const purchaseCols = [
    { key: "email", label: "Email" },
    { key: "transaction_id", label: "Transação" },
    { key: "created_at", label: "Data", render: (v: unknown) => formatDate(v as string) },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">
          Painel Admin
        </h1>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <AdminMetricCard label="Total Leads" value={data.totalLeads} />
          <AdminMetricCard label="Compras" value={data.totalPurchases} />
          <AdminMetricCard label="Usuários" value={data.totalUsers} />
          <AdminMetricCard label="Conversão" value={`${data.conversionRate}%`} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-display text-xl font-bold text-text">Leads Recentes</h2>
        <DataTable columns={leadCols} rows={data.recentLeads} />
      </div>

      <div>
        <h2 className="mb-4 font-display text-xl font-bold text-text">Compras Recentes</h2>
        <DataTable columns={purchaseCols} rows={data.recentPurchases} />
      </div>
    </div>
  );
}
