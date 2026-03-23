"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Add this component in the same file or import it
export default function CultureGraphic({ index }: { index: number }) {
  const graphics = [
    // Card 0 - Ownership: Bold geometric target/bullseye
    <svg key={0} width="100%" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="rg0" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      {[160, 120, 80, 40].map((r, i) => (
        <motion.circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: i * 0.12,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      <motion.circle
        cx="200"
        cy="200"
        r="20"
        fill="white"
        fillOpacity="0.9"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
        }}
      />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.line
          key={angle}
          x1="200"
          y1="200"
          x2={200 + 170 * Math.cos((angle * Math.PI) / 180)}
          y2={200 + 170 * Math.sin((angle * Math.PI) / 180)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.05 }}
        />
      ))}
      <motion.text
        x="200"
        y="340"
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize="11"
        letterSpacing="4"
        fontFamily="sans-serif"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        OWNERSHIP
      </motion.text>
    </svg>,

    // Card 1 - Clarity: Flowing lines converging to a point
    <svg key={1} width="100%" viewBox="0 0 400 400">
      {[
        { x1: 20, y1: 60, x2: 200, y2: 200 },
        { x1: 20, y1: 130, x2: 200, y2: 200 },
        { x1: 20, y1: 200, x2: 200, y2: 200 },
        { x1: 20, y1: 270, x2: 200, y2: 200 },
        { x1: 20, y1: 340, x2: 200, y2: 200 },
      ].map((l, i) => (
        <motion.path
          key={i}
          d={`M ${l.x1} ${l.y1} Q ${(l.x1 + l.x2) / 2 + 30} ${(l.y1 + l.y2) / 2} ${l.x2} ${l.y2}`}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
        />
      ))}
      {[
        { x1: 380, y1: 60, x2: 200, y2: 200 },
        { x1: 380, y1: 130, x2: 200, y2: 200 },
        { x1: 380, y1: 200, x2: 200, y2: 200 },
        { x1: 380, y1: 270, x2: 200, y2: 200 },
        { x1: 380, y1: 340, x2: 200, y2: 200 },
      ].map((l, i) => (
        <motion.path
          key={`r${i}`}
          d={`M ${l.x1} ${l.y1} Q ${(l.x1 + l.x2) / 2 - 30} ${(l.y1 + l.y2) / 2} ${l.x2} ${l.y2}`}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
        />
      ))}
      <motion.circle
        cx="200"
        cy="200"
        r="12"
        fill="white"
        fillOpacity="0.9"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.text
        x="200"
        y="360"
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize="11"
        letterSpacing="4"
        fontFamily="sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        CLARITY
      </motion.text>
    </svg>,

    // Card 2 - Trust: Interlocking rings / Venn
    <svg key={2} width="100%" viewBox="0 0 400 400">
      <motion.circle
        cx="155"
        cy="200"
        r="110"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx="245"
        cy="200"
        r="110"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.text
        x="120"
        y="205"
        textAnchor="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize="12"
        fontFamily="sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Team
      </motion.text>
      <motion.text
        x="280"
        y="205"
        textAnchor="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize="12"
        fontFamily="sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Client
      </motion.text>
      <motion.text
        x="200"
        y="200"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="500"
        fontFamily="sans-serif"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      >
        Trust
      </motion.text>
      <motion.text
        x="200"
        y="360"
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize="11"
        letterSpacing="4"
        fontFamily="sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        FOUNDATION
      </motion.text>
    </svg>,
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full flex items-center justify-center"
      >
        {graphics[index] ?? graphics[0]}
      </motion.div>
    </AnimatePresence>
  );
}
