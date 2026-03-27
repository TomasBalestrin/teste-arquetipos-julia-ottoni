"use client";

import { useState } from "react";

interface SidebarShellProps {
  subtitle: string;
  children: React.ReactNode;
}

export default function SidebarShell({
  subtitle,
  children,
}: SidebarShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-[14px] bg-primary font-display text-sm font-bold text-white lg:hidden"
        aria-label="Menu"
      >
        A
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col gap-4 p-5 transition-transform duration-200 lg:left-4 lg:top-4 lg:h-[calc(100vh-32px)] lg:translate-x-0 lg:rounded-[30px] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f7f3ef 100%)",
          border: "1px solid rgba(221, 212, 200, 0.9)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 pt-1">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-primary font-display text-lg font-bold text-white">
            A
          </div>
          <div>
            <p className="font-body text-[16px] font-bold text-text">
              Arquétipos
            </p>
            <p className="font-body text-[13px] text-text-soft">
              {subtitle}
            </p>
          </div>
        </div>

        {children}
      </aside>
    </>
  );
}
