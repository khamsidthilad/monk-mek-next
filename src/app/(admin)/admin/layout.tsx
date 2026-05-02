import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { requireAdminAuth } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdminAuth();

  return <AdminShell>{children}</AdminShell>;
}
