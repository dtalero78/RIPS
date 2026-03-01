"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email o contrasena incorrectos");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#e6f4fd] items-center justify-center p-16">
        <div className="max-w-md animate-fade-in">
          <div className="mb-8">
            <Image src="/logo.png" alt="RIPS SaaS" width={210} height={60} className="h-[120px] w-auto" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Genera tus RIPS de forma simple y confiable
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            La plataforma que simplifica la generacion de Registros Individuales
            de Prestacion de Servicios de Salud para tu IPS.
          </p>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="w-full lg:w-2/5 bg-white flex flex-col px-10 lg:px-14 py-10">
        {/* Mobile logo */}
        <div className="lg:hidden mb-12">
          <Image src="/logo.png" alt="RIPS SaaS" width={210} height={60} className="h-[75px] w-auto" />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Iniciar sesion
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="tu@ips.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-10"
                  placeholder="********"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-3 text-sm font-semibold text-white bg-[#0a2d4e] hover:bg-[#081f38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            No tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#0a2d4e] hover:underline"
            >
              Registra tu IPS
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
