import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="RIPS SaaS" width={210} height={60} className="h-[75px] w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Iniciar Sesion
            </Link>
            <Link
              href="/register"
              className="btn-navy text-sm"
            >
              Registrar IPS
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-gray-600 font-medium">
                Conforme a Resolucion 2275 de 2023
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6">
              Genera tus RIPS
              <br />
              <span className="text-primary-600">sin complicaciones</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
              Plataforma SaaS para que cualquier IPS en Colombia genere sus
              Registros Individuales de Prestacion de Servicios de Salud de
              forma rapida, validada y conforme a la normatividad vigente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gray-900 rounded-full px-7 py-3.5 hover:bg-gray-700 transition-colors"
              >
                Comenzar gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center text-sm font-semibold text-gray-800 border border-gray-300 bg-white/60 rounded-full px-7 py-3.5 hover:bg-white hover:border-gray-400 transition-all"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <pre className="text-xs text-gray-600 font-mono leading-6 overflow-hidden">
{`{
  "transaccion": {
    "numDocumentoIdObligado": "890111797",
    "numFactura": "RIPS-20250301",
    "fechaExpedicion": "2025-03-01"
  },
  "usuarios": [...],
  "consultas": [...],
  "procedimientos": [...],
  "medicamentos": [...]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Todo lo que tu IPS necesita
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Desde la captura de atenciones hasta la generacion y validacion del
            JSON RIPS, en una sola plataforma.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: FileText,
              color: "bg-blue-100 text-blue-700",
              title: "Generacion RIPS",
              description:
                "JSON conforme a Res. 2275/2023 con las 9 secciones: consultas, procedimientos, urgencias, hospitalizacion y mas.",
            },
            {
              icon: Shield,
              color: "bg-emerald-100 text-emerald-700",
              title: "Validacion integrada",
              description:
                "Validacion contra catalogos oficiales CUPS, CIE-10 y codigos DANE antes de generar.",
            },
            {
              icon: Users,
              color: "bg-violet-100 text-violet-700",
              title: "Multi-IPS",
              description:
                "Cada IPS tiene su espacio independiente con sus pacientes, medicos, servicios y configuracion.",
            },
            {
              icon: BarChart3,
              color: "bg-amber-100 text-amber-700",
              title: "Dashboard",
              description:
                "Estadisticas en tiempo real de atenciones, generaciones RIPS y estado de validacion.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${feature.color}`}
              >
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance banner */}
      <section className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Cumplimiento normativo garantizado
              </h2>
              <p className="text-gray-300 mb-6 max-w-lg">
                Nuestro motor de generacion cumple con todos los requisitos
                de la Resolucion 2275 de 2023 y esta preparado para el MUV.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Resolucion 2275 / 2023",
                "Catalogos CUPS 2025",
                "CIE-10 / CIE-11",
                "Codigos DANE completos",
                "Todos los tipos de documento",
                "Mecanismo Unico de Validacion",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="RIPS SaaS" width={210} height={60} className="h-12 w-auto" />
          </Link>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} RIPS SaaS. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
