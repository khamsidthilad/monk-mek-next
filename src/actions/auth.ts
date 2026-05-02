"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_SESSION_COOKIE = "admin_session";

function safeAdminReturnPath(value: string | null): string | null {
  if (!value) return null;
  if (!value.startsWith("/")) return null;
  if (value.startsWith("//")) return null;
  if (value.startsWith("/\\") || value.includes("\\")) return null;
  return value;
}

type MockUser = {
  id: string;
  email: string;
  password: string; // bcrypt hash
  role: "ADMIN" | "SUPER_ADMIN" | "USER";
};

async function findMockUserByEmail(email: string): Promise<MockUser | null> {
  // TODO: Replace with your real data lookup (DB/service call).
  // This is a stub to keep the server action working in a fresh scaffold.
  const users: MockUser[] = [];
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function loginRedirectQuery(error: string, returnUrl: string | null): string {
  const params = new URLSearchParams({ error });
  if (returnUrl) params.set("returnUrl", returnUrl);
  return `${ADMIN_LOGIN_PATH}?${params.toString()}`;
}

export async function loginAdmin(formData: FormData): Promise<void> {
  const returnUrlRaw = formData.get("returnUrl");
  const returnUrl = safeAdminReturnPath(typeof returnUrlRaw === "string" ? returnUrlRaw : null);

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect(loginRedirectQuery("invalid_format", returnUrl));
  }

  const user = await findMockUserByEmail(parsed.data.email);

  if (!user) {
    redirect(loginRedirectQuery("invalid_credentials", returnUrl));
  }

  const isValidPassword = await bcrypt.compare(parsed.data.password, user.password);
  if (!isValidPassword) {
    redirect(loginRedirectQuery("invalid_credentials", returnUrl));
  }

  const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
  if (!isAdmin) {
    redirect(loginRedirectQuery("no_admin_access", returnUrl));
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(returnUrl ?? "/admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect(ADMIN_LOGIN_PATH);
}
