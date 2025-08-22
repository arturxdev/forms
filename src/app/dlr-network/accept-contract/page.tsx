"use client";

import { Button } from "@/components/ui/button";
import { ThankYouScreen } from "@/components/formComponents/thankYouScreen";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FormRadioGroup } from "@/components/formComponents/formRadioGroup";
import { ulid } from "ulid";

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  identificacion: string;
  estrato: string;
  direccion: string;
  direccionServicio: string;
  departamento: string;
  municipio: string;
  paquete: string;
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  // Función para generar ULID único
  const generateULID = () => {
    return ulid();
  };

  // Capturar todos los query parameters al cargar el componente
  useEffect(() => {
    const params: Record<string, string> = {};
    const urlSearchParams = new URLSearchParams(window.location.search);

    urlSearchParams.forEach((value: string, key: string) => {
      params[key] = value;
    });

    setQueryParams(params);

    // Log de los parámetros capturados para debugging
    if (Object.keys(params).length > 0) {
      console.log("Query parameters capturados:", params);
    }
  }, []);

  const opciones = [
    { value: "false", label: "Aceptar" },
    { value: "true", label: "Rechazar" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let URL =
      "https://n8n.srv955856.hstgr.cloud/webhook-test/d07ccb59-056e-482a-a7cd-7cd63462f672";
    e.preventDefault();

    // Generar ULID único para esta petición
    const requestULID = generateULID();
    console.log("ULID generado para esta petición:", requestULID);

    const formData = new FormData(e.currentTarget);

    // Remover el input file del FormData para evitar duplicados
    formData.delete("comprobante");


    // Agregar el ULID único a los datos del formulario
    formData.append("uuid", requestULID);

    // Agregar todos los query parameters a la URL de la petición
    if (Object.keys(queryParams).length > 0) {
      const urlParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        urlParams.append(key, value);
      });

      URL += `?${urlParams.toString()}`;
      console.log("Query parameters agregados a la URL:", queryParams);
      console.log("URL final con query params:", URL);
    }

    // Enviar usando FormData para archivos y datos en la misma petición
    fetch(URL, {
      method: "POST",
      body: formData,
    });

    // Obtener datos del formulario para el alert (sin el archivo)
    const data = Object.fromEntries(formData) as unknown as FormData;

    // Guardar los datos del formulario y mostrar pantalla de agradecimiento
    setFormData(data);
    setIsSubmitted(true);

    toast.success(
      `¡Gracias, ${data.nombre} ${data.apellido}!\nNos pondremos en contacto a: ${data.email}`
    );
  };

  // Si el formulario fue enviado exitosamente, mostrar la pantalla de agradecimiento
  if (isSubmitted) {
    return (
      <ThankYouScreen
        title={`Usuario procesado`}
        description=""
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden bg-white">
        {/* Header con imagen */}
        <div className="h-40 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop"
            alt="Encabezado minimalista"
            className="h-full w-full object-cover"
            width={1600}
            height={400}
            loading="eager"
            style={{ display: "block" }}
          />
        </div>

        {/* Título */}
        <div className="px-6 pt-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Aceptas al usuario
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Información del contratante
          </p>
        </div>

        {/* Información de Query Parameters (solo si existen) */}
        {queryParams.debug === "true" && (
          <div className="px-6 pt-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs font-medium text-blue-800 mb-2">
                📋 Información adicional detectada:
              </p>
              <div className="space-y-1">
                {Object.entries(queryParams).map(([key, value]) => (
                  <p key={key} className="text-xs text-blue-700">
                    <span className="font-medium">{key}:</span> {value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-6">

          <div>
            <p>Nombre: {queryParams.name} </p>
            <p>Email: {queryParams.email} </p>
          </div>
          {/* Segunda fila - Email y Teléfono */}
          <FormRadioGroup
            name="accept"
            label="Decicion"
            required
            options={opciones}
          />

          <Button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 text-white py-3 text-sm font-medium tracking-wide hover:opacity-95 active:opacity-90 transition"
          >
            Enviar Solicitud
          </Button>

          {/* Nota de privacidad minimal */}
          <p className="text-[11px] leading-relaxed text-zinc-500 text-center">
            Al enviar, aceptas que nos pongamos en contacto con la información
            proporcionada.
          </p>
        </form>
      </div>
    </div>
  );
}
