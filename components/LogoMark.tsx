import { cn } from "@/lib/cn";

type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-color)] text-[var(--primary-color)] ring-1 ring-white/30",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="16" cy="16" r="3.5" />
        <path
          d="M4 16c0-4.6 5.4-8.4 12-8.4S28 11.4 28 16s-5.4 8.4-12 8.4S4 20.6 4 16z"
          opacity="0.7"
        />
        <path
          d="M10.2 6.8c3.1 0 5.8 4.1 5.8 9.2s-2.7 9.2-5.8 9.2"
          opacity="0.7"
        />
        <path
          d="M21.8 6.8c-3.1 0-5.8 4.1-5.8 9.2s2.7 9.2 5.8 9.2"
          opacity="0.7"
        />
      </svg>
    </span>
  );
}
