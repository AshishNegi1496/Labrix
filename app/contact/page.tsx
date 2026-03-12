"use client";

import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Ticker from "@/components/Ticker";
import Button from "@/components/ui/Button";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("@/components/ContactMap"), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = (props: any) => (
  <input
    {...props}
    className="w-full rounded-xl border border-black/40 bg-white/5 px-4 py-3 text-sm backdrop-blur focus:outline-none focus:border-[#0f243a]"
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextArea = (props: any) => (
  <textarea
    {...props}
    className="w-full rounded-xl border border-black/40 bg-white/5 px-4 py-3 text-sm backdrop-blur focus:outline-none focus:border-[#0f243a]"
  />
);

export default function Contact() {
  return (
    <PageTransition>
      <Ticker />

      {/* ---------------- CONTACT FORMS ---------------- */}

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-2">
          {/* ================= ENQUIRY FORM ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 p-8 backdrop-blur bg-white/5"
          >
            <p className="type-h2 font-semibold">Get in Touch</p>
            <p className="type-h6 text-(--text-description) mt-2">
              Whether you're exploring or ready to begin — our team will reach
              out shortly.
            </p>

            <form
              action="https://formsubmit.co/enquiry@clinrtglobal.com"
              method="POST"
              className="grid gap-4 mt-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <Input name="firstName" placeholder="First Name*" required />
                <Input name="lastName" placeholder="Last Name*" required />
              </div>

              <Input type="email" name="email" placeholder="Email*" required />

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
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm "
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

              <label className="flex gap-2 text-xs text-(--text-description)">
                <input type="checkbox" required />I agree to be contacted and
                accept the privacy policy.
              </label>

              <Button label="Submit Enquiry" type="submit" />
            </form>
          </motion.div>

          {/* ================= COMMUNITY FORM ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 p-8 backdrop-blur bg-white/5"
          >
            <h3 className="type-h4 font-semibold">Join Our Community</h3>
            <p className="text-sm text-(--text-description) mt-2">
              Stay connected with updates, insights and industry news.
            </p>

            <form
              action="https://formsubmit.co/enquiry@clinrtglobal.com"
              method="POST"
              className="grid gap-4 mt-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <Input name="firstName" placeholder="First Name*" required />
                <Input name="lastName" placeholder="Last Name*" required />
              </div>

              <Input type="email" name="email" placeholder="Email*" required />

              <Input name="company" placeholder="Company Name*" />

              <Input name="role" placeholder="Designation / Role*" required />

              <select
                name="interest"
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm"
              >
                <option>Product Updates</option>
                <option>Events & Webinars</option>
                <option>Case Studies</option>
                <option>Blogs & Insights</option>
                <option>Industry News</option>
                <option>All</option>
              </select>

              <Input name="country" placeholder="Country / Region*" required />

              <label className="flex gap-2 text-xs text-(--text-description)">
                <input type="checkbox" required />I agree to receive
                communications and accept the privacy policy.
              </label>

              <Button label="Join Now" type="submit" />
            </form>
          </motion.div>
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

          <div className="h-100 w-full rounded-3xl overflow-hidden">
            <ContactMap />
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
