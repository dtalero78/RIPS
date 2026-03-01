"use client";

import { AutocompleteSearch } from "./autocomplete-search";

interface CupsSearchProps {
  value?: { codigo: string; nombre: string } | null;
  onChange: (option: { codigo: string; nombre: string } | null) => void;
  disabled?: boolean;
  error?: string;
}

export function CupsSearch({ value, onChange, disabled, error }: CupsSearchProps) {
  return (
    <AutocompleteSearch
      label="Código CUPS"
      placeholder="Buscar por código o nombre del procedimiento..."
      apiUrl="/api/referencia/cups"
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={error}
    />
  );
}
