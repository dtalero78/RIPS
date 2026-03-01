/**
 * Master seed script for all reference tables.
 *
 * Usage:
 *   DATABASE_URL="postgresql://..." npx tsx scripts/seed-reference-data.ts
 *   npm run db:seed
 *
 * Prerequisites:
 *   1. Database tables must exist (run `npm run db:push` first)
 *   2. Set DATABASE_URL in .env.local or as environment variable
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  refTiposDocumento,
  refSexos,
  refTiposUsuario,
  refModalidadesAtencion,
  refGruposServicio,
  refFinalidadesTecnologia,
  refCausasAtencion,
  refViasIngreso,
  refConceptosRecaudo,
  refAmbitosProcedimiento,
  refTiposDiagnostico,
  refDepartamentosDane,
  refMunicipiosDane,
  refCups,
  refCie10,
  refPaises,
} from "../src/db/schema";

import { departamentos } from "./data/departamentos-dane";

const BATCH_SIZE = 200;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function insertBatch(
  db: ReturnType<typeof drizzle>,
  table: any,
  data: any[],
  label: string
) {
  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE);
    await db.insert(table).values(batch).onConflictDoNothing();
  }
  console.log(`  ✓ ${label}: ${data.length} registros`);
}

// ============================================================
// Small catalogs (inline data)
// ============================================================
const tiposDocumento = [
  { codigo: "CC", nombre: "Cedula de Ciudadania" },
  { codigo: "CE", nombre: "Cedula de Extranjeria" },
  { codigo: "TI", nombre: "Tarjeta de Identidad" },
  { codigo: "RC", nombre: "Registro Civil" },
  { codigo: "PA", nombre: "Pasaporte" },
  { codigo: "CN", nombre: "Certificado de Nacido Vivo" },
  { codigo: "CD", nombre: "Carnet Diplomatico" },
  { codigo: "SC", nombre: "Salvoconducto de Permanencia" },
  { codigo: "PE", nombre: "Permiso Especial de Permanencia" },
  { codigo: "DE", nombre: "Documento Extranjero" },
  { codigo: "PT", nombre: "Permiso por Proteccion Temporal" },
  { codigo: "AS", nombre: "Adulto sin Identificacion" },
  { codigo: "MS", nombre: "Menor sin Identificacion" },
  { codigo: "NI", nombre: "Numero de Identificacion Tributario" },
];

const sexos = [
  { codigo: "H", nombre: "Hombre" },
  { codigo: "M", nombre: "Mujer" },
  { codigo: "I", nombre: "Indeterminado o Intersexual" },
];

const tiposUsuario = [
  { codigo: "01", nombre: "Contributivo cotizante" },
  { codigo: "02", nombre: "Contributivo beneficiario" },
  { codigo: "03", nombre: "Contributivo adicional" },
  { codigo: "04", nombre: "Subsidiado" },
  { codigo: "05", nombre: "No afiliado" },
  { codigo: "06", nombre: "Especial o Excepcion cotizante" },
  { codigo: "07", nombre: "Especial o Excepcion beneficiario" },
  { codigo: "08", nombre: "Personas privadas de la libertad a cargo del Fondo Nacional de Salud" },
  { codigo: "09", nombre: "Tomador / Amparado ARL" },
  { codigo: "10", nombre: "Tomador / Amparado SOAT" },
];

const modalidadesAtencion = [
  { codigo: "01", nombre: "Intramural" },
  { codigo: "02", nombre: "Extramural unidad movil" },
  { codigo: "03", nombre: "Extramural domiciliaria" },
  { codigo: "04", nombre: "Extramural jornada de salud" },
  { codigo: "06", nombre: "Telemedicina interactiva" },
  { codigo: "07", nombre: "Telemedicina no interactiva" },
  { codigo: "08", nombre: "Telemedicina telexperticia" },
  { codigo: "09", nombre: "Telemedicina telemonitoreo" },
];

const gruposServicio = [
  { codigo: "01", nombre: "Consulta externa" },
  { codigo: "02", nombre: "Apoyo diagnostico y complementacion terapeutica" },
  { codigo: "03", nombre: "Internacion" },
  { codigo: "04", nombre: "Quirurgico" },
  { codigo: "05", nombre: "Atencion inmediata" },
];

const finalidadesTecnologia = [
  { codigo: "11", nombre: "Valoracion integral para la promocion y mantenimiento", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "12", nombre: "Deteccion temprana de enfermedad general", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "13", nombre: "Deteccion temprana de enfermedad laboral", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "14", nombre: "Proteccion especifica", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "15", nombre: "Diagnostico", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "16", nombre: "Tratamiento", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "17", nombre: "Rehabilitacion", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "18", nombre: "Paliacion", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "19", nombre: "Planificacion familiar y anticoncepcion", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "20", nombre: "Promocion y apoyo a la lactancia materna", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "21", nombre: "Atencion basica de orientacion familiar", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "22", nombre: "Atencion para el cuidado preconcepcional", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "23", nombre: "Atencion para el cuidado prenatal", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "24", nombre: "Interrupcion voluntaria del embarazo", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "25", nombre: "Atencion del parto y puerperio", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "26", nombre: "Atencion para el cuidado del recien nacido", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "27", nombre: "Atencion para el seguimiento del recien nacido", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "28", nombre: "Preparacion para la maternidad y la paternidad", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "29", nombre: "Promocion de actividad fisica", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "30", nombre: "Promocion de la cesacion del tabaquismo", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "31", nombre: "Prevencion del consumo de sustancias psicoactivas", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "32", nombre: "Promocion de la alimentacion saludable", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "33", nombre: "Promocion para el ejercicio de los derechos sexuales y reproductivos", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "34", nombre: "Promocion para el desarrollo de habilidades para la vida", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "35", nombre: "Promocion para la construccion de estrategias de afrontamiento", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "36", nombre: "Promocion de la sana convivencia y el tejido social", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "37", nombre: "Promocion de un ambiente seguro y de cuidado del ambiente", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "38", nombre: "Promocion del empoderamiento para el derecho a la salud", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "39", nombre: "Promocion para la adopcion de practicas de crianza y cuidado", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "40", nombre: "Promocion de la capacidad de la agencia y cuidado de la salud", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "41", nombre: "Desarrollo de habilidades cognitivas", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "42", nombre: "Intervencion colectiva", aplicaConsulta: false, aplicaProcedimiento: true },
  { codigo: "43", nombre: "Modificacion de la estetica corporal fines esteticos", aplicaConsulta: true, aplicaProcedimiento: true },
  { codigo: "44", nombre: "Otra", aplicaConsulta: true, aplicaProcedimiento: true },
];

const causasAtencion = [
  { codigo: "21", nombre: "Accidente de trabajo", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "22", nombre: "Accidente en el hogar", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "23", nombre: "Accidente de transito de origen comun", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "24", nombre: "Accidente de transito de origen laboral", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "25", nombre: "Accidente en el entorno educativo", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "26", nombre: "Otro tipo de accidente", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "27", nombre: "Evento catastrofico de origen natural", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "28", nombre: "Lesion por agresion", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "29", nombre: "Lesion auto infligida", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "30", nombre: "Sospecha de violencia fisica", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "31", nombre: "Sospecha de violencia psicologica", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "32", nombre: "Sospecha de violencia sexual", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "33", nombre: "Sospecha de negligencia y abandono", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "34", nombre: "IVE relacionado con peligro a la salud o vida de la mujer", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "35", nombre: "IVE por malformacion congenita incompatible con la vida", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "36", nombre: "IVE por violencia sexual, incesto o inseminacion no consentida", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "37", nombre: "Evento adverso en salud", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "38", nombre: "Enfermedad general", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "39", nombre: "Enfermedad laboral", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "40", nombre: "Promocion y mantenimiento de la salud", aplicaConsulta: true, aplicaUrgencias: false, aplicaHospitalizacion: false },
  { codigo: "41", nombre: "Intervencion colectiva", aplicaConsulta: true, aplicaUrgencias: false, aplicaHospitalizacion: false },
  { codigo: "42", nombre: "Atencion de poblacion materno perinatal", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "43", nombre: "Riesgo ambiental", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "44", nombre: "Otros eventos catastroficos", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "45", nombre: "Accidente de mina antipersonal - MAP", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "46", nombre: "Accidente de artefacto explosivo improvisado - AEI", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "47", nombre: "Accidente de municion sin explotar - MUSE", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "48", nombre: "Otra victima de conflicto armado colombiano", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
  { codigo: "49", nombre: "IVE por decision de la persona gestante hasta semana 24", aplicaConsulta: true, aplicaUrgencias: true, aplicaHospitalizacion: true },
];

const viasIngreso = [
  { codigo: "01", nombre: "Demanda espontanea" },
  { codigo: "02", nombre: "Derivado de consulta externa" },
  { codigo: "03", nombre: "Derivado de urgencias" },
  { codigo: "04", nombre: "Derivado de hospitalizacion" },
  { codigo: "05", nombre: "Derivado de sala de cirugia" },
  { codigo: "06", nombre: "Derivado de sala de partos" },
  { codigo: "07", nombre: "Recien nacido en la institucion" },
  { codigo: "08", nombre: "Recien nacido en otra institucion" },
  { codigo: "09", nombre: "Derivado de hospitalizacion domiciliaria" },
  { codigo: "10", nombre: "Derivado de atencion domiciliaria" },
];

const conceptosRecaudo = [
  { codigo: "01", nombre: "Copago" },
  { codigo: "02", nombre: "Cuota moderadora" },
  { codigo: "03", nombre: "Pagos compartidos en planes voluntarios de salud" },
  { codigo: "04", nombre: "Anticipo" },
  { codigo: "05", nombre: "No aplica" },
];

const ambitosProcedimiento = [
  { codigo: "1", nombre: "Ambulatorio" },
  { codigo: "2", nombre: "Hospitalario" },
  { codigo: "3", nombre: "Urgencias" },
];

const tiposDiagnostico = [
  { codigo: "01", nombre: "Impresion diagnostica" },
  { codigo: "02", nombre: "Confirmado nuevo" },
  { codigo: "03", nombre: "Confirmado repetido" },
];

const paises = [
  { codigo: "COL", nombre: "Colombia", codigo2: "CO" },
  { codigo: "VEN", nombre: "Venezuela", codigo2: "VE" },
  { codigo: "ECU", nombre: "Ecuador", codigo2: "EC" },
  { codigo: "PER", nombre: "Peru", codigo2: "PE" },
  { codigo: "BRA", nombre: "Brasil", codigo2: "BR" },
  { codigo: "PAN", nombre: "Panama", codigo2: "PA" },
  { codigo: "CRI", nombre: "Costa Rica", codigo2: "CR" },
  { codigo: "MEX", nombre: "Mexico", codigo2: "MX" },
  { codigo: "CHL", nombre: "Chile", codigo2: "CL" },
  { codigo: "ARG", nombre: "Argentina", codigo2: "AR" },
  { codigo: "BOL", nombre: "Bolivia", codigo2: "BO" },
  { codigo: "URY", nombre: "Uruguay", codigo2: "UY" },
  { codigo: "PRY", nombre: "Paraguay", codigo2: "PY" },
  { codigo: "CUB", nombre: "Cuba", codigo2: "CU" },
  { codigo: "DOM", nombre: "Republica Dominicana", codigo2: "DO" },
  { codigo: "HTI", nombre: "Haiti", codigo2: "HT" },
  { codigo: "GTM", nombre: "Guatemala", codigo2: "GT" },
  { codigo: "HND", nombre: "Honduras", codigo2: "HN" },
  { codigo: "SLV", nombre: "El Salvador", codigo2: "SV" },
  { codigo: "NIC", nombre: "Nicaragua", codigo2: "NI" },
  { codigo: "USA", nombre: "Estados Unidos", codigo2: "US" },
  { codigo: "CAN", nombre: "Canada", codigo2: "CA" },
  { codigo: "ESP", nombre: "Espana", codigo2: "ES" },
  { codigo: "GBR", nombre: "Reino Unido", codigo2: "GB" },
  { codigo: "FRA", nombre: "Francia", codigo2: "FR" },
  { codigo: "DEU", nombre: "Alemania", codigo2: "DE" },
  { codigo: "ITA", nombre: "Italia", codigo2: "IT" },
];

// ============================================================
// MAIN
// ============================================================
async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set. Pass it as env variable or set in .env");
    process.exit(1);
  }

  const client = postgres(connectionString, { ssl: "require" });
  const db = drizzle(client);

  try {
    console.log("═══════════════════════════════════════════════");
    console.log("  RIPS SaaS - Seed de Datos de Referencia");
    console.log("═══════════════════════════════════════════════\n");

    // 1. Small catalogs
    console.log("── Catálogos pequeños ──");
    await insertBatch(db, refTiposDocumento, tiposDocumento, "Tipos de documento");
    await insertBatch(db, refSexos, sexos, "Sexos");
    await insertBatch(db, refTiposUsuario, tiposUsuario, "Tipos de usuario");
    await insertBatch(db, refModalidadesAtencion, modalidadesAtencion, "Modalidades de atención");
    await insertBatch(db, refGruposServicio, gruposServicio, "Grupos de servicio");
    await insertBatch(db, refFinalidadesTecnologia, finalidadesTecnologia, "Finalidades de tecnología");
    await insertBatch(db, refCausasAtencion, causasAtencion, "Causas de atención");
    await insertBatch(db, refViasIngreso, viasIngreso, "Vías de ingreso");
    await insertBatch(db, refConceptosRecaudo, conceptosRecaudo, "Conceptos de recaudo");
    await insertBatch(db, refAmbitosProcedimiento, ambitosProcedimiento, "Ámbitos de procedimiento");
    await insertBatch(db, refTiposDiagnostico, tiposDiagnostico, "Tipos de diagnóstico");
    await insertBatch(db, refPaises, paises, "Países");

    // 2. Departamentos DANE
    console.log("\n── Departamentos DANE ──");
    await insertBatch(db, refDepartamentosDane, departamentos, "Departamentos");

    // 3. Municipios DANE
    console.log("\n── Municipios DANE ──");
    try {
      const { municipios } = await import("./data/municipios-dane");
      const muniData = municipios.map((m: { codigo: string; nombre: string; codigo_departamento: string }) => ({
        codigo: m.codigo,
        nombre: m.nombre,
        codigoDepartamento: m.codigo_departamento,
      }));
      await insertBatch(db, refMunicipiosDane, muniData, "Municipios DANE");
    } catch {
      console.log("  ⚠ Municipios no disponibles. Ejecute: npx tsx scripts/fetch-divipola.ts");
    }

    // 4. CUPS
    console.log("\n── CUPS (Procedimientos) ──");
    try {
      const { cupsData } = await import("../src/db/seed/cups-data");
      await insertBatch(db, refCups, cupsData, "Códigos CUPS");
    } catch {
      console.log("  ⚠ CUPS no disponibles.");
    }

    // 5. CIE-10
    console.log("\n── CIE-10 (Diagnósticos) ──");
    try {
      const { cie10Data } = await import("../src/db/seed/cie10-data");
      await insertBatch(db, refCie10, cie10Data, "Códigos CIE-10");
    } catch {
      console.log("  ⚠ CIE-10 no disponibles. Se pueden importar después.");
    }

    console.log("\n═══════════════════════════════════════════════");
    console.log("  ✅ Seed completado exitosamente");
    console.log("═══════════════════════════════════════════════\n");
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
