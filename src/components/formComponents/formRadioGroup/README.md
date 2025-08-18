# FormRadioGroup

Un componente de radio button personalizado usando Shadcn UI con estado controlado.

## Características

- ✅ Estado controlado con React useState
- ✅ Estilos consistentes con Shadcn UI
- ✅ Opciones personalizables
- ✅ Hover effects y transiciones
- ✅ Responsive design
- ✅ Accesibilidad completa
- ✅ Fácil integración con formularios

## Uso

```tsx
import { FormRadioGroup } from "@/components/formComponents/formRadioGroup";
import { useState } from "react";

const [selectedValue, setSelectedValue] = useState("");

const options = [
  { value: "opcion1", label: "Opción 1" },
  { value: "opcion2", label: "Opción 2" },
  { value: "opcion3", label: "Opción 3" },
];

<FormRadioGroup
  name="miCampo"
  label="Selecciona una opción"
  options={options}
  required
  description="Descripción opcional del campo"
  value={selectedValue}
  onChange={setSelectedValue}
/>
```

## Props

| Prop          | Tipo            | Requerido | Descripción                               |
| ------------- | --------------- | --------- | ----------------------------------------- |
| `name`        | `string`        | ✅        | Nombre del campo en el formulario         |
| `label`       | `string`        | ✅        | Etiqueta visible del campo                |
| `options`     | `RadioOption[]` | ✅        | Array de opciones disponibles             |
| `required`    | `boolean`       | ❌        | Si el campo es requerido (default: false) |
| `description` | `string`        | ❌        | Descripción opcional del campo            |
| `value`       | `string`        | ❌        | Valor seleccionado actualmente            |
| `onChange`    | `function`      | ❌        | Función llamada cuando cambia la selección |

## RadioOption Interface

```tsx
interface RadioOption {
  value: string;
  label: string;
}
```

## Requisitos

- Shadcn UI debe estar instalado
- El componente usa estado local de React

## Ejemplos

Ver `examples.tsx` para ejemplos completos de uso con estado controlado.
