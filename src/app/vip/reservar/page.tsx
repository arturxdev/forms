"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ThankYouScreen } from "@/components/formComponents/thankYouScreen";
import { useState } from "react";
// import { toast } from "sonner";
import {
  FormRadioGroup,
  FormSelect,
  PageHeader,
  PageImageHeader,
} from "@/components/formComponents";

type FormData = Record<string, unknown>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [viaje, setViaje] = useState<string>("sd-quito");
  const [hora, setHora] = useState<string>("");

  // Opciones para el select de paquetes
  const paquetes = [
    { value: "sd-quito", label: "1️⃣ Santo Domingo → Quito" },
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const URL =
      "https://painfully-feasible-sunfish.ngrok-free.app/webhook-test/b92da1ad-3155-44e0-88d2-2ef5dbcf41db";
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

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

        <PageHeader title="Reserva un viaje" subtitle="" />

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-6">
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
