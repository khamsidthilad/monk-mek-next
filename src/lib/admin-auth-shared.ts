import { ADMIN_LOGIN_PATH } from "@/config/admin-auth";

/**
 * Only allow same-origin relative redirects back into the admin app (no open redirects).
 */
export function safeAdminReturnPath(input: string | null | undefined): string | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed.startsWith("/")) return null;
  if (trimmed.startsWith("//")) return null;
  if (!trimmed.startsWith("/admin")) return null;
  if (trimmed === ADMIN_LOGIN_PATH || trimmed.startsWith(`${ADMIN_LOGIN_PATH}?`)) return null;
  if (trimmed.startsWith(`${ADMIN_LOGIN_PATH}/`)) return null;
  return trimmed;
}
