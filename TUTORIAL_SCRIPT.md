# RIPS Digital - Guion Video Tutorial

---

## ESCENA 1: Landing Page

**[Pantalla: página de inicio]**

> Esto es RIPS Digital, la plataforma para que cualquier IPS en Colombia genere sus RIPS de forma simple y conforme a la Resolución 2275 de 2023.

> Incluye catálogos oficiales CUPS, CIE-10, códigos DANE y todos los tipos de documento. Todo listo para usar.

---

## ESCENA 2: Registro

**[Pantalla: formulario de registro]**

> Para empezar, registras tu IPS. Solo necesitas el nombre, el NIT, y crear una cuenta de administrador.

> Cada IPS tiene su espacio independiente: sus pacientes, médicos, servicios y facturas separados de los demás.

---

## ESCENA 3: Login

**[Pantalla: formulario de login]**

> Inicias sesión con tu correo y contraseña. Así de simple.

---

## ESCENA 4: Dashboard

**[Pantalla: dashboard con estadísticas]**

> El dashboard te da un resumen completo: cuántos pacientes, médicos, atenciones y facturas tienes registrados.

> Puedes ver la distribución de atenciones por tipo — consultas, procedimientos — y la tendencia por mes.

> Abajo tienes la actividad reciente y accesos rápidos para las acciones más comunes.

---

## ESCENA 5: Configuración

**[Pantalla: página de configuración]**

> Antes de generar RIPS, configura los datos de tu IPS.

> Primero, el código de habilitación del REPS — son 12 dígitos — el NIT y la razón social.

> Luego seleccionas tu ubicación por defecto: departamento y municipio con códigos DANE.

> Aquí defines los valores que se van a precargar en cada atención: modalidad, grupo de servicio, vía de ingreso y el prefijo de tus facturas.

> Por último, los datos de la entidad a la que reportas: la EPS, ARL o quien pague.

---

## ESCENA 6: Pacientes

**[Pantalla: lista de pacientes]**

> En pacientes tienes el listado completo con búsqueda por nombre o documento.

**[Pantalla: formulario nuevo paciente]**

> Al crear un paciente se registra tipo de documento, nombre completo, fecha de nacimiento, sexo, país, municipio de residencia y tipo de usuario.

> Todos los campos que pide la Resolución 2275 para la sección de usuarios.

---

## ESCENA 7: Médicos

**[Pantalla: lista de médicos]**

> En médicos registras los profesionales que atienden en tu IPS.

**[Pantalla: formulario nuevo médico]**

> Cada médico necesita su tipo y número de documento, nombre completo, registro médico y especialidad.

> Este registro médico es el que aparece en cada consulta y procedimiento del RIPS.

---

## ESCENA 8: Servicios

**[Pantalla: lista de servicios]**

> Los servicios son tu catálogo de lo que ofrece la IPS.

**[Pantalla: formulario nuevo servicio]**

> Cada servicio tiene un código CUPS, nombre, si es consulta o procedimiento, y el precio.

> Esto te permite estandarizar las atenciones que registras después.

---

## ESCENA 9: Atenciones

**[Pantalla: lista de atenciones]**

> Las atenciones son el corazón del sistema. Aquí está cada servicio prestado a cada paciente.

> Puedes buscar por paciente o código CUPS, y filtrar por tipo o estado.

**[Pantalla: formulario nueva atención]**

> Al crear una atención seleccionas el paciente, el médico, la fecha, el código CUPS, la modalidad, el diagnóstico CIE-10 y el valor.

> Toda la información que después va al JSON del RIPS, se captura aquí.

---

## ESCENA 10: Facturas

**[Pantalla: lista de facturas]**

> Las facturas agrupan las atenciones. Cada factura tiene su número, fecha, entidad administradora y los valores.

**[Pantalla: formulario nueva factura]**

> Creas la factura, le asignas las atenciones que corresponden, y el sistema calcula los totales.

> Esta factura es la que después usas para generar el RIPS.

---

## ESCENA 11: Generación de RIPS

**[Pantalla: página RIPS - Generar]**

> Y aquí está lo importante: la generación del RIPS.

> Tienes dos formas de generar: por periodo de fechas o por factura.

**[Acción: seleccionar factura y generar]**

> Seleccionas la factura, le das generar, y el sistema arma el JSON completo.

**[Pantalla: resultado con estadísticas]**

> Te muestra cuántos usuarios, consultas, procedimientos y atenciones totales se incluyeron.

> Si hay errores de validación, te los lista para que los corrijas antes de enviar.

**[Acción: click Vista Previa]**

> Puedes ver la vista previa del JSON directamente en pantalla o descargarlo.

**[Pantalla: JSON preview]**

> Este es el archivo JSON listo para subir al Mecanismo Único de Validación. Tiene la estructura exacta que pide el Ministerio: usuarios con sus servicios y tecnologías, consultas, procedimientos, todo agrupado por paciente.

---

## ESCENA 12: Historial

**[Pantalla: tab Historial]**

> En el historial quedan guardadas todas las generaciones que has hecho, con fecha, cuántos registros incluyó y si tuvo errores.

> Puedes volver a descargar cualquier RIPS anterior en cualquier momento.

---

## ESCENA 13: Cierre

**[Pantalla: dashboard]**

> Eso es RIPS Digital. Registra tu IPS, carga tus datos, y genera RIPS conformes a la Resolución 2275 sin complicaciones.
