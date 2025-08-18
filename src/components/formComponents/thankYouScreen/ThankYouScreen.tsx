interface ThankYouScreenProps {
  title: string;
  description: string;
}

export default function ThankYouScreen({
  title,
  description,
}: ThankYouScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-zinc-100 shadow-xl rounded-2xl px-6 sm:px-10 py-14 text-center">
        {/* Icono de éxito */}
        <div className="mx-auto mb-6 h-14 w-14 rounded-full border border-zinc-200 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-zinc-900"
            aria-hidden
          >
            <path
              fill="currentColor"
              d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            />
          </svg>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          {title}
        </h1>
        <p className="mt-2 text-zinc-500 text-lg">{description}</p>

        {/* Botón principal (opcional) */}

        {/* Pie minimal */}
        <p className="mt-8 text-xs text-zinc-400">
          Si necesitas ayuda, escríbenos por WhatsApp.
        </p>
      </div>
    </div>
  );
}
