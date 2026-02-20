type GradientBlockProps = {
  label?: string;
  title?: string;
  copy?: string;
};

export default function GradientBlock({
  label = "Prototype Sprint",
  title = "Design, validated fast",
  copy = "We run two-week loops to test value, shape the story, and ship a crisp demo your team can build on.",
}: GradientBlockProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-8 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute -bottom-10 right-6 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
      </div>
      <div className="relative">
        <span className="text-xs uppercase tracking-[0.35em] text-white/60">
          {label}
        </span>
        <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
        <p className="mt-4 text-sm text-white/70">{copy}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
          <span className="rounded-full border border-white/20 px-3 py-1">
            Strategy
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1">
            UX Mapping
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1">
            Rapid Prototyping
          </span>
        </div>
      </div>
    </div>
  );
}
