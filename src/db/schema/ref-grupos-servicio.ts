import { pgTable, varchar } from "drizzle-orm/pg-core";

// GrupoServicios - Resolución 2275
export const refGruposServicio = pgTable("ref_grupos_servicio", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
});
