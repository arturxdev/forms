"use client";
import { Button } from "@/components/ui/button";
import { ThankYouScreen } from "@/components/formComponents/thankYouScreen";
import { useState } from "react";
// import { toast } from "sonner";
import {
  FormSelect,
  PageHeader,
  PageImageHeader,
} from "@/components/formComponents";

type FormData = Record<string, unknown>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setFormData] = useState<FormData | null>(null);
  const [viaje, setViaje] = useState<string>("sd-quito");
  const [hora, setHora] = useState<string>("");
  const [asiento, setAsiento] = useState<number>(1);

  const calculateTotal = () => {
    const price = paquetes.find((elm) => elm.value == viaje)!.price;
    return price * asiento;
  };
  // Opciones para el select de paquetes
  const paquetes = [
    { value: "sd-quito", label: " Santo Domingo → Quito", price: 17 },
    {
      value: "sd-quito-valles",
      label:
        "Santo Domingo → Quito(Valles / Carapungo / Calderón / Mitad del Mundo )",
      price: 20,
    },
    {
      value: "sd-quito-aero",
      label: "Santo Domingo → Quito(Aeropuerto Tababela)",
      price: 35,
    },
    { value: "quito-sd", label: "Quito → Santo Domingo", price: 17 },
    {
      value: "quito-sd-valles",
      label:
        "Quito(Valles/Carapungo/Calderón/Mitad del Mundo ) → Santo Domingo ",
      price: 20,
    },
    {
      value: "quito-sd-aero",
      label: "Quito(Aeropuerto Tababela) → Santo Domingo",
      price: 35,
    },
    { value: "sd-manta", label: "Santo Domingo → Manta", price: 25 },
    { value: "manta-sd", label: " Manta → Santo Domingo", price: 25 },
    { value: "sd-gye", label: "Santo Domingo → Guayaquil", price: 30 },
    { value: "gye-sd", label: "Guayaquil → Santo Domingo", price: 30 },
    { value: "quito-gye", label: " Quito → Guayaquil", price: 30 },
    { value: "gye-quito", label: " Guayaquil → Quito", price: 30 },
    { value: "quito-manta", label: " Quito → Manta", price: 42 },
    { value: "manta-quito", label: " Manta → Quito", price: 42 },
  ];
  const asientos = [
    { value: "1", label: "1 Asiento" },
    { value: "2", label: "2 Asiento " },
    { value: "3", label: "3 Asiento" },
  ];
  // Horarios de la RUTA SANTO DOMINGO A QUITO O VICEVERSA
  // Elige la hora:
  const horas = [
    {
      value: "4am",
      label: "4AM",
      if: [
        "quito-sd",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quto-aero",
      ],
    },
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
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    {
      value: "6am",
      label: "6AM",
      if: [
        "quito-sd",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    { value: "7am", label: "7AM", if: ["quito-gye"] },
    {
      value: "8am",
      label: "8AM",
      if: [
        "manta-quito",
        "manta-sd",
        "quito-sd",
        "sd-manta",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    {
      value: "10am",
      label: "10AM",
      if: [
        "gye-quito",
        "gye-sd",
        "quito-sd",
        "sd-gye",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    { value: "11pm", label: "11PM", if: ["quito-gye"] },
    {
      value: "12pm",
      label: "12PM",
      if: [
        "quito-manta",
        "quito-sd",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    {
      value: "1pm",
      label: "1PM",
      if: [
        "quito-sd",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    { value: "1:30pm", label: "1:30PM", if: ["quito-gye", "quito-manta"] },
    {
      value: "2pm",
      label: "2PM",
      if: [
        "sd-gye",
        "gye-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    {
      value: "3pm",
      label: "3PM",
      if: [
        "manta-quito",
        "manta-sd",
        "quito-sd",
        "sd-manta",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    {
      value: "5pm",
      label: "5PM",
      if: [
        "gye-sd",
        "manta-sd",
        "quito-sd",
        "sd-gye",
        "sd-manta",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
    {
      value: "7pm",
      label: "7PM",
      if: [
        "quito-sd",
        "sd-quito",
        "quito-sd-valles",
        "quito-sd-aero",
        "sd-quito-valles",
        "sd-quito-aero",
      ],
    },
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
          <div className="border-zinc-200">
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
            <div className="mt-8">
              <FormSelect
                id="asientos"
                name="asientos"
                label="🪑 Asientos para reservar"
                options={asientos}
                onChange={(e) => setAsiento(Number(e.target.value))}
                required
              />
            </div>
            <p className="mt-4">
              Costo por asiento:{" "}
              {paquetes.find((elm) => elm.value == viaje)!.price}
            </p>
            <p className="mt-4">Total: {calculateTotal()}</p>
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
