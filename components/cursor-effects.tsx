"use client";

import { useEffect, useState, useRef } from "react";
import type { ButtonHTMLAttributes, MouseEventHandler } from "react";

interface CursorEffectsProps {
  enabled?: boolean;
}

export function CursorEffects({ enabled = true }: CursorEffectsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const [clicks, setClicks] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const trailIdRef = useRef(0);
  const clickIdRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add trail point
      const id = trailIdRef.current++;
      setTrail((prev) => [
        ...prev.slice(-5),
        { x: e.clientX, y: e.clientY, id },
      ]);
    };

    const handleClick = (e: MouseEvent) => {
      const id = clickIdRef.current++;
      setClicks((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);

      // Remove click effect after animation
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== id));
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor */}
      <div
        className="absolute h-4 w-4 rounded-full border-2 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          borderColor: "var(--color-accent)",
        }}
      />

      {/* Cursor trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 rounded-full transition-all duration-500"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            backgroundColor: "var(--color-accent)",
            opacity: ((index + 1) / trail.length) * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}
    </div>
  );
}

// Magnetic button effect
export function MagneticButton({
  children,
  className = "",
  magnetStrength = 20,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  magnetStrength?: number;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 100) {
      const strength = Math.max(0, 1 - distance / 100);
      setPosition({
        x: deltaX * strength * (magnetStrength / 100),
        y: deltaY * strength * (magnetStrength / 100),
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
