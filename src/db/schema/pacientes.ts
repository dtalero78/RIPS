import {
  pgTable,
  uuid,
  varchar,
  date,
  boolean,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

export const pacientes = pgTable(
  "pacientes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    tipoDocumento: varchar("tipo_documento", { length: 4 }).notNull(),
    numeroDocumento: varchar("numero_documento", { length: 20 }).notNull(),
    primerApellido: varchar("primer_apellido", { length: 60 }).notNull(),
    segundoApellido: varchar("segundo_apellido", { length: 60 }),
    primerNombre: varchar("primer_nombre", { length: 60 }).notNull(),
    segundoNombre: varchar("segundo_nombre", { length: 60 }),
    fechaNacimiento: date("fecha_nacimiento").notNull(),
    codSexo: varchar("cod_sexo", { length: 2 }).notNull(),
    codPaisResidencia: varchar("cod_pais_residencia", { length: 3 }).default("COL"),
    codMunicipioResidencia: varchar("cod_municipio_residencia", { length: 5 }),
    codZonaTerritorial: varchar("cod_zona_territorial", { length: 2 }).default("U"),
    incapacidad: varchar("incapacidad", { length: 2 }).default("NO"),
    codPaisOrigen: varchar("cod_pais_origen", { length: 3 }).default("COL"),
    tipoUsuario: varchar("tipo_usuario", { length: 4 }).notNull().default("01"),
    numAutorizacion: varchar("num_autorizacion", { length: 30 }),
    numMIPRES: varchar("num_mipres", { length: 30 }),
    numTutela: varchar("num_tutela", { length: 30 }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_pacientes_tenant").on(table.tenantId),
    index("idx_pacientes_documento").on(table.tipoDocumento, table.numeroDocumento),
    index("idx_pacientes_nombre").on(table.primerApellido, table.primerNombre),
    unique("uq_pacientes_doc_tenant").on(table.tenantId, table.tipoDocumento, table.numeroDocumento),
  ]
);

export type Paciente = typeof pacientes.$inferSelect;
export type NewPaciente = typeof pacientes.$inferInsert;
