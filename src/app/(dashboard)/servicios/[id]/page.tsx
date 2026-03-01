"use client";
import { useParams } from "next/navigation";
import { ServicioForm } from "@/components/forms/servicio-form";
export default function EditarServicioPage() {
  const params = useParams();
  return <ServicioForm servicioId={params.id as string} />;
}
