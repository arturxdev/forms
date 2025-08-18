"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  maxSize?: string;
  onFileChange?: (file: File | null) => void;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  id,
  name,
  label,
  required = false,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = "10MB",
  onFileChange,
  value,
  onChange,
}) => {
  // Estado para el archivo, animación de carga y nombre
  const [uploading, setUploading] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Sincroniza el estado interno con las props externas
  React.useEffect(() => {
    if (value) {
      setFileName(value.name);
    } else {
      setFileName(null);
    }
  }, [value]);

  // Simula la subida del archivo con animación
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // Simula un "upload" de 1.5 segundos
      setTimeout(() => {
        setUploading(false);
        setFileName(file.name);
        onFileChange?.(file);
        onChange?.(file);
      }, 1500);
    } else {
      // Si no hay archivo, limpiar el estado
      setFileName(null);
      onChange?.(null);
    }
  };

  // Permite arrastrar y soltar archivos
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      // Asigna el archivo al input para mantener el control
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      handleFileChange({
        target: fileInputRef.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Abre el explorador de archivos al hacer clic en cualquier parte del área
  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-zinc-800">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div
        className="border-2 border-dashed border-zinc-300 rounded-xl p-6 text-center hover:border-zinc-400 transition-colors relative cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleAreaClick}
      >
        <Upload className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
        <p className="text-sm text-zinc-600 mb-2">
          Arrastra y suelta un archivo o{" "}
          <label
            htmlFor={id}
            className="underline cursor-pointer text-zinc-900 hover:text-zinc-700"
            onClick={() => fileInputRef.current?.click()}
          >
            navega
          </label>
        </p>
        <p className="text-xs text-zinc-500">PDF, JPG, PNG hasta {maxSize}</p>
        <input
          id={id}
          name={name}
          type="file"
          required={required}
          accept={accept}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {/* Animación de carga */}
        {uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-xl z-10">
            <svg
              className="animate-spin h-8 w-8 text-zinc-500 mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-zinc-700 text-sm font-medium">
              Subiendo archivo...
            </span>
          </div>
        )}
        {/* Nombre del archivo subido */}
        {fileName && !uploading && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-zinc-700 text-sm">{fileName}</span>
          </div>
        )}
      </div>
    </div>
  );
};
