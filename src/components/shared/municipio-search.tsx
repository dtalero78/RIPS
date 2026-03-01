"use client";

import { AutocompleteSearch } from "./autocomplete-search";

interface MunicipioOption {
  codigo: string;
  nombre: string;
  codigoDepartamento?: string;
  departamento?: string | null;
}

interface MunicipioSearchProps {
  value?: { codigo: string; nombre: string } | null;
  onChange: (option: MunicipioOption | null) => void;
  departamento?: string;
  disabled?: boolean;
  error?: string;
}

export function MunicipioSearch({ value, onChange, departamento, disabled, error }: MunicipioSearchProps) {
  const apiUrl = departamento
    ? `/api/referencia/municipios?departamento=${departamento}`
    : "/api/referencia/municipios";

  return (
    <AutocompleteSearch
      label="Municipio"
      placeholder="Buscar por código DANE o nombre..."
      apiUrl={apiUrl}
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={error}
      renderOption={(option) => (
        <div className="flex gap-2">
          <span className="font-mono text-blue-700 shrink-0">{option.codigo}</span>
          <span className="text-gray-700 truncate">{option.nombre}</span>
          {option.departamento && (
            <span className="text-gray-400 text-xs ml-auto shrink-0">
              {option.departamento}
            </span>
          )}
        </div>
      )}
    />
  );
}
