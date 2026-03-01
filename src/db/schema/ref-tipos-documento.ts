import { pgTable, varchar } from "drizzle-orm/pg-core";

export const refTiposDocumento = pgTable("ref_tipos_documento", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
});
