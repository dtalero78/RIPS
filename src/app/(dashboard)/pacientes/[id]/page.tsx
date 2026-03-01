"use client";

import { useParams } from "next/navigation";
import { PacienteForm } from "@/components/forms/paciente-form";

export default function EditarPacientePage() {
  const params = useParams();
  return <PacienteForm pacienteId={params.id as string} />;
}
