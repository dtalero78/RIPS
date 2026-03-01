import {
  Users,
  FileText,
  Receipt,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: "Pacientes",
            value: "0",
            icon: Users,
            color: "bg-blue-100 text-blue-700",
            href: "/pacientes",
          },
          {
            label: "Atenciones este mes",
            value: "0",
            icon: FileText,
            color: "bg-emerald-100 text-emerald-700",
            href: "/atenciones",
          },
          {
            label: "RIPS generados",
            value: "0",
            icon: Receipt,
            color: "bg-violet-100 text-violet-700",
            href: "/rips",
          },
          {
            label: "Medicos",
            value: "0",
            icon: Stethoscope,
            color: "bg-amber-100 text-amber-700",
            href: "/medicos",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Primeros pasos
        </h2>
        <div className="space-y-3">
          {[
            {
              step: "1",
              title: "Configura tu IPS",
              description:
                "Ingresa el codigo de habilitacion, NIT y datos de tu prestador.",
              href: "/configuracion",
            },
            {
              step: "2",
              title: "Registra tus medicos",
              description:
                "Agrega los medicos y profesionales que atienden en tu IPS.",
              href: "/medicos",
            },
            {
              step: "3",
              title: "Configura tus servicios",
              description:
                "Define los servicios con sus codigos CUPS y precios.",
              href: "/servicios",
            },
            {
              step: "4",
              title: "Registra atenciones",
              description:
                "Ingresa las consultas y procedimientos realizados a pacientes.",
              href: "/atenciones",
            },
            {
              step: "5",
              title: "Genera tus RIPS",
              description:
                "Selecciona un periodo y genera el JSON conforme a la Res. 2275.",
              href: "/rips",
            },
          ].map((item) => (
            <Link
              key={item.step}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600 flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
