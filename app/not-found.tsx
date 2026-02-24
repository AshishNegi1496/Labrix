// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-(--text-description) mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-lg  px-6 py-3 text-(--text-accent) bg-(--color-accent)"
      >
        Go Home
      </Link>
    </div>
  );
}
