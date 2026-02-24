"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { itemVariants } from "../team.motion";

type Props = {
  name: string;
  role: string;
  image: string;
};

export const TeamCard = ({ name, role, image }: Props) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group rounded-2xl overflow-hidden "
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={400}
          height={500}
          className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <p className="text-sm text-(--text-muted)">{role}</p>
        <h3 className="mt-1 font-semibold text-(--text-invert)">{name}</h3>
      </div>
    </motion.div>
  );
};
