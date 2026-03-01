import { auth } from "@/lib/auth";

export async function getTenantId(): Promise<string> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("No authenticated session");
  }
  const tenantId = (session.user as Record<string, unknown>).tenantId as string;
  if (!tenantId) {
    throw new Error("No tenant context");
  }
  return tenantId;
}

export async function getSessionUser() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("No authenticated session");
  }
  return session.user as {
    id: string;
    email: string;
    name: string;
    role: string;
    tenantId: string;
    tenantName: string;
  };
}
