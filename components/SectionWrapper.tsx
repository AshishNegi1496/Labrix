import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  fullBleed?: boolean;
};

export default function SectionWrapper({
  children,
  className,
  innerClassName,
  id,
  fullBleed,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-12 sm:py-14 md:py-20", className)}>
      <div
        className={cn(
          "section-shell",
          fullBleed && "[--container-max:100%] px-0",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
