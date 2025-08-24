# PageHeader Component

Un componente reutilizable para mostrar el título y subtítulo de las páginas de formularios.

## Uso

```tsx
import { PageHeader } from "@/components/formComponents/pageHeader";

// En tu componente
<PageHeader title="Título de la página" subtitle="Descripción o subtítulo" />;
```

## Props

| Prop        | Tipo     | Requerido | Descripción                                |
| ----------- | -------- | --------- | ------------------------------------------ |
| `title`     | `string` | ✅        | Título principal de la página              |
| `subtitle`  | `string` | ✅        | Subtítulo o descripción de la página       |
| `className` | `string` | ❌        | Clases CSS adicionales (por defecto: `""`) |

## Características

- Diseño consistente con el resto de la aplicación
- Estilos responsivos y accesibles
- Espaciado y tipografía optimizados
- Permite personalización adicional con className

## Ejemplo de implementación

```tsx
// En tu página o componente
return (
  <div className="min-h-screen bg-white flex items-center justify-center p-4">
    <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden bg-white">
      {/* Header con imagen */}
      <div className="h-40 w-full overflow-hidden">
        <img src="..." alt="..." className="h-full w-full object-cover" />
      </div>

      {/* Título de la página */}
      <PageHeader title="Contratación" subtitle="Información del contratante" />

      {/* Resto del contenido */}
    </div>
  </div>
);
```

## Estilos por defecto

- **Contenedor**: `px-6 pt-6` (padding horizontal y superior)
- **Título**: `text-2xl font-semibold tracking-tight text-zinc-900`
- **Subtítulo**: `text-sm text-zinc-500 mt-1`
