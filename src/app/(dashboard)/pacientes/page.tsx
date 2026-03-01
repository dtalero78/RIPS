"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, Plus, Search, Edit2, Trash2 } from "lucide-react";
import { getPacientes, deletePaciente } from "@/actions/pacientes";
import toast from "react-hot-toast";
import type { Paciente } from "@/db/schema";

export default function PacientesPage() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await getPacientes(search || undefined);
      setPacientes(data);
    } catch {
      toast.error("Error al cargar pacientes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    load();
  }

  async function handleDelete(id: string, nombre: string) {
    if (!confirm(`¿Eliminar al paciente ${nombre}?`)) return;
    const result = await deletePaciente(id);
    if (result.success) {
      toast.success("Paciente eliminado");
      load();
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Users className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pacientes</h2>
            <p className="text-sm text-gray-500">{pacientes.length} registros</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/pacientes/nuevo")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Nuevo Paciente
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o documento..."
            className="form-input pl-9"
          />
        </div>
      </form>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : pacientes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No se encontraron pacientes.
            <button
              onClick={() => router.push("/pacientes/nuevo")}
              className="block mx-auto mt-2 text-blue-600 hover:underline"
            >
              Crear el primer paciente
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Documento</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Sexo</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Tipo Usuario</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pacientes.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">{p.tipoDocumento}</span>{" "}
                      <span className="font-mono">{p.numeroDocumento}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {p.primerNombre} {p.segundoNombre || ""} {p.primerApellido} {p.segundoApellido || ""}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-600">{p.codSexo}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{p.tipoUsuario}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => router.push(`/pacientes/${p.id}`)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, `${p.primerNombre} ${p.primerApellido}`)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
