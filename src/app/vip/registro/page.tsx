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
  FormDatePicker,
} from "@/components/formComponents";
import data from "../utils/data.json";

type FormData = Record<string, unknown>;

export default function Registro() {
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setFormData] = useState<FormData | null>(null);
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [viaje, setViaje] = useState<string>("sd-quito");
  const [hora, setHora] = useState<string>("");
  const [asiento, setAsiento] = useState<number>(1);
  const [fechaViaje, setFechaViaje] = useState<Date>();

  const paquetes = data.paquetes;
  const asientos = data.asientos;
  const horas = data.horas;

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden bg-card">
        {/* Header con imagen */}
        <PageImageHeader
          imageUrl="/vip.jpeg"
          altText="Encabezado minimalista"
        />
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-6">
          {/* Título */}
          <PageHeader
            title="Registro"
            subtitle="Este formulario solo se llenará la primera vez"
          />
          <DebugInfo
            queryParams={queryParams}
            debug={queryParams.debug === "true"}
          />
          <p className="text-lg font-bold">1 Registra tus datos</p>
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
            label="Número de cédula"
            type="text"
            required
            placeholder="Número"
          />
          <FormInput
            id="recomend"
            name="recomend"
            label="¿Quién nos recomendó?"
            type="text"
            required
            placeholder="Nombre,instagram,redes sociales"
          />
          <FileUploader
            id="comprobante"
            name="comprobante"
            label="Foto con tu cédula"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize="10MB"
            onChange={(file) => setComprobanteFile(file)}
          />
          <p className="text-lg font-bold border-t border-accent pt-4">
            2 Selecciona tu viaje
          </p>
          <FormSelect
            id="viaje"
            name="Viaje"
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
            id="hora"
            name="hora"
            label="⏰️ Hora del viaje"
            options={horas}
            required
            value={hora}
            onValueChange={setHora}
            dependsOnValue={viaje}
          />
          <FormSelect
            id="asientos"
            name="asientos"
            label="🪑 Asientos para reservar"
            options={asientos}
            onValueChange={(value) => setAsiento(Number(value))}
            required
          />
          <div className="border p-4 mt-4">
            <p className="mt-4">
              Costo del viaje:{" "}
              {paquetes.find((elm) => elm.value == viaje)!.price}
            </p>
            <p className="">Total de asientos: {asiento}</p>
            <p className="mt-2">Total a pagar: {calculateTotal()}</p>
          </div>
          <p className="text-lg font-bold border-t border-accent pt-4">
            3 Envía tu comprobante de pago
          </p>
          <div className="border p-4 mt-8">
            <p className="text-xl mb-2">Datos para transferencia bancaria</p>
            <p>
              <strong>Titular:</strong> David Chaves
            </p>
            <p>
              <strong>Cuenta de Ahorros:</strong> 2208489255
            </p>
            <p>
              <strong>Banco:</strong> Pichincha
            </p>
            <p>
              <strong>Cédula:</strong> 1724650310
            </p>
            <p>
              <strong>Teléfono:</strong> 096 137 2106
            </p>
          </div>
          <FileUploader
            id="comprobantepago"
            name="comprobantepago"
            label="Comprobante de pago"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize="10MB"
            onChange={(file) => setComprobanteFile(file)}
          />

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
