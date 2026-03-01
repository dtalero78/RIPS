import { pgTable, varchar } from "drizzle-orm/pg-core";

// RIPSTipoUsuarioVersion2 - Resolución 2275
export const refTiposUsuario = pgTable("ref_tipos_usuario", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
});
