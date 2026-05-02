import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_SESSION_COOKIE = "admin_session";

export async function requireAdminAuth(): Promise<void> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) redirect(ADMIN_LOGIN_PATH);
}

