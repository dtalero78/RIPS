"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Building2, FileText, MapPin, Loader2 } from "lucide-react";
import { getTenantConfig, saveTenantConfig } from "@/actions/configuracion";
import { MunicipioSearch } from "@/components/shared/municipio-search";
import toast from "react-hot-toast";

interface CatalogOption {
  codigo: string;
  nombre: string;
}

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [codigoPrestador, setCodigoPrestador] = useState("");
  const [nitPrestador, setNitPrestador] = useState("");
  const [nombrePrestador, setNombrePrestador] = useState("");
  const [modalidadDefault, setModalidadDefault] = useState("");
  const [grupoServicioDefault, setGrupoServicioDefault] = useState("");
  const [viaIngresoDefault, setViaIngresoDefault] = useState("");
  const [municipioDefault, setMunicipioDefault] = useState<{ codigo: string; nombre: string } | null>(null);
  const [departamentoDefault, setDepartamentoDefault] = useState("");
  const [tipoDocObligado, setTipoDocObligado] = useState("");
  const [numDocObligado, setNumDocObligado] = useState("");
  const [prefijoFactura, setPrefijoFactura] = useState("");

  // Reference catalogs
  const [modalidades, setModalidades] = useState<CatalogOption[]>([]);
  const [gruposServicio, setGruposServicio] = useState<CatalogOption[]>([]);
  const [viasIngreso, setViasIngreso] = useState<CatalogOption[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<CatalogOption[]>([]);
  const [departamentos, setDepartamentos] = useState<CatalogOption[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [configResult, modsRes, gruposRes, viasRes, tiposDocRes, depsRes] = await Promise.all([
          getTenantConfig(),
          fetch("/api/referencia/catalogos?tipo=modalidades-atencion").then((r) => r.json()),
          fetch("/api/referencia/catalogos?tipo=grupos-servicio").then((r) => r.json()),
          fetch("/api/referencia/catalogos?tipo=vias-ingreso").then((r) => r.json()),
          fetch("/api/referencia/catalogos?tipo=tipos-documento").then((r) => r.json()),
          fetch("/api/referencia/departamentos").then((r) => r.json()),
        ]);

        setModalidades(modsRes);
        setGruposServicio(gruposRes);
        setViasIngreso(viasRes);
        setTiposDocumento(tiposDocRes);
        setDepartamentos(depsRes);

        let resolvedCodigo = "";
        let resolvedNit = "";
        let resolvedNombre = "";

        if (configResult.config) {
          const c = configResult.config;
          resolvedCodigo = c.codigoPrestador || "";
          resolvedNit = c.nitPrestador || "";
          resolvedNombre = c.nombrePrestador || "";
          setCodigoPrestador(resolvedCodigo);
          setNitPrestador(resolvedNit);
          setNombrePrestador(resolvedNombre);
          setModalidadDefault(c.modalidadAtencionDefault || "");
          setGrupoServicioDefault(c.grupoServicioDefault || "");
          setViaIngresoDefault(c.viaIngresoDefault || "");
          setDepartamentoDefault(c.codDepartamentoDefault || "");
          setTipoDocObligado(c.tipoDocObligadoDefault || "");
          setNumDocObligado(c.numDocObligadoDefault || "");
          setPrefijoFactura(c.prefijoFactura || "");
          if (c.codMunicipioDefault) {
            setMunicipioDefault({ codigo: c.codMunicipioDefault, nombre: "" });
          }
        }
        if (configResult.tenant) {
          if (!resolvedNombre) setNombrePrestador(configResult.tenant.razonSocial || configResult.tenant.name);
          if (!resolvedNit) setNitPrestador(configResult.tenant.nit || "");
          if (!resolvedCodigo) setCodigoPrestador(configResult.tenant.codigoHabilitacion || "");
        }
      } catch (err) {
        console.error("Error loading config:", err);
        toast.error("Error al cargar la configuración");
      } finally {
        setLoading(false);
      }
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await saveTenantConfig({
        codigoPrestador,
        nitPrestador,
        nombrePrestador,
        modalidadAtencionDefault: modalidadDefault || undefined,
        grupoServicioDefault: grupoServicioDefault || undefined,
        viaIngresoDefault: viaIngresoDefault || undefined,
        codMunicipioDefault: municipioDefault?.codigo || undefined,
        codDepartamentoDefault: departamentoDefault || undefined,
        tipoDocObligadoDefault: tipoDocObligado || undefined,
        numDocObligadoDefault: numDocObligado || undefined,
        prefijoFactura: prefijoFactura || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Configuración guardada exitosamente");
      }
    } catch {
      toast.error("Error al guardar la configuración");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="text-blue-600" size={28} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración IPS</h1>
          <p className="text-gray-500 text-sm">
            Configure los datos de su IPS para la generación de RIPS
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos del Prestador */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Datos del Prestador</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Estos datos aparecerán en todos los RIPS generados.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Código de Habilitación (REPS) *</label>
              <input
                type="text"
                value={codigoPrestador}
                onChange={(e) => setCodigoPrestador(e.target.value.replace(/\D/g, "").slice(0, 12))}
                placeholder="12 dígitos del REPS"
                className="form-input font-mono"
                maxLength={12}
              />
              <p className="text-xs text-gray-400 mt-1">
                Código de 12 dígitos asignado por el REPS
              </p>
            </div>

            <div>
              <label className="form-label">NIT del Prestador *</label>
              <input
                type="text"
                value={nitPrestador}
                onChange={(e) => setNitPrestador(e.target.value)}
                placeholder="Ej: 890111797"
                className="form-input font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="form-label">Razón Social / Nombre del Prestador *</label>
              <input
                type="text"
                value={nombrePrestador}
                onChange={(e) => setNombrePrestador(e.target.value)}
                placeholder="Nombre legal de la IPS"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Ubicación por defecto</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Se usarán como valores predeterminados al registrar atenciones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Departamento</label>
              <select
                value={departamentoDefault}
                onChange={(e) => {
                  setDepartamentoDefault(e.target.value);
                  setMunicipioDefault(null);
                }}
                className="form-input"
              >
                <option value="">Seleccionar departamento...</option>
                {departamentos.map((d) => (
                  <option key={d.codigo} value={d.codigo}>
                    {d.nombre}
                  </option>
                ))}
              </select>
            </div>

            <MunicipioSearch
              value={municipioDefault}
              onChange={(opt) => setMunicipioDefault(opt ? { codigo: opt.codigo, nombre: opt.nombre } : null)}
              departamento={departamentoDefault}
            />
          </div>
        </div>

        {/* Defaults RIPS */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Valores por defecto para RIPS</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Valores predeterminados para agilizar la captura de atenciones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Modalidad de Atención</label>
              <select
                value={modalidadDefault}
                onChange={(e) => setModalidadDefault(e.target.value)}
                className="form-input"
              >
                <option value="">Seleccionar...</option>
                {modalidades.map((m) => (
                  <option key={m.codigo} value={m.codigo}>
                    {m.codigo} - {m.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Grupo de Servicio</label>
              <select
                value={grupoServicioDefault}
                onChange={(e) => setGrupoServicioDefault(e.target.value)}
                className="form-input"
              >
                <option value="">Seleccionar...</option>
                {gruposServicio.map((g) => (
                  <option key={g.codigo} value={g.codigo}>
                    {g.codigo} - {g.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Vía de Ingreso</label>
              <select
                value={viaIngresoDefault}
                onChange={(e) => setViaIngresoDefault(e.target.value)}
                className="form-input"
              >
                <option value="">Seleccionar...</option>
                {viasIngreso.map((v) => (
                  <option key={v.codigo} value={v.codigo}>
                    {v.codigo} - {v.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Prefijo de Factura</label>
              <input
                type="text"
                value={prefijoFactura}
                onChange={(e) => setPrefijoFactura(e.target.value.toUpperCase())}
                placeholder="Ej: RIPS, FAC"
                className="form-input font-mono"
                maxLength={10}
              />
            </div>
          </div>
        </div>

        {/* Obligado (EPS/ARL) */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="text-navy" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Responsable de pago (Obligado)</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Datos de la EPS, ARL u otra entidad a la que se reportan los RIPS.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Tipo de documento del Obligado</label>
              <select
                value={tipoDocObligado}
                onChange={(e) => setTipoDocObligado(e.target.value)}
                className="form-input"
              >
                <option value="">Seleccionar...</option>
                {tiposDocumento.map((t) => (
                  <option key={t.codigo} value={t.codigo}>
                    {t.codigo} - {t.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Número de documento del Obligado</label>
              <input
                type="text"
                value={numDocObligado}
                onChange={(e) => setNumDocObligado(e.target.value)}
                placeholder="NIT de la EPS/ARL"
                className="form-input font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Guardando..." : "Guardar Configuración"}
          </button>
        </div>
      </form>
    </div>
  );
}
