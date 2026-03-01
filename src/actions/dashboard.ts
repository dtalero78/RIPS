"use server";

import { db } from "@/db";
import { pacientes, medicos, servicios, atenciones, ripsGeneraciones, facturas } from "@/db/schema";
import { eq, and, sql, desc, count } from "drizzle-orm";
import { getTenantId } from "@/lib/tenant-context";

export async function getDashboardStats() {
  const tenantId = await getTenantId();

  const [
    [pacientesCount],
    [medicosCount],
    [serviciosCount],
    [atencionesCount],
    [facturasCount],
    [ripsCount],
    atencionesRecientes,
    atencionPorTipo,
    atencionPorMes,
  ] = await Promise.all([
    db.select({ value: count() }).from(pacientes).where(eq(pacientes.tenantId, tenantId)),
    db.select({ value: count() }).from(medicos).where(eq(medicos.tenantId, tenantId)),
    db.select({ value: count() }).from(servicios).where(eq(servicios.tenantId, tenantId)),
    db.select({ value: count() }).from(atenciones).where(eq(atenciones.tenantId, tenantId)),
    db.select({ value: count() }).from(facturas).where(eq(facturas.tenantId, tenantId)),
    db.select({ value: count() }).from(ripsGeneraciones).where(eq(ripsGeneraciones.tenantId, tenantId)),
    // Last 5 atenciones
    db
      .select({
        id: atenciones.id,
        tipoAtencion: atenciones.tipoAtencion,
        fechaAtencion: atenciones.fechaAtencion,
        codigoCups: atenciones.codigoCups,
        pacienteNombre: sql<string>`${pacientes.primerNombre} || ' ' || ${pacientes.primerApellido}`,
      })
      .from(atenciones)
      .leftJoin(pacientes, eq(atenciones.pacienteId, pacientes.id))
      .where(eq(atenciones.tenantId, tenantId))
      .orderBy(desc(atenciones.createdAt))
      .limit(5),
    // Atenciones by tipo
    db
      .select({
        tipo: atenciones.tipoAtencion,
        total: count(),
      })
      .from(atenciones)
      .where(eq(atenciones.tenantId, tenantId))
      .groupBy(atenciones.tipoAtencion),
    // Atenciones by month (last 6 months)
    db
      .select({
        mes: sql<string>`to_char(${atenciones.fechaAtencion}::date, 'YYYY-MM')`,
        total: count(),
      })
      .from(atenciones)
      .where(
        and(
          eq(atenciones.tenantId, tenantId),
          sql`${atenciones.fechaAtencion}::date >= current_date - interval '6 months'`,
        )
      )
      .groupBy(sql`to_char(${atenciones.fechaAtencion}::date, 'YYYY-MM')`)
      .orderBy(sql`to_char(${atenciones.fechaAtencion}::date, 'YYYY-MM')`),
  ]);

  return {
    counts: {
      pacientes: pacientesCount.value,
      medicos: medicosCount.value,
      servicios: serviciosCount.value,
      atenciones: atencionesCount.value,
      facturas: facturasCount.value,
      ripsGenerados: ripsCount.value,
    },
    atencionesRecientes,
    atencionPorTipo,
    atencionPorMes,
  };
}
