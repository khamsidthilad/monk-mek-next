/**
 * Browser cookie helpers for API Bearer tokens (used by RTK Query `prepareHeaders`).
 * Server components should use `cookies()` from `next/headers` instead.
 */

export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

type SetCookieOptions = {
  maxAgeSeconds?: number;
  path?: string;
};

/** Sets a non-httpOnly cookie (browser only). Used after API login on the client. */
export function setDocumentCookie(name: string, value: string, options?: SetCookieOptions) {
  if (typeof document === "undefined") return;
  const maxAge = options?.maxAgeSeconds ?? 60 * 60 * 24 * 7;
  const path = options?.path ?? "/";
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=${path}; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function getAccessTokenFromCookie(): string | undefined {
  const raw = readCookie(ACCESS_TOKEN_COOKIE);
  return raw?.trim() || undefined;
}
