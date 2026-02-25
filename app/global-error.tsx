// app/global-error.tsx
"use client";

import Button from "@/components/ui/Button";
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Application Error
          </h1>
          <p className="text-gray-600 mb-6">
            A critical error occurred. Please reload the app.
          </p>
          <Button label="Reload" onClick={() => reset()} />
        </div>
      </body>
    </html>
  );
}
