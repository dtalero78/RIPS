"use client";
import { useParams } from "next/navigation";
import { AtencionForm } from "@/components/forms/atencion-form";
export default function EditarAtencionPage() {
  const params = useParams();
  return <AtencionForm atencionId={params.id as string} />;
}
