import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
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
} from "@/db/schema";

const catalogoMap = {
  "tipos-documento": refTiposDocumento,
  sexos: refSexos,
  "tipos-usuario": refTiposUsuario,
  "modalidades-atencion": refModalidadesAtencion,
  "grupos-servicio": refGruposServicio,
  "finalidades-tecnologia": refFinalidadesTecnologia,
  "causas-atencion": refCausasAtencion,
  "vias-ingreso": refViasIngreso,
  "conceptos-recaudo": refConceptosRecaudo,
  "ambitos-procedimiento": refAmbitosProcedimiento,
  "tipos-diagnostico": refTiposDiagnostico,
} as const;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tipo = searchParams.get("tipo") as keyof typeof catalogoMap;

  if (!tipo || !catalogoMap[tipo]) {
    return NextResponse.json(
      { error: `Catálogo no encontrado. Disponibles: ${Object.keys(catalogoMap).join(", ")}` },
      { status: 400 }
    );
  }

  const table = catalogoMap[tipo];
  const results = await db.select().from(table);

  return NextResponse.json(results);
}
