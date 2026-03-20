"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { IconType } from "react-icons";
import { useState } from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const ContactMap = dynamic(() => import("@/components/ContactMap"), {
  ssr: false,
});

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_10px_30px_rgba(15,36,58,0.05)] transition focus:border-[#0f243a]/35 focus:outline-none focus:ring-4 focus:ring-[#0f243a]/10";
const selectClass = `${fieldClass} appearance-none`;

type FormType = "demo" | "touch" | "community";

type FormOption = {
  id: FormType;
  title: string;
  description: string;
  helper: string;
  badge: string;
  icon: IconType;
};

type Highlight = {
  icon: IconType;
  title: string;
  text: string;
};

type ContactChannel = {
  icon: IconType;
  title: string;
  value: string;
  href?: string;
};

const formOptions: FormOption[] = [
  {
    id: "demo",
    title: "Request a Demo",
    description:
      "Book a guided walkthrough of iClinRT, its workflows, and the operating model behind it.",
    helper:
      "Best for sponsors, CROs, and clinical operations teams actively evaluating the platform.",
    badge: "Priority Route",
    icon: FiCalendar,
  },
  {
    id: "touch",
    title: "Get in Touch",
    description:
      "Reach out for support, partnerships, service questions, or a broader conversation with the team.",
    helper:
      "Tell us what you need and we will route your enquiry to the right team quickly.",
    badge: "General Enquiry",
    icon: FiMessageCircle,
  },
  {
    id: "community",
    title: "Join Our Community",
    description:
      "Stay close to product news, event invites, case studies, and practical clinical operations insights.",
    helper:
      "A lighter-touch way to stay connected with the latest from ClinRT.",
    badge: "Updates & Insights",
    icon: FiUsers,
  },
];

const industryStandards = [
  "ICH-GCP",
  "FDA 21 CFR Part 11",
  "EU Annex 11",
  "GDPR",
  "HIPAA",
] as const;

const quickHighlights: Highlight[] = [
  {
    icon: FiCheckCircle,
    title: "Right team, faster",
    text: "Each route is structured so demo, support, and community requests land in the right queue.",
  },
  {
    icon: FiCalendar,
    title: "Demo-first flow",
    text: "Request a Demo is placed first for teams who are ready to explore the platform in more depth.",
  },
  {
    icon: FiShield,
    title: "Clean and compliant",
    text: "The page is designed to feel professional, clear, and aligned with regulated industry expectations.",
  },
];

const contactChannels: ContactChannel[] = [
  {
    icon: FiMail,
    title: "General enquiries",
    value: "enquiry@clinrtglobal.com",
    href: "mailto:enquiry@clinrtglobal.com",
  },
  {
    icon: FiMail,
    title: "Product and support",
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
      "ClinRT Global Services Pvt. Ltd. 905, Tower 3, Kohinoor World Towers (KWT) PCMC, Pune, Maharashtra 411018, India",
  },
];

type InputProps = InputHTMLAttributes<HTMLInputElement>;
const Input = ({ className, ...props }: InputProps) => (
  <input {...props} className={cn(fieldClass, className)} />
);

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
const Select = ({ className, ...props }: SelectProps) => (
  <select {...props} className={cn(selectClass, className)} />
);

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const TextArea = ({ className, ...props }: TextAreaProps) => (
  <textarea {...props} className={cn(fieldClass, className)} />
);

const FieldShell = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <label className="grid gap-2">
    <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
      {label}
    </span>
    {children}
  </label>
);

const CheckboxRow = ({ label }: { label: string }) => (
  <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
    <input
      type="checkbox"
      required
      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0f243a] focus:ring-[#0f243a]"
    />
    <span>{label}</span>
  </label>
);

export default function Contact() {
  const [activeForm, setActiveForm] = useState<FormType>("demo");
  const activeOption =
    formOptions.find((option) => option.id === activeForm) ?? formOptions[0];

  return (
    <PageTransition>
      {/* ---------------- CONTACT FORMS ---------------- */}

      <SectionWrapper className="bg-(--color-primary)/70">
        <div className="mt-30 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] text-black">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="type-h4 font-semibold">Choose your path</p>
              <p className="mt-2 text-sm text-black/70">
                Select the form that fits your request. We will route it to the
                right team instantly.
              </p>
            </motion.div>
            <div className="space-y-4">
              {formOptions.map((option, index) => {
                const Icon = option.icon;
                const isActive = activeForm === option.id;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveForm(option.id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "group w-full rounded-3xl border px-5 py-5 text-left transition",
                      isActive
                        ? "border-white/40 bg-white/15 shadow-xl"
                        : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10",
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span
                          className={cn(
                            "grid h-12 w-12 place-items-center rounded-2xl border text-black",
                            isActive
                              ? "border-white/40 bg-white/20"
                              : "border-white/15 bg-white/10",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="type-h5 font-semibold text-black">
                            {option.title}
                          </p>
                          <p className="mt-2 text-sm text-black/70">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]",
                          isActive
                            ? "border-white/40 bg-white/15 text-black"
                            : "border-white/20 bg-white/10 text-black/70",
                        )}
                      >
                        {option.badge}
                        <FiArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeForm === "touch" ? (
              <motion.div
                key="touch"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <p className="type-h2 font-semibold text-black">Get in Touch</p>
                <p className="type-h6 text-black/70 mt-2">
                  Whether you&apos;re exploring or ready to begin ? our team
                  will reach out shortly.
                </p>

                <form
                  action="https://formsubmit.co/enquiry@clinrtglobal.com"
                  method="POST"
                  className="grid gap-4 mt-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      name="firstName"
                      placeholder="First Name*"
                      required
                    />
                    <Input name="lastName" placeholder="Last Name*" required />
                  </div>

                  <Input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    required
                  />

                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number*"
                    required
                  />

                  <Input name="company" placeholder="Company Name*" required />

                  <Input name="designation" placeholder="Designation" />

                  <select
                    name="enquiryType"
                    className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-black"
                  >
                    <option>Request a Demo</option>
                    <option>Product Enquiry</option>
                    <option>Support</option>
                    <option>Careers</option>
                    <option>Other</option>
                  </select>

                  <TextArea
                    name="message"
                    rows={4}
                    placeholder="Tell us how we can help..."
                    required
                  />

                  <Input type="file" name="file" />

                  <label className="flex gap-2 text-xs text-black/70">
                    <input type="checkbox" required />I agree to be contacted
                    and accept the privacy policy.
                  </label>

                  <Button label="Submit Enquiry" type="submit" />
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="community"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <h3 className="type-h4 font-semibold text-black">
                  Join Our Community
                </h3>
                <p className="text-sm text-black/70 mt-2">
                  Stay connected with updates, insights and industry news.
                </p>

                <form
                  action="https://formsubmit.co/enquiry@clinrtglobal.com"
                  method="POST"
                  className="grid gap-4 mt-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      name="firstName"
                      placeholder="First Name*"
                      required
                      className="text-black"
                    />
                    <Input name="lastName" placeholder="Last Name*" required />
                  </div>

                  <Input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    required
                  />

                  <Input name="company" placeholder="Company Name*" />

                  <Input
                    name="role"
                    placeholder="Designation / Role*"
                    required
                  />

                  <select
                    name="interest"
                    className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-black"
                  >
                    <option>Product Updates</option>
                    <option>Events & Webinars</option>
                    <option>Case Studies</option>
                    <option>Blogs & Insights</option>
                    <option>Industry News</option>
                    <option>All</option>
                  </select>

                  <Input
                    name="country"
                    placeholder="Country / Region*"
                    required
                  />

                  <label className="flex gap-2 text-xs text-black/70">
                    <input type="checkbox" required />I agree to receive
                    communications and accept the privacy policy.
                  </label>

                  <Button label="Join Now" type="submit" />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SectionWrapper>

      {/* ---------------- CONTACT INFO + MAP (UNCHANGED) ---------------- */}

      <SectionWrapper>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] items-start">
          <div>
            <h3 className="type-h3 font-semibold">Contact Information</h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <FiMail className="text-[#0f243a] text-xl" />
                <span>enquiry@clinrtglobal.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-[#0f243a] text-xl" />
                <span>support@clinrtglobal.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-[#0f243a] text-xl" />
                <span>hr@clinrtglobal.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-[#0f243a] text-xl" />
                <span>+91 8530067925</span>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-[#0f243a] text-xl mt-1" />
                <span>
                  ClinRT Global Services Pvt. Ltd. 905, Tower 3, Kohinoor World
                  Towers (KWT) PCMC, Pune, Maharashtra 411018, India
                </span>
              </div>
            </div>
          </div>

          <div className="h-100 w-full overflow-hidden rounded-3xl sm:h-96 lg:h-100">
            <ContactMap />
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
