import {
  pgTable,
  uuid,
  varchar,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  nit: varchar("nit", { length: 20 }).notNull().unique(),
  codigoHabilitacion: varchar("codigo_habilitacion", { length: 12 }),
  razonSocial: varchar("razon_social", { length: 200 }),
  direccion: varchar("direccion", { length: 200 }),
  ciudad: varchar("ciudad", { length: 100 }),
  departamento: varchar("departamento", { length: 100 }),
  telefono: varchar("telefono", { length: 20 }),
  email: varchar("email", { length: 100 }),
  plan: varchar("plan", { length: 20 }).default("free").notNull(),
  maxUsers: integer("max_users").default(3).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
