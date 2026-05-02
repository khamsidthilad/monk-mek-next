export type AdminRole = "ADMIN" | "SUPER_ADMIN";

/** Public / B2C signed-in user */
export type CustomerRole = "CUSTOMER";

/** Role returned by `/auth/login` and whoami-style payloads */
export type AppRole = AdminRole | CustomerRole;

export type AdminMe = {
  id: string;
  name: string | null;
  email: string;
  role: AdminRole;
  createdAt: string;
};

export interface AuthUser {
  id: string;
  name: string;
  sname: string;
  /** Login email; API may send `username` instead — we map it here. */
  email: string;
  username?: string;
  role: AppRole;
  customerId: string | null;
}

/** Alias for API “current user” shapes */
export type WhoamiResponseData = AuthUser;

export interface AuthRoot {
  success: boolean;
  token: string;
  user: AuthUser;
}

export interface LoginBody {
  email: string;
  password: string;
}

/** Raw failure envelope from API (HTTP 200 or 4xx) */
export type LoginApiFailureJson = {
  success: false;
  message: string;
  error?: Record<string, unknown>;
};

/** Maps API role strings (`admin`, `ADMIN`, `super_admin`, …) to `AppRole`. */
export function parseLoginRole(value: unknown): AppRole | null {
  if (typeof value !== "string") return null;
  const key = value.trim().toLowerCase().replace(/-/g, "_");
  if (key === "admin") return "ADMIN";
  if (key === "super_admin" || key === "superadmin") return "SUPER_ADMIN";
  if (key === "customer") return "CUSTOMER";
  const up = value.trim().toUpperCase().replace(/-/g, "_");
  if (up === "ADMIN") return "ADMIN";
  if (up === "SUPER_ADMIN") return "SUPER_ADMIN";
  if (up === "CUSTOMER") return "CUSTOMER";
  return null;
}

export function isAdminRole(role: AppRole): role is AdminRole {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export function isCustomerRole(role: AppRole): role is CustomerRole {
  return role === "CUSTOMER";
}
