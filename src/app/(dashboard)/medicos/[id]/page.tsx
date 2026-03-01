"use client";
import { useParams } from "next/navigation";
import { MedicoForm } from "@/components/forms/medico-form";
export default function EditarMedicoPage() {
  const params = useParams();
  return <MedicoForm medicoId={params.id as string} />;
}
