import type { ReactNode } from "react";

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 dark:bg-luxury-bg dark:text-zinc-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(201,168,76,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(201,168,76,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(201,168,76,0.04),transparent_40%)] dark:bg-[radial-gradient(circle_at_100%_100%,rgba(201,168,76,0.06),transparent_40%)]"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}
