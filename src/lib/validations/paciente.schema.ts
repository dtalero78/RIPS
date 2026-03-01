import { z } from "zod";

export const pacienteSchema = z.object({
  tipoDocumento: z.string().min(1, "Tipo de documento es requerido"),
  numeroDocumento: z.string().min(1, "Número de documento es requerido").max(20),
  primerApellido: z.string().min(1, "Primer apellido es requerido").max(60),
  segundoApellido: z.string().max(60).optional().or(z.literal("")),
  primerNombre: z.string().min(1, "Primer nombre es requerido").max(60),
  segundoNombre: z.string().max(60).optional().or(z.literal("")),
  fechaNacimiento: z.string().min(1, "Fecha de nacimiento es requerida"),
  codSexo: z.string().min(1, "Sexo es requerido"),
  codPaisResidencia: z.string().default("COL"),
  codMunicipioResidencia: z.string().optional().or(z.literal("")),
  codZonaTerritorial: z.string().default("U"),
  incapacidad: z.string().default("NO"),
  codPaisOrigen: z.string().default("COL"),
  tipoUsuario: z.string().min(1, "Tipo de usuario es requerido"),
});

export type PacienteInput = z.infer<typeof pacienteSchema>;
