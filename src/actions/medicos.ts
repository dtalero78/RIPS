"use server";

import { db } from "@/db";
import { medicos } from "@/db/schema";
import { eq, and, or, ilike, desc, sql } from "drizzle-orm";
import { getTenantId } from "@/lib/tenant-context";
import { medicoSchema, type MedicoInput } from "@/lib/validations/medico.schema";

export async function getMedicos(search?: string) {
  const tenantId = await getTenantId();

  const conditions = [eq(medicos.tenantId, tenantId)];

  if (search && search.length >= 2) {
    conditions.push(
      or(
        ilike(medicos.primerNombre, `%${search}%`),
        ilike(medicos.primerApellido, `%${search}%`),
        ilike(medicos.numeroDocumento, `%${search}%`),
        ilike(medicos.registroMedico, `%${search}%`),
      )!
    );
  }

  return db
    .select()
    .from(medicos)
    .where(and(...conditions))
    .orderBy(desc(medicos.createdAt))
    .limit(100);
}

export async function getMedico(id: string) {
  const tenantId = await getTenantId();
  const [medico] = await db
    .select()
    .from(medicos)
    .where(and(eq(medicos.id, id), eq(medicos.tenantId, tenantId)))
    .limit(1);
  return medico || null;
}

export async function createMedico(input: MedicoInput) {
  const tenantId = await getTenantId();

  const parsed = medicoSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const [existing] = await db
    .select({ id: medicos.id })
    .from(medicos)
    .where(
      and(
        eq(medicos.tenantId, tenantId),
        eq(medicos.tipoDocumento, parsed.data.tipoDocumento),
        eq(medicos.numeroDocumento, parsed.data.numeroDocumento),
      )
    )
    .limit(1);

  if (existing) {
    return { error: "Ya existe un médico con ese tipo y número de documento." };
  }

  const [created] = await db
    .insert(medicos)
    .values({
      tenantId,
      ...parsed.data,
      segundoApellido: parsed.data.segundoApellido || null,
      segundoNombre: parsed.data.segundoNombre || null,
      especialidad: parsed.data.especialidad || null,
    })
    .returning({ id: medicos.id });

  return { success: true, id: created.id };
}

export async function updateMedico(id: string, input: MedicoInput) {
  const tenantId = await getTenantId();

  const parsed = medicoSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const [existing] = await db
    .select({ id: medicos.id })
    .from(medicos)
    .where(
      and(
        eq(medicos.tenantId, tenantId),
        eq(medicos.tipoDocumento, parsed.data.tipoDocumento),
        eq(medicos.numeroDocumento, parsed.data.numeroDocumento),
        sql`${medicos.id} != ${id}`,
      )
    )
    .limit(1);

  if (existing) {
    return { error: "Ya existe otro médico con ese tipo y número de documento." };
  }

  await db
    .update(medicos)
    .set({
      ...parsed.data,
      segundoApellido: parsed.data.segundoApellido || null,
      segundoNombre: parsed.data.segundoNombre || null,
      especialidad: parsed.data.especialidad || null,
      updatedAt: new Date(),
    })
    .where(and(eq(medicos.id, id), eq(medicos.tenantId, tenantId)));

  return { success: true };
}

export async function deleteMedico(id: string) {
  const tenantId = await getTenantId();

  await db
    .delete(medicos)
    .where(and(eq(medicos.id, id), eq(medicos.tenantId, tenantId)));

  return { success: true };
}
