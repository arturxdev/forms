"use client";
import { Button } from "@/components/ui/button";
import { ThankYouScreen } from "@/components/formComponents/thankYouScreen";
import { useEffect, useState } from "react";
import {
  FormSelect,
  FormDatePicker,
  PageHeader,
  PageImageHeader,
  DebugInfo,
} from "@/components/formComponents";
import data from "../utils/data.json";

type FormData = Record<string, unknown>;

export default function Reservar() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setFormData] = useState<FormData | null>(null);
  const [viaje, setViaje] = useState<string>("sd-quito");
  const [hora, setHora] = useState<string>("");
  const [asiento, setAsiento] = useState<number>(1);
  const [fechaViaje, setFechaViaje] = useState<Date>();
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

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
  const calculateTotal = () => {
    const price = paquetes.find((elm) => elm.value == viaje)!.price;
    return price * asiento;
  };
  // Opciones para el select de paquetes
  const paquetes = data.paquetes;
  const asientos = data.asientos;
  const horas = data.horas;

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden bg-card">
        {/* Header con imagen */}
        <PageImageHeader
          altText="Encabezado minimalista"
          imageUrl="/logo-vip.jpeg"
        />
        <DebugInfo
          queryParams={queryParams}
          debug={queryParams.debug === "true"}
        />
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-6">
          {/* Nueva sección - Dirección donde se instalará el servicio */}
          <PageHeader title="Reserva un viaje" subtitle="" />
          <FormSelect
            label="🚗 Viaje"
            options={paquetes}
            required
            value={viaje}
            onValueChange={(newViaje) => {
              setViaje(newViaje);
              // Reiniciar hora si ya no aplica para el nuevo viaje
              setHora("");
            }}
          />
          <FormDatePicker
            id="fechaViaje"
            name="fechaViaje"
            label="📅 Fecha del viaje"
            placeholder="Selecciona la fecha"
            required
            value={fechaViaje}
            onChange={setFechaViaje}
          />
          <FormSelect
            label="⏰️ Hora del viaje"
            options={horas}
            required
            value={hora}
            onValueChange={setHora}
            dependsOnValue={viaje}
          />

          <FormSelect
            label="🪑 Asientos para reservar"
            options={asientos}
            onValueChange={(value) => setAsiento(Number(value))}
            required
          />
          <div className="border p-4 mt-4">
            <p>
              Costo del viaje:{" "}
              {paquetes.find((elm) => elm.value == viaje)!.price}
            </p>
            <p className="">Total de asientos: {asiento}</p>
            <p className="mt-2 font-bold">Total a pagar: {calculateTotal()}</p>
          </div>

          <Button type="submit" className="btn">
            Enviar solicitud
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
