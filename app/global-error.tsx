// app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Application Error</h1>
          <p className="text-gray-600 mb-6">
            A critical error occurred. Please reload the app.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
