import { NextResponse } from "next/server";
import { db } from "@/db";
import { refDepartamentosDane } from "@/db/schema";

export async function GET() {
  const results = await db
    .select()
    .from(refDepartamentosDane)
    .orderBy(refDepartamentosDane.nombre);

  return NextResponse.json(results);
}
