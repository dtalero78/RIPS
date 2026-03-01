import { pgTable, varchar } from "drizzle-orm/pg-core";

// Resolución 2275: H = Hombre, M = Mujer, I = Indeterminado/Intersexual
export const refSexos = pgTable("ref_sexos", {
  codigo: varchar("codigo", { length: 2 }).primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
});
