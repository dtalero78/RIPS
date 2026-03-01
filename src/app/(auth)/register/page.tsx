"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Eye, EyeOff } from "lucide-react";
import { registerAction } from "@/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    ipsName: "",
    nit: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await registerAction(form);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/login?registered=true");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#e6f4fd] items-center justify-center p-16">
        <div className="max-w-md animate-fade-in">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-10 h-10 text-primary-600" />
            <span className="text-3xl font-bold text-gray-900">RIPS SaaS</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Registra tu IPS en minutos
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Crea tu cuenta, configura tu IPS y comienza a generar RIPS
            conformes a la Resolucion 2275 de 2023.
          </p>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="w-full lg:w-2/5 bg-white flex flex-col px-10 lg:px-14 py-10 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <FileText className="w-7 h-7 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">RIPS SaaS</span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Registrar IPS
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Completa los datos de tu IPS y crea tu cuenta de administrador
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* IPS Section */}
            <div className="pb-4 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Datos de la IPS
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ipsName" className="form-label">
                    Nombre de la IPS
                  </label>
                  <input
                    id="ipsName"
                    type="text"
                    value={form.ipsName}
                    onChange={(e) => updateField("ipsName", e.target.value)}
                    className="form-input"
                    placeholder="IPS San Rafael"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nit" className="form-label">
                    NIT
                  </label>
                  <input
                    id="nit"
                    type="text"
                    value={form.nit}
                    onChange={(e) => updateField("nit", e.target.value)}
                    className="form-input"
                    placeholder="890111797-1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* User Section */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Cuenta de administrador
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="form-input"
                    placeholder="Juan Garcia"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="form-input"
                    placeholder="admin@ips.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="form-label">
                    Contrasena
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="form-input pr-10"
                      placeholder="Minimo 8 caracteres"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar contrasena
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                    className="form-input"
                    placeholder="Repite la contrasena"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-3 text-sm font-semibold text-white bg-[#0a2d4e] hover:bg-[#081f38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Registrar IPS"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#0a2d4e] hover:underline"
            >
              Iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
