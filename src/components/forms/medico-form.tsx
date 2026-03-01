"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { getMedico, createMedico, updateMedico } from "@/actions/medicos";
import toast from "react-hot-toast";

interface Props {
  medicoId?: string;
}

const EMPTY_FORM = {
  tipoDocumento: "CC",
  numeroDocumento: "",
  primerApellido: "",
  segundoApellido: "",
  primerNombre: "",
  segundoNombre: "",
  registroMedico: "",
  especialidad: "",
};

export function MedicoForm({ medicoId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tiposDocumento, setTiposDocumento] = useState<{ codigo: string; nombre: string }[]>([]);

  useEffect(() => {
    fetch("/api/referencia/catalogos?tipo=tipos-documento")
      .then((r) => r.json())
      .then(setTiposDocumento);

    if (medicoId) {
      setLoading(true);
      getMedico(medicoId).then((m) => {
        if (m) {
          setForm({
            tipoDocumento: m.tipoDocumento,
            numeroDocumento: m.numeroDocumento,
            primerApellido: m.primerApellido,
            segundoApellido: m.segundoApellido || "",
            primerNombre: m.primerNombre,
            segundoNombre: m.segundoNombre || "",
            registroMedico: m.registroMedico,
            especialidad: m.especialidad || "",
          });
        }
        setLoading(false);
      });
    }
  }, [medicoId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const result = medicoId ? await updateMedico(medicoId, form) : await createMedico(form);
      if ("error" in result && result.error) {
        toast.error(result.error);
      } else {
        toast.success(medicoId ? "Medico actualizado" : "Medico creado");
        router.push("/medicos");
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
        <button onClick={() => router.push("/medicos")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900">{medicoId ? "Editar Medico" : "Nuevo Medico"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Identificacion</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Tipo Documento *</label>
              <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} className="form-input">
                {tiposDocumento.map((t) => (
                  <option key={t.codigo} value={t.codigo}>{t.codigo} - {t.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Numero Documento *</label>
              <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange} className="form-input" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Primer Apellido *</label>
              <input name="primerApellido" value={form.primerApellido} onChange={handleChange} className="form-input" required />
            </div>
            <div>
              <label className="form-label">Segundo Apellido</label>
              <input name="segundoApellido" value={form.segundoApellido} onChange={handleChange} className="form-input" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Primer Nombre *</label>
              <input name="primerNombre" value={form.primerNombre} onChange={handleChange} className="form-input" required />
            </div>
            <div>
              <label className="form-label">Segundo Nombre</label>
              <input name="segundoNombre" value={form.segundoNombre} onChange={handleChange} className="form-input" />
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Informacion Profesional</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Registro Medico *</label>
              <input name="registroMedico" value={form.registroMedico} onChange={handleChange} className="form-input" required />
            </div>
            <div>
              <label className="form-label">Especialidad</label>
              <input name="especialidad" value={form.especialidad} onChange={handleChange} className="form-input"
                placeholder="Ej: Medicina General, Pediatria..." />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.push("/medicos")} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
