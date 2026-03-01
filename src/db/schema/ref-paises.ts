import { pgTable, varchar, index } from "drizzle-orm/pg-core";

// Países ISO 3166
export const refPaises = pgTable(
  "ref_paises",
  {
    codigo: varchar("codigo", { length: 3 }).primaryKey(), // ISO 3166-1 alpha-3
    nombre: varchar("nombre", { length: 200 }).notNull(),
    codigo2: varchar("codigo2", { length: 2 }).notNull(), // ISO 3166-1 alpha-2
  },
  (table) => [index("idx_paises_nombre").on(table.nombre)]
);
