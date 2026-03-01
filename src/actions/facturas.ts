"use server";

import { db } from "@/db";
import { facturas, atenciones } from "@/db/schema";
import { eq, and, ilike, desc, count, sql } from "drizzle-orm";
import { getTenantId } from "@/lib/tenant-context";
import { facturaSchema, type FacturaInput } from "@/lib/validations/factura.schema";

export async function getFacturas(search?: string) {
  const tenantId = await getTenantId();

  const conditions = [eq(facturas.tenantId, tenantId)];
  if (search && search.length >= 2) {
    conditions.push(ilike(facturas.numFactura, `%${search}%`));
  }

  const results = await db
    .select({
      id: facturas.id,
      numFactura: facturas.numFactura,
      fechaExpedicion: facturas.fechaExpedicion,
      nombreEntidadAdministradora: facturas.nombreEntidadAdministradora,
      valorTotal: facturas.valorTotal,
      estado: facturas.estado,
      createdAt: facturas.createdAt,
      totalAtenciones: sql<number>`(SELECT count(*) FROM atenciones WHERE factura_id = ${facturas.id})`,
    })
    .from(facturas)
    .where(and(...conditions))
    .orderBy(desc(facturas.createdAt))
    .limit(100);

  return results;
}

export async function getFactura(id: string) {
  const tenantId = await getTenantId();
  const [factura] = await db
    .select()
    .from(facturas)
    .where(and(eq(facturas.id, id), eq(facturas.tenantId, tenantId)))
    .limit(1);
  return factura || null;
}

export async function getFacturasSimple() {
  const tenantId = await getTenantId();
  return db
    .select({ id: facturas.id, numFactura: facturas.numFactura })
    .from(facturas)
    .where(eq(facturas.tenantId, tenantId))
    .orderBy(desc(facturas.createdAt))
    .limit(50);
}

export async function createFactura(input: FacturaInput) {
  const tenantId = await getTenantId();

  const parsed = facturaSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  // Check duplicate
  const [existing] = await db
    .select({ id: facturas.id })
    .from(facturas)
    .where(and(eq(facturas.tenantId, tenantId), eq(facturas.numFactura, parsed.data.numFactura)))
    .limit(1);

  if (existing) return { error: "Ya existe una factura con ese numero." };

  const [created] = await db
    .insert(facturas)
    .values({
      tenantId,
      numFactura: parsed.data.numFactura,
      tipoNota: parsed.data.tipoNota || null,
      numNota: parsed.data.numNota || null,
      fechaExpedicion: parsed.data.fechaExpedicion,
      horaExpedicion: parsed.data.horaExpedicion || null,
      fechaInicio: parsed.data.fechaInicio || null,
      fechaFin: parsed.data.fechaFin || null,
      codigoEntidadAdministradora: parsed.data.codigoEntidadAdministradora || null,
      nombreEntidadAdministradora: parsed.data.nombreEntidadAdministradora || null,
      numContrato: parsed.data.numContrato || null,
      planBeneficios: parsed.data.planBeneficios || null,
      numPoliza: parsed.data.numPoliza || null,
    })
    .returning({ id: facturas.id });

  return { success: true, id: created.id };
}

export async function updateFactura(id: string, input: FacturaInput) {
  const tenantId = await getTenantId();

  const parsed = facturaSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const [existing] = await db
    .select({ id: facturas.id })
    .from(facturas)
    .where(
      and(
        eq(facturas.tenantId, tenantId),
        eq(facturas.numFactura, parsed.data.numFactura),
        sql`${facturas.id} != ${id}`,
      )
    )
    .limit(1);

  if (existing) return { error: "Ya existe otra factura con ese numero." };

  await db
    .update(facturas)
    .set({
      numFactura: parsed.data.numFactura,
      tipoNota: parsed.data.tipoNota || null,
      numNota: parsed.data.numNota || null,
      fechaExpedicion: parsed.data.fechaExpedicion,
      horaExpedicion: parsed.data.horaExpedicion || null,
      fechaInicio: parsed.data.fechaInicio || null,
      fechaFin: parsed.data.fechaFin || null,
      codigoEntidadAdministradora: parsed.data.codigoEntidadAdministradora || null,
      nombreEntidadAdministradora: parsed.data.nombreEntidadAdministradora || null,
      numContrato: parsed.data.numContrato || null,
      planBeneficios: parsed.data.planBeneficios || null,
      numPoliza: parsed.data.numPoliza || null,
      updatedAt: new Date(),
    })
    .where(and(eq(facturas.id, id), eq(facturas.tenantId, tenantId)));

  return { success: true };
}

export async function deleteFactura(id: string) {
  const tenantId = await getTenantId();

  // Unlink atenciones first
  await db
    .update(atenciones)
    .set({ facturaId: null })
    .where(and(eq(atenciones.facturaId, id), eq(atenciones.tenantId, tenantId)));

  await db
    .delete(facturas)
    .where(and(eq(facturas.id, id), eq(facturas.tenantId, tenantId)));

  return { success: true };
}

/** Recalculate factura total from linked atenciones */
export async function recalcularFactura(id: string) {
  const tenantId = await getTenantId();

  const [result] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${atenciones.valorServicio} AS NUMERIC)), 0)`,
      copago: sql<string>`COALESCE(SUM(CAST(${atenciones.valorPagoModerador} AS NUMERIC)), 0)`,
    })
    .from(atenciones)
    .where(and(eq(atenciones.facturaId, id), eq(atenciones.tenantId, tenantId)));

  await db
    .update(facturas)
    .set({
      valorTotal: result.total,
      valorCopago: result.copago,
      valorNeto: String(Number(result.total) - Number(result.copago)),
      updatedAt: new Date(),
    })
    .where(and(eq(facturas.id, id), eq(facturas.tenantId, tenantId)));

  return { success: true };
}
