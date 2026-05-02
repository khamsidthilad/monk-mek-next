"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useI18n } from "@/components/providers/i18n-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyAdminLoginPayload } from "@/lib/admin-api-login";
import { safeAdminReturnPath } from "@/lib/admin-auth-shared";
import { loginFailureMessageFromPayload } from "@/lib/login-response";
import { useLoginMutation } from "@/services/api/auth.api";
import { ArrowRight, KeyRound, LockKeyhole, Mail, ShieldAlert, Sparkles } from "lucide-react";

type ErrorKey = "invalid_format" | "invalid_credentials" | "no_admin_access" | "generic" | null;

function errorKeyFromQuery(error: string | undefined): ErrorKey {
  if (error === "invalid_format" || error === "invalid_credentials" || error === "no_admin_access") {
    return error;
  }
  return null;
}

function isFetchBaseQueryError(e: unknown): e is FetchBaseQueryError {
  return typeof e === "object" && e !== null && "status" in e;
}

type AdminLoginFormProps = {
  initialQueryError?: string | undefined;
  returnUrlFromServer?: string | undefined;
};

export function AdminLoginForm({ initialQueryError, returnUrlFromServer }: AdminLoginFormProps) {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();

  const returnUrlParam = searchParams.get("returnUrl");
  const returnUrl = useMemo(() => {
    const raw = returnUrlFromServer ?? returnUrlParam ?? null;
    return safeAdminReturnPath(raw) ?? "";
  }, [returnUrlFromServer, returnUrlParam]);

  const [clientError, setClientError] = useState<ErrorKey>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const queryError = useMemo(() => errorKeyFromQuery(initialQueryError), [initialQueryError]);

  const activeError = clientError ?? queryError;

  const errorMessage =
    serverMessage ??
    (activeError === "invalid_format"
      ? t("auth.invalidFormat")
      : activeError === "invalid_credentials"
        ? t("auth.invalidCredentials")
        : activeError === "no_admin_access"
          ? t("auth.noAdminAccess")
          : activeError === "generic"
            ? t("auth.signInFailed")
            : null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientError(null);
    setServerMessage(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() ?? "";
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value ?? "";

    if (!email || !password || password.length < 6) {
      setClientError("invalid_format");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      if (!res.ok) {
        setServerMessage(res.message);
        setClientError("invalid_credentials");
        return;
      }

      const applied = applyAdminLoginPayload(res.data);
      if (!applied.ok) {
        setClientError(applied.reason === "not_admin" ? "no_admin_access" : "invalid_credentials");
        return;
      }

      router.replace(returnUrl || "/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const fromBody =
        isFetchBaseQueryError(err) && err.data !== undefined
          ? loginFailureMessageFromPayload(err.data)
          : null;
      if (fromBody) setServerMessage(fromBody);

      if (isFetchBaseQueryError(err) && err.status === 401) {
        setClientError("invalid_credentials");
        return;
      }
      setClientError("generic");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg items-center justify-center px-4 py-10 sm:px-8">
      <Card className="w-full border-border/80 bg-card/95 shadow-xl shadow-zinc-200/50 backdrop-blur-md dark:bg-card/70 dark:shadow-black/40">
        <CardHeader className="space-y-1 pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10">
                <LockKeyhole className="h-5 w-5 text-gold" aria-hidden />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl text-foreground">{t("auth.signIn")}</CardTitle>
                <CardDescription className="text-muted-foreground">{t("auth.credentialsHint")}</CardDescription>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
            <span>{t("auth.adminConsole")}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {errorMessage ? (
            <Alert
              variant="destructive"
              className="flex items-start gap-3 [&>svg]:static [&>svg]:mt-0.5 [&>svg]:translate-y-0"
            >
              <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden />
              <div className="min-w-0 space-y-1">
                <AlertTitle>{t("auth.couldNotSignIn")}</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </div>
            </Alert>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                  aria-hidden
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("auth.emailPlaceholder")}
                  required
                  disabled={isLoading}
                  className="border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <KeyRound
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                  aria-hidden
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={t("auth.passwordPlaceholder")}
                  required
                  minLength={6}
                  disabled={isLoading}
                  className="border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={isLoading}
              className="mt-2 w-full cursor-pointer gap-2 rounded-lg font-semibold"
            >
              {isLoading ? t("admin.loading") : t("auth.signInNow")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
