"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { getAtencion, createAtencion, updateAtencion } from "@/actions/atenciones";
import { getPacientes } from "@/actions/pacientes";
import { getMedicos } from "@/actions/medicos";
import { CupsSearch } from "@/components/shared/cups-search";
import { Cie10Search } from "@/components/shared/cie10-search";
import toast from "react-hot-toast";
import type { Paciente, Medico } from "@/db/schema";

interface Props {
  atencionId?: string;
}

const EMPTY_FORM = {
  pacienteId: "",
  medicoId: "",
  facturaId: "",
  tipoAtencion: "consulta" as "consulta" | "procedimiento" | "urgencia" | "hospitalizacion" | "medicamento" | "otro",
  fechaAtencion: new Date().toISOString().split("T")[0],
  numAutorizacion: "",
  codigoCups: "",
  nombreCups: "",
  modalidadAtencion: "",
  grupoServicio: "",
  codServicio: "",
  finalidadTecnologia: "",
  causaAtencion: "",
  viaIngreso: "",
  conceptoRecaudo: "",
  codDiagnosticoPrincipal: "",
  nombreDiagnosticoPrincipal: "",
  codDiagnosticoRelacionado1: "",
  codDiagnosticoRelacionado2: "",
  codDiagnosticoRelacionado3: "",
  tipoDiagnosticoPrincipal: "",
  ambitoProcedimiento: "",
  finalidadProcedimiento: "",
  valorServicio: "",
  valorPagoModerador: "",
  numFEV: "",
};

type Catalog = { codigo: string; nombre: string }[];

export function AtencionForm({ atencionId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicosList, setMedicosList] = useState<Medico[]>([]);
  const [cupsValue, setCupsValue] = useState<{ codigo: string; nombre: string } | null>(null);
  const [dxPrincipal, setDxPrincipal] = useState<{ codigo: string; nombre: string } | null>(null);
  const [catalogs, setCatalogs] = useState<{
    modalidades: Catalog; grupos: Catalog; finalidades: Catalog;
    causas: Catalog; vias: Catalog; conceptos: Catalog;
    ambitos: Catalog; tiposDx: Catalog;
  }>({
    modalidades: [], grupos: [], finalidades: [],
    causas: [], vias: [], conceptos: [],
    ambitos: [], tiposDx: [],
  });

  useEffect(() => {
    // Load catalogs, pacientes, medicos
    Promise.all([
      fetch("/api/referencia/catalogos?tipo=modalidades-atencion").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=grupos-servicio").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=finalidades-tecnologia").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=causas-atencion").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=vias-ingreso").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=conceptos-recaudo").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=ambitos-procedimiento").then((r) => r.json()),
      fetch("/api/referencia/catalogos?tipo=tipos-diagnostico").then((r) => r.json()),
      getPacientes(),
      getMedicos(),
    ]).then(([mod, gru, fin, cau, via, con, amb, tdx, pacs, meds]) => {
      setCatalogs({
        modalidades: mod, grupos: gru, finalidades: fin,
        causas: cau, vias: via, conceptos: con,
        ambitos: amb, tiposDx: tdx,
      });
      setPacientes(pacs);
      setMedicosList(meds);
    });

    if (atencionId) {
      setLoading(true);
      getAtencion(atencionId).then((a) => {
        if (a) {
          setForm({
            pacienteId: a.pacienteId,
            medicoId: a.medicoId || "",
            facturaId: a.facturaId || "",
            tipoAtencion: a.tipoAtencion as typeof EMPTY_FORM.tipoAtencion,
            fechaAtencion: a.fechaAtencion,
            numAutorizacion: a.numAutorizacion || "",
            codigoCups: a.codigoCups,
            nombreCups: a.nombreCups || "",
            modalidadAtencion: a.modalidadAtencion || "",
            grupoServicio: a.grupoServicio || "",
            codServicio: a.codServicio || "",
            finalidadTecnologia: a.finalidadTecnologia || "",
            causaAtencion: a.causaAtencion || "",
            viaIngreso: a.viaIngreso || "",
            conceptoRecaudo: a.conceptoRecaudo || "",
            codDiagnosticoPrincipal: a.codDiagnosticoPrincipal || "",
            nombreDiagnosticoPrincipal: a.nombreDiagnosticoPrincipal || "",
            codDiagnosticoRelacionado1: a.codDiagnosticoRelacionado1 || "",
            codDiagnosticoRelacionado2: a.codDiagnosticoRelacionado2 || "",
            codDiagnosticoRelacionado3: a.codDiagnosticoRelacionado3 || "",
            tipoDiagnosticoPrincipal: a.tipoDiagnosticoPrincipal || "",
            ambitoProcedimiento: a.ambitoProcedimiento || "",
            finalidadProcedimiento: a.finalidadProcedimiento || "",
            valorServicio: a.valorServicio || "",
            valorPagoModerador: a.valorPagoModerador || "",
            numFEV: a.numFEV || "",
          });
          if (a.codigoCups) setCupsValue({ codigo: a.codigoCups, nombre: a.nombreCups || "" });
          if (a.codDiagnosticoPrincipal) setDxPrincipal({ codigo: a.codDiagnosticoPrincipal, nombre: a.nombreDiagnosticoPrincipal || "" });
        }
        setLoading(false);
      });
    }
  }, [atencionId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const result = atencionId ? await updateAtencion(atencionId, form) : await createAtencion(form);
      if ("error" in result && result.error) {
        toast.error(result.error);
      } else {
        toast.success(atencionId ? "Atencion actualizada" : "Atencion creada");
        router.push("/atenciones");
      }
    } catch {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  const isConsulta = form.tipoAtencion === "consulta";
  const isProcedimiento = form.tipoAtencion === "procedimiento";

  if (loading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/atenciones")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900">{atencionId ? "Editar Atencion" : "Nueva Atencion"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo + Fecha + Paciente + Médico */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Informacion General</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Tipo de Atencion *</label>
              <select name="tipoAtencion" value={form.tipoAtencion} onChange={handleChange} className="form-input">
                <option value="consulta">Consulta</option>
                <option value="procedimiento">Procedimiento</option>
                <option value="urgencia">Urgencia</option>
                <option value="hospitalizacion">Hospitalizacion</option>
                <option value="medicamento">Medicamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="form-label">Fecha Atencion *</label>
              <input type="date" name="fechaAtencion" value={form.fechaAtencion} onChange={handleChange} className="form-input" required />
            </div>
            <div>
              <label className="form-label">Num. Autorizacion</label>
              <input name="numAutorizacion" value={form.numAutorizacion} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Paciente *</label>
              <select name="pacienteId" value={form.pacienteId} onChange={handleChange} className="form-input" required>
                <option value="">Seleccionar paciente...</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.tipoDocumento} {p.numeroDocumento} - {p.primerNombre} {p.primerApellido}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Medico</label>
              <select name="medicoId" value={form.medicoId} onChange={handleChange} className="form-input">
                <option value="">Seleccionar medico...</option>
                {medicosList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.primerNombre} {m.primerApellido} - RM: {m.registroMedico}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Servicio / CUPS */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Servicio</h3>
          <CupsSearch
            value={cupsValue}
            onChange={(opt) => {
              setCupsValue(opt);
              setForm((prev) => ({ ...prev, codigoCups: opt?.codigo || "", nombreCups: opt?.nombre || "" }));
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Modalidad Atencion</label>
              <select name="modalidadAtencion" value={form.modalidadAtencion} onChange={handleChange} className="form-input">
                <option value="">Seleccionar...</option>
                {catalogs.modalidades.map((m) => <option key={m.codigo} value={m.codigo}>{m.codigo} - {m.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Grupo Servicio</label>
              <select name="grupoServicio" value={form.grupoServicio} onChange={handleChange} className="form-input">
                <option value="">Seleccionar...</option>
                {catalogs.grupos.map((g) => <option key={g.codigo} value={g.codigo}>{g.codigo} - {g.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Finalidad Tecnologia</label>
              <select name="finalidadTecnologia" value={form.finalidadTecnologia} onChange={handleChange} className="form-input">
                <option value="">Seleccionar...</option>
                {catalogs.finalidades.map((f) => <option key={f.codigo} value={f.codigo}>{f.codigo} - {f.nombre}</option>)}
              </select>
            </div>
          </div>

          {(isConsulta || isProcedimiento) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Causa Atencion</label>
                <select name="causaAtencion" value={form.causaAtencion} onChange={handleChange} className="form-input">
                  <option value="">Seleccionar...</option>
                  {catalogs.causas.map((c) => <option key={c.codigo} value={c.codigo}>{c.codigo} - {c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Via Ingreso</label>
                <select name="viaIngreso" value={form.viaIngreso} onChange={handleChange} className="form-input">
                  <option value="">Seleccionar...</option>
                  {catalogs.vias.map((v) => <option key={v.codigo} value={v.codigo}>{v.codigo} - {v.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Concepto Recaudo</label>
                <select name="conceptoRecaudo" value={form.conceptoRecaudo} onChange={handleChange} className="form-input">
                  <option value="">Seleccionar...</option>
                  {catalogs.conceptos.map((c) => <option key={c.codigo} value={c.codigo}>{c.codigo} - {c.nombre}</option>)}
                </select>
              </div>
            </div>
          )}

          {isProcedimiento && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Ambito Procedimiento</label>
                <select name="ambitoProcedimiento" value={form.ambitoProcedimiento} onChange={handleChange} className="form-input">
                  <option value="">Seleccionar...</option>
                  {catalogs.ambitos.map((a) => <option key={a.codigo} value={a.codigo}>{a.codigo} - {a.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Finalidad Procedimiento</label>
                <select name="finalidadProcedimiento" value={form.finalidadProcedimiento} onChange={handleChange} className="form-input">
                  <option value="">Seleccionar...</option>
                  {catalogs.finalidades.map((f) => <option key={f.codigo} value={f.codigo}>{f.codigo} - {f.nombre}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Diagnósticos */}
        {(isConsulta || isProcedimiento) && (
          <div className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 border-b pb-2">Diagnosticos CIE-10</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Cie10Search
                label="Diagnostico Principal"
                value={dxPrincipal}
                onChange={(opt) => {
                  setDxPrincipal(opt);
                  setForm((prev) => ({
                    ...prev,
                    codDiagnosticoPrincipal: opt?.codigo || "",
                    nombreDiagnosticoPrincipal: opt?.nombre || "",
                  }));
                }}
              />
              <div>
                <label className="form-label">Tipo Diagnostico Principal</label>
                <select name="tipoDiagnosticoPrincipal" value={form.tipoDiagnosticoPrincipal} onChange={handleChange} className="form-input">
                  <option value="">Seleccionar...</option>
                  {catalogs.tiposDx.map((t) => <option key={t.codigo} value={t.codigo}>{t.codigo} - {t.nombre}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Dx Relacionado 1</label>
                <input name="codDiagnosticoRelacionado1" value={form.codDiagnosticoRelacionado1} onChange={handleChange}
                  className="form-input font-mono" placeholder="Ej: J069" />
              </div>
              <div>
                <label className="form-label">Dx Relacionado 2</label>
                <input name="codDiagnosticoRelacionado2" value={form.codDiagnosticoRelacionado2} onChange={handleChange}
                  className="form-input font-mono" placeholder="Ej: Z000" />
              </div>
              <div>
                <label className="form-label">Dx Relacionado 3</label>
                <input name="codDiagnosticoRelacionado3" value={form.codDiagnosticoRelacionado3} onChange={handleChange}
                  className="form-input font-mono" placeholder="Ej: M545" />
              </div>
            </div>
          </div>
        )}

        {/* Valores */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Valor Servicio</label>
              <input name="valorServicio" type="number" step="0.01" value={form.valorServicio} onChange={handleChange}
                className="form-input" placeholder="0.00" />
            </div>
            <div>
              <label className="form-label">Valor Pago Moderador</label>
              <input name="valorPagoModerador" type="number" step="0.01" value={form.valorPagoModerador} onChange={handleChange}
                className="form-input" placeholder="0.00" />
            </div>
            <div>
              <label className="form-label">Num. FEV</label>
              <input name="numFEV" value={form.numFEV} onChange={handleChange} className="form-input" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.push("/atenciones")} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
