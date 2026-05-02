import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Layers, Settings, Users } from "lucide-react";

export type AdminNavItem = {
  href: string;
  labelKey: string;
  icon: LucideIcon;
};

export const adminNav: AdminNavItem[] = [
  { href: "/admin/dashboard", labelKey: "admin.dashboard", icon: LayoutDashboard },
  { href: "/admin/products", labelKey: "admin.products", icon: Layers },
  { href: "/admin/orders", labelKey: "admin.orders", icon: Layers },
  { href: "/admin/customers", labelKey: "admin.customers", icon: Users },
  { href: "/admin/settings", labelKey: "admin.settings", icon: Settings },
];

