"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { getServicio, createServicio, updateServicio } from "@/actions/servicios";
import { CupsSearch } from "@/components/shared/cups-search";
import toast from "react-hot-toast";

interface Props {
  servicioId?: string;
}

const EMPTY_FORM = {
  nombre: "",
  codigoCups: "",
  nombreCups: "",
  grupoServicio: "",
  tipoServicio: "consulta" as const,
  precio: "",
};

export function ServicioForm({ servicioId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cupsValue, setCupsValue] = useState<{ codigo: string; nombre: string } | null>(null);
  const [gruposServicio, setGruposServicio] = useState<{ codigo: string; nombre: string }[]>([]);

  useEffect(() => {
    fetch("/api/referencia/catalogos?tipo=grupos-servicio")
      .then((r) => r.json())
      .then(setGruposServicio);

    if (servicioId) {
      setLoading(true);
      getServicio(servicioId).then((s) => {
        if (s) {
          setForm({
            nombre: s.nombre,
            codigoCups: s.codigoCups,
            nombreCups: s.nombreCups || "",
            grupoServicio: s.grupoServicio || "",
            tipoServicio: s.tipoServicio as typeof EMPTY_FORM.tipoServicio,
            precio: s.precio || "",
          });
          setCupsValue({ codigo: s.codigoCups, nombre: s.nombreCups || s.codigoCups });
        }
        setLoading(false);
      });
    }
  }, [servicioId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const result = servicioId ? await updateServicio(servicioId, form) : await createServicio(form);
      if ("error" in result && result.error) {
        toast.error(result.error);
      } else {
        toast.success(servicioId ? "Servicio actualizado" : "Servicio creado");
        router.push("/servicios");
      }
    } catch {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/servicios")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900">{servicioId ? "Editar Servicio" : "Nuevo Servicio"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Informacion del Servicio</h3>

          <div>
            <label className="form-label">Nombre del Servicio *</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="form-input" required
              placeholder="Ej: Consulta Medicina General" />
          </div>

          <CupsSearch
            value={cupsValue}
            onChange={(opt) => {
              setCupsValue(opt);
              setForm((prev) => ({
                ...prev,
                codigoCups: opt?.codigo || "",
                nombreCups: opt?.nombre || "",
                nombre: prev.nombre || opt?.nombre || "",
              }));
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Tipo de Servicio *</label>
              <select name="tipoServicio" value={form.tipoServicio} onChange={handleChange} className="form-input">
                <option value="consulta">Consulta</option>
                <option value="procedimiento">Procedimiento</option>
                <option value="medicamento">Medicamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="form-label">Grupo Servicio</label>
              <select name="grupoServicio" value={form.grupoServicio} onChange={handleChange} className="form-input">
                <option value="">Seleccionar...</option>
                {gruposServicio.map((g) => (
                  <option key={g.codigo} value={g.codigo}>{g.codigo} - {g.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Precio</label>
              <input name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange}
                className="form-input" placeholder="0.00" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.push("/servicios")} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
