import {
  pgTable,
  uuid,
  varchar,
  numeric,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

export const servicios = pgTable(
  "servicios",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    codigoCups: varchar("codigo_cups", { length: 15 }).notNull(),
    nombreCups: varchar("nombre_cups", { length: 300 }),
    grupoServicio: varchar("grupo_servicio", { length: 4 }),
    tipoServicio: varchar("tipo_servicio", { length: 20 }).notNull().default("consulta"),
    precio: numeric("precio", { precision: 15, scale: 2 }).default("0"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_servicios_tenant").on(table.tenantId),
    index("idx_servicios_cups").on(table.codigoCups),
  ]
);

export type Servicio = typeof servicios.$inferSelect;
export type NewServicio = typeof servicios.$inferInsert;
