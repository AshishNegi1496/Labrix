import { deepFreeze } from "./utils";
import type { NavigationData } from "./types";
import { validateNavigation } from "./validators";

/** Primary navigation configuration. */
export const navigation: NavigationData = validateNavigation(
  deepFreeze({
    brandLabel: "ClinRT",
    items: [
      { href: "/", label: "Home" },
      { href: "/who-we-are", label: "Who We Are" },
      { href: "/what-we-build", label: "What We Build" },
      { href: "/whats-new", label: "What's New" },
      { href: "/contact", label: "Contact Us" },
    ],
    cta: { href: "/contact", label: "Contact Us" },
  }),
);
