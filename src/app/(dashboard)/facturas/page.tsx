"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus, Search, Edit2, Trash2, Calculator } from "lucide-react";
import { getFacturas, deleteFactura, recalcularFactura } from "@/actions/facturas";
import toast from "react-hot-toast";

interface FacturaRow {
  id: string;
  numFactura: string;
  fechaExpedicion: string;
  nombreEntidadAdministradora: string | null;
  valorTotal: string | null;
  estado: string;
  createdAt: Date;
  totalAtenciones: number;
}

const ESTADO_STYLES: Record<string, string> = {
  borrador: "bg-gray-100 text-gray-700",
  activa: "bg-green-100 text-green-700",
  anulada: "bg-red-100 text-red-700",
};

export default function FacturasPage() {
  const router = useRouter();
  const [facturas, setFacturas] = useState<FacturaRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await getFacturas(search || undefined);
      setFacturas(data);
    } catch {
      toast.error("Error al cargar facturas");
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

  async function handleDelete(id: string, num: string) {
    if (!confirm(`¿Eliminar la factura ${num}? Las atenciones asociadas seran desvinculadas.`)) return;
    const result = await deleteFactura(id);
    if (result.success) {
      toast.success("Factura eliminada");
      load();
    }
  }

  async function handleRecalcular(id: string) {
    const result = await recalcularFactura(id);
    if (result.success) {
      toast.success("Totales recalculados");
      load();
    }
  }

  function formatCurrency(val: string | null) {
    if (!val) return "$0";
    const num = Number(val);
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(num);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <FileText className="text-emerald-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Facturas</h2>
            <p className="text-sm text-gray-500">{facturas.length} registros</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/facturas/nueva")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Nueva Factura
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
            placeholder="Buscar por numero de factura..."
            className="form-input pl-9"
          />
        </div>
      </form>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : facturas.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No se encontraron facturas.
            <button
              onClick={() => router.push("/facturas/nueva")}
              className="block mx-auto mt-2 text-blue-600 hover:underline"
            >
              Crear la primera factura
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">No. Factura</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Entidad</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Valor Total</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Atenciones</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {facturas.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-gray-900">{f.numFactura}</td>
                    <td className="px-4 py-3 text-gray-600">{f.fechaExpedicion}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{f.nombreEntidadAdministradora || "-"}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(f.valorTotal)}</td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {f.totalAtenciones}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        ESTADO_STYLES[f.estado] || "bg-gray-100 text-gray-700"
                      }`}>
                        {f.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleRecalcular(f.id)}
                          className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Recalcular totales"
                        >
                          <Calculator size={16} />
                        </button>
                        <button
                          onClick={() => router.push(`/facturas/${f.id}`)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(f.id, f.numFactura)}
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
