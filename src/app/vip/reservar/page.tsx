"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

// Esquema de validación simple
const formSchema = z.object({
  viaje: z.string().min(1, "Selecciona un viaje"),
  hora: z
    .string({ error: "Selecciona una hora de viaje" })
    .min(1, "Selecciona una hora"),
  asientos: z.string().min(1, "Selecciona número de asientos"),
  fechaViaje: z.string().min(1, "Selecciona una fecha"),
});

type FormData = z.infer<typeof formSchema>;

export default function Reservar() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  // Configuración del formulario
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      viaje: "sd-quito",
      asientos: "1",
    },
  });

  const { paquetes, asientos, horas } = data;

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

  const calculateTotal = (): number => {
    const selectedTrip = watch("viaje");
    const seatCount = Number(watch("asientos"));
    const trip = paquetes.find((p) => p.value === selectedTrip);
    return trip ? trip.price * seatCount : 0;
  };

  const handleDateChange = (date: Date | undefined) => {
    const dateString = date?.toISOString().split("T")[0] || "";
    setSelectedDate(dateString);
    setValue("fechaViaje", dateString, { shouldValidate: true });
  };
  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setValue(field, value, { shouldValidate: true });

    // Reiniciar hora cuando cambie el viaje
    if (field === "viaje") {
      setValue("hora", "");
    }
  };
  const onSubmit = async (formData: FormData) => {
    setErrorMessage("");
    try {
      let URL = "https://vip-cars-n8n.omm9hu.easypanel.host/webhook/viaje";
      const payload = new FormData();

      // 1. Agregar datos del formulario
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      // 2. Agregar datos calculados
      payload.append("total", calculateTotal().toString());
      payload.append(
        "precioUnitario",
        paquetes.find((p) => p.value === formData.viaje)?.price.toString() ||
          "0"
      );

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
      // 4. Enviar todo en una sola petición
      const response = await fetch(URL, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      // ✅ Éxito - mostrar pantalla de agradecimiento
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error al enviar formulario:", error);

      // 🔥 Usar setError de react-hook-form para errores específicos
      if (error instanceof Error && error.message.includes("400")) {
        setError("root", { message: "Revisa los datos ingresados" });
      }
      // Error general
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error al enviar el formulario. Intenta nuevamente."
      );
    }
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pb-6 pt-4 space-y-6"
        >
          <PageHeader title="Reserva un viaje" subtitle="" />
          <FormSelect
            label="🚗 Viaje"
            options={paquetes}
            value={watch("viaje")}
            onValueChange={handleSelectChange("viaje")}
            error={errors.viaje?.message}
            disabled={isSubmitting}
          />
          <FormDatePicker
            label="📅 Fecha del viaje"
            placeholder="Selecciona la fecha"
            value={selectedDate}
            onChange={handleDateChange}
            error={errors.fechaViaje?.message}
            disabled={isSubmitting}
            registerProps={register("fechaViaje")}
          />
          <FormSelect
            label="⏰ Hora del viaje"
            options={horas}
            value={watch("hora")}
            onValueChange={handleSelectChange("hora")}
            error={errors.hora?.message}
            dependsOnValue={watch("viaje")}
            disabled={isSubmitting}
          />

          <FormSelect
            label="🪑 Número de asientos"
            options={asientos}
            value={watch("asientos")}
            onValueChange={handleSelectChange("asientos")}
            error={errors.asientos?.message}
            disabled={isSubmitting}
          />
          <div className="border p-4 rounded bg-accent">
            <p className="font-semibold mb-2">Resumen:</p>
            <p>
              Precio por asiento: $
              {paquetes.find((p) => p.value === watch("viaje"))?.price || 0}
            </p>
            <p>Asientos: {watch("asientos")}</p>
            <p className="font-bold text-lg">Total: ${calculateTotal()}</p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting} // 🎯 Usar isSubmitting
            className={`
              w-full h-12 text-lg font-semibold transition-all duration-200
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed opacity-75"
                  : "btn hover:scale-[1.02] active:scale-[0.98]"
              }
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                {/* Spinner animado */}
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Enviando solicitud...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>🚀</span>
                <span>Enviar solicitud</span>
              </div>
            )}
          </Button>
          {/* 🔥 Mensaje de error */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    ⚠️ Error al enviar
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    Contactate por medio de Whatsapp
                  </p>
                </div>
              </div>
            </div>
          )}

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
