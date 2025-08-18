import { FormRadioGroup } from "./index";
import { useState } from "react";

export function FormRadioGroupExamples() {
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [horario, setHorario] = useState("");

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
  ];

  const metodosPago = [
    { value: "efectivo", label: "💵 Efectivo" },
    { value: "transferencia", label: "🏦 Transferencia bancaria" },
    { value: "tarjeta", label: "💳 Tarjeta de crédito/débito" },
    { value: "nequi", label: "📱 Nequi" },
    { value: "daviplata", label: "📱 DaviPlata" },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Ejemplo: Paquetes de Internet
        </h3>
        <FormRadioGroup
          name="paquete"
          label="Selecciona tu paquete"
          options={paquetes}
          required
          description="Elige el plan que mejor se adapte a tus necesidades"
          value={paqueteSeleccionado}
          onChange={setPaqueteSeleccionado}
        />
        {paqueteSeleccionado && (
          <p className="text-sm text-zinc-600 mt-2">
            Seleccionaste:{" "}
            <strong>
              {paquetes.find((p) => p.value === paqueteSeleccionado)?.label}
            </strong>
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Ejemplo: Métodos de Pago</h3>
        <FormRadioGroup
          name="metodoPago"
          label="Método de pago preferido"
          options={metodosPago}
          description="Selecciona cómo prefieres realizar el pago"
          value={metodoPago}
          onChange={setMetodoPago}
        />
        {metodoPago && (
          <p className="text-sm text-zinc-600 mt-2">
            Método seleccionado:{" "}
            <strong>
              {metodosPago.find((m) => m.value === metodoPago)?.label}
            </strong>
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Ejemplo: Horarios de Instalación
        </h3>
        <FormRadioGroup
          name="horario"
          label="Horario preferido para instalación"
          options={[
            { value: "manana", label: "🌅 Mañana (8:00 AM - 12:00 PM)" },
            { value: "tarde", label: "☀️ Tarde (1:00 PM - 5:00 PM)" },
            { value: "noche", label: "🌙 Noche (6:00 PM - 8:00 PM)" },
          ]}
          required
          value={horario}
          onChange={setHorario}
        />
        {horario && (
          <p className="text-sm text-zinc-600 mt-2">
            Horario seleccionado:{" "}
            <strong>
              {horario === "manana"
                ? "Mañana"
                : horario === "tarde"
                ? "Tarde"
                : "Noche"}
            </strong>
          </p>
        )}
      </div>
    </div>
  );
}
