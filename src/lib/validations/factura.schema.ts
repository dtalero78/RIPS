import { z } from "zod";

export const facturaSchema = z.object({
  numFactura: z.string().min(1, "Numero de factura es requerido").max(30),
  tipoNota: z.string().max(4).optional().or(z.literal("")),
  numNota: z.string().max(30).optional().or(z.literal("")),
  fechaExpedicion: z.string().min(1, "Fecha de expedicion es requerida"),
  horaExpedicion: z.string().max(5).optional().or(z.literal("")),
  fechaInicio: z.string().optional().or(z.literal("")),
  fechaFin: z.string().optional().or(z.literal("")),
  codigoEntidadAdministradora: z.string().max(20).optional().or(z.literal("")),
  nombreEntidadAdministradora: z.string().max(200).optional().or(z.literal("")),
  numContrato: z.string().max(30).optional().or(z.literal("")),
  planBeneficios: z.string().max(30).optional().or(z.literal("")),
  numPoliza: z.string().max(30).optional().or(z.literal("")),
});

export type FacturaInput = z.infer<typeof facturaSchema>;
