import { deepFreeze } from "./utils";
import type { NavigationData } from "./types";
import { validateNavigation } from "./validators";

/** Primary navigation configuration. */
export const navigation: NavigationData = validateNavigation(
  deepFreeze({
    brandLabel: "Labrix",
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/career", label: "Career" },
      { href: "/gallery", label: "Gallery" },
      { href: "/blog", label: "Blog" },
    ],
    cta: { href: "/contact", label: "Contact" },
  }),
);
