"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, Plus, Search, Edit2, Trash2 } from "lucide-react";
import { getServicios, deleteServicio } from "@/actions/servicios";
import toast from "react-hot-toast";
import type { Servicio } from "@/db/schema";

const TIPO_LABELS: Record<string, string> = {
  consulta: "Consulta",
  procedimiento: "Procedimiento",
  medicamento: "Medicamento",
  otro: "Otro",
};

export default function ServiciosPage() {
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await getServicios(search || undefined);
      setServicios(data);
    } catch {
      toast.error("Error al cargar servicios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSearch(e: React.FormEvent) { e.preventDefault(); load(); }

  async function handleDelete(id: string, nombre: string) {
    if (!confirm(`¿Eliminar el servicio "${nombre}"?`)) return;
    const result = await deleteServicio(id);
    if (result.success) { toast.success("Servicio eliminado"); load(); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <ClipboardList className="text-purple-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Servicios</h2>
            <p className="text-sm text-gray-500">{servicios.length} registros</p>
          </div>
        </div>
        <button onClick={() => router.push("/servicios/nuevo")} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Nuevo Servicio
        </button>
      </div>

      <form onSubmit={handleSearch} className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o codigo CUPS..." className="form-input pl-9" />
        </div>
      </form>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : servicios.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No se encontraron servicios.
            <button onClick={() => router.push("/servicios/nuevo")} className="block mx-auto mt-2 text-blue-600 hover:underline">
              Crear el primer servicio
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">CUPS</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Tipo</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Precio</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {servicios.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-blue-700">{s.codigoCups}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{s.nombre}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {TIPO_LABELS[s.tipoServicio] || s.tipoServicio}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-right font-mono text-gray-600">
                      ${Number(s.precio || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => router.push(`/servicios/${s.id}`)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(s.id, s.nombre)}
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
