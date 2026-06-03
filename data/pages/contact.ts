import {
  FiCalendar,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import { deepFreeze } from "../utils";
import type { ContactDetails } from "../types";
import { validateContactDetails } from "../validators";

export type ContactFormType = "demo" | "touch";

export type ContactFormOption = Readonly<{
  id: ContactFormType;
  title: string;
  description: string;
  helper: string;
  badge: string;
  icon: typeof FiCalendar;
}>;

export type ContactChannel = Readonly<{
  icon: typeof FiMail;
  title: string;
  value: string;
  href?: string;
}>;

export const contactHero = deepFreeze({
  eyebrow: "Contact ClinRT",
  punchline: "Let's start a conversation",
  image: "/images/Let's start a conversation_compressed.webp",
});

export const contactFormActionPath = "/api/contact";

export const contactFormSuccessPath = "/contact/success";
export const contactFormsSectionId = "contact-forms";

export const contactFileConstraints = deepFreeze({
  accept: ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp",
  maxSizeBytes: 5 * 1024 * 1024,
  errorMessage:
    "Please upload a PDF, DOC, DOCX, PNG, JPG, JPEG, or WEBP file up to 5MB.",
});

export const contactFileMimeTypes = deepFreeze([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const);

export const contactDemoInterestOptions = deepFreeze([
  "Product Updates",
  "Events & Webinars",
  "Case Studies",
  "Blogs & Insights",
  "Industry News",
  "All",
] as const);

export const contactDemoTimelineOptions = deepFreeze([
  "India",
  "North America",
  "Europe",
  "Middle East",
  "Asia Pacific",
  "Other",
] as const);

export const contactTouchEnquiryTypeOptions = deepFreeze([
  "Enquiry",
  "Support",
  "Careers",
  "Other",
] as const);

export const contactFormOptions: ReadonlyArray<ContactFormOption> = deepFreeze([
  {
    id: "demo",
    title: "Join Our Community",
    description:
      "Be part of our growing community and stay connected to the work we care deeply about.",
    helper:
      "Use this form to hear about product updates, events, case studies, and industry news.",
    badge: "Community Route",
    icon: FiCalendar,
  },
  {
    id: "touch",
    title: "Request a Demo",
    description:
      "Share your details and our team will reach out shortly with demo information.",
    helper:
      "Best for product walkthroughs, platform questions, and demo requests.",
    badge: "Request Demo",
    icon: FiMessageCircle,
  },
]);

export const contactChannels: ReadonlyArray<ContactChannel> = deepFreeze([
  {
    icon: FiMail,
    title: "General enquiries",
    value: "enquiry@clinrtglobal.com",
    href: "mailto:enquiry@clinrtglobal.com",
  },
  {
    icon: FiMail,
    title: "Support",
    value: "support@clinrtglobal.com",
    href: "mailto:support@clinrtglobal.com",
  },
  {
    icon: FiMail,
    title: "Careers",
    value: "hr@clinrtglobal.com",
    href: "mailto:hr@clinrtglobal.com",
  },
  {
    icon: FiPhone,
    title: "Phone",
    value: "+91 8530067925",
    href: "tel:+918530067925",
  },
  {
    icon: FiMapPin,
    title: "Office",
    value:
      "ClinRT Global Services Pvt. Ltd. 905, Tower 3, Kohinoor World Towers (KWT), Opposite Empire Estate, Old Mumbai-Pune Highway, PCMC, Pune, Maharashtra 411018, India",
  },
]);

export const contactDetails: ContactDetails = validateContactDetails(
  deepFreeze({
    email: "enquiry@clinrtglobal.com",
    location: "905, Tower 3, Kohinoor World Towers (KWT), PCMC, Pune, Maharashtra 411018, India",
    phone: "+91 8530067925",
  }),
);

export const contactInfoBlock = deepFreeze({
  label: "Contact Information",
  title: "Reach the ClinRT team directly",
  description:
    "Use the details below for direct contact. For everything else, the forms above are the fastest path.",
});

export const contactMapBlock = deepFreeze({
  label: "Find Us",
  title: "Pune office location",
  badge: "On-site and remote support",
});

export function getContactFormHref(
  form: ContactFormType,
  extraParams?: Record<string, string>,
) {
  const params = new URLSearchParams({
    form,
    ...(extraParams ?? {}),
  });

  return `/contact?${params.toString()}#${contactFormsSectionId}`;
}
