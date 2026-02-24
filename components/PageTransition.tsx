'use client';

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransition } from "@/lib/motion";
import { cn } from "@/lib/cn";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export default function PageTransition({
  children,
  className,
}: PageTransitionProps) {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      variants={pageTransition}
      className={cn("min-h-screen", className)}
    >
      {children}
    </motion.main>
  );
}
