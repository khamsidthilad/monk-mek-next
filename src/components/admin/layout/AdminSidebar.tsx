"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { adminNav } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarGroup,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AdminSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <Sidebar collapsed={collapsed} className="flex h-dvh flex-col overflow-hidden">
      <SidebarHeader className="shrink-0 border-b border-zinc-200 px-2 py-3 dark:border-zinc-800">
        <div className={cn("flex w-full", collapsed ? "justify-center" : "items-center gap-2")}>
          <div className="inline-flex items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 p-1 text-amber-500">
            <House className="h-8 w-8" />
          </div>
          <div className={cn("min-w-0", collapsed ? "hidden" : "block")}>
            <p className={cn("font-bold uppercase text-amber-500", collapsed ? "text-sm tracking-[0.14em]" : "text-sm tracking-[0.2em]")}>
              {collapsed ? "I-L" : "SPORT STORE"}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
             Admin
            </p>
          </div>
          {collapsed ? (
            <p className="sr-only" aria-hidden>
              S-S
            </p>
          ) : null}
        </div>
      </SidebarHeader>

      <SidebarContent className="relative z-10 min-h-0 flex-1 overflow-y-auto py-2">
        <SidebarGroup>
          <SidebarMenu>
            {adminNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              const label = t(item.labelKey);
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild active={isActive} collapsed={collapsed} title={label}>
                    <Link href={item.href}>
                      <Icon className="h-4 w-4" />
                      {!collapsed ? label : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="shrink-0 border-t border-zinc-200 px-1 dark:border-zinc-800">
        <p
          className={cn(
            "px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400",
            collapsed && "text-center",
          )}
        >
          {collapsed ? "v1" : "ICON LAOS CMS v1"}
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
