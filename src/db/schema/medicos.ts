import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

export const medicos = pgTable(
  "medicos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    tipoDocumento: varchar("tipo_documento", { length: 4 }).notNull(),
    numeroDocumento: varchar("numero_documento", { length: 20 }).notNull(),
    primerApellido: varchar("primer_apellido", { length: 60 }).notNull(),
    segundoApellido: varchar("segundo_apellido", { length: 60 }),
    primerNombre: varchar("primer_nombre", { length: 60 }).notNull(),
    segundoNombre: varchar("segundo_nombre", { length: 60 }),
    registroMedico: varchar("registro_medico", { length: 30 }).notNull(),
    especialidad: varchar("especialidad", { length: 100 }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_medicos_tenant").on(table.tenantId),
    unique("uq_medicos_doc_tenant").on(table.tenantId, table.tipoDocumento, table.numeroDocumento),
  ]
);

export type Medico = typeof medicos.$inferSelect;
export type NewMedico = typeof medicos.$inferInsert;
