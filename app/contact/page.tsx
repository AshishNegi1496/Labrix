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

      <SectionWrapper fullBleed>
        <div className="relative mt-20 grid gap-10 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[#0f243a] px-6 py-8 shadow-[0_35px_120px_rgba(15,36,58,0.2)] md:px-8 md:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-12">
          <Image
            src="/images/operations.avif"
            alt="ClinRT team collaborating on clinical operations"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,27,46,0.94)_0%,rgba(8,27,46,0.82)_42%,rgba(8,27,46,0.56)_100%)]" />
          <div className="absolute -left-20 top-12 h-64 w-64 rounded-full bg-[#f59e0b]/20 blur-3xl" />
          <div className="absolute -right-12 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 space-y-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-[1.9rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/75">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                Contact ClinRT
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
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "group w-full rounded-[1.6rem] border px-5 py-5 text-left transition duration-300",
                      isActive
                        ? "border-white/35 bg-white/18 shadow-xl"
                        : "border-white/12 bg-white/8 hover:border-white/25 hover:bg-white/12",
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span
                          className={cn(
                            "grid h-12 w-12 place-items-center rounded-2xl border text-white",
                            isActive
                              ? "border-white/40 bg-white/20"
                              : "border-white/15 bg-white/10",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="type-h5 font-semibold text-white">
                            {option.title}
                          </p>
                          <p className="mt-2 text-sm text-white/70">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]",
                          isActive
                            ? "border-white/40 bg-white/15 text-white"
                            : "border-white/20 bg-white/10 text-white/70",
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
            <motion.div
              key={activeForm}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.32 }}
              className="relative z-10 rounded-[2rem] border border-white/35 bg-white/92 p-6 shadow-[0_30px_90px_rgba(4,18,33,0.22)] backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    {activeOption.badge}
                  </p>
                  <h2 className="mt-2 type-h3 font-semibold text-[#0f243a]">
                    {activeOption.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {activeOption.helper}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-emerald-700">
                  <FiShield className="h-3.5 w-3.5" />
                  Secure Form
                </span>
              </div>

              {activeForm === "demo" && (
                <form
                  action="https://formsubmit.co/enquiry@clinrtglobal.com"
                  method="POST"
                  className="mt-6 grid gap-5"
                >
                  <input
                    type="hidden"
                    name="_subject"
                    value="Request a Demo - ClinRT website"
                  />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="First Name">
                      <Input
                        name="firstName"
                        placeholder="Enter first name"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Last Name">
                      <Input
                        name="lastName"
                        placeholder="Enter last name"
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Work Email">
                      <Input
                        type="email"
                        name="email"
                        placeholder="name@company.com"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Phone Number">
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="+91 or local number"
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Company">
                      <Input
                        name="company"
                        placeholder="Company or organisation"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Role">
                      <Input
                        name="designation"
                        placeholder="Clinical operations lead"
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Primary Interest">
                      <Select name="productInterest" defaultValue="" required>
                        <option value="" disabled>
                          Select focus area
                        </option>
                        <option>iClinRT platform overview</option>
                        <option>Randomization workflows</option>
                        <option>Supply and kit management</option>
                        <option>Integrations and reporting</option>
                        <option>Full platform evaluation</option>
                      </Select>
                    </FieldShell>
                    <FieldShell label="Expected Timeline">
                      <Select name="timeline" defaultValue="" required>
                        <option value="" disabled>
                          Select timeline
                        </option>
                        <option>Immediately</option>
                        <option>Within 30 days</option>
                        <option>This quarter</option>
                        <option>Just exploring</option>
                      </Select>
                    </FieldShell>
                  </div>

                  <FieldShell label="What should we prepare for the demo">
                    <TextArea
                      name="message"
                      rows={4}
                      placeholder="Tell us about your study type, current tools, timelines, or the workflows you want to see."
                      className="min-h-[140px] resize-none"
                      required
                    />
                  </FieldShell>

                  <CheckboxRow label="I agree to be contacted about my demo request and understand my information will be handled according to the privacy policy." />

                  <div className="flex flex-wrap items-center gap-4">
                    <Button label="Request Demo" type="submit" />
                    <p className="text-sm text-slate-500">
                      We typically route demo requests to the right team within
                      one business day.
                    </p>
                  </div>
                </form>
              )}

              {activeForm === "touch" && (
                <form
                  action="https://formsubmit.co/enquiry@clinrtglobal.com"
                  method="POST"
                  encType="multipart/form-data"
                  className="mt-6 grid gap-5"
                >
                  <input
                    type="hidden"
                    name="_subject"
                    value="Get in Touch - ClinRT website"
                  />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="First Name">
                      <Input
                        name="firstName"
                        placeholder="Enter first name"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Last Name">
                      <Input
                        name="lastName"
                        placeholder="Enter last name"
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Email">
                      <Input
                        type="email"
                        name="email"
                        placeholder="name@company.com"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Phone Number">
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Add a direct line"
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Company">
                      <Input
                        name="company"
                        placeholder="Company name"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Designation">
                      <Input name="designation" placeholder="Your role" />
                    </FieldShell>
                  </div>

                  <FieldShell label="Enquiry Type">
                    <Select name="enquiryType" defaultValue="" required>
                      <option value="" disabled>
                        Select enquiry type
                      </option>
                      <option>Product enquiry</option>
                      <option>Support</option>
                      <option>Partnership</option>
                      <option>Careers</option>
                      <option>Other</option>
                    </Select>
                  </FieldShell>

                  <FieldShell label="Message">
                    <TextArea
                      name="message"
                      rows={4}
                      placeholder="Tell us how we can help."
                      className="min-h-[140px] resize-none"
                      required
                    />
                  </FieldShell>

                  <FieldShell label="Attachment">
                    <Input
                      type="file"
                      name="file"
                      className="file:mr-4 file:rounded-full file:border-0 file:bg-[#0f243a] file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-[0.2em] file:text-white hover:file:bg-[#163451]"
                    />
                  </FieldShell>

                  <CheckboxRow label="I agree to be contacted about my enquiry and accept the privacy policy." />

                  <div className="flex flex-wrap items-center gap-4">
                    <Button label="Submit Enquiry" type="submit" />
                    <p className="text-sm text-slate-500">
                      Use this route for support, services, or broader business
                      conversations.
                    </p>
                  </div>
                </form>
              )}

              {activeForm === "community" && (
                <form
                  action="https://formsubmit.co/enquiry@clinrtglobal.com"
                  method="POST"
                  className="mt-6 grid gap-5"
                >
                  <input
                    type="hidden"
                    name="_subject"
                    value="Join Our Community - ClinRT website"
                  />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="First Name">
                      <Input
                        name="firstName"
                        placeholder="Enter first name"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Last Name">
                      <Input
                        name="lastName"
                        placeholder="Enter last name"
                        required
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Email">
                      <Input
                        type="email"
                        name="email"
                        placeholder="name@company.com"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Company">
                      <Input
                        name="company"
                        placeholder="Company or organisation"
                      />
                    </FieldShell>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldShell label="Role">
                      <Input
                        name="role"
                        placeholder="Designation or role"
                        required
                      />
                    </FieldShell>
                    <FieldShell label="Country or Region">
                      <Input
                        name="country"
                        placeholder="Country or region"
                        required
                      />
                    </FieldShell>
                  </div>

                  <FieldShell label="What would you like to receive">
                    <Select name="interest" defaultValue="" required>
                      <option value="" disabled>
                        Select an interest area
                      </option>
                      <option>Product updates</option>
                      <option>Events and webinars</option>
                      <option>Case studies</option>
                      <option>Blogs and insights</option>
                      <option>Industry news</option>
                      <option>Everything</option>
                    </Select>
                  </FieldShell>

                  <CheckboxRow label="I agree to receive community communications from ClinRT and accept the privacy policy." />

                  <div className="flex flex-wrap items-center gap-4">
                    <Button label="Join Community" type="submit" />
                    <p className="text-sm text-slate-500">
                      Expect occasional, relevant updates rather than noisy
                      inbox traffic.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pb-10 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,36,58,0.06)] backdrop-blur md:p-8"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
              Contact Information
            </p>
            <h3 className="mt-3 type-h3 font-semibold text-[#0f243a]">
              Reach the ClinRT team directly
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              If you already know where your request belongs, use the details
              below. For everything else, the forms above are the fastest path.
            </p>

            <div className="mt-6 grid gap-3">
              {contactChannels.map((item) => {
                const Icon = item.icon;
                const card = (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#0f243a]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <a key={item.title} href={item.href} className="block">
                      {card}
                    </a>
                  );
                }

                return <div key={item.title}>{card}</div>;
              })}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[#0f243a]/10 bg-[#0f243a] p-5 text-white">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/70">
                <FiGlobe className="h-4 w-4 text-[#f59e0b]" />
                Office Hours
              </div>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Monday to Friday, 9:30 AM to 6:30 PM IST. Demo and support
                submissions are reviewed and routed to the appropriate team.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.05 }}
            className="rounded-[2rem] border border-slate-200 bg-white/85 p-3 shadow-[0_20px_60px_rgba(15,36,58,0.06)] backdrop-blur"
          >
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    Find Us
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#0f243a]">
                    Pune office location
                  </h3>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-slate-600">
                  On-site and remote support
                </span>
              </div>

              <div className="mt-5 h-[420px] w-full overflow-hidden rounded-[1.5rem]">
                <ContactMap />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
