import Image from "next/image";
import { cn } from "@/lib/cn";

type GlassCardProps = {
  title: string;
  description?: string;
  image: string;
  tag?: string;
  className?: string;
};

export default function GlassCard({
  title,
  description,
  image,
  tag,
  className,
}: GlassCardProps) {
  return (
    <article
      className={cn(
        "group relative h-72 overflow-hidden rounded-2xl",
        "border border-white/10 backdrop-blur",
        className,
      )}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/25" />

      {/* Glow */}
      <div className="absolute -top-24 right-0 h-40 w-40 bg-emerald-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
        {tag && (
          <span className="mb-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
            {tag}
          </span>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-white/80">{description}</p>
        )}
      </div>
    </article>
  );
}
