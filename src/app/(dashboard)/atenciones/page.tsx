"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus, Search, Edit2, Trash2, Filter } from "lucide-react";
import { getAtenciones, deleteAtencion } from "@/actions/atenciones";
import toast from "react-hot-toast";

const TIPO_LABELS: Record<string, string> = {
  consulta: "Consulta",
  procedimiento: "Procedimiento",
  urgencia: "Urgencia",
  hospitalizacion: "Hospitalizacion",
  medicamento: "Medicamento",
  otro: "Otro",
};

const ESTADO_COLORS: Record<string, string> = {
  borrador: "bg-gray-100 text-gray-700",
  validado: "bg-green-100 text-green-700",
  incluido_rips: "bg-blue-100 text-blue-700",
  enviado: "bg-purple-100 text-purple-700",
};

type AtencionRow = {
  id: string;
  tipoAtencion: string;
  fechaAtencion: string;
  codigoCups: string;
  nombreCups: string | null;
  codDiagnosticoPrincipal: string | null;
  valorServicio: string | null;
  estado: string;
  createdAt: Date;
  pacienteNombre: string;
  pacienteDocumento: string | null;
  medicoNombre: string | null;
};

export default function AtencionesPage() {
  const router = useRouter();
  const [atenciones, setAtenciones] = useState<AtencionRow[]>([]);
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await getAtenciones({
        search: search || undefined,
        tipoAtencion: tipoFilter || undefined,
        estado: estadoFilter || undefined,
      });
      setAtenciones(data as AtencionRow[]);
    } catch {
      toast.error("Error al cargar atenciones");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load(); }, [tipoFilter, estadoFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSearch(e: React.FormEvent) { e.preventDefault(); load(); }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta atencion?")) return;
    const result = await deleteAtencion(id);
    if (result.success) { toast.success("Atencion eliminada"); load(); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-xl">
            <FileText className="text-orange-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Atenciones</h2>
            <p className="text-sm text-gray-500">{atenciones.length} registros</p>
          </div>
        </div>
        <button onClick={() => router.push("/atenciones/nueva")} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Nueva Atencion
        </button>
      </div>

      {/* Search + Filters */}
      <div className="card p-4 space-y-3">
        <div className="flex gap-2">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por paciente o CUPS..." className="form-input pl-9" />
          </form>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-1 ${showFilters ? "bg-blue-50 text-blue-700" : ""}`}>
            <Filter size={16} /> Filtros
          </button>
        </div>
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t">
            <div>
              <label className="form-label">Tipo</label>
              <select value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)} className="form-input">
                <option value="">Todos</option>
                {Object.entries(TIPO_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Estado</label>
              <select value={estadoFilter} onChange={(e) => setEstadoFilter(e.target.value)} className="form-input">
                <option value="">Todos</option>
                <option value="borrador">Borrador</option>
                <option value="validado">Validado</option>
                <option value="incluido_rips">Incluido en RIPS</option>
                <option value="enviado">Enviado</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : atenciones.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No se encontraron atenciones.
            <button onClick={() => router.push("/atenciones/nueva")} className="block mx-auto mt-2 text-blue-600 hover:underline">
              Crear la primera atencion
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Paciente</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Tipo</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">CUPS</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Dx Principal</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {atenciones.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-600">{a.fechaAtencion}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{a.pacienteNombre}</div>
                      <div className="text-xs text-gray-500">{a.pacienteDocumento}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {TIPO_LABELS[a.tipoAtencion] || a.tipoAtencion}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell font-mono text-blue-700 text-xs">{a.codigoCups}</td>
                    <td className="px-4 py-3 hidden lg:table-cell font-mono text-xs text-gray-600">{a.codDiagnosticoPrincipal || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ESTADO_COLORS[a.estado] || "bg-gray-100"}`}>
                        {a.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => router.push(`/atenciones/${a.id}`)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(a.id)}
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
