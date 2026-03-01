"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, Plus, Search, Edit2, Trash2 } from "lucide-react";
import { getMedicos, deleteMedico } from "@/actions/medicos";
import toast from "react-hot-toast";
import type { Medico } from "@/db/schema";

export default function MedicosPage() {
  const router = useRouter();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await getMedicos(search || undefined);
      setMedicos(data);
    } catch {
      toast.error("Error al cargar medicos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSearch(e: React.FormEvent) { e.preventDefault(); load(); }

  async function handleDelete(id: string, nombre: string) {
    if (!confirm(`¿Eliminar al medico ${nombre}?`)) return;
    const result = await deleteMedico(id);
    if (result.success) { toast.success("Medico eliminado"); load(); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-xl">
            <Stethoscope className="text-green-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Medicos</h2>
            <p className="text-sm text-gray-500">{medicos.length} registros</p>
          </div>
        </div>
        <button onClick={() => router.push("/medicos/nuevo")} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Nuevo Medico
        </button>
      </div>

      <form onSubmit={handleSearch} className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, documento o registro medico..." className="form-input pl-9" />
        </div>
      </form>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : medicos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No se encontraron medicos.
            <button onClick={() => router.push("/medicos/nuevo")} className="block mx-auto mt-2 text-blue-600 hover:underline">
              Crear el primer medico
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Documento</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Registro Medico</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Especialidad</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {medicos.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">{m.tipoDocumento}</span>{" "}
                      <span className="font-mono">{m.numeroDocumento}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {m.primerNombre} {m.segundoNombre || ""} {m.primerApellido} {m.segundoApellido || ""}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell font-mono text-blue-700">{m.registroMedico}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{m.especialidad || "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => router.push(`/medicos/${m.id}`)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(m.id, `${m.primerNombre} ${m.primerApellido}`)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
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
