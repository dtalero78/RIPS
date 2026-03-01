"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";

interface AutocompleteOption {
  codigo: string;
  nombre: string;
  [key: string]: string | null | undefined;
}

interface AutocompleteSearchProps {
  label: string;
  placeholder?: string;
  apiUrl: string;
  value?: { codigo: string; nombre: string } | null;
  onChange: (option: AutocompleteOption | null) => void;
  renderOption?: (option: AutocompleteOption) => React.ReactNode;
  minChars?: number;
  disabled?: boolean;
  error?: string;
}

export function AutocompleteSearch({
  label,
  placeholder = "Buscar...",
  apiUrl,
  value,
  onChange,
  renderOption,
  minChars = 2,
  disabled = false,
  error,
}: AutocompleteSearchProps) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  const fetchOptions = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minChars) {
        setOptions([]);
        return;
      }
      setIsLoading(true);
      try {
        const separator = apiUrl.includes("?") ? "&" : "?";
        const res = await fetch(`${apiUrl}${separator}q=${encodeURIComponent(searchQuery)}&limit=15`);
        if (res.ok) {
          const data = await res.json();
          setOptions(data);
        }
      } catch {
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, minChars]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (query && !value) fetchOptions(query);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, value, fetchOptions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option: AutocompleteOption) {
    onChange(option);
    setQuery("");
    setIsOpen(false);
    setHighlightIndex(-1);
  }

  function handleClear() {
    onChange(null);
    setQuery("");
    setOptions([]);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || options.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(options[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="form-label">{label}</label>
      {value ? (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50">
          <span className="font-mono text-sm text-blue-700">{value.codigo}</span>
          <span className="text-sm text-gray-700 flex-1 truncate">{value.nombre}</span>
          {!disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setHighlightIndex(-1);
            }}
            onFocus={() => {
              if (options.length > 0) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="form-input pl-9 pr-8"
          />
          {isLoading && (
            <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 animate-spin" />
          )}
        </div>
      )}

      {isOpen && options.length > 0 && !value && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, idx) => (
            <button
              key={option.codigo}
              type="button"
              className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${
                idx === highlightIndex ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightIndex(idx)}
            >
              {renderOption ? (
                renderOption(option)
              ) : (
                <div className="flex gap-2">
                  <span className="font-mono text-blue-700 shrink-0">{option.codigo}</span>
                  <span className="text-gray-700 truncate">{option.nombre}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length >= minChars && options.length === 0 && !isLoading && !value && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm text-gray-500 text-center">
          No se encontraron resultados
        </div>
      )}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
