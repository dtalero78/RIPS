/**
 * CUPS - Clasificación Única de Procedimientos en Salud (Colombia)
 *
 * Base normativa:
 *   - Resolución 5851 de 2018 (MinSalud) - Actualización CUPS
 *   - Resolución 2775 de 2024 (MinSalud) - Última actualización
 *   - Anexo técnico Resolución 2275 de 2023 (RIPS)
 *
 * IMPORTANTE: Este archivo contiene los códigos CUPS más utilizados en
 * la prestación de servicios de salud para reportes RIPS. No es el
 * catálogo completo (que contiene ~6,000+ códigos). Para el catálogo
 * completo, descargar desde:
 *   - https://www.sispro.gov.co (sección CUPS)
 *   - https://www.datos.gov.co (buscar "CUPS")
 *   - https://www.minsalud.gov.co/sites/rid/Paginas/results-702702.aspx
 *
 * Estructura del código CUPS:
 *   - 2 dígitos: Grupo (capítulo)
 *   - 4 dígitos: Subgrupo / categoría
 *   - 6 dígitos: Procedimiento específico
 *
 * Total de códigos en este archivo: ~500+ códigos más frecuentes
 */

export interface CupsEntry {
  codigo: string;
  nombre: string;
}

// =============================================================================
// SECCIÓN 89: CONSULTAS, INTERCONSULTAS Y VALORACIONES
// =============================================================================
const consultas: CupsEntry[] = [
  // --- Consultas de medicina general y familiar ---
  { codigo: "890101", nombre: "CONSULTA DE PRIMERA VEZ POR MEDICINA GENERAL" },
  { codigo: "890102", nombre: "CONSULTA DE PRIMERA VEZ POR MEDICINA FAMILIAR" },
  { codigo: "890201", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR MEDICINA GENERAL" },
  { codigo: "890202", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR MEDICINA FAMILIAR" },

  // --- Consultas de primera vez por especialista ---
  { codigo: "890203", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN ANESTESIOLOGÍA" },
  { codigo: "890204", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CARDIOLOGÍA" },
  { codigo: "890205", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA CARDIOVASCULAR" },
  { codigo: "890206", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA GENERAL" },
  { codigo: "890207", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA PEDIÁTRICA" },
  { codigo: "890208", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA PLÁSTICA Y ESTÉTICA" },
  { codigo: "890209", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN DERMATOLOGÍA" },
  { codigo: "890210", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN ENDOCRINOLOGÍA" },
  { codigo: "890211", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN GASTROENTEROLOGÍA" },
  { codigo: "890212", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN GENÉTICA" },
  { codigo: "890213", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN GERIATRÍA" },
  { codigo: "890214", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN GINECOLOGÍA Y OBSTETRICIA" },
  { codigo: "890215", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN HEMATOLOGÍA" },
  { codigo: "890216", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN INFECTOLOGÍA" },
  { codigo: "890217", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN MEDICINA FÍSICA Y REHABILITACIÓN" },
  { codigo: "890218", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN MEDICINA INTERNA" },
  { codigo: "890219", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN NEFROLOGÍA" },
  { codigo: "890220", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN NEUMOLOGÍA" },
  { codigo: "890221", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN NEUROCIRUGÍA" },
  { codigo: "890222", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN NEUROLOGÍA" },
  { codigo: "890223", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN NUTRICIÓN Y DIETÉTICA" },
  { codigo: "890224", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN OFTALMOLOGÍA" },
  { codigo: "890225", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN ONCOLOGÍA CLÍNICA" },
  { codigo: "890226", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN ORTOPEDIA Y TRAUMATOLOGÍA" },
  { codigo: "890227", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN OTORRINOLARINGOLOGÍA" },
  { codigo: "890228", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN PATOLOGÍA" },
  { codigo: "890229", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN PEDIATRÍA" },
  { codigo: "890230", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN PSIQUIATRÍA" },
  { codigo: "890231", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN REUMATOLOGÍA" },
  { codigo: "890232", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN TOXICOLOGÍA" },
  { codigo: "890233", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN UROLOGÍA" },
  { codigo: "890234", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN COLOPROCTOLOGÍA" },
  { codigo: "890235", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN MEDICINA DEL DOLOR Y CUIDADOS PALIATIVOS" },
  { codigo: "890236", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN MEDICINA NUCLEAR" },
  { codigo: "890237", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN NEONATOLOGÍA" },
  { codigo: "890238", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA DE TÓRAX" },
  { codigo: "890239", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN MEDICINA DEL TRABAJO" },
  { codigo: "890240", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA DE CABEZA Y CUELLO" },
  { codigo: "890241", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA DE MANO" },
  { codigo: "890242", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA VASCULAR" },
  { codigo: "890243", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN MEDICINA DEPORTIVA" },

  // --- Consultas de control por especialista ---
  { codigo: "890301", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ANESTESIOLOGÍA" },
  { codigo: "890302", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CARDIOLOGÍA" },
  { codigo: "890303", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA CARDIOVASCULAR" },
  { codigo: "890304", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA GENERAL" },
  { codigo: "890305", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA PEDIÁTRICA" },
  { codigo: "890306", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA PLÁSTICA Y ESTÉTICA" },
  { codigo: "890307", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN DERMATOLOGÍA" },
  { codigo: "890308", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ENDOCRINOLOGÍA" },
  { codigo: "890309", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN GASTROENTEROLOGÍA" },
  { codigo: "890310", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN GENÉTICA" },
  { codigo: "890311", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN GERIATRÍA" },
  { codigo: "890312", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN GINECOLOGÍA Y OBSTETRICIA" },
  { codigo: "890313", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN HEMATOLOGÍA" },
  { codigo: "890314", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN INFECTOLOGÍA" },
  { codigo: "890315", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN MEDICINA FÍSICA Y REHABILITACIÓN" },
  { codigo: "890316", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN MEDICINA INTERNA" },
  { codigo: "890317", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN NEFROLOGÍA" },
  { codigo: "890318", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN NEUMOLOGÍA" },
  { codigo: "890319", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN NEUROCIRUGÍA" },
  { codigo: "890320", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN NEUROLOGÍA" },
  { codigo: "890321", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN NUTRICIÓN Y DIETÉTICA" },
  { codigo: "890322", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN OFTALMOLOGÍA" },
  { codigo: "890323", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ONCOLOGÍA CLÍNICA" },
  { codigo: "890324", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ORTOPEDIA Y TRAUMATOLOGÍA" },
  { codigo: "890325", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN OTORRINOLARINGOLOGÍA" },
  { codigo: "890326", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN PATOLOGÍA" },
  { codigo: "890327", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN PEDIATRÍA" },
  { codigo: "890328", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN PSIQUIATRÍA" },
  { codigo: "890329", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN REUMATOLOGÍA" },
  { codigo: "890330", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN TOXICOLOGÍA" },
  { codigo: "890331", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN UROLOGÍA" },
  { codigo: "890332", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN COLOPROCTOLOGÍA" },
  { codigo: "890333", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN MEDICINA DEL DOLOR Y CUIDADOS PALIATIVOS" },
  { codigo: "890334", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN MEDICINA NUCLEAR" },
  { codigo: "890335", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN NEONATOLOGÍA" },
  { codigo: "890336", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA DE TÓRAX" },
  { codigo: "890337", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN MEDICINA DEL TRABAJO" },
  { codigo: "890338", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA DE CABEZA Y CUELLO" },
  { codigo: "890339", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA DE MANO" },
  { codigo: "890340", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA VASCULAR" },
  { codigo: "890341", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN MEDICINA DEPORTIVA" },

  // --- Consultas por otros profesionales de salud ---
  { codigo: "890401", nombre: "CONSULTA DE PRIMERA VEZ POR ENFERMERÍA" },
  { codigo: "890402", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ENFERMERÍA" },
  { codigo: "890403", nombre: "CONSULTA DE PRIMERA VEZ POR NUTRICIÓN Y DIETÉTICA" },
  { codigo: "890404", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR NUTRICIÓN Y DIETÉTICA" },
  { codigo: "890405", nombre: "CONSULTA DE PRIMERA VEZ POR ODONTOLOGÍA GENERAL" },
  { codigo: "890406", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ODONTOLOGÍA GENERAL" },
  { codigo: "890407", nombre: "CONSULTA DE PRIMERA VEZ POR OPTOMETRÍA" },
  { codigo: "890408", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR OPTOMETRÍA" },
  { codigo: "890409", nombre: "CONSULTA DE PRIMERA VEZ POR PSICOLOGÍA" },
  { codigo: "890410", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR PSICOLOGÍA" },
  { codigo: "890411", nombre: "CONSULTA DE PRIMERA VEZ POR TERAPIA OCUPACIONAL" },
  { codigo: "890412", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR TERAPIA OCUPACIONAL" },
  { codigo: "890413", nombre: "CONSULTA DE PRIMERA VEZ POR TERAPIA RESPIRATORIA" },
  { codigo: "890414", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR TERAPIA RESPIRATORIA" },
  { codigo: "890415", nombre: "CONSULTA DE PRIMERA VEZ POR FISIOTERAPIA" },
  { codigo: "890416", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR FISIOTERAPIA" },
  { codigo: "890417", nombre: "CONSULTA DE PRIMERA VEZ POR FONOAUDIOLOGÍA Y/O TERAPIA DEL LENGUAJE" },
  { codigo: "890418", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR FONOAUDIOLOGÍA Y/O TERAPIA DEL LENGUAJE" },
  { codigo: "890419", nombre: "CONSULTA DE PRIMERA VEZ POR TRABAJO SOCIAL" },
  { codigo: "890420", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR TRABAJO SOCIAL" },

  // --- Consultas de odontología especializada ---
  { codigo: "890501", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN ENDODONCIA" },
  { codigo: "890502", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ENDODONCIA" },
  { codigo: "890503", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN ORTODONCIA" },
  { codigo: "890504", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ORTODONCIA" },
  { codigo: "890505", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN PERIODONCIA" },
  { codigo: "890506", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN PERIODONCIA" },
  { codigo: "890507", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN CIRUGÍA ORAL Y MAXILOFACIAL" },
  { codigo: "890508", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN CIRUGÍA ORAL Y MAXILOFACIAL" },
  { codigo: "890509", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN REHABILITACIÓN ORAL" },
  { codigo: "890510", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN REHABILITACIÓN ORAL" },
  { codigo: "890511", nombre: "CONSULTA DE PRIMERA VEZ POR ESPECIALISTA EN ODONTOPEDIATRÍA" },
  { codigo: "890512", nombre: "CONSULTA DE CONTROL O DE SEGUIMIENTO POR ESPECIALISTA EN ODONTOPEDIATRÍA" },

  // --- Interconsultas ---
  { codigo: "890601", nombre: "INTERCONSULTA POR MEDICINA GENERAL" },
  { codigo: "890602", nombre: "INTERCONSULTA POR MEDICINA FAMILIAR" },
  { codigo: "890603", nombre: "INTERCONSULTA POR MEDICINA INTERNA" },
  { codigo: "890604", nombre: "INTERCONSULTA POR CARDIOLOGÍA" },
  { codigo: "890605", nombre: "INTERCONSULTA POR CIRUGÍA GENERAL" },
  { codigo: "890606", nombre: "INTERCONSULTA POR GINECOLOGÍA Y OBSTETRICIA" },
  { codigo: "890607", nombre: "INTERCONSULTA POR ORTOPEDIA Y TRAUMATOLOGÍA" },
  { codigo: "890608", nombre: "INTERCONSULTA POR PEDIATRÍA" },
  { codigo: "890609", nombre: "INTERCONSULTA POR NEUROLOGÍA" },
  { codigo: "890610", nombre: "INTERCONSULTA POR PSIQUIATRÍA" },
  { codigo: "890611", nombre: "INTERCONSULTA POR UROLOGÍA" },
  { codigo: "890612", nombre: "INTERCONSULTA POR ANESTESIOLOGÍA" },

  // --- Consulta de urgencias ---
  { codigo: "890701", nombre: "CONSULTA DE URGENCIAS POR MEDICINA GENERAL" },
  { codigo: "890702", nombre: "CONSULTA DE URGENCIAS POR MEDICINA ESPECIALIZADA" },
  { codigo: "890703", nombre: "CONSULTA DE URGENCIAS POR ODONTOLOGÍA GENERAL" },
  { codigo: "890704", nombre: "CONSULTA DE URGENCIAS POR PEDIATRÍA" },
];

// =============================================================================
// SECCIÓN 88: PROCEDIMIENTOS DE LABORATORIO CLÍNICO
// =============================================================================
const laboratorio: CupsEntry[] = [
  // --- Hematología ---
  { codigo: "902210", nombre: "HEMOGRAMA IV (HEMOGLOBINA, HEMATOCRITO, RECUENTO DE ERITROCITOS, ÍNDICES ERITROCITARIOS, LEUCOGRAMA, RECUENTO DE PLAQUETAS, ÍNDICES PLAQUETARIOS Y MORFOLOGÍA ELECTRÓNICA E HISTOGRAMA)" },
  { codigo: "902211", nombre: "HEMOGRAMA III (HEMOGLOBINA, HEMATOCRITO, RECUENTO DE ERITROCITOS, ÍNDICES ERITROCITARIOS, LEUCOGRAMA, RECUENTO DE PLAQUETAS E ÍNDICES PLAQUETARIOS)" },
  { codigo: "902214", nombre: "HEMOGRAMA I (HEMOGLOBINA, HEMATOCRITO Y LEUCOGRAMA)" },
  { codigo: "902213", nombre: "HEMOGRAMA II (HEMOGLOBINA, HEMATOCRITO, RECUENTO DE ERITROCITOS, ÍNDICES ERITROCITARIOS Y LEUCOGRAMA)" },
  { codigo: "902004", nombre: "VELOCIDAD DE SEDIMENTACIÓN GLOBULAR [VSG]" },
  { codigo: "902016", nombre: "RECUENTO DE RETICULOCITOS (MÉTODO MANUAL O SEMIAUTOMÁTICO)" },
  { codigo: "902005", nombre: "EXTENDIDO DE SANGRE PERIFÉRICA, ESTUDIO DE MORFOLOGÍA" },

  // --- Coagulación ---
  { codigo: "902049", nombre: "TIEMPO DE PROTROMBINA [PT]" },
  { codigo: "902048", nombre: "TIEMPO DE TROMBOPLASTINA PARCIAL [PTT]" },
  { codigo: "902050", nombre: "TIEMPO DE TROMBINA [TT]" },
  { codigo: "902046", nombre: "INR (INTERNATIONAL NORMALIZED RATIO)" },

  // --- Química sanguínea ---
  { codigo: "903818", nombre: "GLUCOSA EN SUERO U OTRO FLUIDO DIFERENTE A ORINA" },
  { codigo: "903841", nombre: "HEMOGLOBINA GLICOSILADA" },
  { codigo: "903856", nombre: "PERFIL LIPÍDICO (COLESTEROL TOTAL, TRIGLICÉRIDOS, HDL, LDL, VLDL)" },
  { codigo: "903815", nombre: "COLESTEROL TOTAL" },
  { codigo: "903868", nombre: "TRIGLICÉRIDOS" },
  { codigo: "903816", nombre: "COLESTEROL DE ALTA DENSIDAD [HDL]" },
  { codigo: "903817", nombre: "COLESTEROL DE BAJA DENSIDAD [LDL] DIRECTO" },
  { codigo: "903825", nombre: "CREATININA EN SUERO U OTROS FLUIDOS" },
  { codigo: "903895", nombre: "NITRÓGENO UREICO [BUN]" },
  { codigo: "903866", nombre: "ÁCIDO ÚRICO EN SUERO" },
  { codigo: "903859", nombre: "PROTEÍNAS TOTALES EN SUERO" },
  { codigo: "903801", nombre: "ALBÚMINA EN SUERO" },

  // --- Función hepática ---
  { codigo: "903870", nombre: "TRANSAMINASA GLUTÁMICO OXALACÉTICA [TGO] / ASPARTATO AMINO TRANSFERASA [AST]" },
  { codigo: "903871", nombre: "TRANSAMINASA GLUTÁMICO PIRÚVICA [TGP] / ALANINA AMINO TRANSFERASA [ALT]" },
  { codigo: "903807", nombre: "BILIRRUBINA TOTAL" },
  { codigo: "903808", nombre: "BILIRRUBINA DIRECTA" },
  { codigo: "903810", nombre: "BILIRRUBINA INDIRECTA" },
  { codigo: "903835", nombre: "FOSFATASA ALCALINA" },
  { codigo: "903837", nombre: "GAMMA GLUTAMIL TRANSFERASA [GGT]" },

  // --- Electrolitos ---
  { codigo: "903862", nombre: "SODIO EN SUERO U OTROS FLUIDOS" },
  { codigo: "903855", nombre: "POTASIO EN SUERO U OTROS FLUIDOS" },
  { codigo: "903813", nombre: "CLORO EN SUERO U OTROS FLUIDOS" },
  { codigo: "903811", nombre: "CALCIO TOTAL" },
  { codigo: "903812", nombre: "CALCIO IONIZADO" },
  { codigo: "903849", nombre: "MAGNESIO EN SUERO U OTROS FLUIDOS" },
  { codigo: "903836", nombre: "FÓSFORO EN SUERO U OTROS FLUIDOS" },

  // --- Función tiroidea ---
  { codigo: "904918", nombre: "HORMONA ESTIMULANTE DEL TIROIDES [TSH]" },
  { codigo: "904920", nombre: "TIROXINA LIBRE [T4 LIBRE]" },
  { codigo: "904919", nombre: "TIROXINA TOTAL [T4]" },
  { codigo: "904921", nombre: "TRIYODOTIRONINA LIBRE [T3 LIBRE]" },
  { codigo: "904922", nombre: "TRIYODOTIRONINA TOTAL [T3]" },

  // --- Marcadores tumorales ---
  { codigo: "906913", nombre: "ANTÍGENO PROSTÁTICO ESPECÍFICO [PSA] TOTAL" },
  { codigo: "906914", nombre: "ANTÍGENO PROSTÁTICO ESPECÍFICO [PSA] LIBRE" },
  { codigo: "906904", nombre: "ANTÍGENO CARCINOEMBRIONARIO [ACE-CEA]" },
  { codigo: "906902", nombre: "ALFA FETO PROTEÍNA [AFP]" },
  { codigo: "906910", nombre: "ANTÍGENO CA 125" },
  { codigo: "906911", nombre: "ANTÍGENO CA 19-9" },
  { codigo: "906912", nombre: "ANTÍGENO CA 15-3" },

  // --- Uroanálisis ---
  { codigo: "907106", nombre: "UROANÁLISIS (INCLUYE SEDIMENTO Y DENSIDAD)" },
  { codigo: "907107", nombre: "UROCULTIVO (CULTIVO DE ORINA) CON RECUENTO DE COLONIAS Y ANTIBIOGRAMA" },

  // --- Función renal ---
  { codigo: "903826", nombre: "CREATININA EN ORINA DE 24 HORAS" },
  { codigo: "903857", nombre: "PROTEÍNAS EN ORINA DE 24 HORAS" },
  { codigo: "903851", nombre: "MICROALBUMINURIA" },
  { codigo: "903829", nombre: "DEPURACIÓN DE CREATININA (INCLUYE CREATININA EN SUERO Y ORINA)" },

  // --- Serología ---
  { codigo: "906249", nombre: "SEROLOGÍA PARA SÍFILIS [VDRL] EN SUERO" },
  { codigo: "906226", nombre: "PRUEBA TREPONÉMICA PARA SÍFILIS FTA-ABS EN SUERO" },
  { codigo: "906248", nombre: "SEROLOGÍA PARA HEPATITIS B [ANTÍGENO DE SUPERFICIE HBsAg]" },
  { codigo: "906241", nombre: "ANTICUERPOS CONTRA VIRUS DE HEPATITIS C [ANTI-VHC]" },
  { codigo: "906216", nombre: "ANTICUERPOS CONTRA VIRUS DE INMUNODEFICIENCIA HUMANA [VIH 1 Y 2]" },
  { codigo: "906299", nombre: "PRUEBA RÁPIDA PARA VIH" },

  // --- Bacteriología ---
  { codigo: "901302", nombre: "HEMOCULTIVO (POR CADA MUESTRA)" },
  { codigo: "901309", nombre: "CULTIVO GENÉRICO" },
  { codigo: "901305", nombre: "COPROCULTIVO" },
  { codigo: "901304", nombre: "CULTIVO DE SECRECIÓN OROFARÍNGEA" },

  // --- Coprológico ---
  { codigo: "907001", nombre: "COPROLÓGICO DIRECTO" },
  { codigo: "907002", nombre: "COPROSCÓPICO" },

  // --- Gases arteriales ---
  { codigo: "903839", nombre: "GASES ARTERIALES (pH, pCO2, pO2, HCO3, EXCESO DE BASE)" },

  // --- Prueba de embarazo ---
  { codigo: "904504", nombre: "GONADOTROFINA CORIÓNICA SUBUNIDAD BETA CUALITATIVA [PRUEBA DE EMBARAZO EN SUERO]" },
  { codigo: "904505", nombre: "GONADOTROFINA CORIÓNICA SUBUNIDAD BETA CUANTITATIVA" },
  { codigo: "907108", nombre: "PRUEBA DE EMBARAZO EN ORINA" },
];

// =============================================================================
// SECCIÓN 87-88: IMÁGENES DIAGNÓSTICAS
// =============================================================================
const imagenes: CupsEntry[] = [
  // --- Radiología convencional ---
  { codigo: "871010", nombre: "RADIOGRAFÍA DE TÓRAX (PA O AP)" },
  { codigo: "871011", nombre: "RADIOGRAFÍA DE TÓRAX (PA Y LATERAL)" },
  { codigo: "871020", nombre: "RADIOGRAFÍA DE ABDOMEN SIMPLE (DE PIE O EN DECÚBITO)" },
  { codigo: "871030", nombre: "RADIOGRAFÍA DE COLUMNA CERVICAL (AP Y LATERAL)" },
  { codigo: "871031", nombre: "RADIOGRAFÍA DE COLUMNA DORSAL O TORÁCICA (AP Y LATERAL)" },
  { codigo: "871032", nombre: "RADIOGRAFÍA DE COLUMNA LUMBOSACRA (AP Y LATERAL)" },
  { codigo: "871033", nombre: "RADIOGRAFÍA DE PELVIS (AP)" },
  { codigo: "871040", nombre: "RADIOGRAFÍA DE RODILLA (AP Y LATERAL)" },
  { codigo: "871041", nombre: "RADIOGRAFÍA DE TOBILLO (AP Y LATERAL)" },
  { codigo: "871042", nombre: "RADIOGRAFÍA DE PIE (AP Y LATERAL)" },
  { codigo: "871043", nombre: "RADIOGRAFÍA DE MANO (AP Y OBLICUA)" },
  { codigo: "871044", nombre: "RADIOGRAFÍA DE MUÑECA (AP Y LATERAL)" },
  { codigo: "871045", nombre: "RADIOGRAFÍA DE CODO (AP Y LATERAL)" },
  { codigo: "871046", nombre: "RADIOGRAFÍA DE HOMBRO (AP)" },
  { codigo: "871047", nombre: "RADIOGRAFÍA DE FÉMUR (AP Y LATERAL)" },
  { codigo: "871048", nombre: "RADIOGRAFÍA DE TIBIA Y PERONÉ (AP Y LATERAL)" },
  { codigo: "871049", nombre: "RADIOGRAFÍA DE HÚMERO (AP Y LATERAL)" },
  { codigo: "871050", nombre: "RADIOGRAFÍA DE ANTEBRAZO (AP Y LATERAL)" },
  { codigo: "871060", nombre: "RADIOGRAFÍA DE CRÁNEO SIMPLE (AP Y LATERAL)" },
  { codigo: "871061", nombre: "RADIOGRAFÍA DE SENOS PARANASALES" },
  { codigo: "871062", nombre: "RADIOGRAFÍA DE CAVUM FARÍNGEO (LATERAL)" },
  { codigo: "871063", nombre: "RADIOGRAFÍA DE HUESOS NASALES (LATERAL)" },
  { codigo: "871070", nombre: "RADIOGRAFÍA DE CADERA (AP)" },
  { codigo: "873405", nombre: "RADIOGRAFÍA DE EDAD ÓSEA (CARPO)" },

  // --- Ecografía (Ultrasonido) ---
  { codigo: "881301", nombre: "ECOGRAFÍA DE ABDOMEN TOTAL (HÍGADO, VESÍCULA, VÍAS BILIARES, PÁNCREAS, RIÑONES, BAZO, GRANDES VASOS, PELVIS Y FLANCOS)" },
  { codigo: "881302", nombre: "ECOGRAFÍA DE ABDOMEN SUPERIOR (HÍGADO, VESÍCULA, VÍAS BILIARES, PÁNCREAS)" },
  { codigo: "881303", nombre: "ECOGRAFÍA DE HÍGADO Y VÍAS BILIARES" },
  { codigo: "881305", nombre: "ECOGRAFÍA PÉLVICA TRANSABDOMINAL" },
  { codigo: "881306", nombre: "ECOGRAFÍA PÉLVICA TRANSVAGINAL" },
  { codigo: "881310", nombre: "ECOGRAFÍA DE TIROIDES" },
  { codigo: "881311", nombre: "ECOGRAFÍA DE MAMA BILATERAL" },
  { codigo: "881312", nombre: "ECOGRAFÍA DE MAMA UNILATERAL" },
  { codigo: "881315", nombre: "ECOGRAFÍA RENAL BILATERAL" },
  { codigo: "881316", nombre: "ECOGRAFÍA DE VÍAS URINARIAS (RIÑONES, VEJIGA Y PRÓSTATA TRANSABDOMINAL)" },
  { codigo: "881318", nombre: "ECOGRAFÍA DE PRÓSTATA TRANSRECTAL" },
  { codigo: "881320", nombre: "ECOGRAFÍA OBSTÉTRICA (PRIMER TRIMESTRE)" },
  { codigo: "881321", nombre: "ECOGRAFÍA OBSTÉTRICA (SEGUNDO TRIMESTRE)" },
  { codigo: "881322", nombre: "ECOGRAFÍA OBSTÉTRICA (TERCER TRIMESTRE)" },
  { codigo: "881325", nombre: "ECOGRAFÍA OBSTÉTRICA CON PERFIL BIOFÍSICO" },
  { codigo: "881330", nombre: "ECOGRAFÍA DE TEJIDOS BLANDOS" },
  { codigo: "881331", nombre: "ECOGRAFÍA ARTICULAR (POR CADA ARTICULACIÓN)" },
  { codigo: "881335", nombre: "ECOGRAFÍA TESTICULAR BILATERAL" },
  { codigo: "881340", nombre: "ECOGRAFÍA TRANSFONTANELAR" },
  { codigo: "881350", nombre: "ECOGRAFÍA DOPPLER DE VASOS DEL CUELLO (CARÓTIDAS Y VERTEBRALES)" },
  { codigo: "881351", nombre: "ECOGRAFÍA DOPPLER DE MIEMBROS INFERIORES VENOSO" },
  { codigo: "881352", nombre: "ECOGRAFÍA DOPPLER DE MIEMBROS INFERIORES ARTERIAL" },
  { codigo: "881353", nombre: "ECOGRAFÍA DOPPLER DE MIEMBROS SUPERIORES VENOSO" },
  { codigo: "881354", nombre: "ECOGRAFÍA DOPPLER DE MIEMBROS SUPERIORES ARTERIAL" },
  { codigo: "881355", nombre: "ECOGRAFÍA DOPPLER DE AORTA Y RAMAS" },
  { codigo: "881356", nombre: "ECOGRAFÍA DOPPLER OBSTÉTRICA (FETOPLACENTARIO)" },

  // --- Tomografía computarizada (TAC/TC) ---
  { codigo: "879001", nombre: "TOMOGRAFÍA COMPUTARIZADA DE CRÁNEO SIMPLE" },
  { codigo: "879002", nombre: "TOMOGRAFÍA COMPUTARIZADA DE CRÁNEO CONTRASTADA" },
  { codigo: "879003", nombre: "TOMOGRAFÍA COMPUTARIZADA DE CRÁNEO SIMPLE Y CONTRASTADA" },
  { codigo: "879010", nombre: "TOMOGRAFÍA COMPUTARIZADA DE TÓRAX SIMPLE" },
  { codigo: "879011", nombre: "TOMOGRAFÍA COMPUTARIZADA DE TÓRAX CONTRASTADA" },
  { codigo: "879012", nombre: "TOMOGRAFÍA COMPUTARIZADA DE TÓRAX SIMPLE Y CONTRASTADA" },
  { codigo: "879020", nombre: "TOMOGRAFÍA COMPUTARIZADA DE ABDOMEN SIMPLE" },
  { codigo: "879021", nombre: "TOMOGRAFÍA COMPUTARIZADA DE ABDOMEN CONTRASTADA" },
  { codigo: "879022", nombre: "TOMOGRAFÍA COMPUTARIZADA DE ABDOMEN SIMPLE Y CONTRASTADA" },
  { codigo: "879030", nombre: "TOMOGRAFÍA COMPUTARIZADA DE PELVIS SIMPLE" },
  { codigo: "879031", nombre: "TOMOGRAFÍA COMPUTARIZADA DE PELVIS CONTRASTADA" },
  { codigo: "879040", nombre: "TOMOGRAFÍA COMPUTARIZADA DE COLUMNA CERVICAL SIMPLE" },
  { codigo: "879041", nombre: "TOMOGRAFÍA COMPUTARIZADA DE COLUMNA DORSAL SIMPLE" },
  { codigo: "879042", nombre: "TOMOGRAFÍA COMPUTARIZADA DE COLUMNA LUMBOSACRA SIMPLE" },
  { codigo: "879050", nombre: "TOMOGRAFÍA COMPUTARIZADA DE SENOS PARANASALES SIMPLE" },
  { codigo: "879051", nombre: "TOMOGRAFÍA COMPUTARIZADA DE OÍDOS SIMPLE" },
  { codigo: "879060", nombre: "TOMOGRAFÍA COMPUTARIZADA DE ABDOMEN Y PELVIS SIMPLE" },
  { codigo: "879061", nombre: "TOMOGRAFÍA COMPUTARIZADA DE ABDOMEN Y PELVIS CONTRASTADA" },
  { codigo: "879062", nombre: "TOMOGRAFÍA COMPUTARIZADA DE ABDOMEN Y PELVIS SIMPLE Y CONTRASTADA" },

  // --- Resonancia magnética (RM) ---
  { codigo: "883101", nombre: "RESONANCIA MAGNÉTICA DE CEREBRO SIMPLE" },
  { codigo: "883102", nombre: "RESONANCIA MAGNÉTICA DE CEREBRO CONTRASTADA" },
  { codigo: "883103", nombre: "RESONANCIA MAGNÉTICA DE CEREBRO SIMPLE Y CONTRASTADA" },
  { codigo: "883110", nombre: "RESONANCIA MAGNÉTICA DE COLUMNA CERVICAL SIMPLE" },
  { codigo: "883111", nombre: "RESONANCIA MAGNÉTICA DE COLUMNA DORSAL SIMPLE" },
  { codigo: "883112", nombre: "RESONANCIA MAGNÉTICA DE COLUMNA LUMBOSACRA SIMPLE" },
  { codigo: "883120", nombre: "RESONANCIA MAGNÉTICA DE RODILLA" },
  { codigo: "883121", nombre: "RESONANCIA MAGNÉTICA DE HOMBRO" },
  { codigo: "883122", nombre: "RESONANCIA MAGNÉTICA DE CADERA" },
  { codigo: "883130", nombre: "RESONANCIA MAGNÉTICA DE ABDOMEN SIMPLE" },
  { codigo: "883131", nombre: "RESONANCIA MAGNÉTICA DE ABDOMEN CONTRASTADA" },
  { codigo: "883140", nombre: "RESONANCIA MAGNÉTICA DE PELVIS SIMPLE" },
  { codigo: "883141", nombre: "RESONANCIA MAGNÉTICA DE PELVIS CONTRASTADA" },

  // --- Mamografía ---
  { codigo: "876001", nombre: "MAMOGRAFÍA BILATERAL" },
  { codigo: "876002", nombre: "MAMOGRAFÍA UNILATERAL" },

  // --- Densitometría ---
  { codigo: "886001", nombre: "DENSITOMETRÍA ÓSEA CENTRAL (COLUMNA Y CADERA)" },
  { codigo: "886002", nombre: "DENSITOMETRÍA ÓSEA PERIFÉRICA" },
];

// =============================================================================
// SECCIÓN: PROCEDIMIENTOS CARDIOVASCULARES Y DIAGNÓSTICOS
// =============================================================================
const cardiovascular: CupsEntry[] = [
  { codigo: "895101", nombre: "ELECTROCARDIOGRAMA DE REPOSO DE 12 DERIVACIONES" },
  { codigo: "895102", nombre: "ELECTROCARDIOGRAMA DE 12 DERIVACIONES CON TIRA DE RITMO" },
  { codigo: "895201", nombre: "PRUEBA DE ESFUERZO CONVENCIONAL" },
  { codigo: "895301", nombre: "MONITOREO ELECTROCARDIOGRÁFICO DE 24 HORAS [HOLTER]" },
  { codigo: "895401", nombre: "MONITOREO AMBULATORIO DE PRESIÓN ARTERIAL [MAPA]" },
  { codigo: "881201", nombre: "ECOCARDIOGRAMA TRANSTORÁCICO" },
  { codigo: "881202", nombre: "ECOCARDIOGRAMA TRANSESOFÁGICO" },
  { codigo: "881203", nombre: "ECOCARDIOGRAMA DOPPLER" },
];

// =============================================================================
// SECCIÓN: PROCEDIMIENTOS QUIRÚRGICOS COMUNES
// =============================================================================
const cirugia: CupsEntry[] = [
  // --- Cirugía general ---
  { codigo: "472200", nombre: "APENDICECTOMÍA (CUALQUIER MÉTODO)" },
  { codigo: "472201", nombre: "APENDICECTOMÍA POR LAPAROSCOPIA" },
  { codigo: "512300", nombre: "COLECISTECTOMÍA ABIERTA" },
  { codigo: "512301", nombre: "COLECISTECTOMÍA POR LAPAROSCOPIA" },
  { codigo: "530101", nombre: "HERNIORRAFIA INGUINAL UNILATERAL" },
  { codigo: "530102", nombre: "HERNIORRAFIA INGUINAL BILATERAL" },
  { codigo: "530201", nombre: "HERNIORRAFIA UMBILICAL" },
  { codigo: "530301", nombre: "HERNIORRAFIA VENTRAL O INCISIONAL" },
  { codigo: "442200", nombre: "HEMORROIDECTOMÍA" },

  // --- Cirugía ortopédica ---
  { codigo: "791501", nombre: "REDUCCIÓN CERRADA DE FRACTURA DE RADIO DISTAL CON FIJACIÓN" },
  { codigo: "791601", nombre: "REDUCCIÓN ABIERTA DE FRACTURA CON FIJACIÓN INTERNA" },
  { codigo: "812201", nombre: "ARTROSCOPIA DE RODILLA DIAGNÓSTICA" },
  { codigo: "812202", nombre: "ARTROSCOPIA DE RODILLA TERAPÉUTICA" },
  { codigo: "812301", nombre: "MENISCECTOMÍA POR ARTROSCOPIA" },
  { codigo: "814301", nombre: "ARTROPLASTIA TOTAL DE CADERA" },
  { codigo: "814302", nombre: "ARTROPLASTIA TOTAL DE RODILLA" },
  { codigo: "814401", nombre: "LIBERACIÓN DEL TÚNEL DEL CARPO" },
  { codigo: "793101", nombre: "OSTEOSÍNTESIS DE FÉMUR" },
  { codigo: "793201", nombre: "OSTEOSÍNTESIS DE TIBIA" },

  // --- Ginecología y obstetricia ---
  { codigo: "740100", nombre: "CESÁREA SEGMENTARIA" },
  { codigo: "740200", nombre: "CESÁREA SEGMENTARIA CON LIGADURA DE TROMPAS" },
  { codigo: "730100", nombre: "PARTO VAGINAL ESPONTÁNEO" },
  { codigo: "730200", nombre: "PARTO VAGINAL CON EPISIOTOMÍA" },
  { codigo: "730300", nombre: "PARTO VAGINAL INSTRUMENTADO (FÓRCEPS O VACUUM)" },
  { codigo: "682101", nombre: "HISTERECTOMÍA ABDOMINAL TOTAL" },
  { codigo: "682102", nombre: "HISTERECTOMÍA VAGINAL TOTAL" },
  { codigo: "682103", nombre: "HISTERECTOMÍA POR LAPAROSCOPIA" },
  { codigo: "661201", nombre: "LIGADURA DE TROMPAS DE FALOPIO (CUALQUIER TÉCNICA)" },
  { codigo: "661202", nombre: "LIGADURA DE TROMPAS POR LAPAROSCOPIA" },
  { codigo: "694001", nombre: "LEGRADO UTERINO DIAGNÓSTICO Y/O TERAPÉUTICO" },
  { codigo: "694002", nombre: "LEGRADO UTERINO POSTABORTO O POSTPARTO" },
  { codigo: "681101", nombre: "CONIZACIÓN DE CUELLO UTERINO" },
  { codigo: "681201", nombre: "BIOPSIA DE CUELLO UTERINO" },

  // --- Urología ---
  { codigo: "631101", nombre: "VASECTOMÍA" },
  { codigo: "560201", nombre: "LITOTRIPSIA EXTRACORPÓREA POR ONDAS DE CHOQUE" },
  { codigo: "601101", nombre: "PROSTATECTOMÍA TRANSURETRAL" },
  { codigo: "572101", nombre: "CISTOSCOPIA DIAGNÓSTICA" },
  { codigo: "550401", nombre: "CIRCUNCISIÓN" },
  { codigo: "553101", nombre: "ORQUIDOPEXIA UNILATERAL" },

  // --- Cirugía oftalmológica ---
  { codigo: "131501", nombre: "FACOEMULSIFICACIÓN DE CRISTALINO CON IMPLANTE DE LENTE INTRAOCULAR" },
  { codigo: "131601", nombre: "EXTRACCIÓN EXTRACAPSULAR DE CRISTALINO CON IMPLANTE DE LENTE INTRAOCULAR" },
  { codigo: "142301", nombre: "TRABECULECTOMÍA" },
  { codigo: "085201", nombre: "CORRECCIÓN DE PTERIGIO" },

  // --- Otorrinolaringología ---
  { codigo: "286201", nombre: "AMIGDALECTOMÍA CON O SIN ADENOIDECTOMÍA" },
  { codigo: "286301", nombre: "ADENOIDECTOMÍA" },
  { codigo: "213101", nombre: "SEPTOPLASTIA NASAL" },
  { codigo: "200101", nombre: "MIRINGOTOMÍA CON INSERCIÓN DE TUBOS DE VENTILACIÓN" },
  { codigo: "215201", nombre: "TURBINOPLASTIA" },
];

// =============================================================================
// SECCIÓN: PROCEDIMIENTOS DE PROMOCIÓN Y PREVENCIÓN (PyP)
// =============================================================================
const pyp: CupsEntry[] = [
  // --- Vacunación ---
  { codigo: "993502", nombre: "APLICACIÓN DE VACUNA CONTRA LA INFLUENZA" },
  { codigo: "993503", nombre: "APLICACIÓN DE VACUNA CONTRA HEPATITIS B" },
  { codigo: "993504", nombre: "APLICACIÓN DE VACUNA CONTRA LA FIEBRE AMARILLA" },
  { codigo: "993505", nombre: "APLICACIÓN DE VACUNA TRIPLE VIRAL (SRP)" },
  { codigo: "993506", nombre: "APLICACIÓN DE VACUNA CONTRA TÉTANOS" },
  { codigo: "993507", nombre: "APLICACIÓN DE VACUNA BCG" },
  { codigo: "993508", nombre: "APLICACIÓN DE VACUNA CONTRA POLIO ORAL (VOP)" },
  { codigo: "993509", nombre: "APLICACIÓN DE VACUNA DPT (DIFTERIA, TOS FERINA, TÉTANOS)" },
  { codigo: "993510", nombre: "APLICACIÓN DE VACUNA PENTAVALENTE" },
  { codigo: "993511", nombre: "APLICACIÓN DE VACUNA CONTRA NEUMOCOCO" },
  { codigo: "993512", nombre: "APLICACIÓN DE VACUNA CONTRA ROTAVIRUS" },
  { codigo: "993513", nombre: "APLICACIÓN DE VACUNA CONTRA VARICELA" },
  { codigo: "993514", nombre: "APLICACIÓN DE VACUNA CONTRA VPH" },
  { codigo: "993515", nombre: "APLICACIÓN DE VACUNA CONTRA COVID-19" },

  // --- Tamizaje y detección temprana ---
  { codigo: "990203", nombre: "CITOLOGÍA CERVICOVAGINAL" },
  { codigo: "990204", nombre: "EXAMEN DE SENO CLÍNICO" },
  { codigo: "990205", nombre: "TAMIZAJE NEONATAL (TSH NEONATAL)" },
  { codigo: "990206", nombre: "TAMIZAJE VISUAL" },
  { codigo: "990207", nombre: "TAMIZAJE AUDITIVO NEONATAL" },
  { codigo: "990208", nombre: "CONTROL DE CRECIMIENTO Y DESARROLLO" },
  { codigo: "990209", nombre: "CONTROL PRENATAL" },
  { codigo: "990210", nombre: "TAMIZAJE PARA CÁNCER DE COLON" },
  { codigo: "990211", nombre: "DETECCIÓN TEMPRANA DE ALTERACIONES DEL EMBARAZO" },
  { codigo: "990212", nombre: "DETECCIÓN TEMPRANA DE ALTERACIONES DEL ADULTO MAYOR" },
  { codigo: "990213", nombre: "DETECCIÓN TEMPRANA DE ALTERACIONES DEL JOVEN" },

  // --- Planificación familiar ---
  { codigo: "990101", nombre: "CONSULTA DE PLANIFICACIÓN FAMILIAR PRIMERA VEZ" },
  { codigo: "990102", nombre: "CONSULTA DE PLANIFICACIÓN FAMILIAR CONTROL" },
  { codigo: "990103", nombre: "INSERCIÓN DE DISPOSITIVO INTRAUTERINO [DIU]" },
  { codigo: "990104", nombre: "RETIRO DE DISPOSITIVO INTRAUTERINO [DIU]" },
  { codigo: "990105", nombre: "INSERCIÓN DE IMPLANTE SUBDÉRMICO ANTICONCEPTIVO" },
  { codigo: "990106", nombre: "RETIRO DE IMPLANTE SUBDÉRMICO ANTICONCEPTIVO" },

  // --- Salud oral preventiva ---
  { codigo: "997101", nombre: "DETARTRAJE SUPRAGINGIVAL (PROFILAXIS)" },
  { codigo: "997102", nombre: "APLICACIÓN DE FLÚOR" },
  { codigo: "997103", nombre: "APLICACIÓN DE SELLANTES DE FOTOCURADO (POR DIENTE)" },
  { codigo: "997104", nombre: "CONTROL DE PLACA BACTERIANA" },
];

// =============================================================================
// SECCIÓN: PROCEDIMIENTOS ODONTOLÓGICOS
// =============================================================================
const odontologia: CupsEntry[] = [
  { codigo: "232101", nombre: "OBTURACIÓN DENTAL CON RESINA DE FOTOCURADO (POR SUPERFICIE)" },
  { codigo: "232102", nombre: "OBTURACIÓN DENTAL CON AMALGAMA (POR SUPERFICIE)" },
  { codigo: "232201", nombre: "OBTURACIÓN DENTAL CON IONÓMERO DE VIDRIO (POR SUPERFICIE)" },
  { codigo: "233101", nombre: "ENDODONCIA UNIRADICULAR (CONDUCTO REGULAR)" },
  { codigo: "233102", nombre: "ENDODONCIA BIRADICULAR (CONDUCTOS REGULARES)" },
  { codigo: "233103", nombre: "ENDODONCIA MULTIRADICULAR (CONDUCTOS REGULARES)" },
  { codigo: "234101", nombre: "EXODONCIA DE DIENTE TEMPORAL" },
  { codigo: "234102", nombre: "EXODONCIA DE DIENTE PERMANENTE ERUPCIONADO" },
  { codigo: "234201", nombre: "EXODONCIA DE DIENTE INCLUIDO - RETENIDO" },
  { codigo: "234202", nombre: "EXODONCIA DE TERCER MOLAR INCLUIDO" },
  { codigo: "235101", nombre: "DETARTRAJE SUBGINGIVAL (RASPAJE Y ALISADO RADICULAR POR SEXTANTE)" },
  { codigo: "236101", nombre: "CORONA INDIVIDUAL EN METAL" },
  { codigo: "236102", nombre: "CORONA INDIVIDUAL EN PORCELANA" },
  { codigo: "236103", nombre: "CORONA INDIVIDUAL EN METAL PORCELANA" },
  { codigo: "237101", nombre: "PRÓTESIS PARCIAL REMOVIBLE MUCOSOPORTADA" },
  { codigo: "237201", nombre: "PRÓTESIS TOTAL MUCOSOPORTADA" },
  { codigo: "238101", nombre: "FERULIZACIÓN DENTAL" },
  { codigo: "239101", nombre: "REIMPLANTE DENTAL" },
];

// =============================================================================
// SECCIÓN: TERAPIAS Y REHABILITACIÓN
// =============================================================================
const terapias: CupsEntry[] = [
  // --- Fisioterapia ---
  { codigo: "931000", nombre: "TERAPIA FÍSICA INTEGRAL (SESIÓN DE 45 MINUTOS)" },
  { codigo: "931001", nombre: "TERAPIA FÍSICA CON MODALIDADES CALOR" },
  { codigo: "931002", nombre: "TERAPIA FÍSICA CON MODALIDADES FRÍO" },
  { codigo: "931003", nombre: "TERAPIA FÍSICA CON ULTRASONIDO" },
  { codigo: "931004", nombre: "TERAPIA FÍSICA CON ELECTROTERAPIA" },
  { codigo: "931005", nombre: "TERAPIA FÍSICA CON EJERCICIOS TERAPÉUTICOS" },
  { codigo: "931006", nombre: "TERAPIA FÍSICA RESPIRATORIA" },

  // --- Terapia ocupacional ---
  { codigo: "932000", nombre: "TERAPIA OCUPACIONAL INTEGRAL (SESIÓN DE 45 MINUTOS)" },
  { codigo: "932001", nombre: "TERAPIA OCUPACIONAL CON ENTRENAMIENTO EN AVD" },

  // --- Terapia de lenguaje ---
  { codigo: "933000", nombre: "TERAPIA DE LENGUAJE Y COMUNICACIÓN INTEGRAL (SESIÓN DE 45 MINUTOS)" },
  { codigo: "933001", nombre: "TERAPIA FONOAUDIOLÓGICA" },
  { codigo: "933002", nombre: "TERAPIA MIOFUNCIONAL" },

  // --- Terapia respiratoria ---
  { codigo: "934000", nombre: "TERAPIA RESPIRATORIA INTEGRAL (SESIÓN)" },
  { codigo: "934001", nombre: "TERAPIA RESPIRATORIA CON NEBULIZACIÓN" },
  { codigo: "934002", nombre: "TERAPIA RESPIRATORIA CON INCENTIVO RESPIRATORIO" },

  // --- Terapia psicológica ---
  { codigo: "943100", nombre: "PSICOTERAPIA INDIVIDUAL POR PSICOLOGÍA (SESIÓN DE 45 MINUTOS)" },
  { codigo: "943200", nombre: "PSICOTERAPIA DE GRUPO POR PSICOLOGÍA" },
  { codigo: "943300", nombre: "PSICOTERAPIA INDIVIDUAL POR PSIQUIATRÍA (SESIÓN DE 45 MINUTOS)" },
  { codigo: "943400", nombre: "PSICOTERAPIA DE PAREJA O FAMILIA" },
];

// =============================================================================
// SECCIÓN: PROCEDIMIENTOS DE URGENCIAS Y SALA DE PROCEDIMIENTOS
// =============================================================================
const urgencias: CupsEntry[] = [
  // --- Sala de procedimientos ---
  { codigo: "860101", nombre: "SUTURA DE HERIDA EN PIEL Y TEJIDO SUBCUTÁNEO" },
  { codigo: "860102", nombre: "CURACIÓN DE HERIDA" },
  { codigo: "860103", nombre: "RETIRO DE PUNTOS DE SUTURA" },
  { codigo: "860201", nombre: "DRENAJE DE ABSCESO" },
  { codigo: "860301", nombre: "DESBRIDAMIENTO DE HERIDA O LESIÓN" },
  { codigo: "860401", nombre: "BIOPSIA DE PIEL Y TEJIDO SUBCUTÁNEO" },
  { codigo: "860501", nombre: "CAUTERIZACIÓN DE LESIÓN EN PIEL" },
  { codigo: "860502", nombre: "RESECCIÓN DE LESIÓN EN PIEL (EXCISIONAL)" },
  { codigo: "860601", nombre: "INYECCIÓN INTRALESIONAL O INFILTRACIÓN" },

  // --- Procedimientos de urgencias ---
  { codigo: "991101", nombre: "COLOCACIÓN DE CATÉTER VENOSO CENTRAL" },
  { codigo: "991102", nombre: "COLOCACIÓN DE CATÉTER VENOSO PERIFÉRICO" },
  { codigo: "991103", nombre: "INTUBACIÓN OROTRAQUEAL" },
  { codigo: "991104", nombre: "TORACENTESIS DIAGNÓSTICA O TERAPÉUTICA" },
  { codigo: "991105", nombre: "PARACENTESIS DIAGNÓSTICA O TERAPÉUTICA" },
  { codigo: "991106", nombre: "LAVADO GÁSTRICO" },
  { codigo: "991107", nombre: "SONDAJE VESICAL" },
  { codigo: "991108", nombre: "SONDAJE NASOGÁSTRICO" },
  { codigo: "991109", nombre: "INMOVILIZACIÓN CON YESO O FÉRULA" },
  { codigo: "991110", nombre: "REDUCCIÓN CERRADA DE LUXACIÓN" },
  { codigo: "991111", nombre: "REANIMACIÓN CARDIOPULMONAR" },
  { codigo: "991112", nombre: "CARDIOVERSIÓN O DESFIBRILACIÓN" },
  { codigo: "991113", nombre: "PUNCIÓN LUMBAR" },
  { codigo: "991201", nombre: "OBSERVACIÓN EN URGENCIAS (MENOS DE 6 HORAS)" },
  { codigo: "991202", nombre: "OBSERVACIÓN EN URGENCIAS (6 A 24 HORAS)" },
  { codigo: "991203", nombre: "HIDRATACIÓN PARENTERAL EN URGENCIAS" },
  { codigo: "991204", nombre: "ADMINISTRACIÓN DE MEDICAMENTOS EN URGENCIAS" },
  { codigo: "991205", nombre: "NEBULIZACIÓN EN URGENCIAS" },

  // --- Inmovilización y yesos ---
  { codigo: "780101", nombre: "APLICACIÓN DE YESO BRAQUIOPALMAR" },
  { codigo: "780102", nombre: "APLICACIÓN DE YESO CRUROPÉDICO" },
  { codigo: "780103", nombre: "APLICACIÓN DE FÉRULA DE YESO" },
  { codigo: "780104", nombre: "RETIRO DE YESO" },
  { codigo: "780105", nombre: "APLICACIÓN DE INMOVILIZADOR" },
];

// =============================================================================
// SECCIÓN: ENDOSCOPIA Y PROCEDIMIENTOS DIAGNÓSTICOS ESPECIALES
// =============================================================================
const endoscopia: CupsEntry[] = [
  { codigo: "441301", nombre: "ENDOSCOPIA DIGESTIVA ALTA (ESOFAGOGASTRODUODENOSCOPIA) DIAGNÓSTICA" },
  { codigo: "441302", nombre: "ENDOSCOPIA DIGESTIVA ALTA CON BIOPSIA" },
  { codigo: "453101", nombre: "COLONOSCOPIA TOTAL DIAGNÓSTICA" },
  { codigo: "453102", nombre: "COLONOSCOPIA TOTAL CON BIOPSIA" },
  { codigo: "453103", nombre: "COLONOSCOPIA CON POLIPECTOMÍA" },
  { codigo: "453201", nombre: "RECTOSIGMOIDOSCOPIA DIAGNÓSTICA" },
  { codigo: "311101", nombre: "BRONCOSCOPIA DIAGNÓSTICA" },
  { codigo: "311102", nombre: "BRONCOSCOPIA CON LAVADO BRONCOALVEOLAR" },
  { codigo: "311103", nombre: "BRONCOSCOPIA CON BIOPSIA" },
  { codigo: "572102", nombre: "CISTOSCOPIA CON BIOPSIA" },
  { codigo: "682201", nombre: "COLPOSCOPIA" },
  { codigo: "682202", nombre: "COLPOSCOPIA CON BIOPSIA" },
  { codigo: "681301", nombre: "HISTEROSCOPIA DIAGNÓSTICA" },
  { codigo: "681302", nombre: "HISTEROSCOPIA OPERATORIA" },
];

// =============================================================================
// SECCIÓN: PATOLOGÍA
// =============================================================================
const patologia: CupsEntry[] = [
  { codigo: "891801", nombre: "ESTUDIO DE BIOPSIA (INCLUYE DESCRIPCIÓN MACROSCÓPICA Y MICROSCÓPICA)" },
  { codigo: "891802", nombre: "ESTUDIO DE CITOLOGÍA NO GINECOLÓGICA" },
  { codigo: "891803", nombre: "ESTUDIO DE CITOLOGÍA CERVICOVAGINAL (PAPANICOLAOU)" },
  { codigo: "891804", nombre: "BIOPSIA POR CONGELACIÓN (INTRAOPERATORIA)" },
  { codigo: "891805", nombre: "ESTUDIO INMUNOHISTOQUÍMICO" },
  { codigo: "891806", nombre: "BIOPSIA DE MÉDULA ÓSEA" },
];

// =============================================================================
// SECCIÓN: OTROS PROCEDIMIENTOS DIAGNÓSTICOS
// =============================================================================
const otrosDiagnosticos: CupsEntry[] = [
  // --- Electrodiagnóstico ---
  { codigo: "895501", nombre: "ELECTROENCEFALOGRAMA ESTÁNDAR" },
  { codigo: "895601", nombre: "ELECTROMIOGRAFÍA Y NEUROCONDUCCIÓN DE MIEMBROS SUPERIORES" },
  { codigo: "895602", nombre: "ELECTROMIOGRAFÍA Y NEUROCONDUCCIÓN DE MIEMBROS INFERIORES" },
  { codigo: "895701", nombre: "POTENCIALES EVOCADOS VISUALES" },
  { codigo: "895702", nombre: "POTENCIALES EVOCADOS AUDITIVOS" },
  { codigo: "895703", nombre: "POTENCIALES EVOCADOS SOMATOSENSORIALES" },

  // --- Estudios respiratorios ---
  { codigo: "893801", nombre: "ESPIROMETRÍA SIMPLE" },
  { codigo: "893802", nombre: "ESPIROMETRÍA CON BRONCODILATADOR" },
  { codigo: "893803", nombre: "PRUEBA DE DIFUSIÓN PULMONAR" },
  { codigo: "893901", nombre: "POLISOMNOGRAMA (ESTUDIO DE SUEÑO)" },

  // --- Estudios oftalmológicos ---
  { codigo: "870101", nombre: "CAMPIMETRÍA COMPUTARIZADA" },
  { codigo: "870102", nombre: "TONOMETRÍA" },
  { codigo: "870103", nombre: "FONDO DE OJO" },
  { codigo: "870104", nombre: "ANGIOGRAFÍA FLUORESCEÍNICA" },
  { codigo: "870105", nombre: "TOMOGRAFÍA DE COHERENCIA ÓPTICA [OCT]" },
  { codigo: "870106", nombre: "PAQUIMETRÍA CORNEAL" },
  { codigo: "870107", nombre: "TOPOGRAFÍA CORNEAL" },

  // --- Estudios auditivos ---
  { codigo: "870201", nombre: "AUDIOMETRÍA TONAL" },
  { codigo: "870202", nombre: "IMPEDANCIOMETRÍA (TIMPANOMETRÍA)" },
  { codigo: "870203", nombre: "LOGOAUDIOMETRÍA" },
  { codigo: "870204", nombre: "POTENCIALES EVOCADOS AUDITIVOS DE TRONCO CEREBRAL [BERA]" },
  { codigo: "870205", nombre: "EMISIONES OTOACÚSTICAS" },

  // --- Otros ---
  { codigo: "893101", nombre: "PRUEBA DE ESFUERZO CARDIOPULMONAR" },
  { codigo: "893201", nombre: "URODINAMIA" },
];

// =============================================================================
// SECCIÓN: HOSPITALIZACIÓN Y ESTANCIAS
// =============================================================================
const hospitalizacion: CupsEntry[] = [
  { codigo: "000101", nombre: "ESTANCIA GENERAL EN HOSPITALIZACIÓN (DÍA)" },
  { codigo: "000102", nombre: "ESTANCIA EN UNIDAD DE CUIDADOS INTENSIVOS ADULTOS (DÍA)" },
  { codigo: "000103", nombre: "ESTANCIA EN UNIDAD DE CUIDADOS INTENSIVOS PEDIÁTRICA (DÍA)" },
  { codigo: "000104", nombre: "ESTANCIA EN UNIDAD DE CUIDADOS INTENSIVOS NEONATAL (DÍA)" },
  { codigo: "000105", nombre: "ESTANCIA EN UNIDAD DE CUIDADOS INTERMEDIOS (DÍA)" },
  { codigo: "000201", nombre: "ESTANCIA EN SALA DE OBSERVACIÓN DE URGENCIAS" },
  { codigo: "000301", nombre: "ESTANCIA EN SALA DE RECUPERACIÓN POSTQUIRÚRGICA" },
  { codigo: "000401", nombre: "ESTANCIA EN SALA DE PARTOS" },
  { codigo: "000501", nombre: "ESTANCIA HOSPITALARIA EN SALUD MENTAL (DÍA)" },
];

// =============================================================================
// SECCIÓN: TRANSFUSIONES Y BANCO DE SANGRE
// =============================================================================
const transfusiones: CupsEntry[] = [
  { codigo: "891201", nombre: "TRANSFUSIÓN DE GLÓBULOS ROJOS (POR CADA UNIDAD)" },
  { codigo: "891202", nombre: "TRANSFUSIÓN DE PLASMA FRESCO CONGELADO" },
  { codigo: "891203", nombre: "TRANSFUSIÓN DE PLAQUETAS" },
  { codigo: "891204", nombre: "TRANSFUSIÓN DE CRIOPRECIPITADO" },
  { codigo: "900101", nombre: "GRUPO SANGUÍNEO Y FACTOR Rh" },
  { codigo: "900102", nombre: "PRUEBA DE COOMBS DIRECTA" },
  { codigo: "900103", nombre: "PRUEBA DE COOMBS INDIRECTA" },
  { codigo: "900104", nombre: "PRUEBAS CRUZADAS (POR CADA UNIDAD)" },
];

// =============================================================================
// SECCIÓN: PROCEDIMIENTOS RELACIONADOS CON ANESTESIA
// =============================================================================
const anestesia: CupsEntry[] = [
  { codigo: "010101", nombre: "ANESTESIA GENERAL BALANCEADA" },
  { codigo: "010201", nombre: "ANESTESIA REGIONAL - BLOQUEO EPIDURAL" },
  { codigo: "010202", nombre: "ANESTESIA REGIONAL - BLOQUEO RAQUÍDEO (SUBARACNOIDEO)" },
  { codigo: "010203", nombre: "ANESTESIA REGIONAL - BLOQUEO COMBINADO" },
  { codigo: "010301", nombre: "ANESTESIA LOCAL" },
  { codigo: "010401", nombre: "SEDACIÓN CONSCIENTE" },
  { codigo: "010501", nombre: "ANESTESIA REGIONAL - BLOQUEO DE PLEXO BRAQUIAL" },
  { codigo: "010601", nombre: "ANESTESIA REGIONAL - BLOQUEO DE NERVIO PERIFÉRICO" },
  { codigo: "010701", nombre: "VALORACIÓN PREANESTÉSICA" },
];

// =============================================================================
// CONSOLIDACIÓN DE TODOS LOS CÓDIGOS CUPS
// =============================================================================
export const cupsData: CupsEntry[] = [
  ...consultas,
  ...laboratorio,
  ...imagenes,
  ...cardiovascular,
  ...cirugia,
  ...pyp,
  ...odontologia,
  ...terapias,
  ...urgencias,
  ...endoscopia,
  ...patologia,
  ...otrosDiagnosticos,
  ...hospitalizacion,
  ...transfusiones,
  ...anestesia,
];

// =============================================================================
// EXPORT POR CATEGORÍA (útil para filtros en UI)
// =============================================================================
export const cupsPorCategoria = {
  consultas,
  laboratorio,
  imagenes,
  cardiovascular,
  cirugia,
  pyp,
  odontologia,
  terapias,
  urgencias,
  endoscopia,
  patologia,
  otrosDiagnosticos,
  hospitalizacion,
  transfusiones,
  anestesia,
};

/**
 * Categorías CUPS para uso en componentes de UI
 */
export const cupsCategorias = [
  { key: "consultas", label: "Consultas e interconsultas", prefix: "89" },
  { key: "laboratorio", label: "Laboratorio clínico", prefix: "90" },
  { key: "imagenes", label: "Imágenes diagnósticas", prefix: "87-88" },
  { key: "cardiovascular", label: "Procedimientos cardiovasculares", prefix: "88-89" },
  { key: "cirugia", label: "Procedimientos quirúrgicos", prefix: "Varios" },
  { key: "pyp", label: "Promoción y prevención", prefix: "99" },
  { key: "odontologia", label: "Procedimientos odontológicos", prefix: "23" },
  { key: "terapias", label: "Terapias y rehabilitación", prefix: "93" },
  { key: "urgencias", label: "Urgencias y sala de procedimientos", prefix: "86-99" },
  { key: "endoscopia", label: "Endoscopia y procedimientos especiales", prefix: "Varios" },
  { key: "patologia", label: "Patología", prefix: "89" },
  { key: "otrosDiagnosticos", label: "Otros procedimientos diagnósticos", prefix: "87-89" },
  { key: "hospitalizacion", label: "Hospitalización y estancias", prefix: "00" },
  { key: "transfusiones", label: "Transfusiones y banco de sangre", prefix: "89-90" },
  { key: "anestesia", label: "Anestesia", prefix: "01" },
] as const;
