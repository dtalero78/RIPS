"use server";

import { db } from "@/db";
import { tenantConfig, tenants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getTenantId, getSessionUser } from "@/lib/tenant-context";

export interface TenantConfigInput {
  codigoPrestador: string;
  nitPrestador: string;
  nombrePrestador: string;
  modalidadAtencionDefault?: string;
  grupoServicioDefault?: string;
  viaIngresoDefault?: string;
  codMunicipioDefault?: string;
  codDepartamentoDefault?: string;
  tipoDocObligadoDefault?: string;
  numDocObligadoDefault?: string;
  prefijoFactura?: string;
}

export async function getTenantConfig() {
  const tenantId = await getTenantId();

  const [config] = await db
    .select()
    .from(tenantConfig)
    .where(eq(tenantConfig.tenantId, tenantId))
    .limit(1);

  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.id, tenantId))
    .limit(1);

  return { config, tenant };
}

export async function saveTenantConfig(input: TenantConfigInput) {
  const user = await getSessionUser();
  if (user.role !== "owner" && user.role !== "admin") {
    return { error: "No tienes permisos para modificar la configuración." };
  }

  const tenantId = user.tenantId;

  // Validate código prestador (12 digits)
  if (input.codigoPrestador && !/^\d{12}$/.test(input.codigoPrestador)) {
    return { error: "El código de prestador debe tener exactamente 12 dígitos." };
  }

  // Validate NIT format
  if (input.nitPrestador && !/^\d{9,}$/.test(input.nitPrestador.replace(/[-]/g, ""))) {
    return { error: "El NIT del prestador debe tener al menos 9 dígitos." };
  }

  const [existing] = await db
    .select()
    .from(tenantConfig)
    .where(eq(tenantConfig.tenantId, tenantId))
    .limit(1);

  const configData = {
    codigoPrestador: input.codigoPrestador || null,
    nitPrestador: input.nitPrestador || null,
    nombrePrestador: input.nombrePrestador || null,
    modalidadAtencionDefault: input.modalidadAtencionDefault || null,
    grupoServicioDefault: input.grupoServicioDefault || null,
    viaIngresoDefault: input.viaIngresoDefault || null,
    codMunicipioDefault: input.codMunicipioDefault || null,
    codDepartamentoDefault: input.codDepartamentoDefault || null,
    tipoDocObligadoDefault: input.tipoDocObligadoDefault || null,
    numDocObligadoDefault: input.numDocObligadoDefault || null,
    prefijoFactura: input.prefijoFactura || null,
    updatedAt: new Date(),
  };

  if (existing) {
    await db
      .update(tenantConfig)
      .set(configData)
      .where(eq(tenantConfig.tenantId, tenantId));
  } else {
    await db.insert(tenantConfig).values({
      tenantId,
      ...configData,
    });
  }

  // Also update tenant table
  if (input.nombrePrestador) {
    await db
      .update(tenants)
      .set({
        razonSocial: input.nombrePrestador,
        codigoHabilitacion: input.codigoPrestador || undefined,
      })
      .where(eq(tenants.id, tenantId));
  }

  return { success: true };
}
