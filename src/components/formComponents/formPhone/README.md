# FormPhone Component

Un componente de formulario especializado para la entrada de números de teléfono con validación automática y formateo.

## Características

- **Validación automática**: Valida el formato del teléfono en tiempo real
- **Formateo automático**: Agrega código de país y formatea números
- **Validación estricta**: Incluye validaciones de longitud, formato y caracteres
- **Icono integrado**: Incluye automáticamente el icono de Phone
- **Mensajes de error**: Muestra mensajes de error específicos para teléfonos
- **Callback de validación**: Proporciona feedback sobre el estado de validación
- **Configuración flexible**: Permite personalizar códigos de país y longitudes
- **Hereda de FormInput**: Mantiene toda la funcionalidad del componente base

## Uso

```tsx
import { FormPhone } from '@/components/formComponents';

// Uso básico
<FormPhone
  id="telefono"
  name="telefono"
  label="Teléfono"
  required
  placeholder="+57 300 123 4567"
/>

// Con código de país personalizado
<FormPhone
  id="telefono"
  name="telefono"
  label="Teléfono"
  countryCode="+1"
  placeholder="+1 555 123 4567"
/>

// Con callback de validación
<FormPhone
  id="telefono"
  name="telefono"
  label="Teléfono"
  onValidationChange={(isValid) => console.log('Teléfono válido:', isValid)}
/>

// Con longitudes personalizadas
<FormPhone
  id="telefono"
  name="telefono"
  label="Teléfono"
  minLength={10}
  maxLength={12}
/>
```

## Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onValidationChange` | `(isValid: boolean) => void` | Callback que se ejecuta cuando cambia el estado de validación |
| `showValidationMessage` | `boolean` | Controla si se muestran los mensajes de validación (por defecto: true) |
| `countryCode` | `string` | Código de país por defecto (por defecto: "+57") |
| `allowInternational` | `boolean` | Permite números internacionales (por defecto: true) |
| `minLength` | `number` | Longitud mínima del número (por defecto: 7) |
| `maxLength` | `number` | Longitud máxima del número (por defecto: 15) |

Además, hereda todas las props de `FormInput` excepto `type` e `icon` que están fijos.

## Validaciones

El componente incluye las siguientes validaciones:

1. **Longitud**: Verifica que esté entre `minLength` y `maxLength`
2. **Caracteres**: Solo permite números y el símbolo `+`
3. **Formato**: Valida que tenga un código de país válido
4. **Estructura**: Verifica que no sea solo el símbolo `+`
5. **Código de país**: Asegura que tenga al menos 2 dígitos

## Formateo Automático

- **Código de país**: Si no se incluye, se agrega automáticamente el `countryCode`
- **Espaciado**: Agrega espacios para mejor legibilidad
- **Limpieza**: Elimina caracteres no válidos automáticamente

## Estados

- **Válido**: El teléfono cumple con todas las validaciones
- **Inválido**: El teléfono no cumple con alguna validación
- **Vacío**: No se muestra error hasta que se intente enviar o se pierda el foco

## Ejemplos de Números Válidos

- `+57 300 123 4567`
- `+1 555 123 4567`
- `300 123 4567` (se convierte a `+57 300 123 4567`)
- `+44 20 7946 0958`

## Ejemplos de Números Inválidos

- `+` (solo símbolo)
- `abc123` (contiene letras)
- `123` (muy corto)
- `+1234567890123456` (muy largo) 