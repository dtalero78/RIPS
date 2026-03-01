/**
 * RIPS utility functions for Resolución 2275 de 2023.
 */

/** Remove accents and convert to uppercase (NFD normalization) */
export function normalizarTexto(texto: string | null | undefined): string {
  if (!texto) return "";
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

/** Format date as YYYY-MM-DD */
export function formatearFecha(fecha: string | Date): string {
  if (fecha instanceof Date) {
    return fecha.toISOString().split("T")[0];
  }
  // Already YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
  return new Date(fecha).toISOString().split("T")[0];
}

/** Format date as YYYY-MM-DD HH:MM (16 chars required by RIPS) */
export function formatearFechaHora(fecha: string | Date, hora?: string): string {
  const fechaStr = formatearFecha(fecha);
  const horaStr = hora || "00:00";
  return `${fechaStr} ${horaStr.substring(0, 5)}`;
}

/** Convert ISO alpha-3 country code to ISO numeric (required by RIPS) */
const PAIS_MAP: Record<string, string> = {
  COL: "170",
  VEN: "862",
  ECU: "218",
  PER: "604",
  BRA: "076",
  USA: "840",
  ESP: "724",
  MEX: "484",
  ARG: "032",
  CHL: "152",
};

export function codPaisNumerico(alpha3: string | null | undefined): string {
  if (!alpha3) return "170"; // Default Colombia
  return PAIS_MAP[alpha3.toUpperCase()] || "170";
}

/** Map zona territorial code: U->01, R->02 */
export function codZonaRips(zona: string | null | undefined): string {
  if (!zona) return "01";
  if (zona === "U" || zona === "01") return "01";
  if (zona === "R" || zona === "02") return "02";
  return "01";
}

/** Parse string to integer for RIPS numeric fields (no decimals) */
export function valorEntero(valor: string | number | null | undefined): number {
  if (!valor) return 0;
  const num = typeof valor === "string" ? parseFloat(valor) : valor;
  return Math.round(num);
}

/** Clean NIT: remove verification digit and hyphens, keep only first 9 digits */
export function limpiarNit(nit: string | null | undefined): string {
  if (!nit) return "";
  return nit.replace(/[-\s]/g, "").substring(0, 9);
}
