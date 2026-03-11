"use client";

import {
  useIntersectionAnimation,
  type UseIntersectionAnimationOptions,
  type UseIntersectionAnimationResult,
} from "@/hooks/useIntersectionAnimation";

export type UseIntersectionRevealOptions = UseIntersectionAnimationOptions;
export type UseIntersectionRevealResult<T extends Element> =
  UseIntersectionAnimationResult<T>;

export function useIntersectionReveal<T extends Element = HTMLElement>(
  options: UseIntersectionRevealOptions = {},
): UseIntersectionRevealResult<T> {
  return useIntersectionAnimation<T>(options);
}
