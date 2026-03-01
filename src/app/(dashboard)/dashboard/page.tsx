"use client";

import { useState, useEffect } from "react";
import { Users, FileText, Receipt, Stethoscope, ArrowRight, ClipboardList, FileJson } from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "@/actions/dashboard";

const TIPO_LABELS: Record<string, string> = {
  consulta: "Consultas",
  procedimiento: "Procedimientos",
  urgencia: "Urgencias",
  hospitalizacion: "Hospitalizacion",
  medicamento: "Medicamentos",
  otro: "Otros",
};

const TIPO_COLORS: Record<string, string> = {
  consulta: "bg-blue-500",
  procedimiento: "bg-purple-500",
  urgencia: "bg-red-500",
  hospitalizacion: "bg-orange-500",
  medicamento: "bg-green-500",
  otro: "bg-gray-500",
};

type DashboardData = Awaited<ReturnType<typeof getDashboardStats>>;

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="rounded-full h-10 w-10 border-b-2 border-blue-600 animate-spin" />
      </div>
    );
  }

  const counts = data?.counts || { pacientes: 0, medicos: 0, servicios: 0, atenciones: 0, facturas: 0, ripsGenerados: 0 };
  const hasData = counts.atenciones > 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Pacientes", value: counts.pacientes, icon: Users, color: "bg-blue-100 text-blue-700", href: "/pacientes" },
          { label: "Medicos", value: counts.medicos, icon: Stethoscope, color: "bg-amber-100 text-amber-700", href: "/medicos" },
          { label: "Servicios", value: counts.servicios, icon: ClipboardList, color: "bg-purple-100 text-purple-700", href: "/servicios" },
          { label: "Atenciones", value: counts.atenciones, icon: FileText, color: "bg-emerald-100 text-emerald-700", href: "/atenciones" },
          { label: "Facturas", value: counts.facturas, icon: Receipt, color: "bg-cyan-100 text-cyan-700", href: "/facturas" },
          { label: "RIPS", value: counts.ripsGenerados, icon: FileJson, color: "bg-indigo-100 text-indigo-700", href: "/rips" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atenciones por Tipo */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Atenciones por Tipo</h3>
          {!hasData ? (
            <p className="text-sm text-gray-400 text-center py-8">Sin datos aun</p>
          ) : (
            <div className="space-y-3">
              {data?.atencionPorTipo.map((item) => {
                const pct = counts.atenciones > 0 ? Math.round((item.total / counts.atenciones) * 100) : 0;
                return (
                  <div key={item.tipo} className="flex items-center gap-3">
                    <div className="w-28 text-sm text-gray-600 truncate">{TIPO_LABELS[item.tipo] || item.tipo}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${TIPO_COLORS[item.tipo] || "bg-gray-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-medium text-gray-700">{item.total} ({pct}%)</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Atenciones por Mes */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Atenciones por Mes</h3>
          {!data?.atencionPorMes.length ? (
            <p className="text-sm text-gray-400 text-center py-8">Sin datos aun</p>
          ) : (
            <div className="flex items-end gap-2 h-40">
              {data.atencionPorMes.map((item) => {
                const max = Math.max(...data.atencionPorMes.map((m) => m.total));
                const height = max > 0 ? (item.total / max) * 100 : 0;
                return (
                  <div key={item.mes} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-gray-700">{item.total}</span>
                    <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden" style={{ height: "120px" }}>
                      <div
                        className="w-full bg-blue-500 rounded-t-lg transition-all"
                        style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{item.mes.substring(5)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Atenciones */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Actividad Reciente</h3>
            <Link href="/atenciones" className="text-sm text-blue-600 hover:underline">Ver todas</Link>
          </div>
          {!data?.atencionesRecientes.length ? (
            <p className="text-sm text-gray-400 text-center py-6">Sin atenciones registradas</p>
          ) : (
            <div className="space-y-3">
              {data.atencionesRecientes.map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`w-2 h-2 rounded-full ${TIPO_COLORS[a.tipoAtencion] || "bg-gray-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{a.pacienteNombre}</p>
                    <p className="text-xs text-gray-500">{TIPO_LABELS[a.tipoAtencion] || a.tipoAtencion} - {a.codigoCups}</p>
                  </div>
                  <span className="text-xs text-gray-400">{a.fechaAtencion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Acciones Rapidas</h3>
          <div className="space-y-2">
            {[
              { title: "Nueva Atencion", description: "Registrar consulta o procedimiento", href: "/atenciones/nueva", color: "bg-orange-100 text-orange-700" },
              { title: "Nuevo Paciente", description: "Registrar un paciente", href: "/pacientes/nuevo", color: "bg-blue-100 text-blue-700" },
              { title: "Generar RIPS", description: "Exportar JSON Res. 2275", href: "/rips", color: "bg-indigo-100 text-indigo-700" },
              { title: "Configuracion", description: "Datos del prestador y defaults", href: "/configuracion", color: "bg-gray-100 text-gray-700" },
            ].map((action) => (
              <Link key={action.title} href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
