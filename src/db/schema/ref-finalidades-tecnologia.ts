import { pgTable, varchar, boolean } from "drizzle-orm/pg-core";

// RIPSFinalidadConsultaVersion2 - Resolución 2275
export const refFinalidadesTecnologia = pgTable("ref_finalidades_tecnologia", {
  codigo: varchar("codigo", { length: 4 }).primaryKey(),
  nombre: varchar("nombre", { length: 300 }).notNull(),
  aplicaConsulta: boolean("aplica_consulta").default(false).notNull(),
  aplicaProcedimiento: boolean("aplica_procedimiento").default(false).notNull(),
});
