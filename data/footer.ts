import { deepFreeze } from "./utils";
import type { FooterData } from "./types";
import { validateFooter } from "./validators";

/** Footer content and links. */
export const footerData: FooterData = validateFooter(
  deepFreeze({
    description:
      "ClinRT supports sponsors, CROs, and clinical teams with connected, compliance-aware trial operations.",
    newsletterLabel: "Subscribe to our newsletter",
    newsletterPlaceholder: "Enter your email address",
    newsletterCta: "Join",
    newsletterAgreement: "I agree to the privacy policy.",
    quickLinksLabel: "Quick Links",
    servicesLabel: "Our Services",
    hoursLabel: "Working Hours",
    quickLinks: [
      { href: "/", label: "Home" },
      { href: "/who-we-are", label: "Who We Are" },
      { href: "/what-we-build", label: "What We Build" },
      { href: "/whats-new", label: "What's New" },
      { href: "/contact", label: "Contact Us" },
    ],
    services: [
      "iClinRT",
      "EDC (Coming Soon)",
      "CTMS (Coming Soon)",
      "eCOA (Coming Soon)",
    ],
    hours: [
      { label: "Mon - Fri", value: "10:00AM - 07:00PM" },
      { label: "Saturday", value: "12:00AM - 05:00PM" },
      { label: "Sunday", value: "Closed" },
    ],
    copyright: "Copyright 2026 ClinRT. All Rights Reserved.",
  }),
);
