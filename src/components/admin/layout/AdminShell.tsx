"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminTopbar } from "@/components/admin/layout/AdminTopbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-zinc-50 dark:bg-black">
      <AdminSidebar collapsed={collapsed} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AdminTopbar collapsed={collapsed} onToggleSidebar={() => setCollapsed((prev) => !prev)} />
        <main className="min-h-0 flex-1 overflow-y-auto p-3">{children}</main>
      </div>
    </div>
  );
}