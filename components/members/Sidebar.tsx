"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/actions/auth";
import SidebarShell from "@/components/members/SidebarShell";

const navItems = [
  { label: "Início", href: "/dashboard" },
  { label: "Meus Arquétipos", href: "/arquetipos" },
  { label: "Aulas", href: "/aulas" },
  { label: "Refazer Teste", href: "/refazer-teste" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarShell subtitle="Member area">
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[18px] px-4 py-[14px] font-body text-[15px] font-medium transition-colors ${
                active
                  ? "bg-[rgba(205,163,40,0.14)] text-primary-dark"
                  : "text-text-soft hover:bg-surface-soft"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-[18px] px-4 py-[14px] text-left font-body text-[15px] font-medium text-text-soft transition-colors hover:bg-surface-soft"
        >
          Sair
        </button>
      </form>
    </SidebarShell>
  );
}
