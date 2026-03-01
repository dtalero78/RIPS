"use client";

import { AutocompleteSearch } from "./autocomplete-search";

interface Cie10SearchProps {
  label?: string;
  value?: { codigo: string; nombre: string } | null;
  onChange: (option: { codigo: string; nombre: string } | null) => void;
  disabled?: boolean;
  error?: string;
}

export function Cie10Search({ label = "Diagnóstico CIE-10", value, onChange, disabled, error }: Cie10SearchProps) {
  return (
    <AutocompleteSearch
      label={label}
      placeholder="Buscar por código o nombre del diagnóstico..."
      apiUrl="/api/referencia/cie10"
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={error}
    />
  );
}
