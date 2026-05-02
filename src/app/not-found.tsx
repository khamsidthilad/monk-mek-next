import Link from "next/link";
import { cookies } from "next/headers";
import { Compass, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMessage, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";

export default async function NotFound() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const t = (key: string) => getMessage(locale, key);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6">
      <Card className="w-full max-w-2xl border-border/80 bg-card/95 shadow-xl shadow-zinc-200/40 dark:shadow-black/30">
        <CardHeader className="space-y-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
            <Compass className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t("notFound.badge")}</p>
          <CardTitle className="text-2xl sm:text-3xl">{t("notFound.title")}</CardTitle>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            {t("notFound.description")}
          </p>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          <Button asChild className="gap-2 rounded-xl bg-gold text-black hover:bg-gold-600">
            <Link href="/">
              <Home className="h-4 w-4" />
              {t("notFound.goHome")}
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 rounded-xl">
            <Link href="/admin/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              {t("notFound.openDashboard")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
