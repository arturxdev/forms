# FormEmail Component

Un componente de formulario especializado para la entrada de emails con validación automática.

## Características

- **Validación automática**: Valida el formato del email en tiempo real
- **Validación estricta**: Incluye validaciones de longitud, dominio y caracteres especiales
- **Icono integrado**: Incluye automáticamente el icono de Mail
- **Mensajes de error**: Muestra mensajes de error específicos para emails
- **Callback de validación**: Proporciona feedback sobre el estado de validación
- **Hereda de FormInput**: Mantiene toda la funcionalidad del componente base

## Uso

```tsx
import { FormEmail } from '@/components/formComponents';

// Uso básico
<FormEmail
  id="email"
  name="email"
  label="Email"
  required
  placeholder="tu@correo.com"
/>

// Con callback de validación
<FormEmail
  id="email"
  name="email"
  label="Email"
  onValidationChange={(isValid) => console.log('Email válido:', isValid)}
/>

// Sin mostrar mensajes de validación
<FormEmail
  id="email"
  name="email"
  label="Email"
  showValidationMessage={false}
/>
```

## Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onValidationChange` | `(isValid: boolean) => void` | Callback que se ejecuta cuando cambia el estado de validación |
| `showValidationMessage` | `boolean` | Controla si se muestran los mensajes de validación (por defecto: true) |

Además, hereda todas las props de `FormInput` excepto `type` e `icon` que están fijos.

## Validaciones

El componente incluye las siguientes validaciones:

1. **Formato básico**: Verifica que tenga el formato `usuario@dominio.com`
2. **Longitud**: El email no puede exceder 254 caracteres
3. **Dominio**: El dominio debe tener al menos 2 caracteres
4. **Caracteres especiales**: No permite caracteres como `<`, `>`, `[`, `]`, etc.

## Estados

- **Válido**: El email cumple con todas las validaciones
- **Inválido**: El email no cumple con alguna validación
- **Vacío**: No se muestra error hasta que se intente enviar o se pierda el foco 