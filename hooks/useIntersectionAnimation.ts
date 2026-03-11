"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type UseIntersectionAnimationOptions = {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
  initialVisible?: boolean;
};

export type UseIntersectionAnimationResult<T extends Element> = {
  ref: RefObject<T | null>;
  isVisible: boolean;
};

export function useIntersectionAnimation<T extends Element = HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
  once = true,
  disabled = false,
  initialVisible = false,
}: UseIntersectionAnimationOptions = {}): UseIntersectionAnimationResult<T> {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(initialVisible);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
          return;
        }

        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled, once, rootMargin, threshold]);

  return { ref, isVisible };
}
