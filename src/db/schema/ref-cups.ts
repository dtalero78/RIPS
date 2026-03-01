import { pgTable, varchar, index } from "drizzle-orm/pg-core";

// Clasificación Única de Procedimientos en Salud (CUPS)
export const refCups = pgTable(
  "ref_cups",
  {
    codigo: varchar("codigo", { length: 20 }).primaryKey(),
    nombre: varchar("nombre", { length: 500 }).notNull(),
  },
  (table) => [index("idx_cups_nombre").on(table.nombre)]
);
