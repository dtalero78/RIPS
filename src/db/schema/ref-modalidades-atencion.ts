import { pgTable, varchar } from "drizzle-orm/pg-core";

// ModalidadAtencion - Resolución 2275 (nota: no existe código 05)
export const refModalidadesAtencion = pgTable("ref_modalidades_atencion", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
});
