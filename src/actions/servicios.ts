"use server";

import { db } from "@/db";
import { servicios } from "@/db/schema";
import { eq, and, or, ilike, desc } from "drizzle-orm";
import { getTenantId } from "@/lib/tenant-context";
import { servicioSchema, type ServicioInput } from "@/lib/validations/servicio.schema";

export async function getServicios(search?: string) {
  const tenantId = await getTenantId();

  const conditions = [eq(servicios.tenantId, tenantId)];

  if (search && search.length >= 2) {
    conditions.push(
      or(
        ilike(servicios.nombre, `%${search}%`),
        ilike(servicios.codigoCups, `%${search}%`),
      )!
    );
  }

  return db
    .select()
    .from(servicios)
    .where(and(...conditions))
    .orderBy(desc(servicios.createdAt))
    .limit(100);
}

export async function getServicio(id: string) {
  const tenantId = await getTenantId();
  const [servicio] = await db
    .select()
    .from(servicios)
    .where(and(eq(servicios.id, id), eq(servicios.tenantId, tenantId)))
    .limit(1);
  return servicio || null;
}

export async function createServicio(input: ServicioInput) {
  const tenantId = await getTenantId();

  const parsed = servicioSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const [created] = await db
    .insert(servicios)
    .values({
      tenantId,
      ...parsed.data,
      nombreCups: parsed.data.nombreCups || null,
      grupoServicio: parsed.data.grupoServicio || null,
      precio: parsed.data.precio || "0",
    })
    .returning({ id: servicios.id });

  return { success: true, id: created.id };
}

export async function updateServicio(id: string, input: ServicioInput) {
  const tenantId = await getTenantId();

  const parsed = servicioSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await db
    .update(servicios)
    .set({
      ...parsed.data,
      nombreCups: parsed.data.nombreCups || null,
      grupoServicio: parsed.data.grupoServicio || null,
      precio: parsed.data.precio || "0",
      updatedAt: new Date(),
    })
    .where(and(eq(servicios.id, id), eq(servicios.tenantId, tenantId)));

  return { success: true };
}

export async function deleteServicio(id: string) {
  const tenantId = await getTenantId();

  await db
    .delete(servicios)
    .where(and(eq(servicios.id, id), eq(servicios.tenantId, tenantId)));

  return { success: true };
}
