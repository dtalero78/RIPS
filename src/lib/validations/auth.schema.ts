import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Email invalido"),
  password: z
    .string()
    .min(1, "La contrasena es requerida"),
});

export const registerSchema = z.object({
  // IPS info
  ipsName: z
    .string()
    .min(2, "El nombre de la IPS es requerido")
    .max(200),
  nit: z
    .string()
    .min(5, "El NIT es requerido")
    .max(20, "NIT demasiado largo"),
  // User info
  fullName: z
    .string()
    .min(2, "El nombre completo es requerido")
    .max(200),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Email invalido"),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres"),
  confirmPassword: z
    .string()
    .min(1, "Confirme la contrasena"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contrasenas no coinciden",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
