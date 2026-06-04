"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiMail,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";

import {
  contactChannels,
  contactDemoCountryOptions,
  contactDemoTimelineOptions,
  contactHero,
  contactInfoBlock,
  contactMapBlock,
  contactFileConstraints,
  contactTouchEnquiryTypeOptions,
  contactLeadSourceOptions,
  contactSourceOfContactOptions,
} from "@/data";

import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ContactMap from "@/components/ContactMap";
import SectionBadge from "@/components/ui/SectionBadge";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

const enquiryTypeOptions = contactTouchEnquiryTypeOptions;
const communityCountryOptions = contactDemoCountryOptions;
const communityTimelineOptions = contactDemoTimelineOptions;
const sourceOfContactOptions = contactSourceOfContactOptions;
const leadSourceOptions = contactLeadSourceOptions;

const formMeta = {
  touch: {
    title: "Get in Touch",
    helper:
      "Whether you are exploring, evaluating, or ready to begin, we are just a message away. Share your details and our team will reach out shortly.",
    submitLabel: "Submit",
    switchTitle: "Get in Touch",
    switchDescription:
      "  Whether you are exploring, evaluating, or ready to begin, we are just a message away. Share your details and our team will reach out shortly.",
    successMessage:
      "Thanks for contacting us, our team will get back to you within 24 to 48 hours.",
  },
  demo: {
    title: "Request a Demo",
    helper:
      "Share your details and our team will reach out shortly with demo information.",
    submitLabel: "Request a Demo",
    switchTitle: "Request a Demo",
    switchDescription:
      "Book a guided walkthrough or ask for more platform information.",
    successMessage: "Thank you for your demo request!",
  },
} as const;

export default function ContactPage() {
  const [activeForm, setActiveForm] = useState<"touch" | "demo">("touch");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const isSuccessMessage = message !== "" && message !== "Something went wrong";
  const [touchMessage, setTouchMessage] = useState("");
  const [demoMessage, setDemoMessage] = useState("");
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    type: "touch" | "demo",
  ) {
    e.preventDefault();

    const form = e.currentTarget;

    setLoading(true);
    if (type === "touch") {
      setTouchMessage("");
    } else {
      setDemoMessage("");
    }

    try {
      const formData = new FormData(form);
      formData.append("contactFormId", type);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed");
      }

      const successMessage =
        type === "touch"
          ? formMeta.touch.successMessage
          : formMeta.demo.successMessage;
      if (type === "touch") {
        setTouchMessage(successMessage);
      } else {
        setDemoMessage(successMessage);
      }

      form.reset();
    } catch (error) {
      console.error(error);
      if (type === "touch") {
        setTouchMessage("Something went wrong");
      } else {
        setDemoMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageTransition>
      {/* HERO */}

      <section className="relative flex min-h-[78svh] items-end overflow-hidden sm:min-h-[88svh] lg:min-h-screen">
        <Image
          src={contactHero.image}
          alt="ClinRT operations workspace"
          fill
          loading="lazy"
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,242,254,0.2)_0%,rgba(167,243,208,0.16)_22%,rgba(14,116,144,0.4)_52%,rgba(15,23,42,0.84)_100%)]" />

        <div className="hero-content-lift relative z-10 section-shell w-full pb-12 pt-24 text-white sm:pb-16 sm:pt-28 md:pb-20 lg:pb-24">
          <ScrollReveal className="mb-8 max-w-3xl sm:mb-12 lg:mb-16">
            <p className="page-banner-title font-semibold">
              {contactHero.punchline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#contact-forms" label="Start a Conversation" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FORMS */}

      <section id="contact-forms" className="px-4 py-16 md:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0f243a] p-5 md:p-10">
          <Image
            src="/images/operations.avif"
            alt="Operations"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,27,46,0.94)_0%,rgba(8,27,46,0.82)_42%,rgba(8,27,46,0.56)_100%)]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-2">
            {/* LEFT */}

            <div className="space-y-5 text-white">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/75">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                  Contact ClinRT
                </p>
              </div>

              {/* SWITCH */}

              <button
                onClick={() => setActiveForm("touch")}
                className={`w-full rounded-3xl border p-5 text-left transition ${
                  activeForm === "touch"
                    ? "border-white/30 bg-white/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                      <FiMessageCircle />
                    </span>

                    <div>
                      <p className="text-xl font-semibold">
                        {formMeta.touch.switchTitle}
                      </p>

                      <p className="mt-2 text-sm text-white/70">
                        {formMeta.touch.switchDescription}
                      </p>
                    </div>
                  </div>

                  <FiArrowRight />
                </div>
              </button>

              <button
                onClick={() => setActiveForm("demo")}
                className={`w-full rounded-3xl border p-5 text-left transition ${
                  activeForm === "demo"
                    ? "border-white/30 bg-white/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                      <FiMail />
                    </span>

                    <div>
                      <p className="text-xl font-semibold">
                        {formMeta.demo.switchTitle}
                      </p>

                      <p className="mt-2 text-sm text-white/70">
                        {formMeta.demo.switchDescription}
                      </p>
                    </div>
                  </div>

                  <FiArrowRight />
                </div>
              </button>
            </div>

            {/* RIGHT */}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeForm}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-4xl bg-white p-6 md:p-8"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                      Secure Form
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-[#0f243a]">
                      {formMeta[activeForm].title}
                    </h2>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                    <FiShield />
                    Protected
                  </span>
                </div>

                {/* ENQUIRY FORM */}
                {touchMessage && (
                  <div
                    className={`mt-5 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${
                      touchMessage !== "Something went wrong"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border border-rose-200 bg-rose-50 text-rose-700"
                    }`}
                  >
                    <span>{touchMessage}</span>
                  </div>
                )}
                {demoMessage && (
                  <div
                    className={`mt-5 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${
                      demoMessage !== "Something went wrong"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border border-rose-200 bg-rose-50 text-rose-700"
                    }`}
                  >
                    <span>{demoMessage}</span>
                  </div>
                )}
                {activeForm === "touch" && (
                  <form
                    onSubmit={(e) => handleSubmit(e, "touch")}
                    className="mt-6 grid gap-5"
                  >
                    <p className="text-sm leading-6 text-slate-600">
                      {formMeta.touch.helper}
                    </p>

                    <div className="grid gap-2 md:grid-cols-2">
                      <input
                        name="firstName"
                        placeholder="First Name"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />

                      <input
                        name="lastName"
                        placeholder="Last Name"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />

                      <input
                        name="phone"
                        placeholder="Phone Number"
                        className="rounded-2xl border p-4 outline-none"
                      />
                    </div>

                    <input
                      name="company"
                      placeholder="Company Name"
                      required
                      className="rounded-2xl border p-4 outline-none"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        name="designation"
                        placeholder="Designation"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />

                      <select
                        name="enquiryType"
                        required
                        defaultValue=""
                        className="rounded-2xl border p-4 outline-none"
                      >
                        <option value="" disabled>
                          Enquiry Type
                        </option>

                        {enquiryTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      name="message"
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                      className="rounded-2xl border p-4 outline-none"
                    />

                    <select
                      name="sourceOfContact"
                      defaultValue=""
                      className="rounded-2xl border p-4 outline-none"
                    >
                      <option value="" disabled>
                        Source of Contact
                      </option>

                      {sourceOfContactOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <label className="grid gap-2 rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                      <span className="font-medium text-slate-900">
                        Upload File (optional)
                      </span>
                      <input
                        type="file"
                        name="attachment"
                        accept={contactFileConstraints.accept}
                        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#0f243a] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                      />
                      <span className="text-xs text-slate-500">
                        {contactFileConstraints.errorMessage}
                      </span>
                    </label>

                    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-1 h-4 w-4 accent-[#0f243a]"
                      />

                      <span>
                        I consent to ClinRT Global Services collecting and
                        processing my details in accordance with its Privacy
                        Policy.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-full bg-[#0f243a] px-6 py-4 text-sm font-semibold text-white transition hover:scale-[1.02]"
                    >
                      {loading ? "Sending..." : formMeta.touch.submitLabel}
                    </button>
                  </form>
                )}

                {/* Request a Demo form */}

                {activeForm === "demo" && (
                  <form
                    onSubmit={(e) => handleSubmit(e, "demo")}
                    className="mt-6 grid gap-5"
                  >
                    <p className="text-sm leading-6 text-slate-600">
                      {formMeta.demo.helper}
                    </p>

                    <input
                      type="text"
                      name="_honey"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <input type="hidden" name="contactFormId" value="demo" />
                    <input
                      type="hidden"
                      name="formType"
                      value="Request a Demo"
                    />
                    <input
                      type="hidden"
                      name="sourcePage"
                      value="Contact Page"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        name="firstName"
                        placeholder="First Name"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />

                      <input
                        name="lastName"
                        placeholder="Last Name"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        type="email"
                        name="email"
                        placeholder="Work Email"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="rounded-2xl border p-4 outline-none"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        name="company"
                        placeholder="Company"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />

                      <input
                        name="designation"
                        placeholder="Role"
                        required
                        className="rounded-2xl border p-4 outline-none"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <select
                        name="countryRegion"
                        required
                        defaultValue=""
                        className="rounded-2xl border p-4 outline-none"
                      >
                        <option value="" disabled>
                          Country
                        </option>

                        {communityCountryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        name="timeline"
                        required
                        defaultValue=""
                        className="rounded-2xl border p-4 outline-none"
                      >
                        <option value="" disabled>
                          Select Timeline
                        </option>

                        {communityTimelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      name="message"
                      placeholder="Tell us about your study type, current tools, timelines, or the workflows you want to see."
                      rows={5}
                      required
                      className="min-h-[140px] resize-none rounded-2xl border p-4 outline-none"
                    />

                    <select
                      name="leadSource"
                      defaultValue=""
                      className="rounded-2xl border p-4 outline-none"
                    >
                      <option value="" disabled>
                        Lead Source
                      </option>

                      {leadSourceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-1 h-4 w-4 accent-[#0f243a]"
                      />

                      <span>
                        I agree to be contacted about my demo request and
                        understand my information will be handled according to
                        the privacy policy.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-full bg-[#0f243a] px-6 py-4 text-sm font-semibold text-white transition hover:scale-[1.02]"
                    >
                      {loading ? "Sending..." : formMeta.demo.submitLabel}
                    </button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* BOTTOM */}

      <SectionWrapper fullBleed className="pb-10 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-4xl border border-slate-200 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,36,58,0.06)] backdrop-blur md:p-8"
          >
            <SectionBadge>{contactInfoBlock.label}</SectionBadge>

            <p className="mt-3 type-h3 font-semibold text-[#0f243a]">
              {contactInfoBlock.title}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {contactInfoBlock.description}
            </p>

            <div className="mt-6 grid gap-3">
              {contactChannels.map((item) => {
                const Icon = item.icon;

                const card = (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/85 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.05 }}
            className="rounded-4xl border border-slate-200 bg-white/85 p-3 shadow-[0_20px_60px_rgba(15,36,58,0.06)] backdrop-blur"
          >
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <SectionBadge>{contactMapBlock.label}</SectionBadge>

                  <h3 className="mt-2 text-2xl font-semibold text-[#0f243a]">
                    {contactMapBlock.title}
                  </h3>
                </div>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-slate-600">
                  {contactMapBlock.badge}
                </span>
              </div>

              <div className="mt-5 h-80 w-full overflow-hidden rounded-3xl sm:h-104 lg:h-128">
                <ContactMap />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
