"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarVariants = cva(
  "shrink-0 border-r border-zinc-200 bg-white transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-950",
  {
    variants: {
      collapsed: {
        true: "w-[78px]",
        false: "w-64",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {}

export function Sidebar({ className, collapsed, ...props }: SidebarProps) {
  return <aside className={cn(sidebarVariants({ collapsed }), className)} {...props} />;
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-between", className)} {...props} />;
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-3 px-2", className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto space-y-3 pt-3", className)} {...props} />;
}

export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-1", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  "flex w-full cursor-pointer touch-manipulation items-center rounded-lg px-3 py-2 text-sm transition",
  {
    variants: {
      active: {
        true: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
        false: "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
      },
      collapsed: {
        true: "justify-center",
        false: "gap-2",
      },
    },
    defaultVariants: {
      active: false,
      collapsed: false,
    },
  },
);

export interface SidebarMenuButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
}

export function SidebarMenuButton({
  className,
  active,
  collapsed,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(sidebarMenuButtonVariants({ active, collapsed }), className)} {...props} />
  );
}
