"use client";

import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Ticker from "@/components/Ticker";
import Button from "@/components/ui/Button";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const ContactMap = dynamic(() => import("@/components/ContactMap"), {
  ssr: false,
});

const fieldClass =
  "w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/60 backdrop-blur focus:outline-none focus:border-white/60";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
const Input = ({ className, ...props }: InputProps) => (
  <input {...props} className={cn(fieldClass, className)} />
);

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const TextArea = ({ className, ...props }: TextAreaProps) => (
  <textarea {...props} className={cn(fieldClass, className)} />
);

export default function Contact() {
  const [activeForm, setActiveForm] = useState<"touch" | "community">("touch");

  const formOptions = [
    {
      id: "touch" as const,
      title: "Get in Touch",
      description:
        "Tell us about your study goals and we will guide the next best step.",
      badge: "Enquiry Form",
      icon: FiMessageCircle,
    },
    {
      id: "community" as const,
      title: "Join Our Community",
      description:
        "Stay close to ClinRT news, product releases, and clinical operations insights.",
      badge: "Community Form",
      icon: FiUsers,
    },
  ];

  return (
    <PageTransition>
      {/* ---------------- CONTACT FORMS ---------------- */}

      <SectionWrapper className="bg-(--color-primary)">
        <div className="mt-30 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] text-white">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="type-h4 font-semibold">Choose your path</p>
              <p className="mt-2 text-sm text-white/70">
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
            {activeForm === "touch" ? (
              <motion.div
                key="touch"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <p className="type-h2 font-semibold text-white">Get in Touch</p>
                <p className="type-h6 text-white/70 mt-2">
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
                    className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white"
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

                  <label className="flex gap-2 text-xs text-white/70">
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
                <h3 className="type-h4 font-semibold text-white">
                  Join Our Community
                </h3>
                <p className="text-sm text-white/70 mt-2">
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
                    className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white"
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

                  <label className="flex gap-2 text-xs text-white/70">
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
