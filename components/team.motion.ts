import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // ✅ valid easeOut curve
    },
  },
};