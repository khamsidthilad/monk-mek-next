import { ADMIN_SESSION_COOKIE } from "@/config/admin-auth";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  setDocumentCookie,
} from "@/lib/auth-cookie";
import type { LoginTokensPayload } from "@/lib/login-response";
import { isAdminRole } from "@/types/auth";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type ApplyAdminLoginResult =
  | { ok: true }
  | { ok: false; reason: "invalid_payload" | "not_admin" };

/**
 * Validates tokens + user and, for admin roles only, persists cookies so middleware / `requireAdminAuth` work.
 */
export function applyAdminLoginPayload(payload: LoginTokensPayload | null): ApplyAdminLoginResult {
  if (!payload?.access_token || !payload?.user?.id) {
    return { ok: false, reason: "invalid_payload" };
  }
  if (!isAdminRole(payload.user.role)) {
    return { ok: false, reason: "not_admin" };
  }

  setDocumentCookie(ACCESS_TOKEN_COOKIE, payload.access_token, { maxAgeSeconds: SESSION_MAX_AGE });
  if (payload.refresh_token) {
    setDocumentCookie(REFRESH_TOKEN_COOKIE, payload.refresh_token, { maxAgeSeconds: SESSION_MAX_AGE });
  }
  setDocumentCookie(ADMIN_SESSION_COOKIE, payload.user.id, { maxAgeSeconds: SESSION_MAX_AGE });

  return { ok: true };
}
