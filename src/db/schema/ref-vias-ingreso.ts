import { pgTable, varchar } from "drizzle-orm/pg-core";

// ViaIngresoUsuario - Resolución 2275
export const refViasIngreso = pgTable("ref_vias_ingreso", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
});
