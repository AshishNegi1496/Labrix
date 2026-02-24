import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PanelProps = HTMLAttributes<HTMLDivElement>;

export function Panel({ className, ...props }: PanelProps) {
  return (
    <div className={cn("rounded-3xl p-8 md:p-12", className)} {...props} />
  );
}
