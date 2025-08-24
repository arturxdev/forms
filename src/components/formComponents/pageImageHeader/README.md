# PageImageHeader Component

Un componente reutilizable para mostrar la imagen del header de las páginas de formularios.

## Uso

```tsx
import { PageImageHeader } from "@/components/formComponents/pageImageHeader";

// En tu componente
<PageImageHeader imageUrl="https://ejemplo.com/imagen.jpg" />;
```

## Props

| Prop        | Tipo     | Requerido | Descripción                                                          |
| ----------- | -------- | --------- | -------------------------------------------------------------------- |
| `imageUrl`  | `string` | ✅        | URL de la imagen a mostrar                                           |
| `altText`   | `string` | ❌        | Texto alternativo de la imagen (por defecto: "Encabezado de página") |
| `className` | `string` | ❌        | Clases CSS adicionales (por defecto: `""`)                           |
| `height`    | `string` | ❌        | Altura del contenedor (por defecto: `"h-40"`)                        |

## Características

- Imagen responsiva que se adapta al contenedor
- Optimización de carga con `loading="eager"`
- Dimensiones predefinidas para mejor rendimiento
- Estilos consistentes con el resto de la aplicación
- Permite personalización de altura y clases adicionales

## Ejemplo de implementación

```tsx
// En tu página o componente
return (
  <div className="min-h-screen bg-white flex items-center justify-center p-4">
    <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden bg-white">
      {/* Header con imagen */}
      <PageImageHeader
        imageUrl="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop"
        altText="Encabezado minimalista"
      />

      {/* Resto del contenido */}
    </div>
  </div>
);
```

## Personalización

```tsx
// Con altura personalizada
<PageImageHeader
  imageUrl="https://ejemplo.com/imagen.jpg"
  height="h-32"
/>

// Con clases adicionales
<PageImageHeader
  imageUrl="https://ejemplo.com/imagen.jpg"
  className="rounded-t-lg"
/>

// Con texto alternativo personalizado
<PageImageHeader
  imageUrl="https://ejemplo.com/imagen.jpg"
  altText="Imagen de fondo personalizada"
/>
```

## Estilos por defecto

- **Contenedor**: `w-full overflow-hidden` + altura personalizable
- **Imagen**: `h-full w-full object-cover`
- **Dimensiones**: `width={1600} height={400}`
- **Carga**: `loading="eager"`
- **Display**: `style={{ display: "block" }}`
