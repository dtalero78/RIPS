"use client";

import { useState, useEffect } from "react";
import { FileJson, Play, Download, AlertTriangle, CheckCircle2, Loader2, Eye, Clock } from "lucide-react";
import { generarRips, getRipsGeneraciones, getRipsGeneracion } from "@/actions/rips";
import toast from "react-hot-toast";
import type { RipsGeneracion } from "@/db/schema";

const ESTADO_STYLES: Record<string, { bg: string; icon: React.ReactNode }> = {
  generado: { bg: "bg-green-100 text-green-700", icon: <CheckCircle2 size={14} /> },
  con_errores: { bg: "bg-yellow-100 text-yellow-700", icon: <AlertTriangle size={14} /> },
};

export default function RipsPage() {
  const [tab, setTab] = useState<"generar" | "historial">("generar");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{
    id: string;
    stats: { totalUsuarios: number; totalConsultas: number; totalProcedimientos: number; totalAtenciones: number };
    errors: string[];
    hasErrors: boolean;
  } | null>(null);
  const [historial, setHistorial] = useState<RipsGeneracion[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [previewData, setPreviewData] = useState<{ json: unknown; errors: unknown } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (tab === "historial") loadHistory();
  }, [tab]);

  async function loadHistory() {
    setLoadingHistory(true);
    try {
      const data = await getRipsGeneraciones();
      setHistorial(data);
    } catch {
      toast.error("Error al cargar historial");
    } finally {
      setLoadingHistory(false);
    }
  }

  async function handleGenerate() {
    if (!fechaDesde || !fechaHasta) {
      toast.error("Selecciona el rango de fechas");
      return;
    }
    setGenerating(true);
    setResult(null);
    try {
      const res = await generarRips({ fechaDesde, fechaHasta });
      setResult(res);
      if (res.hasErrors) {
        toast.error(`Generado con ${res.errors.length} advertencias`);
      } else {
        toast.success("RIPS generado exitosamente");
      }
    } catch {
      toast.error("Error al generar RIPS");
    } finally {
      setGenerating(false);
    }
  }

  async function handlePreview(id: string) {
    const gen = await getRipsGeneracion(id);
    if (gen) {
      setPreviewData({ json: gen.archivoJson, errors: gen.erroresValidacion });
      setShowPreview(true);
    }
  }

  function handleDownload(id: string) {
    window.open(`/api/rips/${id}/download`, "_blank");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-xl">
          <FileJson className="text-indigo-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Generacion RIPS</h2>
          <p className="text-sm text-gray-500">Resolucion 2275 de 2023</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("generar")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "generar" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Generar RIPS
        </button>
        <button
          onClick={() => setTab("historial")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "historial" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Historial
        </button>
      </div>

      {tab === "generar" && (
        <div className="space-y-6">
          {/* Step 1: Date Range */}
          <div className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Seleccionar Periodo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Fecha Desde *</label>
                <input type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="form-label">Fecha Hasta *</label>
                <input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} className="form-input" />
              </div>
            </div>
          </div>

          {/* Step 2: Generate */}
          <div className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              Generar JSON
            </h3>
            <p className="text-sm text-gray-500">
              Se generara el archivo JSON con todas las atenciones del periodo seleccionado,
              agrupadas por paciente segun la estructura de la Resolucion 2275 de 2023.
            </p>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-primary flex items-center gap-2"
            >
              {generating ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
              {generating ? "Generando..." : "Generar RIPS"}
            </button>
          </div>

          {/* Step 3: Results */}
          {result && (
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                Resultado
              </h3>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">{result.stats.totalUsuarios}</div>
                  <div className="text-xs text-blue-600">Usuarios</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">{result.stats.totalConsultas}</div>
                  <div className="text-xs text-green-600">Consultas</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700">{result.stats.totalProcedimientos}</div>
                  <div className="text-xs text-purple-600">Procedimientos</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-700">{result.stats.totalAtenciones}</div>
                  <div className="text-xs text-orange-600">Total Atenciones</div>
                </div>
              </div>

              {/* Errors */}
              {result.errors.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-yellow-700 font-semibold text-sm">
                    <AlertTriangle size={16} />
                    {result.errors.length} advertencia(s) de validacion
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1 ml-6 list-disc">
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button onClick={() => handleDownload(result.id)} className="btn-primary flex items-center gap-2">
                  <Download size={16} /> Descargar JSON
                </button>
                <button onClick={() => handlePreview(result.id)} className="btn-secondary flex items-center gap-2">
                  <Eye size={16} /> Vista Previa
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "historial" && (
        <div className="card overflow-hidden">
          {loadingHistory ? (
            <div className="p-8 text-center text-gray-500">Cargando...</div>
          ) : historial.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay generaciones previas. Genera tu primer RIPS desde la pestana &quot;Generar RIPS&quot;.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Periodo</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Registros</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {historial.map((h) => (
                    <tr key={h.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        {new Date(h.createdAt).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {h.periodoInicio || "-"} a {h.periodoFin || "-"}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs text-gray-500">
                          {h.totalUsuarios}U / {h.totalConsultas}C / {h.totalProcedimientos}P
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          ESTADO_STYLES[h.estado]?.bg || "bg-gray-100 text-gray-700"
                        }`}>
                          {ESTADO_STYLES[h.estado]?.icon}
                          {h.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handlePreview(h.id)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Vista previa">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => handleDownload(h.id)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Descargar">
                            <Download size={16} />
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
      )}

      {/* JSON Preview Modal */}
      {showPreview && previewData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-semibold text-gray-800">Vista Previa JSON - RIPS</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <pre className="text-xs font-mono bg-gray-50 rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                {JSON.stringify(previewData.json, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
