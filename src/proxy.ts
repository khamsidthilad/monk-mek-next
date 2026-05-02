import type { NextRequest } from "next/server";
import { adminAuthMiddleware } from "@/lib/admin-route-guard";

/**
 * Next.js 16+ edge guard — same level as `src/app`.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
export function proxy(request: NextRequest) {
  return adminAuthMiddleware(request);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
