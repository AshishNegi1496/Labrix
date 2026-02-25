import type { HeroContent, LinkItem } from "./types";
import { deepFreeze } from "./utils";

/** Build a hero block with consistent shape. */
export function makeHero(data: HeroContent): HeroContent {
  return deepFreeze({ ...data });
}

/** Build a link item with consistent shape. */
export function makeLink(data: LinkItem): LinkItem {
  return deepFreeze({ ...data });
}

/** Generate a deterministic placeholder image URL. */
export function makeSeedImage(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
