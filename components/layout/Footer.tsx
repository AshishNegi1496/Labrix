import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { footerData, siteMeta } from "@/data";
import Button from "../ui/Button";

export default function Footer() {
  return (
    <footer className="">
      <div className="m-2">
        <div className="rounded-3xl bg-(--primary-color) px-8 py-10 text-white">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr]">
            {/* 1. Branding Section */}
            <div>
              <div className="flex items-center gap-3">
                <LogoMark />
                <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                  {siteMeta.name}
                </span>
              </div>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                {footerData.description}
              </p>
            </div>

            {/* 2. Quick Links */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                {footerData.quickLinksLabel}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {footerData.quickLinks.map((link) => (
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

            {/* 3. Services */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                {footerData.servicesLabel}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {footerData.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            {/* 4. NEW: Community CTA Section */}
            <div className="flex flex-col gap-4 border-l border-white/10 pl-0 lg:pl-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-white">
                Our Community
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Be a part of our community and stay close to the conversations,
                insights, and milestones that shape our work.
              </p>

              <Button href="/contact" label="Join our community" />
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-12 border-t  pt-6 text-center type-h6 text-(--color-orange)">
            {footerData.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
