import { z } from "zod";

export const medicoSchema = z.object({
  tipoDocumento: z.string().min(1, "Tipo de documento es requerido"),
  numeroDocumento: z.string().min(1, "Número de documento es requerido").max(20),
  primerApellido: z.string().min(1, "Primer apellido es requerido").max(60),
  segundoApellido: z.string().max(60).optional().or(z.literal("")),
  primerNombre: z.string().min(1, "Primer nombre es requerido").max(60),
  segundoNombre: z.string().max(60).optional().or(z.literal("")),
  registroMedico: z.string().min(1, "Registro médico es requerido").max(30),
  especialidad: z.string().max(100).optional().or(z.literal("")),
});

export type MedicoInput = z.infer<typeof medicoSchema>;
