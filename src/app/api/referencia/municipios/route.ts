import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { refMunicipiosDane, refDepartamentosDane } from "@/db/schema";
import { ilike, or, eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") || "";
  const dep = searchParams.get("departamento") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  if (q.length < 2 && !dep) {
    return NextResponse.json([]);
  }

  let query = db
    .select({
      codigo: refMunicipiosDane.codigo,
      nombre: refMunicipiosDane.nombre,
      codigoDepartamento: refMunicipiosDane.codigoDepartamento,
      departamento: refDepartamentosDane.nombre,
    })
    .from(refMunicipiosDane)
    .leftJoin(
      refDepartamentosDane,
      eq(refMunicipiosDane.codigoDepartamento, refDepartamentosDane.codigo)
    )
    .$dynamic();

  const conditions = [];
  if (q.length >= 2) {
    conditions.push(
      or(
        ilike(refMunicipiosDane.codigo, `%${q}%`),
        ilike(refMunicipiosDane.nombre, `%${q}%`)
      )!
    );
  }
  if (dep) {
    conditions.push(eq(refMunicipiosDane.codigoDepartamento, dep));
  }

  if (conditions.length > 0) {
    const { and } = await import("drizzle-orm");
    query = query.where(and(...conditions));
  }

  const results = await query
    .orderBy(
      sql`CASE WHEN ${refMunicipiosDane.nombre} ILIKE ${q + "%"} THEN 0 ELSE 1 END`,
      refMunicipiosDane.nombre
    )
    .limit(limit);

  return NextResponse.json(results);
}
