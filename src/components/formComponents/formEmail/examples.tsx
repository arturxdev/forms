import React, { useState } from "react";
import { FormEmail } from "./FormEmail";

export const FormEmailExamples: React.FC = () => {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [email3, setEmail3] = useState("");
  const [validationStatus, setValidationStatus] = useState<boolean>(true);

  return (
    <div className="space-y-8 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-zinc-900">FormEmail Examples</h2>

      {/* Ejemplo básico */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">Ejemplo Básico</h3>
        <FormEmail
          label="Email Básico"
          placeholder="tu@correo.com"
          value={email1}
          onChange={(e) => setEmail1(e.target.value)}
        />
      </div>

      {/* Ejemplo con callback de validación */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">
          Con Callback de Validación
        </h3>
        <FormEmail
          label="Email con Validación"
          placeholder="email@ejemplo.com"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
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

      {/* Ejemplo sin mensajes de validación */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-800">
          Sin Mensajes de Validación
        </h3>
        <FormEmail
          label="Email Sin Mensajes"
          placeholder="email@dominio.com"
          value={email3}
          onChange={(e) => setEmail3(e.target.value)}
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
        <FormEmail
          label="Email con Error Personalizado"
          placeholder="email@ejemplo.com"
          error="Este email ya está registrado en el sistema"
        />
      </div>

      {/* Información sobre validaciones */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">
          Validaciones Incluidas
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Formato básico de email (usuario@dominio.com)</li>
          <li>• Longitud máxima de 254 caracteres</li>
          <li>• Dominio mínimo de 2 caracteres</li>
          <li>• No permite caracteres especiales inválidos</li>
          <li>• Validación en tiempo real y al perder el foco</li>
        </ul>
      </div>
    </div>
  );
};
