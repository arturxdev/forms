# FormSelect Component

Un componente de select reutilizable y configurable para formularios que recibe opciones en un array de objetos.

## Características

- ✅ Select con label integrado
- ✅ Opciones recibidas en array de objetos
- ✅ Soporte para iconos (izquierda o derecha)
- ✅ Manejo de errores
- ✅ Estilos personalizables
- ✅ Flecha personalizada
- ✅ Indicador de campo requerido automático
- ✅ Eventos personalizables (onChange, onBlur, onFocus)
- ✅ Opciones deshabilitadas

## Estructura de las Opciones

```typescript
interface SelectOption {
  value: string;      // Valor del option
  label: string;      // Texto visible del option
  disabled?: boolean; // Si la opción está deshabilitada
}
```

## Uso Básico

```tsx
import { FormSelect } from "@/components/formComponents/formSelect";

// Opciones básicas
const paquetes = [
  { value: "especial", label: "🔸 PLAN ESPECIAL – 15 Mbps – $55,000" },
  { value: "mini", label: "🔸 PLAN MINI – 17 Mbps – $60,000" },
  { value: "personal", label: "🔸 PERSONAL – 25 Mbps – $65,000" },
];

// Select básico
<FormSelect
  id="paquete"
  name="paquete"
  label="Paquete a contratar"
  options={paquetes}
  required
  placeholder="Selecciona un paquete"
/>

// Select con icono
<FormSelect
  id="categoria"
  name="categoria"
  label="Categoría"
  options={categorias}
  icon={Package}
  required
/>

// Select con opciones deshabilitadas
const opcionesConDisabled = [
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo", disabled: true },
  { value: "pendiente", label: "Pendiente" },
];

<FormSelect
  id="estado"
  name="estado"
  label="Estado"
  options={opcionesConDisabled}
  required
/>
```

## Props

| Prop              | Tipo                                                           | Default  | Descripción                           |
| ----------------- | -------------------------------------------------------------- | --------- | ------------------------------------- |
| `id`              | `string`                                                       | -         | ID único del select (requerido)       |
| `name`            | `string`                                                       | -         | Nombre del campo (requerido)          |
| `label`           | `string`                                                       | -         | Texto del label (requerido)           |
| `options`         | `SelectOption[]`                                               | -         | Array de opciones (requerido)         |
| `placeholder`     | `string`                                                       | -         | Texto del placeholder                 |
| `required`        | `boolean`                                                      | `false`   | Si el campo es requerido              |
| `disabled`        | `boolean`                                                      | `false`   | Si el select está deshabilitado      |
| `className`       | `string`                                                       | -         | Clases CSS para el contenedor         |
| `selectClassName` | `string`                                                       | -         | Clases CSS para el select             |
| `labelClassName`  | `string`                                                       | -         | Clases CSS para el label              |
| `icon`            | `LucideIcon`                                                   | -         | Icono de Lucide React                 |
| `iconPosition`    | `'left' \| 'right'`                                            | `'left'`  | Posición del icono                    |
| `error`           | `string`                                                       | -         | Mensaje de error a mostrar            |
| `value`           | `string`                                                       | -         | Valor controlado del select           |
| `onChange`        | `function`                                                     | -         | Callback cuando cambia el valor       |
| `onBlur`          | `function`                                                     | -         | Callback cuando pierde el foco        |
| `onFocus`         | `function`                                                     | -         | Callback cuando gana el foco          |

## Estilos Personalizables

El componente incluye estilos por defecto que puedes personalizar:

```tsx
<FormSelect
  id="custom"
  name="custom"
  label="Select Personalizado"
  options={opciones}
  className="mb-4" // Clases para el contenedor
  selectClassName="border-blue-500" // Clases para el select
  labelClassName="text-blue-600 font-bold" // Clases para el label
/>
```

## Ejemplos de Uso en el Proyecto

Este componente se puede usar en `ContactForm.tsx` para reemplazar el select de paquetes:

```tsx
const paquetes = [
  { value: "especial", label: "🔸 PLAN ESPECIAL – 15 Mbps – $55,000" },
  { value: "mini", label: "🔸 PLAN MINI – 17 Mbps – $60,000" },
  { value: "personal", label: "🔸 PERSONAL – 25 Mbps – $65,000" },
  { value: "familiar_streaming", label: "🔸 PLAN FAMILIAR Streaming – 27 Mbps – $80,000" },
  { value: "hogar_duo_streaming", label: "🔸 HOGAR DUO Streaming – 30 Mbps – $130,000" },
  { value: "duo_mini", label: "🔸 PLAN DUO MINI – 32 Mbps –$65.000" },
  { value: "duo_mini_dos_casas", label: "🔸 DUO MINI – 34 Mbps – $65,000 DOS CASAS" },
  { value: "hogar_duo_streaming_dos_casas", label: "🔸 PLAN HOGAR DUO Streaming – 36 Mbps – $130,000 DOS CASAS" },
  { value: "duplex", label: "🔸 PLAN DUPLEX – 40 Mbps – $100,000" },
];

<FormSelect
  id="paquete"
  name="paquete"
  label="Paquete a contratar"
  options={paquetes}
  required
  placeholder="Selecciona un paquete"
/>
```

## Ventajas

1. **Reutilizable**: Un solo componente para todos los selects
2. **Configurable**: Múltiples props para personalizar comportamiento y apariencia
3. **Consistente**: Estilos uniformes en toda la aplicación
4. **Mantenible**: Cambios de estilo centralizados en un lugar
5. **Accesible**: Labels y IDs correctamente vinculados
6. **Tipado**: TypeScript completo con interfaces bien definidas
7. **Flexible**: Opciones recibidas en array de objetos para fácil mantenimiento
8. **Iconos**: Soporte para iconos de Lucide React 