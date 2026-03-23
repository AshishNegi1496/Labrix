import { deepFreeze } from "./utils";
import type { NavigationData } from "./types";
import { validateNavigation } from "./validators";

/** Primary navigation configuration. */
export const navigation: NavigationData = validateNavigation(
  deepFreeze({
    brandLabel: "ClinRT",
    items: [
     { href: "/", label: "Home" },
      { href: "/who-we-are", label: "About ClinRT" },
      { href: "/iclinrt", label: "iClinRT" },
      { href: "/clinrt-world", label: "ClinRT World" },
      { href: "/contact", label: "Contact Us" },
    ],
    cta: { href: "/contact", label: "Request a Demo" },
  }),
);
