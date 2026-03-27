import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { footerData, getContactFormHref } from "@/data";

const socialIcons: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
};

export default function Footer() {
  const {
    description,
    quickLinksLabel,
    quickLinks,
    servicesLabel,
    services,
    copyright,
  } = footerData;

  return (
    <footer>
      <div className="m-2">
        <div className="rounded-3xl bg-white px-8 py-10 text-black">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr]">
            <div>
              <div className="flex items-center">
                <Link href="/" className="z-50 flex items-center gap-2">
                  <Image
                    src="/images/company-logo.png"
                    alt="ClinRT Logo"
                    width={160}
                    height={20}
                    priority
                  />
                </Link>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-black/70">
                {description}
              </p>
            </div>

            {/* 2. Quick Links */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                {quickLinksLabel}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Services */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                {servicesLabel}
              </p>
              <ul className="mt-4 flex flex-wrap gap-3 text-black/70">
                {services.map((service) => {
                  const Icon = socialIcons[service.toLowerCase()] ?? FaGlobe;

                  return (
                    <li key={service}>
                      <span
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-black/[0.03] text-lg text-black/70 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                        title={service}
                      >
                        <Icon aria-hidden="true" />
                        <span className="sr-only">{service}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 4. Contact CTA Section */}
            <div className="flex flex-col gap-4 border-l border-white/10 pl-0 lg:pl-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-black">
                Contact ClinRT
              </p>
              <p className="text-sm leading-relaxed text-black/70">
                Start a conversation with our team for demos, brochure access,
                support questions, or partnership enquiries.
              </p>

              <Button href={getContactFormHref("touch")} label="Get in touch" />
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-12 border-t pt-6 text-center type-h6 text-black">
            {copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
