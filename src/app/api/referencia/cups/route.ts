import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { refCups } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  const results = await db
    .select()
    .from(refCups)
    .where(
      or(
        ilike(refCups.codigo, `%${q}%`),
        ilike(refCups.nombre, `%${q}%`)
      )
    )
    .orderBy(sql`CASE WHEN ${refCups.codigo} ILIKE ${q + "%"} THEN 0 ELSE 1 END`, refCups.codigo)
    .limit(limit);

  return NextResponse.json(results);
}
