import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin-auth/AdminLoginForm";
import { safeAdminReturnPath } from "@/lib/admin-auth-shared";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string; returnUrl?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const initialQueryError = params?.error;
  const returnUrl = safeAdminReturnPath(params?.returnUrl ?? null) ?? undefined;

  return (
    <Suspense fallback={null}>
      <AdminLoginForm initialQueryError={initialQueryError} returnUrlFromServer={returnUrl} />
    </Suspense>
  );
}
