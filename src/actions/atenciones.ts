"use server";

import { db } from "@/db";
import { atenciones, pacientes, medicos } from "@/db/schema";
import { eq, and, or, ilike, desc, sql } from "drizzle-orm";
import { getTenantId } from "@/lib/tenant-context";
import { atencionSchema, type AtencionInput } from "@/lib/validations/atencion.schema";

export async function getAtenciones(filters?: {
  search?: string;
  tipoAtencion?: string;
  estado?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}) {
  const tenantId = await getTenantId();

  const conditions = [eq(atenciones.tenantId, tenantId)];

  if (filters?.tipoAtencion) {
    conditions.push(eq(atenciones.tipoAtencion, filters.tipoAtencion));
  }
  if (filters?.estado) {
    conditions.push(eq(atenciones.estado, filters.estado));
  }
  if (filters?.fechaDesde) {
    conditions.push(sql`${atenciones.fechaAtencion} >= ${filters.fechaDesde}`);
  }
  if (filters?.fechaHasta) {
    conditions.push(sql`${atenciones.fechaAtencion} <= ${filters.fechaHasta}`);
  }

  const results = await db
    .select({
      id: atenciones.id,
      tipoAtencion: atenciones.tipoAtencion,
      fechaAtencion: atenciones.fechaAtencion,
      codigoCups: atenciones.codigoCups,
      nombreCups: atenciones.nombreCups,
      codDiagnosticoPrincipal: atenciones.codDiagnosticoPrincipal,
      valorServicio: atenciones.valorServicio,
      estado: atenciones.estado,
      createdAt: atenciones.createdAt,
      pacienteNombre: sql<string>`${pacientes.primerNombre} || ' ' || ${pacientes.primerApellido}`,
      pacienteDocumento: pacientes.numeroDocumento,
      medicoNombre: sql<string>`${medicos.primerNombre} || ' ' || ${medicos.primerApellido}`,
    })
    .from(atenciones)
    .leftJoin(pacientes, eq(atenciones.pacienteId, pacientes.id))
    .leftJoin(medicos, eq(atenciones.medicoId, medicos.id))
    .where(and(...conditions))
    .orderBy(desc(atenciones.fechaAtencion))
    .limit(100);

  if (filters?.search && filters.search.length >= 2) {
    const s = filters.search.toLowerCase();
    return results.filter(
      (r) =>
        r.pacienteNombre?.toLowerCase().includes(s) ||
        r.pacienteDocumento?.toLowerCase().includes(s) ||
        r.codigoCups?.toLowerCase().includes(s)
    );
  }

  return results;
}

export async function getAtencion(id: string) {
  const tenantId = await getTenantId();
  const [atencion] = await db
    .select()
    .from(atenciones)
    .where(and(eq(atenciones.id, id), eq(atenciones.tenantId, tenantId)))
    .limit(1);
  return atencion || null;
}

export async function createAtencion(input: AtencionInput) {
  const tenantId = await getTenantId();

  const parsed = atencionSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const data = parsed.data;

  const [created] = await db
    .insert(atenciones)
    .values({
      tenantId,
      pacienteId: data.pacienteId,
      medicoId: data.medicoId || null,
      facturaId: data.facturaId || null,
      tipoAtencion: data.tipoAtencion,
      fechaAtencion: data.fechaAtencion,
      numAutorizacion: data.numAutorizacion || null,
      codigoCups: data.codigoCups,
      nombreCups: data.nombreCups || null,
      modalidadAtencion: data.modalidadAtencion || null,
      grupoServicio: data.grupoServicio || null,
      codServicio: data.codServicio || null,
      finalidadTecnologia: data.finalidadTecnologia || null,
      causaAtencion: data.causaAtencion || null,
      viaIngreso: data.viaIngreso || null,
      conceptoRecaudo: data.conceptoRecaudo || null,
      codDiagnosticoPrincipal: data.codDiagnosticoPrincipal || null,
      nombreDiagnosticoPrincipal: data.nombreDiagnosticoPrincipal || null,
      codDiagnosticoRelacionado1: data.codDiagnosticoRelacionado1 || null,
      codDiagnosticoRelacionado2: data.codDiagnosticoRelacionado2 || null,
      codDiagnosticoRelacionado3: data.codDiagnosticoRelacionado3 || null,
      tipoDiagnosticoPrincipal: data.tipoDiagnosticoPrincipal || null,
      ambitoProcedimiento: data.ambitoProcedimiento || null,
      finalidadProcedimiento: data.finalidadProcedimiento || null,
      valorServicio: data.valorServicio || "0",
      valorPagoModerador: data.valorPagoModerador || "0",
      numFEV: data.numFEV || null,
    })
    .returning({ id: atenciones.id });

  return { success: true, id: created.id };
}

export async function updateAtencion(id: string, input: AtencionInput) {
  const tenantId = await getTenantId();

  const parsed = atencionSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const data = parsed.data;

  await db
    .update(atenciones)
    .set({
      pacienteId: data.pacienteId,
      medicoId: data.medicoId || null,
      facturaId: data.facturaId || null,
      tipoAtencion: data.tipoAtencion,
      fechaAtencion: data.fechaAtencion,
      numAutorizacion: data.numAutorizacion || null,
      codigoCups: data.codigoCups,
      nombreCups: data.nombreCups || null,
      modalidadAtencion: data.modalidadAtencion || null,
      grupoServicio: data.grupoServicio || null,
      codServicio: data.codServicio || null,
      finalidadTecnologia: data.finalidadTecnologia || null,
      causaAtencion: data.causaAtencion || null,
      viaIngreso: data.viaIngreso || null,
      conceptoRecaudo: data.conceptoRecaudo || null,
      codDiagnosticoPrincipal: data.codDiagnosticoPrincipal || null,
      nombreDiagnosticoPrincipal: data.nombreDiagnosticoPrincipal || null,
      codDiagnosticoRelacionado1: data.codDiagnosticoRelacionado1 || null,
      codDiagnosticoRelacionado2: data.codDiagnosticoRelacionado2 || null,
      codDiagnosticoRelacionado3: data.codDiagnosticoRelacionado3 || null,
      tipoDiagnosticoPrincipal: data.tipoDiagnosticoPrincipal || null,
      ambitoProcedimiento: data.ambitoProcedimiento || null,
      finalidadProcedimiento: data.finalidadProcedimiento || null,
      valorServicio: data.valorServicio || "0",
      valorPagoModerador: data.valorPagoModerador || "0",
      numFEV: data.numFEV || null,
      updatedAt: new Date(),
    })
    .where(and(eq(atenciones.id, id), eq(atenciones.tenantId, tenantId)));

  return { success: true };
}

export async function deleteAtencion(id: string) {
  const tenantId = await getTenantId();

  await db
    .delete(atenciones)
    .where(and(eq(atenciones.id, id), eq(atenciones.tenantId, tenantId)));

  return { success: true };
}
