"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/formComponents/formInput";
import { FileUploader } from "@/components/formComponents/fileUploader";
import { FormPhone } from "@/components/formComponents/formPhone";
import { FormEmail } from "@/components/formComponents/formEmail";
import { ThankYouScreen } from "@/components/formComponents/thankYouScreen";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FormRadioGroup } from "@/components/formComponents/formRadioGroup";
import { ulid } from "ulid";
import { DebugInfo, PageImageHeader } from "@/components/formComponents";
import { PageHeader } from "@/components/formComponents";
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
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);
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

  // Opciones para el select de paquetes
  const paquetes = [
    { value: "especial", label: "🔸 PLAN ESPECIAL – 15 Mbps – $55,000" },
    { value: "mini", label: "🔸 PLAN MINI – 17 Mbps – $60,000" },
    { value: "personal", label: "🔸 PERSONAL – 25 Mbps – $65,000" },
    {
      value: "familiar_streaming",
      label: "🔸 PLAN FAMILIAR Streaming – 27 Mbps – $80,000",
    },
    {
      value: "hogar_duo_streaming",
      label: "🔸 HOGAR DUO Streaming – 30 Mbps – $130,000",
    },
    { value: "duo_mini", label: "🔸 PLAN DUO MINI – 32 Mbps –$65.000" },
    {
      value: "duo_mini_dos_casas",
      label: "🔸 DUO MINI – 34 Mbps – $65,000 DOS CASAS",
    },
    {
      value: "hogar_duo_streaming_dos_casas",
      label: "🔸 PLAN HOGAR DUO Streaming – 36 Mbps – $130,000 DOS CASAS",
    },
    { value: "duplex", label: "🔸 PLAN DUPLEX – 40 Mbps – $100,000" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let URL =
      "https://n8n-n8n.lolule.easypanel.host/webhook/33d1de4b-5499-4fd6-bf9e-aa85f7f866db";
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

    toast.success(
      `¡Gracias, ${data.nombre} ${data.apellido}!\nNos pondremos en contacto a: ${data.email}`
    );
  };

  // Si el formulario fue enviado exitosamente, mostrar la pantalla de agradecimiento
  if (isSubmitted) {
    return (
      <ThankYouScreen
        title={`¡Gracias, ${formData?.nombre} ${formData?.apellido}!`}
        description="Te notificaremos por medio de WhatsApp de los siguientes pasos"
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden bg-white">
        {/* Header con imagen */}
        <PageImageHeader imageUrl="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop" />
        {/* Título */}
        <PageHeader
          title="Contratación"
          subtitle="Información del contratante"
        />
        {/* Información de Query Parameters (solo si existen) */}
        <DebugInfo
          queryParams={queryParams}
          debug={queryParams.debug === "true"}
        />
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-6">
          {/* Primera fila - Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="nombre"
              name="nombre"
              label="Nombre"
              type="text"
              required
              placeholder="Tu nombre"
            />
            <FormInput
              id="apellido"
              name="apellido"
              label="Apellido"
              type="text"
              required
              placeholder="Tu apellido"
            />
          </div>

          {/* Segunda fila - Email y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormEmail
              id="email"
              name="email"
              label="Email"
              required
              placeholder="tu@correo.com"
            />
            <FormPhone
              id="telefono"
              name="telefono"
              label="Teléfono"
              required
              placeholder="+57 300 123 4567"
            />
          </div>

          {/* Tercera fila - Número de identificación y Estrato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="identificacion"
              name="identificacion"
              label="Número de identificación"
              type="text"
              required
              placeholder="CC 12345678"
            />
            <FormInput
              id="estrato"
              name="estrato"
              label="Estrato"
              type="text"
              required
              placeholder="1, 2, 3, 4, 5, 6"
            />
          </div>

          {/* Cuarta fila - Dirección (ancho completo) */}
          <FormInput
            id="direccion"
            name="direccion"
            label="Dirección"
            type="text"
            required
            placeholder="Calle 123 # 45-67, Ciudad"
          />

          {/* Quinta fila - Comprobante de pago de luz */}
          <FileUploader
            id="comprobante"
            name="comprobante"
            label="Comprobante de pago de luz"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize="10MB"
            onChange={(file) => setComprobanteFile(file)}
          />

          {/* Nueva sección - Dirección donde se instalará el servicio */}
          <div className="border-t border-zinc-200 pt-6">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 mb-6">
              Dirección donde se instalará el servicio
            </h2>

            {/* Dirección del servicio (ancho completo) */}
            <div className="mb-6">
              <FormInput
                id="direccionServicio"
                name="direccionServicio"
                label="Dirección del servicio"
                type="text"
                required
                placeholder="Calle 123 # 45-67, Ciudad"
              />
            </div>

            {/* Departamento y Municipio (2 columnas) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormInput
                id="departamento"
                name="departamento"
                label="Departamento"
                type="text"
                required
                placeholder="Ej. Antioquia"
              />
              <FormInput
                id="municipio"
                name="municipio"
                label="Municipio"
                type="text"
                required
                placeholder="Ej. Medellín"
              />
            </div>

            {/* Paquete a contratar (ancho completo) */}
            <FormRadioGroup
              name="paquete"
              label="Paquete a contratar"
              options={paquetes}
              required
              description="Elige el plan que mejor se adapte a tus necesidades"
            />
          </div>

          <Button type="submit" className="btn">
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
