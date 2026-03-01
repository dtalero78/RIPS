"use server";

import { db } from "@/db";
import { ripsGeneraciones } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getTenantId, getSessionUser } from "@/lib/tenant-context";
import { generateRips } from "@/lib/rips/generator";
import { createHash } from "crypto";

export async function getRipsGeneraciones() {
  const tenantId = await getTenantId();

  return db
    .select()
    .from(ripsGeneraciones)
    .where(eq(ripsGeneraciones.tenantId, tenantId))
    .orderBy(desc(ripsGeneraciones.createdAt))
    .limit(50);
}

export async function getRipsGeneracion(id: string) {
  const tenantId = await getTenantId();

  const [gen] = await db
    .select()
    .from(ripsGeneraciones)
    .where(eq(ripsGeneraciones.id, id))
    .limit(1);

  if (!gen || gen.tenantId !== tenantId) return null;
  return gen;
}

export async function generarRips(input: {
  facturaId?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}) {
  const user = await getSessionUser();
  const tenantId = user.tenantId;

  // Generate RIPS JSON
  const result = await generateRips({
    tenantId,
    facturaId: input.facturaId || undefined,
    fechaDesde: input.fechaDesde || undefined,
    fechaHasta: input.fechaHasta || undefined,
  });

  // Even with errors, save the generation for review
  const jsonStr = JSON.stringify(result.json, null, 2);
  const hash = createHash("sha256").update(jsonStr).digest("hex");

  const [saved] = await db
    .insert(ripsGeneraciones)
    .values({
      tenantId,
      facturaId: input.facturaId || null,
      periodoInicio: input.fechaDesde || null,
      periodoFin: input.fechaHasta || null,
      numFactura: result.json.numFactura || null,
      archivoJson: result.json,
      hashArchivo: hash,
      totalUsuarios: result.stats.totalUsuarios,
      totalConsultas: result.stats.totalConsultas,
      totalProcedimientos: result.stats.totalProcedimientos,
      totalAtenciones: result.stats.totalAtenciones,
      erroresValidacion: result.errors.length > 0 ? result.errors : null,
      estado: result.errors.length > 0 ? "con_errores" : "generado",
      usuarioGeneradorId: user.id,
    })
    .returning();

  return {
    id: saved.id,
    stats: result.stats,
    errors: result.errors,
    hasErrors: result.errors.length > 0,
  };
}
