import { pgTable, varchar } from "drizzle-orm/pg-core";

// RIPSTipoDiagnosticoPrincipalVersion2
export const refTiposDiagnostico = pgTable("ref_tipos_diagnostico", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
});
