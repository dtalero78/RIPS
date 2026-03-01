import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  date,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

export const facturas = pgTable(
  "facturas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    numFactura: varchar("num_factura", { length: 30 }).notNull(),
    tipoNota: varchar("tipo_nota", { length: 4 }),
    numNota: varchar("num_nota", { length: 30 }),
    fechaExpedicion: date("fecha_expedicion").notNull(),
    horaExpedicion: varchar("hora_expedicion", { length: 5 }),
    fechaInicio: date("fecha_inicio"),
    fechaFin: date("fecha_fin"),
    codigoEntidadAdministradora: varchar("codigo_entidad_administradora", { length: 20 }),
    nombreEntidadAdministradora: varchar("nombre_entidad_administradora", { length: 200 }),
    numContrato: varchar("num_contrato", { length: 30 }),
    planBeneficios: varchar("plan_beneficios", { length: 30 }),
    numPoliza: varchar("num_poliza", { length: 30 }),
    valorTotal: numeric("valor_total", { precision: 15, scale: 2 }).default("0"),
    valorCopago: numeric("valor_copago", { precision: 15, scale: 2 }).default("0"),
    valorComision: numeric("valor_comision", { precision: 15, scale: 2 }).default("0"),
    valorDescuento: numeric("valor_descuento", { precision: 15, scale: 2 }).default("0"),
    valorNeto: numeric("valor_neto", { precision: 15, scale: 2 }).default("0"),
    estado: varchar("estado", { length: 20 }).default("borrador").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_facturas_tenant").on(table.tenantId),
    unique("uq_facturas_num_tenant").on(table.tenantId, table.numFactura),
  ]
);

export type Factura = typeof facturas.$inferSelect;
export type NewFactura = typeof facturas.$inferInsert;
