# Form Components

Colección de componentes de formulario reutilizables y configurables para Next.js.

## Componentes Disponibles

### 📝 FormInput

Componente de input reutilizable con soporte para iconos, errores y estilos personalizables.

**Características:**

- Input con label integrado
- Soporte para iconos (izquierda o derecha)
- Manejo de errores
- Estilos personalizables
- Tipos de input: text, email, tel, password, number, url

**Uso:**

```tsx
import { FormInput } from "@/components/formComponents/formInput";

<FormInput
  id="email"
  name="email"
  label="Email"
  type="email"
  required
  icon={Mail}
  placeholder="tu@correo.com"
/>;
```

### 🔽 FormSelect

Componente de select reutilizable que recibe opciones en un array de objetos.

**Características:**

- Select con label integrado
- Opciones recibidas en array de objetos
- Soporte para iconos (izquierda o derecha)
- Manejo de errores
- Flecha personalizada
- Opciones deshabilitadas

**Uso:**

```tsx
import { FormSelect } from "@/components/formComponents/formSelect";

const opciones = [
  { value: "opcion1", label: "Opción 1" },
  { value: "opcion2", label: "Opción 2" },
];

<FormSelect
  id="categoria"
  name="categoria"
  label="Categoría"
  options={opciones}
  required
  placeholder="Selecciona una opción"
/>;
```

### 📁 FileUploader

Componente para subida de archivos con drag & drop y validaciones.

**Características:**

- Drag & drop
- Validación de tipos de archivo
- Límite de tamaño
- Preview de archivos
- Estados de carga

**Uso:**

```tsx
import { FileUploader } from "@/components/formComponents/fileUploader";

<FileUploader
  id="documento"
  name="documento"
  label="Subir documento"
  accept=".pdf,.doc,.docx"
  maxSize="5MB"
  onChange={(file) => setFile(file)}
/>;
```

## Estructura de Archivos

```
src/components/formComponents/
├── index.ts                 # Exportaciones principales
├── fileUploader/           # Componente FileUploader
│   ├── FileUploader.tsx
│   ├── index.ts
│   └── README.md
├── formInput/              # Componente FormInput
│   ├── FormInput.tsx
│   ├── index.ts
│   └── README.md
└── formSelect/             # Componente FormSelect
    ├── FormSelect.tsx
    ├── examples.tsx
    ├── index.ts
    └── README.md
```

## Exportaciones

```tsx
// Importar componentes individuales
import { FormInput } from "@/components/formComponents/formInput";
import { FormSelect } from "@/components/formComponents/formSelect";
import { FileUploader } from "@/components/formComponents/fileUploader";

// O importar todo desde el índice principal
import {
  FormInput,
  FormSelect,
  FileUploader,
} from "@/components/formComponents";
```

## Ventajas de la Arquitectura

1. **Modular**: Cada componente en su propia carpeta
2. **Reutilizable**: Componentes configurables para diferentes casos de uso
3. **Mantenible**: Código organizado y documentado
4. **Consistente**: Estilos y comportamiento uniformes
5. **Tipado**: TypeScript completo con interfaces bien definidas
6. **Documentado**: README detallado para cada componente
7. **Ejemplos**: Casos de uso reales incluidos

## Casos de Uso en el Proyecto

### ContactForm.tsx

- **FormInput**: Para todos los campos de texto (nombre, email, teléfono, etc.)
- **FormSelect**: Para el select de paquetes de internet
- **FileUploader**: Para subir comprobante de pago

### Otros Formularios

Estos componentes se pueden usar en cualquier formulario de la aplicación:

- Formularios de registro
- Formularios de contacto
- Formularios de configuración
- Formularios de búsqueda

## Personalización

Todos los componentes incluyen props para personalizar:

- **className**: Clases CSS para el contenedor
- **inputClassName/selectClassName**: Clases CSS para el input/select
- **labelClassName**: Clases CSS para el label
- **icon**: Iconos de Lucide React
- **error**: Mensajes de error personalizados

## Contribución

Para agregar nuevos componentes:

1. Crear carpeta en `formComponents/`
2. Implementar el componente con TypeScript
3. Crear archivo `index.ts` para exportaciones
4. Agregar documentación en `README.md`
5. Incluir ejemplos de uso
6. Actualizar el `index.ts` principal
