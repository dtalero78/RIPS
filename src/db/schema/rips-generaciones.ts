import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";

export const ripsGeneraciones = pgTable(
  "rips_generaciones",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    facturaId: uuid("factura_id"),
    periodoInicio: varchar("periodo_inicio", { length: 10 }),
    periodoFin: varchar("periodo_fin", { length: 10 }),
    numFactura: varchar("num_factura", { length: 30 }),
    archivoJson: jsonb("archivo_json").notNull(),
    hashArchivo: varchar("hash_archivo", { length: 64 }),
    totalUsuarios: integer("total_usuarios").default(0),
    totalConsultas: integer("total_consultas").default(0),
    totalProcedimientos: integer("total_procedimientos").default(0),
    totalAtenciones: integer("total_atenciones").default(0),
    erroresValidacion: jsonb("errores_validacion"),
    estado: varchar("estado", { length: 20 }).default("generado").notNull(),
    usuarioGeneradorId: uuid("usuario_generador_id")
      .references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_rips_gen_tenant").on(table.tenantId),
    index("idx_rips_gen_estado").on(table.estado),
  ]
);

export type RipsGeneracion = typeof ripsGeneraciones.$inferSelect;
export type NewRipsGeneracion = typeof ripsGeneraciones.$inferInsert;
