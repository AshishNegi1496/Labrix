import type { ReactNode } from "react";

type GlassCardProps = {
  title: string;
  description?: string;
  tag?: string;
  children?: ReactNode;
};

export default function GlassCard({
  title,
  description,
  tag,
  children,
}: GlassCardProps) {
  const copy =
    description ??
    "Modular product support designed for fast-moving teams.";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-60px_rgba(15,23,42,0.9)] backdrop-blur">
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>
      {tag ? (
        <span className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
          {tag}
        </span>
      ) : null}
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-white/70">{copy}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </article>
  );
}
