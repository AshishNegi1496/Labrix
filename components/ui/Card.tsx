import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "solid" | "glass";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  hoverable?: boolean;
};

export function Card({
  className,
  variant = "solid",
  hoverable = true,
  ...props
}: CardProps) {
  return (
    <div
      data-variant={variant}
      data-hover={hoverable}
      className={cn("card", className)}
      {...props}
    />
  );
}
