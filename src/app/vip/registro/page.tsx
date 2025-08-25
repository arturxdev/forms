"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// import { toast } from "sonner";
import {
  FormInput,
  FileUploader,
  ThankYouScreen,
  FormRadioGroup,
  FormSelect,
  PageImageHeader,
  DebugInfo,
  PageHeader,
} from "@/components/formComponents";

type FormData = Record<string, unknown>;

export default function ContactForm() {
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [viaje, setViaje] = useState<string>("sd-quito");
  const [hora, setHora] = useState<string>("");

  // Opciones para el select de paquetes
  const paquetes = [
    { value: "sd-quito", label: "1️⃣ Santo Domingo → Quito (valle/etc/et)" },
    { value: "quito-sd", label: "2️⃣ Quito → Santo Domingo" },
    { value: "sd-manta", label: "3️⃣ Santo Domingo → Manta" },
    { value: "manta-sd", label: "4️⃣ Manta → Santo Domingo" },
    { value: "sd-gye", label: "5️⃣ Santo Domingo → Guayaquil" },
    { value: "gye-sd", label: "6️⃣ Guayaquil → Santo Domingo" },
    { value: "quito-gye", label: "7️⃣ Quito → Guayaquil" },
    { value: "gye-quito", label: "8️⃣ Guayaquil → Quito" },
    { value: "quito-manta", label: "9️⃣ Quito → Manta" },
    { value: "manta-quito", label: "🔟 Manta → Quito" },
  ];
  const asientos = [
    { value: "1", label: "1 Asiento" },
    { value: "2", label: "2 Asiento " },
    { value: "3", label: "3 Asiento" },
  ];
  // Horarios de la RUTA SANTO DOMINGO A QUITO O VICEVERSA
  // Elige la hora:
  const horas = [
    { value: "4am", label: "4AM", if: ["quito-sd", "sd-quito"] },
    {
      value: "5am",
      label: "5AM",
      if: [
        "gye-quito",
        "gye-sd",
        "manta-quito",
        "manta-sd",
        "quito-manta",
        "quito-sd",
        "sd-gye",
        "sd-manta",
        "sd-quito",
      ],
    },
    { value: "6am", label: "6AM", if: ["quito-sd", "sd-quito"] },
    { value: "7am", label: "7AM", if: ["quito-gye"] },
    {
      value: "8am",
      label: "8AM",
      if: ["manta-quito", "manta-sd", "quito-sd", "sd-manta", "sd-quito"],
    },
    {
      value: "10am",
      label: "10AM",
      if: ["gye-quito", "gye-sd", "quito-sd", "sd-gye", "sd-quito"],
    },
    { value: "11pm", label: "11PM", if: ["quito-gye"] },
    {
      value: "12pm",
      label: "12PM",
      if: ["quito-manta", "quito-sd", "sd-quito"],
    },
    { value: "1pm", label: "1PM", if: ["quito-sd", "sd-quito"] },
    { value: "1:30pm", label: "1:30PM", if: ["quito-gye", "quito-manta"] },
    { value: "2pm", label: "2PM", if: ["sd-gye", "gye-quito"] },
    {
      value: "3pm",
      label: "3PM",
      if: ["manta-quito", "manta-sd", "quito-sd", "sd-manta", "sd-quito"],
    },
    {
      value: "5pm",
      label: "5PM",
      if: ["gye-sd", "manta-sd", "quito-sd", "sd-gye", "sd-manta", "sd-quito"],
    },
    { value: "7pm", label: "7PM", if: ["quito-sd", "sd-quito"] },
  ];

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
    const URL =
      "https://painfully-feasible-sunfish.ngrok-free.app/webhook-test/b92da1ad-3155-44e0-88d2-2ef5dbcf41db";
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Remover el input file del FormData para evitar duplicados
    formData.delete("comprobante");

    // Agregar solo el archivo del estado si existe
    if (comprobanteFile) {
      formData.append("comprobante", comprobanteFile);
    }

    // Enviar usando FormData para archivos
    fetch(URL, {
      method: "POST",
      body: formData,
    });

    // Obtener datos del formulario para el alert (sin el archivo)
    const data = Object.fromEntries(formData) as unknown as FormData;
    console.log(data);

    // Guardar los datos del formulario y mostrar pantalla de agradecimiento
    setFormData(data);
    setIsSubmitted(true);
  };

  // Si el formulario fue enviado exitosamente, mostrar la pantalla de agradecimiento
  if (isSubmitted) {
    return (
      <ThankYouScreen
        title={`¡Gracias!`}
        description="Te notificaremos por medio de WhatsApp de los siguientes pasos"
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden bg-white">
        {/* Header con imagen */}
        <PageImageHeader
          imageUrl="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop"
          altText="Encabezado minimalista"
        />

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-6">
          {/* Título */}
          <PageHeader title="Reserva un viaje" subtitle="" />
          <DebugInfo
            queryParams={queryParams}
            debug={queryParams.debug === "true"}
          />
          {/* Nueva sección - Dirección donde se instalará el servicio */}
          <div className="border-t border-zinc-200 pt-6">
            {/* Paquete a contratar (ancho completo) */}
            <FormSelect
              id="viaje"
              name="Viaje"
              label="🚗 Viaje"
              options={paquetes}
              required
              value={viaje}
              onChange={(e) => {
                const newViaje = e.target.value;
                setViaje(newViaje);
                // Reiniciar hora si ya no aplica para el nuevo viaje
                setHora("");
              }}
            />
          </div>
          <div className="border-zinc-200 pt-6">
            {/* Paquete a contratar (ancho completo) */}
            <FormSelect
              id="hora"
              name="hora"
              label="⏰️ Hora del viaje"
              options={horas}
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              dependsOnValue={viaje}
            />
          </div>
          <div>
            {(() => {
              switch (viaje) {
                case "sd-quito":
                case "quito-sd":
                  return (
                    <Alert variant="default">
                      <AlertTitle>Costo del viaje</AlertTitle>
                      <AlertDescription>
                        <br />
                        📍 Quito → $17
                        <br />
                        📍 Valles / Carapungo / Calderón / Mitad del Mundo → $20
                        <br />
                        ✈️ Aeropuerto Tababela → $35
                      </AlertDescription>
                    </Alert>
                  );
                case "sd-manta":
                case "manta-sd":
                  return (
                    <Alert variant="default">
                      <AlertTitle>Costo del viaje</AlertTitle>
                      <AlertDescription>
                        ¡El precio por persona es de $25! 💸
                      </AlertDescription>
                    </Alert>
                  );
                case "gye-sd":
                case "sd-gye":
                  return (
                    <Alert variant="default">
                      <AlertTitle>Costo del viaje</AlertTitle>
                      <AlertDescription>
                        ¡El precio por persona es de $30! 💸
                      </AlertDescription>
                    </Alert>
                  );
                case "gye-quito":
                case "quito-gye":
                  return (
                    <Alert variant="default">
                      <AlertTitle>Costo del viaje</AlertTitle>
                      <AlertDescription>
                        ¡El precio por persona es de $47! 💸
                      </AlertDescription>
                    </Alert>
                  );
                case "manta-quito":
                case "quito-manta":
                  return (
                    <Alert variant="default">
                      <AlertTitle>Costo del viaje</AlertTitle>
                      <AlertDescription>
                        ¡El precio por persona es de $42! 💸
                      </AlertDescription>
                    </Alert>
                  );
                default:
                  return <h1>404 - No encontrado</h1>;
              }
            })()}
            <div className="mt-8">
              <FormRadioGroup
                name="asientos"
                label="🪑 Asientos para reservar"
                options={asientos}
                required
              />
            </div>
          </div>

          <div className="px-6 pt-6">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Registro
            </h1>
          </div>
          <div className="border-t border-zinc-200 pt-6">
            {/* Paquete a contratar (ancho completo) */}
            <FormInput
              id="nombre"
              name="nombre"
              label="Nombre"
              type="text"
              required
              placeholder="Tu nombre"
            />
            <FormInput
              id="cedula"
              name="cedula"
              label="Numero de cedula"
              type="text"
              required
              placeholder="Tu nombre"
            />
            <FormInput
              id="recomend"
              name="recomend"
              label="Quien nos recomendo ?"
              type="text"
              required
              placeholder="Tu nombre"
            />
            <FileUploader
              id="comprobante"
              name="comprobante"
              label="Foto con tu cedula"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize="10MB"
              onChange={(file) => setComprobanteFile(file)}
            />
            <FileUploader
              id="comprobantepago"
              name="comprobantepago"
              label="Comnprobante de pago"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize="10MB"
              onChange={(file) => setComprobanteFile(file)}
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
