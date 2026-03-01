"use client";

import { useParams } from "next/navigation";
import { FacturaForm } from "@/components/forms/factura-form";

export default function EditFacturaPage() {
  const { id } = useParams<{ id: string }>();
  return <FacturaForm facturaId={id} />;
}
