import React from "react";
import { FormSelect } from "./FormSelect";
import { Package, Globe, User, Building } from "lucide-react";

// Ejemplos de diferentes tipos de opciones para selects

export const SelectExamples = () => {
  // Ejemplo 1: Paquetes de internet (como en ContactForm)
  const paquetesInternet = [
    { value: "basico", label: "🔸 PLAN BÁSICO – 10 Mbps – $45,000" },
    { value: "estandar", label: "🔸 PLAN ESTÁNDAR – 20 Mbps – $65,000" },
    { value: "premium", label: "🔸 PLAN PREMIUM – 50 Mbps – $95,000" },
    {
      value: "empresarial",
      label: "🔸 PLAN EMPRESARIAL – 100 Mbps – $150,000",
    },
  ];

  // Ejemplo 2: Países con iconos
  const paises = [
    { value: "colombia", label: "🇨🇴 Colombia" },
    { value: "mexico", label: "🇲🇽 México" },
    { value: "argentina", label: "🇦🇷 Argentina" },
    { value: "chile", label: "🇨🇱 Chile" },
    { value: "peru", label: "🇵🇪 Perú" },
  ];

  // Ejemplo 3: Estados con opciones deshabilitadas
  const estados = [
    { value: "activo", label: "✅ Activo" },
    { value: "inactivo", label: "❌ Inactivo", disabled: true },
    { value: "pendiente", label: "⏳ Pendiente" },
    { value: "suspendido", label: "⏸️ Suspendido" },
  ];

  // Ejemplo 4: Categorías de productos
  const categorias = [
    { value: "tecnologia", label: "💻 Tecnología" },
    { value: "ropa", label: "👕 Ropa" },
    { value: "hogar", label: "🏠 Hogar" },
    { value: "deportes", label: "⚽ Deportes" },
    { value: "libros", label: "📚 Libros" },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-zinc-900">
        Ejemplos de FormSelect
      </h1>

      {/* Ejemplo 1: Select básico */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-800">
          1. Select Básico
        </h2>
        <FormSelect
          id="paquete-basico"
          name="paquete-basico"
          label="Paquete de Internet"
          options={paquetesInternet}
          required
          placeholder="Selecciona un paquete"
        />
      </div>

      {/* Ejemplo 2: Select con icono */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-800">
          2. Select con Icono
        </h2>
        <FormSelect
          id="pais"
          name="pais"
          label="País de residencia"
          options={paises}
          icon={Globe}
          required
          placeholder="Selecciona tu país"
        />
      </div>

      {/* Ejemplo 3: Select con opciones deshabilitadas */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-800">
          3. Select con Opciones Deshabilitadas
        </h2>
        <FormSelect
          id="estado"
          name="estado"
          label="Estado de la cuenta"
          options={estados}
          icon={User}
          required
          placeholder="Selecciona el estado"
        />
      </div>

      {/* Ejemplo 4: Select personalizado */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-800">
          4. Select Personalizado
        </h2>
        <FormSelect
          id="categoria"
          name="categoria"
          label="Categoría del producto"
          options={categorias}
          icon={Package}
          iconPosition="right"
          className="max-w-md"
          selectClassName="border-blue-500 focus:border-blue-600 focus:ring-blue-500/20"
          labelClassName="text-blue-700 font-semibold"
          required
          placeholder="Elige una categoría"
        />
      </div>

      {/* Ejemplo 5: Select con error */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-800">
          5. Select con Error
        </h2>
        <FormSelect
          id="departamento"
          name="departamento"
          label="Departamento"
          options={[
            { value: "antioquia", label: "Antioquia" },
            { value: "cundinamarca", label: "Cundinamarca" },
            { value: "valle", label: "Valle del Cauca" },
          ]}
          icon={Building}
          error="Debes seleccionar un departamento válido"
          required
          placeholder="Selecciona un departamento"
        />
      </div>
    </div>
  );
};
