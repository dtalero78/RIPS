import { z } from "zod";

export const servicioSchema = z.object({
  nombre: z.string().min(1, "Nombre del servicio es requerido").max(200),
  codigoCups: z.string().min(1, "Código CUPS es requerido").max(15),
  nombreCups: z.string().max(300).optional().or(z.literal("")),
  grupoServicio: z.string().optional().or(z.literal("")),
  tipoServicio: z.enum(["consulta", "procedimiento", "medicamento", "otro"]),
  precio: z.string().optional().or(z.literal("")),
});

export type ServicioInput = z.infer<typeof servicioSchema>;
