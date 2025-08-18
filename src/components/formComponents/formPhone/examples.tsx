import React, { useState } from "react";
import { FormPhone } from "./FormPhone";

export const FormPhoneExamples: React.FC = () => {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [phone4, setPhone4] = useState("");
  const [validationStatus, setValidationStatus] = useState<boolean>(true);

  return (
    <div className="space-y-8 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-zinc-900">FormPhone Examples</h2>

      {/* Ejemplo básico */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">Ejemplo Básico</h3>
        <FormPhone
          id="phone-basic"
          name="phone-basic"
          label="Teléfono Básico"
          placeholder="+57 300 123 4567"
          value={phone1}
          onChange={(e) => setPhone1(e.target.value)}
        />
      </div>

      {/* Ejemplo con código de país personalizado */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">
          Con Código de País Personalizado
        </h3>
        <FormPhone
          id="phone-us"
          name="phone-us"
          label="Teléfono US"
          countryCode="+1"
          placeholder="+1 555 123 4567"
          value={phone2}
          onChange={(e) => setPhone2(e.target.value)}
        />
        <p className="text-sm text-zinc-600">
          Código de país configurado para Estados Unidos (+1)
        </p>
      </div>

      {/* Ejemplo con callback de validación */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">
          Con Callback de Validación
        </h3>
        <FormPhone
          id="phone-validation"
          name="phone-validation"
          label="Teléfono con Validación"
          placeholder="+57 300 123 4567"
          value={phone3}
          onChange={(e) => setPhone3(e.target.value)}
          onValidationChange={(isValid) => setValidationStatus(isValid)}
        />
        <div className="p-3 rounded-lg bg-zinc-100">
          <p className="text-sm text-zinc-700">
            Estado de validación:{" "}
            <span
              className={`font-semibold ${
                validationStatus ? "text-green-600" : "text-red-600"
              }`}
            >
              {validationStatus ? "Válido" : "Inválido"}
            </span>
          </p>
        </div>
      </div>

      {/* Ejemplo con longitudes personalizadas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">
          Con Longitudes Personalizadas
        </h3>
        <FormPhone
          id="phone-custom-length"
          name="phone-custom-length"
          label="Teléfono Corto"
          minLength={8}
          maxLength={10}
          placeholder="+57 300 1234"
          value={phone4}
          onChange={(e) => setPhone4(e.target.value)}
        />
        <p className="text-sm text-zinc-600">
          Longitud mínima: 8, máxima: 10 dígitos
        </p>
      </div>

      {/* Ejemplo sin mensajes de validación */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">
          Sin Mensajes de Validación
        </h3>
        <FormPhone
          id="phone-no-messages"
          name="phone-no-messages"
          label="Teléfono Sin Mensajes"
          placeholder="+57 300 123 4567"
          showValidationMessage={false}
        />
        <p className="text-sm text-zinc-600">
          Este campo no muestra mensajes de validación automáticos
        </p>
      </div>

      {/* Ejemplo con error personalizado */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">
          Con Error Personalizado
        </h3>
        <FormPhone
          id="phone-custom-error"
          name="phone-custom-error"
          label="Teléfono con Error Personalizado"
          placeholder="+57 300 123 4567"
          error="Este número ya está registrado en el sistema"
        />
      </div>

      {/* Información sobre validaciones */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">
          Validaciones Incluidas
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Formato de número de teléfono internacional</li>
          <li>• Longitud mínima y máxima configurable</li>
          <li>• Solo permite números y el símbolo +</li>
          <li>• Validación de código de país</li>
          <li>• Formateo automático con espacios</li>
          <li>• Validación en tiempo real y al perder el foco</li>
        </ul>
      </div>

      {/* Información sobre formateo */}
      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
        <h4 className="font-semibold text-green-900 mb-2">
          Formateo Automático
        </h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Agrega código de país si no está presente</li>
          <li>• Inserta espacios para mejor legibilidad</li>
          <li>• Limpia caracteres no válidos</li>
          <li>• Mantiene formato consistente</li>
        </ul>
      </div>
    </div>
  );
}; 