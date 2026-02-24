"use client";

import { useEffect, useRef, useState } from "react";

type CountUpOnViewProps = {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export default function CountUpOnView({
  from = 0,
  to,
  duration = 2000,
  suffix = "",
  className = "",
}: CountUpOnViewProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = useState(from);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      const value = Math.floor(progress * (to - from) + from);
      setCount(value);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [started, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
