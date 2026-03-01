/**
 * RIPS JSON Generator - Resolución 2275 de 2023
 *
 * Generates the complete JSON structure required by Colombia's MinSalud
 * for RIPS (Registros Individuales de Prestación de Servicios de Salud).
 */

import { db } from "@/db";
import { atenciones, pacientes, medicos, tenantConfig, facturas } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import {
  normalizarTexto,
  formatearFechaHora,
  codPaisNumerico,
  codZonaRips,
  valorEntero,
  limpiarNit,
} from "./utils";

interface GenerateOptions {
  tenantId: string;
  facturaId?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

interface RipsUsuario {
  tipoDocumentoIdentificacion: string;
  numDocumentoIdentificacion: string;
  tipoUsuario: string;
  fechaNacimiento: string;
  codSexo: string;
  codPaisResidencia: string;
  codMunicipioResidencia: string | null;
  codZonaTerritorialResidencia: string | null;
  incapacidad: string;
  consecutivo: number;
  codPaisOrigen: string;
  serviciosTecnologias: {
    consultas: RipsConsulta[];
    procedimientos: RipsProcedimiento[];
    urgencias: never[];
    hospitalizacion: never[];
    recienNacidos: never[];
    medicamentos: never[];
    otrosServicios: never[];
  };
}

interface RipsConsulta {
  codPrestador: string;
  fechaInicioAtencion: string;
  numAutorizacion: string | null;
  codConsulta: string;
  modalidadGrupoServicioTecSal: string;
  grupoServicios: string;
  codServicio: number;
  finalidadTecnologiaSalud: string;
  causaMotivoAtencion: string;
  codDiagnosticoPrincipal: string;
  codDiagnosticoRelacionado1: string | null;
  codDiagnosticoRelacionado2: string | null;
  codDiagnosticoRelacionado3: string | null;
  tipoDiagnosticoPrincipal: string;
  tipoDocumentoIdentificacion: string;
  numDocumentoIdentificacion: string;
  vrServicio: number;
  conceptoRecaudo: string;
  valorPagoModerador: number;
  numFEVPagoModerador: string | null;
  consecutivo: number;
}

interface RipsProcedimiento {
  codPrestador: string;
  fechaInicioAtencion: string;
  idMIPRES: string | null;
  numAutorizacion: string | null;
  codProcedimiento: string;
  viaIngresoServicioSalud: string;
  modalidadGrupoServicioTecSal: string;
  grupoServicios: string;
  codServicio: number;
  finalidadTecnologiaSalud: string;
  tipoDocumentoIdentificacion: string;
  numDocumentoIdentificacion: string;
  codDiagnosticoPrincipal: string;
  codDiagnosticoRelacionado: string | null;
  codComplicacion: string | null;
  vrServicio: number;
  conceptoRecaudo: string;
  valorPagoModerador: number;
  numFEVPagoModerador: string | null;
  consecutivo: number;
}

export interface RipsResult {
  json: {
    numDocumentoIdObligado: string;
    numFactura: string | null;
    tipoNota: string | null;
    numNota: string | null;
    usuarios: RipsUsuario[];
  };
  stats: {
    totalUsuarios: number;
    totalConsultas: number;
    totalProcedimientos: number;
    totalAtenciones: number;
  };
  errors: string[];
}

export async function generateRips(options: GenerateOptions): Promise<RipsResult> {
  const errors: string[] = [];

  // 1. Get tenant config
  const [config] = await db
    .select()
    .from(tenantConfig)
    .where(eq(tenantConfig.tenantId, options.tenantId))
    .limit(1);

  if (!config) {
    return {
      json: { numDocumentoIdObligado: "", numFactura: null, tipoNota: null, numNota: null, usuarios: [] },
      stats: { totalUsuarios: 0, totalConsultas: 0, totalProcedimientos: 0, totalAtenciones: 0 },
      errors: ["No se ha configurado la informacion del prestador. Ve a Configuracion."],
    };
  }

  const codPrestador = config.codigoPrestador || "";
  const nitObligado = limpiarNit(config.nitPrestador || config.numDocObligadoDefault || "");

  if (!codPrestador || codPrestador.length !== 12) {
    errors.push("El codigo de prestador debe tener 12 digitos.");
  }
  if (!nitObligado || nitObligado.length < 9) {
    errors.push("El NIT del obligado debe tener al menos 9 digitos.");
  }

  // 2. Get factura info if specified
  let numFactura: string | null = null;
  let tipoNota: string | null = null;
  let numNota: string | null = null;

  if (options.facturaId) {
    const [factura] = await db
      .select()
      .from(facturas)
      .where(and(eq(facturas.id, options.facturaId), eq(facturas.tenantId, options.tenantId)))
      .limit(1);
    if (factura) {
      numFactura = factura.numFactura;
      tipoNota = factura.tipoNota || null;
      numNota = factura.numNota || null;
    }
  }

  // 3. Fetch atenciones with paciente and medico data
  const conditions = [eq(atenciones.tenantId, options.tenantId)];

  if (options.facturaId) {
    conditions.push(eq(atenciones.facturaId, options.facturaId));
  }
  if (options.fechaDesde) {
    conditions.push(sql`${atenciones.fechaAtencion} >= ${options.fechaDesde}`);
  }
  if (options.fechaHasta) {
    conditions.push(sql`${atenciones.fechaAtencion} <= ${options.fechaHasta}`);
  }

  const records = await db
    .select({
      atencion: atenciones,
      paciente: pacientes,
      medico: medicos,
    })
    .from(atenciones)
    .innerJoin(pacientes, eq(atenciones.pacienteId, pacientes.id))
    .leftJoin(medicos, eq(atenciones.medicoId, medicos.id))
    .where(and(...conditions))
    .orderBy(atenciones.fechaAtencion);

  if (records.length === 0) {
    errors.push("No se encontraron atenciones para el periodo seleccionado.");
    return {
      json: { numDocumentoIdObligado: nitObligado, numFactura, tipoNota, numNota, usuarios: [] },
      stats: { totalUsuarios: 0, totalConsultas: 0, totalProcedimientos: 0, totalAtenciones: 0 },
      errors,
    };
  }

  // 4. Group atenciones by unique paciente (deduplicate by documento)
  const usuariosMap = new Map<string, {
    paciente: typeof records[0]["paciente"];
    atenciones: { atencion: typeof records[0]["atencion"]; medico: typeof records[0]["medico"] }[];
  }>();

  for (const record of records) {
    const key = `${record.paciente.tipoDocumento}-${record.paciente.numeroDocumento}`;
    if (!usuariosMap.has(key)) {
      usuariosMap.set(key, { paciente: record.paciente, atenciones: [] });
    }
    usuariosMap.get(key)!.atenciones.push({
      atencion: record.atencion,
      medico: record.medico,
    });
  }

  // 5. Build usuarios array
  const ripsUsuarios: RipsUsuario[] = [];
  let consecutivoUsuario = 1;
  let totalConsultas = 0;
  let totalProcedimientos = 0;

  for (const [, userData] of usuariosMap) {
    const p = userData.paciente;

    const consultas: RipsConsulta[] = [];
    const procedimientos: RipsProcedimiento[] = [];
    let consecutivoConsulta = 1;
    let consecutivoProcedimiento = 1;

    for (const { atencion: a, medico: m } of userData.atenciones) {
      const medicoTipoDoc = m?.tipoDocumento || config.tipoDocObligadoDefault || "CC";
      const medicoNumDoc = m?.numeroDocumento || "";

      if (a.tipoAtencion === "consulta") {
        consultas.push({
          codPrestador,
          fechaInicioAtencion: formatearFechaHora(a.fechaAtencion),
          numAutorizacion: a.numAutorizacion || null,
          codConsulta: a.codigoCups,
          modalidadGrupoServicioTecSal: a.modalidadAtencion || config.modalidadAtencionDefault || "01",
          grupoServicios: a.grupoServicio || config.grupoServicioDefault || "01",
          codServicio: parseInt(a.codServicio || "330") || 330,
          finalidadTecnologiaSalud: a.finalidadTecnologia || "11",
          causaMotivoAtencion: a.causaAtencion || "38",
          codDiagnosticoPrincipal: a.codDiagnosticoPrincipal || "",
          codDiagnosticoRelacionado1: a.codDiagnosticoRelacionado1 || null,
          codDiagnosticoRelacionado2: a.codDiagnosticoRelacionado2 || null,
          codDiagnosticoRelacionado3: a.codDiagnosticoRelacionado3 || null,
          tipoDiagnosticoPrincipal: a.tipoDiagnosticoPrincipal || "01",
          tipoDocumentoIdentificacion: medicoTipoDoc,
          numDocumentoIdentificacion: medicoNumDoc,
          vrServicio: valorEntero(a.valorServicio),
          conceptoRecaudo: a.conceptoRecaudo || "05",
          valorPagoModerador: valorEntero(a.valorPagoModerador),
          numFEVPagoModerador: a.numFEV || null,
          consecutivo: consecutivoConsulta++,
        });
        totalConsultas++;
      } else if (a.tipoAtencion === "procedimiento") {
        procedimientos.push({
          codPrestador,
          fechaInicioAtencion: formatearFechaHora(a.fechaAtencion),
          idMIPRES: null,
          numAutorizacion: a.numAutorizacion || null,
          codProcedimiento: a.codigoCups,
          viaIngresoServicioSalud: a.viaIngreso || config.viaIngresoDefault || "01",
          modalidadGrupoServicioTecSal: a.modalidadAtencion || config.modalidadAtencionDefault || "01",
          grupoServicios: a.grupoServicio || config.grupoServicioDefault || "01",
          codServicio: parseInt(a.codServicio || "330") || 330,
          finalidadTecnologiaSalud: a.finalidadTecnologia || "11",
          tipoDocumentoIdentificacion: medicoTipoDoc,
          numDocumentoIdentificacion: medicoNumDoc,
          codDiagnosticoPrincipal: a.codDiagnosticoPrincipal || "",
          codDiagnosticoRelacionado: a.codDiagnosticoRelacionado1 || null,
          codComplicacion: null,
          vrServicio: valorEntero(a.valorServicio),
          conceptoRecaudo: a.conceptoRecaudo || "05",
          valorPagoModerador: valorEntero(a.valorPagoModerador),
          numFEVPagoModerador: a.numFEV || null,
          consecutivo: consecutivoProcedimiento++,
        });
        totalProcedimientos++;
      }
    }

    ripsUsuarios.push({
      tipoDocumentoIdentificacion: p.tipoDocumento,
      numDocumentoIdentificacion: p.numeroDocumento,
      tipoUsuario: p.tipoUsuario,
      fechaNacimiento: p.fechaNacimiento,
      codSexo: p.codSexo,
      codPaisResidencia: codPaisNumerico(p.codPaisResidencia),
      codMunicipioResidencia: p.codMunicipioResidencia || null,
      codZonaTerritorialResidencia: codZonaRips(p.codZonaTerritorial),
      incapacidad: p.incapacidad || "NO",
      consecutivo: consecutivoUsuario++,
      codPaisOrigen: codPaisNumerico(p.codPaisOrigen),
      serviciosTecnologias: {
        consultas,
        procedimientos,
        urgencias: [],
        hospitalizacion: [],
        recienNacidos: [],
        medicamentos: [],
        otrosServicios: [],
      },
    });
  }

  // 6. Validate
  if (!nitObligado) errors.push("Falta NIT del obligado a reportar.");
  for (const u of ripsUsuarios) {
    if (!u.numDocumentoIdentificacion) errors.push(`Usuario consecutivo ${u.consecutivo}: falta numero de documento.`);
    if (!u.fechaNacimiento) errors.push(`Usuario ${u.numDocumentoIdentificacion}: falta fecha de nacimiento.`);
    for (const c of u.serviciosTecnologias.consultas) {
      if (!c.codConsulta) errors.push(`Consulta consecutivo ${c.consecutivo}: falta codigo CUPS.`);
      if (!c.codDiagnosticoPrincipal) errors.push(`Consulta consecutivo ${c.consecutivo}: falta diagnostico principal.`);
      if (!c.numDocumentoIdentificacion) errors.push(`Consulta consecutivo ${c.consecutivo}: falta documento del medico.`);
    }
    for (const p of u.serviciosTecnologias.procedimientos) {
      if (!p.codProcedimiento) errors.push(`Procedimiento consecutivo ${p.consecutivo}: falta codigo CUPS.`);
      if (!p.codDiagnosticoPrincipal) errors.push(`Procedimiento consecutivo ${p.consecutivo}: falta diagnostico principal.`);
    }
  }

  return {
    json: {
      numDocumentoIdObligado: nitObligado,
      numFactura,
      tipoNota,
      numNota,
      usuarios: ripsUsuarios,
    },
    stats: {
      totalUsuarios: ripsUsuarios.length,
      totalConsultas,
      totalProcedimientos,
      totalAtenciones: totalConsultas + totalProcedimientos,
    },
    errors,
  };
}
