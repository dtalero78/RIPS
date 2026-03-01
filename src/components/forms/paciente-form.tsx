"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { getPaciente, createPaciente, updatePaciente } from "@/actions/pacientes";
import { MunicipioSearch } from "@/components/shared/municipio-search";
import toast from "react-hot-toast";

interface Props {
  pacienteId?: string;
}

const EMPTY_FORM = {
  tipoDocumento: "CC",
  numeroDocumento: "",
  primerApellido: "",
  segundoApellido: "",
  primerNombre: "",
  segundoNombre: "",
  fechaNacimiento: "",
  codSexo: "",
  codPaisResidencia: "COL",
  codMunicipioResidencia: "",
  codZonaTerritorial: "U",
  incapacidad: "NO",
  codPaisOrigen: "COL",
  tipoUsuario: "01",
};

export function PacienteForm({ pacienteId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [municipio, setMunicipio] = useState<{ codigo: string; nombre: string } | null>(null);
  const [catalogs, setCatalogs] = useState<{
    tiposDocumento: { codigo: string; nombre: string }[];
    sexos: { codigo: string; nombre: string }[];
    tiposUsuario: { codigo: string; nombre: string }[];
  }>({ tiposDocumento: [], sexos: [], tiposUsuario: [] });

  useEffect(() => {
    // Load catalogs
    Promise.all([
      fetch("/api/referencia/catalogos?tipo=tipos-documento").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=sexos").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=tipos-usuario").then((r) => r.json()),
    ]).then(([td, sx, tu]) => {
      setCatalogs({ tiposDocumento: td, sexos: sx, tiposUsuario: tu });
    });

    // Load paciente if editing
    if (pacienteId) {
      setLoading(true);
      getPaciente(pacienteId).then((p) => {
        if (p) {
          setForm({
            tipoDocumento: p.tipoDocumento,
            numeroDocumento: p.numeroDocumento,
            primerApellido: p.primerApellido,
            segundoApellido: p.segundoApellido || "",
            primerNombre: p.primerNombre,
            segundoNombre: p.segundoNombre || "",
            fechaNacimiento: p.fechaNacimiento,
            codSexo: p.codSexo,
            codPaisResidencia: p.codPaisResidencia || "COL",
            codMunicipioResidencia: p.codMunicipioResidencia || "",
            codZonaTerritorial: p.codZonaTerritorial || "U",
            incapacidad: p.incapacidad || "NO",
            codPaisOrigen: p.codPaisOrigen || "COL",
            tipoUsuario: p.tipoUsuario,
          });
          if (p.codMunicipioResidencia) {
            setMunicipio({ codigo: p.codMunicipioResidencia, nombre: "" });
          }
        }
        setLoading(false);
      });
    }
  }, [pacienteId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const result = pacienteId
        ? await updatePaciente(pacienteId, form)
        : await createPaciente(form);

      if ("error" in result && result.error) {
        toast.error(result.error);
      } else {
        toast.success(pacienteId ? "Paciente actualizado" : "Paciente creado");
        router.push("/pacientes");
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
          onClick={() => router.push("/pacientes")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          {pacienteId ? "Editar Paciente" : "Nuevo Paciente"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identificación */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Identificacion</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Tipo Documento *</label>
              <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} className="form-input">
                {catalogs.tiposDocumento.map((t) => (
                  <option key={t.codigo} value={t.codigo}>{t.codigo} - {t.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Numero Documento *</label>
              <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange}
                className="form-input" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Primer Apellido *</label>
              <input name="primerApellido" value={form.primerApellido} onChange={handleChange}
                className="form-input" required />
            </div>
            <div>
              <label className="form-label">Segundo Apellido</label>
              <input name="segundoApellido" value={form.segundoApellido} onChange={handleChange}
                className="form-input" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Primer Nombre *</label>
              <input name="primerNombre" value={form.primerNombre} onChange={handleChange}
                className="form-input" required />
            </div>
            <div>
              <label className="form-label">Segundo Nombre</label>
              <input name="segundoNombre" value={form.segundoNombre} onChange={handleChange}
                className="form-input" />
            </div>
          </div>
        </div>

        {/* Datos demográficos */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Datos Demograficos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Fecha Nacimiento *</label>
              <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange}
                className="form-input" required />
            </div>
            <div>
              <label className="form-label">Sexo *</label>
              <select name="codSexo" value={form.codSexo} onChange={handleChange} className="form-input" required>
                <option value="">Seleccionar...</option>
                {catalogs.sexos.map((s) => (
                  <option key={s.codigo} value={s.codigo}>{s.codigo} - {s.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Tipo Usuario *</label>
              <select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange} className="form-input">
                {catalogs.tiposUsuario.map((t) => (
                  <option key={t.codigo} value={t.codigo}>{t.codigo} - {t.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MunicipioSearch
              value={municipio}
              onChange={(m) => {
                setMunicipio(m);
                setForm((prev) => ({ ...prev, codMunicipioResidencia: m?.codigo || "" }));
              }}
            />
            <div>
              <label className="form-label">Zona Territorial</label>
              <select name="codZonaTerritorial" value={form.codZonaTerritorial} onChange={handleChange} className="form-input">
                <option value="U">U - Urbana</option>
                <option value="R">R - Rural</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Incapacidad</label>
              <select name="incapacidad" value={form.incapacidad} onChange={handleChange} className="form-input">
                <option value="NO">NO</option>
                <option value="SI">SI</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.push("/pacientes")} className="btn-secondary">
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
