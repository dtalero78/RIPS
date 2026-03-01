"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { getFactura, createFactura, updateFactura } from "@/actions/facturas";
import toast from "react-hot-toast";

interface Props {
  facturaId?: string;
}

const EMPTY_FORM = {
  numFactura: "",
  tipoNota: "",
  numNota: "",
  fechaExpedicion: "",
  horaExpedicion: "",
  fechaInicio: "",
  fechaFin: "",
  codigoEntidadAdministradora: "",
  nombreEntidadAdministradora: "",
  numContrato: "",
  planBeneficios: "",
  numPoliza: "",
};

export function FacturaForm({ facturaId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (facturaId) {
      setLoading(true);
      getFactura(facturaId).then((f) => {
        if (f) {
          setForm({
            numFactura: f.numFactura,
            tipoNota: f.tipoNota || "",
            numNota: f.numNota || "",
            fechaExpedicion: f.fechaExpedicion,
            horaExpedicion: f.horaExpedicion || "",
            fechaInicio: f.fechaInicio || "",
            fechaFin: f.fechaFin || "",
            codigoEntidadAdministradora: f.codigoEntidadAdministradora || "",
            nombreEntidadAdministradora: f.nombreEntidadAdministradora || "",
            numContrato: f.numContrato || "",
            planBeneficios: f.planBeneficios || "",
            numPoliza: f.numPoliza || "",
          });
        }
        setLoading(false);
      });
    }
  }, [facturaId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const result = facturaId
        ? await updateFactura(facturaId, form)
        : await createFactura(form);

      if ("error" in result && result.error) {
        toast.error(result.error);
      } else {
        toast.success(facturaId ? "Factura actualizada" : "Factura creada");
        router.push("/facturas");
      }
    } catch {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/facturas")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          {facturaId ? "Editar Factura" : "Nueva Factura"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos de la Factura */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Datos de la Factura</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Numero Factura *</label>
              <input name="numFactura" value={form.numFactura} onChange={handleChange}
                className="form-input" required maxLength={30} />
            </div>
            <div>
              <label className="form-label">Fecha Expedicion *</label>
              <input type="date" name="fechaExpedicion" value={form.fechaExpedicion} onChange={handleChange}
                className="form-input" required />
            </div>
            <div>
              <label className="form-label">Hora Expedicion</label>
              <input type="time" name="horaExpedicion" value={form.horaExpedicion} onChange={handleChange}
                className="form-input" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Tipo Nota</label>
              <select name="tipoNota" value={form.tipoNota} onChange={handleChange} className="form-input">
                <option value="">Sin nota</option>
                <option value="NC">NC - Nota Credito</option>
                <option value="ND">ND - Nota Debito</option>
              </select>
            </div>
            <div>
              <label className="form-label">Numero Nota</label>
              <input name="numNota" value={form.numNota} onChange={handleChange}
                className="form-input" maxLength={30} />
            </div>
          </div>
        </div>

        {/* Periodo */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Periodo de Facturacion</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Fecha Inicio</label>
              <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange}
                className="form-input" />
            </div>
            <div>
              <label className="form-label">Fecha Fin</label>
              <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange}
                className="form-input" />
            </div>
          </div>
        </div>

        {/* Entidad Administradora */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Entidad Administradora</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Codigo Entidad</label>
              <input name="codigoEntidadAdministradora" value={form.codigoEntidadAdministradora} onChange={handleChange}
                className="form-input" maxLength={20} />
            </div>
            <div>
              <label className="form-label">Nombre Entidad</label>
              <input name="nombreEntidadAdministradora" value={form.nombreEntidadAdministradora} onChange={handleChange}
                className="form-input" maxLength={200} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Numero Contrato</label>
              <input name="numContrato" value={form.numContrato} onChange={handleChange}
                className="form-input" maxLength={30} />
            </div>
            <div>
              <label className="form-label">Plan Beneficios</label>
              <input name="planBeneficios" value={form.planBeneficios} onChange={handleChange}
                className="form-input" maxLength={30} />
            </div>
            <div>
              <label className="form-label">Numero Poliza</label>
              <input name="numPoliza" value={form.numPoliza} onChange={handleChange}
                className="form-input" maxLength={30} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.push("/facturas")} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
