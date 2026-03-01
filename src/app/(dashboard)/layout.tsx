"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/pacientes": "Pacientes",
  "/pacientes/nuevo": "Nuevo Paciente",
  "/medicos": "Medicos",
  "/medicos/nuevo": "Nuevo Medico",
  "/servicios": "Servicios",
  "/servicios/nuevo": "Nuevo Servicio",
  "/atenciones": "Atenciones",
  "/atenciones/nueva": "Nueva Atencion",
  "/rips": "Generacion RIPS",
  "/configuracion": "Configuracion",
};

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="rounded-full h-12 w-12 border-b-2 border-blue-600 animate-spin" />
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  const user = session.user as {
    name: string;
    role: string;
    tenantName: string;
  };

  const title =
    pageTitles[pathname] ||
    Object.entries(pageTitles).find(([key]) =>
      pathname.startsWith(key + "/")
    )?.[1] ||
    "RIPS SaaS";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        tenantName={user.tenantName || "Mi IPS"}
        userName={user.name || "Usuario"}
        userRole={user.role || "facturador"}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </SessionProvider>
  );
}
