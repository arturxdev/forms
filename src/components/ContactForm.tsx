"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUploader } from "@/components/formComponents/fileUploader";
import { Mail, Flag } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const URL =
      "https://n8n.srv955856.hstgr.cloud/webhook-test/9384b209-5dff-4fce-8d8b-c60f6e1c4944";
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
    const data = Object.fromEntries(formData);
    console.log(data);

    alert(
      `¡Gracias, ${data.nombre} ${data.apellido}!\nNos pondremos en contacto a: ${data.email}`
    );
  };

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
            Contratación
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Información del contratante
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-6">
          {/* Primera fila - Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-zinc-800">
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                className="rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido" className="text-zinc-800">
                Apellido <span className="text-red-500">*</span>
              </Label>
              <Input
                id="apellido"
                name="apellido"
                type="text"
                required
                placeholder="Tu apellido"
                className="rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
              />
            </div>
          </div>

          {/* Segunda fila - Email y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-800">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  className="pl-10 rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-zinc-800">
                Teléfono <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  placeholder="+57 300 123 4567"
                  className="pl-10 rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                />
              </div>
            </div>
          </div>

          {/* Tercera fila - Número de identificación y Estrato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="identificacion" className="text-zinc-800">
                Número de identificación <span className="text-red-500">*</span>
              </Label>
              <Input
                id="identificacion"
                name="identificacion"
                type="text"
                required
                placeholder="CC 12345678"
                className="rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estrato" className="text-zinc-800">
                Estrato <span className="text-red-500">*</span>
              </Label>
              <Input
                id="estrato"
                name="estrato"
                type="text"
                required
                placeholder="1, 2, 3, 4, 5, 6"
                className="rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
              />
            </div>
          </div>

          {/* Cuarta fila - Dirección (ancho completo) */}
          <div className="space-y-2">
            <Label htmlFor="direccion" className="text-zinc-800">
              Dirección <span className="text-red-500">*</span>
            </Label>
            <Input
              id="direccion"
              name="direccion"
              type="text"
              required
              placeholder="Calle 123 # 45-67, Ciudad"
              className="rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
            />
          </div>

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
            <div className="space-y-2 mb-6">
              <Label htmlFor="direccionServicio" className="text-zinc-800">
                Dirección del servicio <span className="text-red-500">*</span>
              </Label>
              <Input
                id="direccionServicio"
                name="direccionServicio"
                type="text"
                required
                placeholder="Calle 123 # 45-67, Ciudad"
                className="rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
              />
            </div>

            {/* Departamento y Municipio (2 columnas) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="departamento" className="text-zinc-800">
                  Departamento <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="departamento"
                  name="departamento"
                  type="text"
                  required
                  placeholder="Ej. Antioquia"
                  className="rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="municipio" className="text-zinc-800">
                  Municipio <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="municipio"
                  name="municipio"
                  type="text"
                  required
                  placeholder="Ej. Medellín"
                  className="rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                />
              </div>
            </div>

            {/* Paquete a contratar (ancho completo) */}
            <div className="space-y-2">
              <Label htmlFor="paquete" className="text-zinc-800">
                Paquete a contratar <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-1 h-1 bg-zinc-400 rounded-full mb-1"></div>
                  <div className="w-1 h-1 bg-zinc-400 rounded-full mb-1"></div>
                  <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                </div>
                <select
                  id="paquete"
                  name="paquete"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-10 py-2.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 appearance-none cursor-pointer"
                >
                  <option value="">Selecciona un paquete</option>
                  <option value="especial">
                    🔸 PLAN ESPECIAL – 15 Mbps – $55,000
                  </option>
                  <option value="mini">🔸 PLAN MINI – 17 Mbps – $60,000</option>
                  <option value="personal">
                    🔸 PERSONAL – 25 Mbps – $65,000
                  </option>
                  <option value="familiar_streaming">
                    🔸 PLAN FAMILIAR Streaming – 27 Mbps – $80,000
                  </option>
                  <option value="hogar_duo_streaming">
                    🔸 HOGAR DUO Streaming – 30 Mbps – $130,000
                  </option>
                  <option value="duo_mini">
                    🔸 PLAN DUO MINI – 32 Mbps –$65.000
                  </option>
                  <option value="duo_mini_dos_casas">
                    🔸 DUO MINI – 34 Mbps – $65,000 DOS CASAS
                  </option>
                  <option value="hogar_duo_streaming_dos_casas">
                    🔸 PLAN HOGAR DUO Streaming – 36 Mbps – $130,000 DOS CASAS
                  </option>
                  <option value="duplex">
                    🔸 PLAN DUPLEX – 40 Mbps – $100,000
                  </option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

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
