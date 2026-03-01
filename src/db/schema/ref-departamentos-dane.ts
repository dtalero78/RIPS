import { pgTable, varchar } from "drizzle-orm/pg-core";

// Departamentos de Colombia - DANE DIVIPOLA
export const refDepartamentosDane = pgTable("ref_departamentos_dane", {
  codigo: varchar("codigo", { length: 2 }).primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
});
