import { deepFreeze } from "./utils";
import type { FooterData } from "./types";
import { validateFooter } from "./validators";

/** Footer content and links. */
export const footerData: FooterData = validateFooter(
  deepFreeze({
    description:
      "Our website serves as a comprehensive hub for researchers, institutions, and partners.",
    newsletterLabel: "Subscribe to our newsletter",
    newsletterPlaceholder: "Enter your email address",
    newsletterCta: "Join",
    newsletterAgreement: "I agree to the privacy policy.",
    quickLinksLabel: "Quick Links",
    servicesLabel: "Our Services",
    hoursLabel: "Working Hours",
    quickLinks: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact Us" },
    ],
    services: [
      "Analytical Testing",
      "Biomedical Testing",
      "Toxicology Analysis",
      "Pharmaceutical Testing",
    ],
    hours: [
      { label: "Mon - Fri", value: "10:00AM - 07:00PM" },
      { label: "Saturday", value: "12:00AM - 05:00PM" },
      { label: "Sunday", value: "Closed" },
    ],
    copyright: "Copyright 2025 All Rights Reserved.",
  }),
);
