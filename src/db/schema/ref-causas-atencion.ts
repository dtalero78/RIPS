import { pgTable, varchar, boolean } from "drizzle-orm/pg-core";

// RIPSCausaExternaVersion2 - Resolución 2275
export const refCausasAtencion = pgTable("ref_causas_atencion", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 300 }).notNull(),
  aplicaConsulta: boolean("aplica_consulta").default(false).notNull(),
  aplicaUrgencias: boolean("aplica_urgencias").default(false).notNull(),
  aplicaHospitalizacion: boolean("aplica_hospitalizacion").default(false).notNull(),
});
