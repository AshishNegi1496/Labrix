import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { footerData } from "@/data";

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
        <div className="rounded-3xl bg-(--primary-color) px-8 py-10 text-black">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr]">
            <div>
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2 z-50">
                  <Image
                    src="/clinrt-logo-white.png"
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
                {servicesLabel}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            {/* 4. NEW: Community CTA Section */}
            <div className="flex flex-col gap-4 border-l border-white/10 pl-0 lg:pl-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-black">
                Our Community
              </p>
              <p className="text-sm leading-relaxed text-black/70">
                Be a part of our community and stay close to the conversations,
                insights, and milestones that shape our work.
              </p>

              <Button href="/contact" label="Join our community" />
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
