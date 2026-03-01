import { pgTable, varchar } from "drizzle-orm/pg-core";

// ConceptoRecaudo - Resolución 2275
export const refConceptosRecaudo = pgTable("ref_conceptos_recaudo", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
});
