"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { format, parseISO } from "date-fns";
import { logoutAdmin } from "@/actions/auth";
import { useI18n } from "@/components/providers/i18n-provider";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { adminNav } from "@/lib/admin-nav";
import { fetchMe } from "@/services/api/me";
import type { AdminMe } from "@/types/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CalendarClock, LogOut, Mail, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminTopbar({
  collapsed,
  onToggleSidebar,
}: {
  collapsed: boolean;
  onToggleSidebar: () => void;
}) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState<AdminMe | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const segments = pathname.split("/").filter(Boolean).slice(1); // remove leading "admin"

  const crumbs = segments.map((segment, index) => {
    const href = `/admin/${segments.slice(0, index + 1).join("/")}`;
    const navMatch = adminNav.find((item) => item.href === href);
    const labelFromNav = navMatch ? t(navMatch.labelKey) : undefined;
    const fallbackLabel = segment
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    return {
      href,
      label: labelFromNav ?? fallbackLabel,
      isLast: index === segments.length - 1,
    };
  });

  useEffect(() => {
    let active = true;
    void fetchMe()
      .then((data) => {
        if (!active) return;
        setMe(data);
      })
      .catch(() => {
        if (!active) return;
        setMe(null);
      });
    return () => {
      active = false;
    };
  }, []);

  const initials = useMemo(() => {
    const base = me?.name?.trim() || me?.email || "Admin";
    const parts = base.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return base.slice(0, 2).toUpperCase();
  }, [me]);

  const fullName = me?.name || "Admin User";
  const roleLabel = me?.role === "SUPER_ADMIN" ? t("admin.roleSuperAdmin") : t("admin.roleAdmin");

  const memberSinceFormatted = useMemo(() => {
    if (!me?.createdAt) return null;
    try {
      return format(parseISO(me.createdAt), "dd-MM-yyyy HH:mm:ss a");
    } catch {
      return null;
    }
  }, [me]);
  const currentPageLabel = crumbs.at(-1)?.label ?? t("admin.dashboard");

  function handleEnter() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 px-2 py-3 backdrop-blur sm:px-4 dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="flex min-h-9 items-center gap-2 p-0.75">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>

          <p className="truncate text-sm font-medium sm:hidden">{currentPageLabel}</p>

          <Breadcrumb className="hidden min-w-0 sm:block">
            <BreadcrumbList className="min-w-0 flex-nowrap overflow-hidden">
              <BreadcrumbItem>
                {crumbs.length === 0 ? (
                  <BreadcrumbPage>{t("admin.dashboard")}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href="/admin/dashboard">{t("admin.dashboard")}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {crumbs.map((crumb) => (
                <BreadcrumbItem key={crumb.href} className="min-w-0">
                  <BreadcrumbSeparator />
                  {crumb.isLast ? (
                    <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild className="truncate">
                      <Link href={crumb.href} className="truncate">
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                className="group rounded-full outline-none ring-offset-2 ring-offset-white transition hover:ring-2 hover:ring-amber-400/60 focus-visible:ring-2 focus-visible:ring-amber-500/80 dark:ring-offset-zinc-950"
                aria-label="Open account menu"
              >
                <Avatar className="h-9 w-9 border border-zinc-200/90 shadow-sm ring-2 ring-transparent transition group-hover:ring-amber-200/80 dark:border-zinc-700 dark:group-hover:ring-amber-900/50">
                  <AvatarFallback className="bg-linear-to-br from-zinc-100 to-zinc-200 text-sm font-semibold text-zinc-800 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-100">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={10}
              className="w-[min(100vw-1.5rem,20rem)] overflow-hidden rounded-2xl border-zinc-200/90 p-0 shadow-xl shadow-zinc-950/10 dark:border-zinc-800 dark:shadow-black/40"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <div className="relative bg-linear-to-b from-amber-500/12 via-transparent to-transparent px-4 pb-1 pt-5 dark:from-amber-400/8">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent dark:via-amber-500/25" />
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 shrink-0 border-2 border-white shadow-md dark:border-zinc-800">
                    <AvatarFallback className="bg-linear-to-br from-amber-100 to-amber-200/90 text-base font-semibold text-amber-950 dark:from-amber-900/80 dark:to-zinc-800 dark:text-amber-100">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="truncate font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{fullName}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <Mail className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                      <span className="truncate">{me?.email ?? t("admin.loading")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-4 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand" className="font-medium">
                    {roleLabel}
                  </Badge>
                </div>

                <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/90 px-3 py-2.5 dark:border-zinc-800/80 dark:bg-zinc-900/50">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/80 dark:bg-zinc-800 dark:ring-zinc-700">
                      <CalendarClock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {t("admin.memberSince")}
                      </p>
                      <p className="mt-0.5 font-mono text-xs tabular-nums text-zinc-800 dark:text-zinc-200">
                        {memberSinceFormatted ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-200/80 dark:bg-zinc-800" />

                <form action={logoutAdmin}>
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="h-9 w-full justify-center gap-2 rounded-xl border-zinc-200 bg-white/80 font-medium shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950/80 dark:hover:bg-zinc-900"
                  >
                    <LogOut className="h-4 w-4 opacity-80" />
                    {t("admin.signOut")}
                  </Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
