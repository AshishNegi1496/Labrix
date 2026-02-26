"use client";

import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import HeroBanner from "@/components/HeroBanner";
import { Panel } from "@/components/ui/Panel";
import Button from "@/components/ui/Button";
import {
  contactDetails,
  contactDetailsContent,
  contactFormContent,
  contactHero,
  contactHours,
  contactImages,
} from "@/data";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("@/components/ContactMap"), {
  ssr: false,
});

const Ping = () => (
  <span className="relative h-2.5 w-2.5">
    <span className="absolute inset-0 rounded-full bg-green-300 animate-ping" />
    <span className="absolute inset-0.5 rounded-full bg-green-300" />
  </span>
);
const Badge = ({ children }: { children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2 rounded-full border border-black/50 px-4 py-1.5 text-sm">
    <Ping />
    {children}
  </p>
);

export default function Contact() {
  return (
    <PageTransition>
      <HeroBanner
        title={contactHero.title}
        breadcrumb={contactHero.breadcrumb}
        image={contactHero.image}
      />
      <Ticker />

      <SectionWrapper fullBleed>
        <Panel className="bg-(--primary-color)">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            <form
              action="https://formsubmit.co/ashishnegi1496@gmail.com"
              method="POST"
              className="mt-6 grid gap-4"
            >
              {/* Required: Honeypot spam prevention */}
              <input type="text" name="_honey" style={{ display: "none" }} />

              <input
                type="hidden"
                name="_next"
                value="http://localhost:3000/thank-you"
              />

              {/* Optional: Custom email subject */}
              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Submission (Local Test)"
              />

              {/* Your form fields */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Your Mobile Number"
                required
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              />

              <div className="mt-2">
                <Button label="Send Message" type="submit" />
              </div>
            </form>

            <div className="relative h-120 overflow-hidden rounded-3xl">
              <div
                className="absolute inset-0 bg-cover"
                style={{ backgroundImage: `url(${contactImages.card})` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/60 p-4 type-h5 text-white">
                {contactHours.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between mt-2 first:mt-0"
                  >
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] items-start">
          <div>
            <Badge>{contactDetailsContent.label}</Badge>
            <p className="mt-4 type-h3 font-semibold">
              {contactDetailsContent.title}
            </p>
            <p className="mt-4 text-sm text-(--text-description)">
              {contactDetailsContent.description}
            </p>

            {/* Contact details with icons */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 ">
                <FiMail className="text-(--primary-color) text-2xl" />
                <span className="type-h6">{contactDetails.email}</span>
              </div>
              <div className="flex items-center gap-3 ">
                <FiMapPin className="text-(--primary-color) text-2xl" />
                <span className="type-h6">{contactDetails.location}</span>
              </div>
              <div className="flex items-center gap-3 ">
                <FiPhone className="text-(--primary-color) text-2xl" />
                <span className="type-h6">{contactDetails.phone}</span>
              </div>
            </div>
          </div>
          <div className="h-100 w-full rounded-3xl overflow-hidden">
            <ContactMap />
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
