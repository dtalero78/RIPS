import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      tenantId: string;
      tenantName: string;
      image?: string | null;
    };
  }

  interface User {
    role?: string;
    tenantId?: string;
    tenantName?: string;
  }
}
