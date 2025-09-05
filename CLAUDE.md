# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 forms application built with TypeScript, using React Hook Form, Zod validation, and shadcn/ui components. The project features custom reusable form components for two main sections: VIP travel booking (registro/reservar) and DLR Network contract management.

## Development Commands

```bash
# Development server with Turbopack
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Forms**: React Hook Form with Zod validation
- **UI**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Notifications**: Sonner toasts
- **Package Manager**: Yarn

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dlr-network/       # Contract management forms
│   │   ├── accept-contract/
│   │   ├── new-contract/
│   │   └── send-contract/
│   └── vip/               # VIP travel booking forms
│       ├── registro/      # Registration form
│       ├── reservar/      # Reservation form
│       └── utils/         # Data and utilities
├── components/
│   ├── formComponents/    # Custom reusable form components
│   │   ├── formInput/
│   │   ├── formSelect/
│   │   ├── formDatePicker/
│   │   ├── formEmail/
│   │   ├── formPhone/
│   │   ├── formRadioGroup/
│   │   ├── fileUploader/
│   │   ├── thankYouScreen/
│   │   ├── pageHeader/
│   │   └── pageImageHeader/
│   └── ui/                # shadcn/ui base components
└── lib/                   # Utilities (utils.ts)
```

### Form Components System

The project uses a modular form components architecture. Each component lives in its own directory with:
- Main component file (e.g., `FormInput.tsx`)
- Export file (`index.ts`)
- Documentation (`README.md`)
- Examples file when applicable (`examples.tsx`)

**Available form components:**
- `FormInput`: Text inputs with icon support and validation
- `FormSelect`: Dropdown selects with custom options
- `FormDatePicker`: Date selection with calendar UI
- `FormEmail`: Email input with validation
- `FormPhone`: Phone number input
- `FormRadioGroup`: Radio button groups
- `FileUploader`: File upload with drag & drop
- `ThankYouScreen`: Success screen after form submission
- `PageHeader` / `PageImageHeader`: Page headers with optional images

All form components support:
- React Hook Form integration
- Zod schema validation
- Error display
- Custom styling via className props
- Icon support (Lucide React)

### Form Patterns

Forms in this project follow a consistent pattern:
1. Zod schema definition for validation
2. React Hook Form with zodResolver
3. TypeScript type inference from schema
4. Custom form components for UI
5. File upload handling for documents
6. Thank you screen on successful submission

Example form structure:
```tsx
const formSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  // ... other fields
});

type FormData = z.infer<typeof formSchema>;

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
  resolver: zodResolver(formSchema)
});
```

### Styling System

- **Base**: Tailwind CSS v4 with CSS variables
- **Theme**: shadcn/ui "new-york" style with neutral base color
- **Components**: Built on Radix UI primitives
- **Icons**: Lucide React icon library
- **Animations**: Custom animations with tw-animate-css

### Path Aliases

```typescript
"@/*": ["./src/*"]  // Maps to src/ directory
```

## Common Development Tasks

When working with forms:
1. Use existing form components from `@/components/formComponents`
2. Define Zod schemas for validation
3. Follow the established form patterns
4. Handle file uploads with the FileUploader component
5. Use TypeScript interfaces for type safety

When creating new form components:
1. Follow the modular structure (component/index.ts/README.md)
2. Support React Hook Form integration
3. Include proper TypeScript props interface
4. Use forwardRef for form field compatibility
5. Update the main index.ts export file