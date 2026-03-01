import { pgTable, varchar, index } from "drizzle-orm/pg-core";
import { refDepartamentosDane } from "./ref-departamentos-dane";

// Municipios de Colombia - DANE DIVIPOLA (~1,122 municipios)
export const refMunicipiosDane = pgTable(
  "ref_municipios_dane",
  {
    codigo: varchar("codigo", { length: 5 }).primaryKey(),
    nombre: varchar("nombre", { length: 100 }).notNull(),
    codigoDepartamento: varchar("codigo_departamento", { length: 2 })
      .notNull()
      .references(() => refDepartamentosDane.codigo),
  },
  (table) => [
    index("idx_municipios_departamento").on(table.codigoDepartamento),
    index("idx_municipios_nombre").on(table.nombre),
  ]
);
