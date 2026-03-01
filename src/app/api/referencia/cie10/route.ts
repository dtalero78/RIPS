import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { refCie10 } from "@/db/schema";
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
    .from(refCie10)
    .where(
      or(
        ilike(refCie10.codigo, `%${q}%`),
        ilike(refCie10.nombre, `%${q}%`)
      )
    )
    .orderBy(sql`CASE WHEN ${refCie10.codigo} ILIKE ${q + "%"} THEN 0 ELSE 1 END`, refCie10.codigo)
    .limit(limit);

  return NextResponse.json(results);
}
