// import Image from "next/image";
// import { cn } from "@/lib/cn";

// type GlassCardProps = {
//   title: string;
//   description?: string;
//   image: string;
//   tag?: string;
//   className?: string;
// };

// export default function GlassCard({
//   title,
//   description,
//   image,
//   tag,
//   className,
// }: GlassCardProps) {
//   return (
//     <article
//       className={cn(
//         "group relative h-72 overflow-hidden rounded-2xl",
//         "border border-white/10 backdrop-blur",
//         className,
//       )}
//     >
//       {/* Background Image */}
//       <Image
//         src={image}
//         alt={title}
//         fill
//         className="object-cover transition duration-500 group-hover:scale-105"
//       />

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/25" />

//       {/* Glow */}
//       <div className="absolute -top-24 right-0 h-40 w-40 bg-emerald-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition" />

//       {/* Content */}
//       <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
//         {tag && (
//           <span className="mb-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
//             {tag}
//           </span>
//         )}
//         <h3 className="text-lg font-semibold">{title}</h3>
//         {description && (
//           <p className="mt-1 text-sm text-white/80">{description}</p>
//         )}
//       </div>
//     </article>
//   );
// }
"use client";
import Image from "next/image";
import { cn } from "@/lib/cn";

type GlassCardProps = {
  children?: React.ReactNode; // Allow custom content
  title?: string; // Made optional since we might use children
  description?: string; // Made optional
  image?: string; // Made optional for cards without images
  tag?: string;
  imageAlt?: string; // Separate alt text for accessibility
  imagePosition?: "center" | "top" | "bottom"; // Control image positioning
  overlayOpacity?: string; // Customize overlay darkness
  glowColor?: string; // Customize glow color
  glowPosition?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "none";
  contentPosition?: "top" | "center" | "bottom"; // Control where content sits
  contentPadding?: string; // Custom padding
  height?: string; // Custom height
  hoverEffect?: "scale" | "glow" | "both" | "none"; // Control hover effects
  borderColor?: string; // Custom border color
  className?: string;
  contentClassName?: string; // Additional classes for content area
  imageClassName?: string; // Additional classes for image
  overlayClassName?: string; // Additional classes for overlay
};

export default function GlassCard({
  children,
  title,
  description,
  image,
  tag,
  imageAlt,
  imagePosition = "center",
  overlayOpacity = "bg-black/45",
  glowColor = "bg-emerald-400/20",
  glowPosition = "top-right",
  contentPosition = "bottom",
  contentPadding = "p-6",
  height = "h-72",
  hoverEffect = "both",
  borderColor = "border-white/10",
  className,
  contentClassName,
  imageClassName,
  overlayClassName,
}: GlassCardProps) {
  // Position mappings
  const imagePositionClass = {
    top: "object-top",
    center: "object-center",
    bottom: "object-bottom",
  }[imagePosition];

  const contentPositionClass = {
    top: "justify-start",
    center: "justify-center",
    bottom: "justify-end",
  }[contentPosition];

  const glowPositionClass = {
    "top-right": "-top-24 right-0",
    "top-left": "-top-24 left-0",
    "bottom-right": "-bottom-24 right-0",
    "bottom-left": "-bottom-24 left-0",
    none: "hidden",
  }[glowPosition];

  const hoverEffects = {
    scale: hoverEffect === "scale" || hoverEffect === "both",
    glow: hoverEffect === "glow" || hoverEffect === "both",
  };

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        borderColor,
        "backdrop-blur",
        height,
        className,
      )}
    >
      {/* Background Image - only if image is provided */}
      {image && (
        <Image
          src={image}
          alt={imageAlt || title || "Card image"}
          fill
          className={cn(
            "object-cover transition duration-500",
            imagePositionClass,
            hoverEffects.scale && "group-hover:scale-105",
            imageClassName,
          )}
        />
      )}

      {/* Dark overlay - conditional opacity */}
      <div
        className={cn(
          "absolute inset-0 transition",
          overlayOpacity,
          hoverEffects.scale && "group-hover:bg-black/25",
          overlayClassName,
        )}
      />

      {/* Glow effect - only if enabled */}
      {hoverEffects.glow && glowPosition !== "none" && (
        <div
          className={cn(
            "absolute h-40 w-40 blur-3xl opacity-0 transition group-hover:opacity-100",
            glowPositionClass,
            glowColor,
          )}
        />
      )}

      {/* Content - flexible based on props */}
      <div
        className={cn(
          "relative z-10 flex h-full flex-col",
          contentPositionClass,
          contentPadding,
          "text-white",
          contentClassName,
        )}
      >
        {children ? (
          // If children are provided, render them directly
          children
        ) : (
          // Otherwise render the default structure
          <>
            {tag && (
              <span className="mb-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
                {tag}
              </span>
            )}
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {description && (
              <p className="mt-1 text-sm text-white/80">{description}</p>
            )}
          </>
        )}
      </div>
    </article>
  );
}
