import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ripsGeneraciones } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const tenantId = (session.user as { tenantId: string }).tenantId;

  const [gen] = await db
    .select()
    .from(ripsGeneraciones)
    .where(eq(ripsGeneraciones.id, id))
    .limit(1);

  if (!gen || gen.tenantId !== tenantId) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const jsonStr = JSON.stringify(gen.archivoJson, null, 2);
  const filename = `RIPS_${gen.periodoInicio || "sin-fecha"}_${gen.id.substring(0, 8)}.json`;

  return new NextResponse(jsonStr, {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
