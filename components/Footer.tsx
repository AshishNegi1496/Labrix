import Link from "next/link";
import LogoMark from "@/components/LogoMark";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
];

const services = [
  "Analytical Testing",
  "Biomedical Testing",
  "Toxicology Analysis",
  "Pharmaceutical Testing",
];

const hours = [
  { label: "Mon - Fri", value: "10:00AM - 07:00PM" },
  { label: "Saturday", value: "12:00AM - 05:00PM" },
  { label: "Sunday", value: "Closed" },
];

export default function Footer() {
  return (
    <footer className="py-16">
      <div className="m-2">
        <div className="rounded-3xl bg-(--primary-color) px-8 py-10 text-white">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <LogoMark />
                <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                  labrix
                </span>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Our website serves as a comprehensive hub for researchers,
                institutions, and partners.
              </p>

              <p className="mt-6 text-sm font-semibold">
                Subscribe to our newsletter
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
                <button type="button" className="btn-default btn-sm">
                  Join
                </button>
              </div>
              <label className="mt-3 flex items-start gap-2 text-xs text-white/60">
                <input
                  type="checkbox"
                  className="mt-1 h-3 w-3 rounded border-white/40 bg-transparent"
                />
                I agree to the privacy policy.
              </label>
            </div>

            <div>
              <p className="text-sm font-semibold">Quick Links</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold">Our Services</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold">Working Hours</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {hours.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-white/90">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/60">
            Copyright 2025 All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
