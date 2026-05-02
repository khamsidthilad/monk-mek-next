import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_LOGIN_PATH, ADMIN_SESSION_COOKIE } from "@/config/admin-auth";
import { safeAdminReturnPath } from "@/lib/admin-auth-shared";

export { ADMIN_SESSION_COOKIE, ADMIN_LOGIN_PATH };
export { safeAdminReturnPath } from "@/lib/admin-auth-shared";

export const ADMIN_PUBLIC_PATHS: readonly string[] = [ADMIN_LOGIN_PATH];

export function isAdminPublicPath(pathname: string): boolean {
  return ADMIN_PUBLIC_PATHS.some(
    (publicPath) => pathname === publicPath || pathname.startsWith(`${publicPath}/`),
  );
}

export function isAdminProtectedPath(pathname: string): boolean {
  if (!pathname.startsWith("/admin")) return false;
  return !isAdminPublicPath(pathname);
}

export function adminAuthMiddleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (isAdminPublicPath(pathname)) {
    // Keep login route public, but bounce authenticated users to dashboard.
    if (session && pathname === ADMIN_LOGIN_PATH) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  /** Bare `/admin` or `/admin/` — no page file; send users to dashboard or login. */
  const isAdminRoot = pathname === "/admin" || pathname === "/admin/";
  if (isAdminRoot) {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  if (!session) {
    const login = new URL(ADMIN_LOGIN_PATH, request.url);
    const returnPath = pathname + request.nextUrl.search;
    const safe = safeAdminReturnPath(returnPath);
    if (safe) {
      login.searchParams.set("returnUrl", safe);
    }
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}
