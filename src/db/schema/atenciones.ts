import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  date,
  index,
} from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { pacientes } from "./pacientes";
import { medicos } from "./medicos";
import { facturas } from "./facturas";

export const atenciones = pgTable(
  "atenciones",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    pacienteId: uuid("paciente_id")
      .notNull()
      .references(() => pacientes.id, { onDelete: "restrict" }),
    medicoId: uuid("medico_id")
      .references(() => medicos.id, { onDelete: "set null" }),
    facturaId: uuid("factura_id")
      .references(() => facturas.id, { onDelete: "set null" }),

    // Tipo de atención (determina qué campos aplican)
    tipoAtencion: varchar("tipo_atencion", { length: 20 }).notNull(),

    // Campos comunes
    fechaAtencion: date("fecha_atencion").notNull(),
    numAutorizacion: varchar("num_autorizacion", { length: 30 }),
    codigoCups: varchar("codigo_cups", { length: 15 }).notNull(),
    nombreCups: varchar("nombre_cups", { length: 300 }),
    modalidadAtencion: varchar("modalidad_atencion", { length: 4 }),
    grupoServicio: varchar("grupo_servicio", { length: 4 }),
    codServicio: varchar("cod_servicio", { length: 4 }),
    finalidadTecnologia: varchar("finalidad_tecnologia", { length: 4 }),
    causaAtencion: varchar("causa_atencion", { length: 4 }),
    viaIngreso: varchar("via_ingreso", { length: 4 }),
    conceptoRecaudo: varchar("concepto_recaudo", { length: 4 }),

    // Diagnósticos CIE-10
    codDiagnosticoPrincipal: varchar("cod_diagnostico_principal", { length: 10 }),
    nombreDiagnosticoPrincipal: varchar("nombre_diagnostico_principal", { length: 300 }),
    codDiagnosticoRelacionado1: varchar("cod_diagnostico_relacionado_1", { length: 10 }),
    codDiagnosticoRelacionado2: varchar("cod_diagnostico_relacionado_2", { length: 10 }),
    codDiagnosticoRelacionado3: varchar("cod_diagnostico_relacionado_3", { length: 10 }),
    tipoDiagnosticoPrincipal: varchar("tipo_diagnostico_principal", { length: 4 }),

    // Campos procedimiento
    ambitoProcedimiento: varchar("ambito_procedimiento", { length: 4 }),
    finalidadProcedimiento: varchar("finalidad_procedimiento", { length: 4 }),

    // Campos financieros
    valorServicio: numeric("valor_servicio", { precision: 15, scale: 2 }).default("0"),
    valorPagoModerador: numeric("valor_pago_moderador", { precision: 15, scale: 2 }).default("0"),
    numFEV: varchar("num_fev", { length: 30 }),

    // Estado en el flujo RIPS
    estado: varchar("estado", { length: 20 }).default("borrador").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_atenciones_tenant").on(table.tenantId),
    index("idx_atenciones_paciente").on(table.pacienteId),
    index("idx_atenciones_medico").on(table.medicoId),
    index("idx_atenciones_factura").on(table.facturaId),
    index("idx_atenciones_fecha").on(table.fechaAtencion),
    index("idx_atenciones_tipo").on(table.tipoAtencion),
    index("idx_atenciones_estado").on(table.estado),
  ]
);

export type Atencion = typeof atenciones.$inferSelect;
export type NewAtencion = typeof atenciones.$inferInsert;
