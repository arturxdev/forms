# FormInput Component

Un componente de input reutilizable y configurable para formularios.

## Características

- ✅ Input con label integrado
- ✅ Soporte para iconos (izquierda o derecha)
- ✅ Manejo de errores
- ✅ Estilos personalizables
- ✅ Tipos de input soportados: text, email, tel, password, number, url
- ✅ Indicador de campo requerido automático
- ✅ Eventos personalizables (onChange, onBlur, onFocus)

## Uso Básico

```tsx
import { FormInput } from "@/components/formComponents/formInput";

// Input básico
<FormInput
  id="nombre"
  name="nombre"
  label="Nombre"
  type="text"
  required
  placeholder="Tu nombre"
/>

// Input con icono
<FormInput
  id="email"
  name="email"
  label="Email"
  type="email"
  required
  placeholder="tu@correo.com"
  icon={Mail}
/>

// Input con icono a la derecha
<FormInput
  id="password"
  name="password"
  label="Contraseña"
  type="password"
  required
  icon={Eye}
  iconPosition="right"
/>

// Input con error
<FormInput
  id="telefono"
  name="telefono"
  label="Teléfono"
  type="tel"
  required
  error="El teléfono debe tener 10 dígitos"
/>
```

## Props

| Prop             | Tipo                                                            | Default  | Descripción                     |
| ---------------- | --------------------------------------------------------------- | -------- | ------------------------------- |
| `id`             | `string`                                                        | -        | ID único del input (requerido)  |
| `name`           | `string`                                                        | -        | Nombre del campo (requerido)    |
| `label`          | `string`                                                        | -        | Texto del label (requerido)     |
| `type`           | `'text' \| 'email' \| 'tel' \| 'password' \| 'number' \| 'url'` | `'text'` | Tipo de input                   |
| `placeholder`    | `string`                                                        | -        | Texto de placeholder            |
| `required`       | `boolean`                                                       | `false`  | Si el campo es requerido        |
| `disabled`       | `boolean`                                                       | `false`  | Si el input está deshabilitado  |
| `className`      | `string`                                                        | -        | Clases CSS para el contenedor   |
| `inputClassName` | `string`                                                        | -        | Clases CSS para el input        |
| `labelClassName` | `string`                                                        | -        | Clases CSS para el label        |
| `icon`           | `LucideIcon`                                                    | -        | Icono de Lucide React           |
| `iconPosition`   | `'left' \| 'right'`                                             | `'left'` | Posición del icono              |
| `error`          | `string`                                                        | -        | Mensaje de error a mostrar      |
| `value`          | `string`                                                        | -        | Valor controlado del input      |
| `onChange`       | `function`                                                      | -        | Callback cuando cambia el valor |
| `onBlur`         | `function`                                                      | -        | Callback cuando pierde el foco  |
| `onFocus`        | `function`                                                      | -        | Callback cuando gana el foco    |

## Estilos Personalizables

El componente incluye estilos por defecto que puedes personalizar:

```tsx
<FormInput
  id="custom"
  name="custom"
  label="Campo Personalizado"
  className="mb-4" // Clases para el contenedor
  inputClassName="border-blue-500" // Clases para el input
  labelClassName="text-blue-600 font-bold" // Clases para el label
/>
```

## Ejemplos de Uso en el Proyecto

Este componente se usa en `ContactForm.tsx` para todos los campos de texto:

- Nombre y Apellido
- Email (con icono de Mail)
- Teléfono (con icono de Flag)
- Número de identificación
- Estrato
- Dirección
- Departamento y Municipio

## Ventajas

1. **Reutilizable**: Un solo componente para todos los inputs de texto
2. **Configurable**: Múltiples props para personalizar comportamiento y apariencia
3. **Consistente**: Estilos uniformes en toda la aplicación
4. **Mantenible**: Cambios de estilo centralizados en un lugar
5. **Accesible**: Labels y IDs correctamente vinculados
6. **Tipado**: TypeScript completo con interfaces bien definidas
