import { pgTable, varchar } from "drizzle-orm/pg-core";

// Ámbito de realización del procedimiento
export const refAmbitosProcedimiento = pgTable("ref_ambitos_procedimiento", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
});
