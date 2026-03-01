import { z } from "zod";

export const atencionSchema = z.object({
  pacienteId: z.string().uuid("Paciente es requerido"),
  medicoId: z.string().uuid("Médico es requerido").optional().or(z.literal("")),
  facturaId: z.string().uuid().optional().or(z.literal("")),
  tipoAtencion: z.enum(["consulta", "procedimiento", "urgencia", "hospitalizacion", "medicamento", "otro"]),
  fechaAtencion: z.string().min(1, "Fecha de atención es requerida"),
  numAutorizacion: z.string().max(30).optional().or(z.literal("")),
  codigoCups: z.string().min(1, "Código CUPS es requerido").max(15),
  nombreCups: z.string().max(300).optional().or(z.literal("")),
  modalidadAtencion: z.string().optional().or(z.literal("")),
  grupoServicio: z.string().optional().or(z.literal("")),
  codServicio: z.string().optional().or(z.literal("")),
  finalidadTecnologia: z.string().optional().or(z.literal("")),
  causaAtencion: z.string().optional().or(z.literal("")),
  viaIngreso: z.string().optional().or(z.literal("")),
  conceptoRecaudo: z.string().optional().or(z.literal("")),
  codDiagnosticoPrincipal: z.string().max(10).optional().or(z.literal("")),
  nombreDiagnosticoPrincipal: z.string().max(300).optional().or(z.literal("")),
  codDiagnosticoRelacionado1: z.string().max(10).optional().or(z.literal("")),
  codDiagnosticoRelacionado2: z.string().max(10).optional().or(z.literal("")),
  codDiagnosticoRelacionado3: z.string().max(10).optional().or(z.literal("")),
  tipoDiagnosticoPrincipal: z.string().optional().or(z.literal("")),
  ambitoProcedimiento: z.string().optional().or(z.literal("")),
  finalidadProcedimiento: z.string().optional().or(z.literal("")),
  valorServicio: z.string().optional().or(z.literal("")),
  valorPagoModerador: z.string().optional().or(z.literal("")),
  numFEV: z.string().max(30).optional().or(z.literal("")),
});

export type AtencionInput = z.infer<typeof atencionSchema>;
