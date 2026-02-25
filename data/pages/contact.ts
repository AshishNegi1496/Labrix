import { makeHero, makeSeedImage } from "../factories";
import { deepFreeze } from "../utils";
import type { ContactDetails, ContactFormContent, HeroContent } from "../types";
import { validateContactDetails, validateHero } from "../validators";

/** Contact page hero. */
export const contactHero: HeroContent = validateHero(
  makeHero({
    title: "Contact us",
    breadcrumb: "Home / Contact Us",
    image: makeSeedImage("labrix-contact-hero", 1600, 900),
  }),
);

/** Contact page imagery. */
export const contactImages = deepFreeze({
  hero: contactHero.image,
  card: makeSeedImage("labrix-contact", 900, 700),
});

/** Contact form copy. */
export const contactFormContent: ContactFormContent = deepFreeze({
  label: "Start a project",
  title: "Tell us about your next experiment",
  description:
    "Share your timeline, scope, and goals. We will follow up with a clear plan.",
  cta: "Send message",
  fields: [
    { type: "text", placeholder: "Name" },
    { type: "email", placeholder: "Email" },
    { type: "text", placeholder: "Project summary" },
  ],
});

/** Contact card hours. */
export const contactHours = deepFreeze([
  { label: "Mon - Fri", value: "10:00AM - 07:00PM" },
  { label: "Saturday", value: "12:00AM - 05:00PM" },
  { label: "Sunday", value: "Closed" },
]);

/** Contact details block. */
export const contactDetails: ContactDetails = validateContactDetails(
  deepFreeze({
    email: "hello@labrix.studio",
    location: "San Diego + Remote",
    phone: "+1 (555) 902-4480",
  }),
);

/** Contact details copy. */
export const contactDetailsContent = deepFreeze({
  label: "Contact details",
  title: "Ready to connect with the team",
  description:
    "We respond within two business days and can schedule a discovery call quickly.",
});
