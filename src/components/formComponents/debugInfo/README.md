# DebugInfo Component

Un componente reutilizable para mostrar información de debug de los query parameters en modo desarrollo.

## Uso

```tsx
import { DebugInfo } from "@/components/formComponents/debugInfo";

// En tu componente
<DebugInfo queryParams={queryParams} debug={queryParams.debug === "true"} />;
```

## Props

| Prop          | Tipo                     | Requerido | Descripción                                                    |
| ------------- | ------------------------ | --------- | -------------------------------------------------------------- |
| `queryParams` | `Record<string, string>` | ✅        | Objeto con los query parameters a mostrar                      |
| `debug`       | `boolean`                | ❌        | Flag para mostrar/ocultar el componente (por defecto: `false`) |

## Características

- Solo se muestra cuando `debug` es `true`
- Diseño consistente con el resto de la aplicación
- Estilos responsivos y accesibles
- Muestra todos los query parameters en un formato legible

## Ejemplo de implementación

```tsx
// En tu página o componente
const queryParams = useSearchParams();
const debugMode = queryParams.get("debug") === "true";

return (
  <div>
    {/* Tu contenido principal */}

    <DebugInfo
      queryParams={Object.fromEntries(queryParams.entries())}
      debug={debugMode}
    />
  </div>
);
```
