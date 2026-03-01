import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

// Configuración RIPS específica de cada IPS
export const tenantConfig = pgTable("tenant_config", {
  tenantId: uuid("tenant_id")
    .primaryKey()
    .references(() => tenants.id, { onDelete: "cascade" }),
  // Datos del prestador para RIPS
  codigoPrestador: varchar("codigo_prestador", { length: 12 }), // Código habilitación REPS (12 dígitos)
  nitPrestador: varchar("nit_prestador", { length: 20 }),
  nombrePrestador: varchar("nombre_prestador", { length: 200 }),
  // Defaults para agilizar la captura
  modalidadAtencionDefault: varchar("modalidad_atencion_default", { length: 4 }),
  grupoServicioDefault: varchar("grupo_servicio_default", { length: 4 }),
  viaIngresoDefault: varchar("via_ingreso_default", { length: 4 }),
  codMunicipioDefault: varchar("cod_municipio_default", { length: 5 }),
  codDepartamentoDefault: varchar("cod_departamento_default", { length: 2 }),
  // Datos del obligado (EPS/ARL que paga)
  tipoDocObligadoDefault: varchar("tipo_doc_obligado_default", { length: 4 }),
  numDocObligadoDefault: varchar("num_doc_obligado_default", { length: 20 }),
  // Consecutivo de facturas
  prefijoFactura: varchar("prefijo_factura", { length: 10 }),
  consecutivoActual: varchar("consecutivo_actual", { length: 20 }).default("1"),
  // Timestamps
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
