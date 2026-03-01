"use server";

import { db } from "@/db";
import { pacientes } from "@/db/schema";
import { eq, and, or, ilike, desc, sql } from "drizzle-orm";
import { getTenantId } from "@/lib/tenant-context";
import { pacienteSchema, type PacienteInput } from "@/lib/validations/paciente.schema";

export async function getPacientes(search?: string) {
  const tenantId = await getTenantId();

  const conditions = [eq(pacientes.tenantId, tenantId)];

  if (search && search.length >= 2) {
    conditions.push(
      or(
        ilike(pacientes.primerNombre, `%${search}%`),
        ilike(pacientes.primerApellido, `%${search}%`),
        ilike(pacientes.numeroDocumento, `%${search}%`),
      )!
    );
  }

  return db
    .select()
    .from(pacientes)
    .where(and(...conditions))
    .orderBy(desc(pacientes.createdAt))
    .limit(100);
}

export async function getPaciente(id: string) {
  const tenantId = await getTenantId();
  const [paciente] = await db
    .select()
    .from(pacientes)
    .where(and(eq(pacientes.id, id), eq(pacientes.tenantId, tenantId)))
    .limit(1);
  return paciente || null;
}

export async function createPaciente(input: PacienteInput) {
  const tenantId = await getTenantId();

  const parsed = pacienteSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  // Check duplicate
  const [existing] = await db
    .select({ id: pacientes.id })
    .from(pacientes)
    .where(
      and(
        eq(pacientes.tenantId, tenantId),
        eq(pacientes.tipoDocumento, parsed.data.tipoDocumento),
        eq(pacientes.numeroDocumento, parsed.data.numeroDocumento),
      )
    )
    .limit(1);

  if (existing) {
    return { error: "Ya existe un paciente con ese tipo y número de documento." };
  }

  const [created] = await db
    .insert(pacientes)
    .values({
      tenantId,
      ...parsed.data,
      segundoApellido: parsed.data.segundoApellido || null,
      segundoNombre: parsed.data.segundoNombre || null,
      codMunicipioResidencia: parsed.data.codMunicipioResidencia || null,
    })
    .returning({ id: pacientes.id });

  return { success: true, id: created.id };
}

export async function updatePaciente(id: string, input: PacienteInput) {
  const tenantId = await getTenantId();

  const parsed = pacienteSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  // Check duplicate (exclude self)
  const [existing] = await db
    .select({ id: pacientes.id })
    .from(pacientes)
    .where(
      and(
        eq(pacientes.tenantId, tenantId),
        eq(pacientes.tipoDocumento, parsed.data.tipoDocumento),
        eq(pacientes.numeroDocumento, parsed.data.numeroDocumento),
        sql`${pacientes.id} != ${id}`,
      )
    )
    .limit(1);

  if (existing) {
    return { error: "Ya existe otro paciente con ese tipo y número de documento." };
  }

  await db
    .update(pacientes)
    .set({
      ...parsed.data,
      segundoApellido: parsed.data.segundoApellido || null,
      segundoNombre: parsed.data.segundoNombre || null,
      codMunicipioResidencia: parsed.data.codMunicipioResidencia || null,
      updatedAt: new Date(),
    })
    .where(and(eq(pacientes.id, id), eq(pacientes.tenantId, tenantId)));

  return { success: true };
}

export async function deletePaciente(id: string) {
  const tenantId = await getTenantId();

  await db
    .delete(pacientes)
    .where(and(eq(pacientes.id, id), eq(pacientes.tenantId, tenantId)));

  return { success: true };
}
