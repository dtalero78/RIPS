import { pgTable, varchar, index } from "drizzle-orm/pg-core";

// Clasificación Internacional de Enfermedades (CIE-10)
export const refCie10 = pgTable(
  "ref_cie10",
  {
    codigo: varchar("codigo", { length: 10 }).primaryKey(),
    nombre: varchar("nombre", { length: 500 }).notNull(),
  },
  (table) => [index("idx_cie10_nombre").on(table.nombre)]
);
