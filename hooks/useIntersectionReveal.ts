"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type UseIntersectionRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

type UseIntersectionRevealResult<T extends Element> = {
  ref: RefObject<T | null>;
  isVisible: boolean;
};

export function useIntersectionReveal<T extends Element = HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: UseIntersectionRevealOptions = {}): UseIntersectionRevealResult<T> {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, [once, threshold, rootMargin]);

  return { ref, isVisible };
}
