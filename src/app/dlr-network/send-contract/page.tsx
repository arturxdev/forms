"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ulid } from "ulid";
import {
  ThankYouScreen,
  DebugInfo,
  FileUploader,
  PageHeader,
  PageImageHeader,
} from "@/components/formComponents";

type FormData = Record<string, unknown>;

export default function ContactForm() {
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setFormData] = useState<FormData | null>(null);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let URL =
      "https://n8n-n8n.lolule.easypanel.host/webhook-test/15d5c7e7-9c31-4761-acc6-e56a405a277b";
    e.preventDefault();

    // Generar ULID único para esta petición
    const requestULID = generateULID();
    console.log("ULID generado para esta petición:", requestULID);

    const formData = new FormData(e.currentTarget);

    // Remover el input file del FormData para evitar duplicados
    formData.delete("comprobante");

    // Agregar solo el archivo del estado si existe
    if (comprobanteFile) {
      formData.append("comprobante", comprobanteFile);
    }

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

    toast.success(`¡Gracias!\nNos pondremos en contacto `);
  };

  // Si el formulario fue enviado exitosamente, mostrar la pantalla de agradecimiento
  if (isSubmitted) {
    return <ThankYouScreen title={`Contrato enviado`} description="" />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden bg-white">
        {/* Header con imagen */}
        <PageImageHeader
          imageUrl="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop"
          altText="Encabezado minimalista"
        />

        {/* Título */}
        <PageHeader
          title="Envio de contrato"
          subtitle="Envía tu contrato firmado"
        />
        <DebugInfo
          queryParams={queryParams}
          debug={queryParams.debug === "true"}
        />
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-6">
          <FileUploader
            id="contract"
            name="contract"
            label="Contrato"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize="10MB"
            onChange={(file) => setComprobanteFile(file)}
          />
          <Button type="submit" className="btn">
            Enviar Solicitud
          </Button>

          <p className="text-[11px] leading-relaxed text-zinc-500 text-center">
            Al enviar, aceptas que nos pongamos en contacto con la información
            proporcionada.
          </p>
        </form>
      </div>
    </div>
  );
}
