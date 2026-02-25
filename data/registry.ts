import { createLazy } from "./utils";

const loadBlogPosts = createLazy(async () => (await import("./pages/blog")).blogPosts);
const loadHomeTestimonials = createLazy(
  async () => (await import("./pages/home")).testimonials,
);

/** Lazily load blog posts with caching. */
export async function getBlogPosts() {
  return loadBlogPosts();
}

/** Lazily load home testimonials with caching. */
export async function getHomeTestimonials() {
  return loadHomeTestimonials();
}
