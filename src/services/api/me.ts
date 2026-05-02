
import { AdminMe } from "@/types/auth";

export async function fetchMe(): Promise<AdminMe> {
  // TODO: Replace with real API call.
  return {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin User",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
  };
}

