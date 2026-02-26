"use client";

import { useEffect, useState } from "react";

export function CursorEffects() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 1024px)").matches) return;

    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1024px)").matches
  ) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-50 hidden lg:block"
      style={{
        left: position.x - 4,
        top: position.y - 4,
      }}
    >
      <div
        className="w-3 h-3 rounded-full transition-transform duration-150 "
        style={{
          backgroundColor: "var(--color-accent)",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
