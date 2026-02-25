import { makeHero, makeSeedImage } from "../factories";
import { deepFreeze } from "../utils";
import type { BlogPost, HeroContent } from "../types";
import { validateBlogPosts, validateHero } from "../validators";

/** Blog page hero. */
export const blogHero: HeroContent = validateHero(
  makeHero({
    title: "Our blog",
    breadcrumb: "Home / Our Blog",
    image: makeSeedImage("labrix-blog-hero", 1600, 900),
  }),
);

/** Blog post summaries. */
export const blogPosts: ReadonlyArray<BlogPost> = validateBlogPosts(
  deepFreeze([
    {
      title: "Lab operations built for clarity",
      date: "Feb 18, 2026",
      image: makeSeedImage("labrix-blog-1", 640, 480),
    },
    {
      title: "The rise of connected diagnostics",
      date: "Jan 29, 2026",
      image: makeSeedImage("labrix-blog-2", 640, 480),
    },
    {
      title: "Why testing workflows need calm",
      date: "Jan 05, 2026",
      image: makeSeedImage("labrix-blog-3", 640, 480),
    },
  ]),
);

/** Blog list excerpt copy. */
export const blogExcerpt = deepFreeze({
  summary: "Field notes on product research, lab strategy, and innovation.",
});
