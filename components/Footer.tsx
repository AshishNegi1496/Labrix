import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import Button from "@/components/ui/Button";
import { footerData, siteMeta } from "@/data";

export default function Footer() {
  return (
    <footer className="">
      <div className="m-2">
        <div className="rounded-3xl bg-(--primary-color) px-8 py-10 text-white">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <LogoMark />
                <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                  {siteMeta.name}
                </span>
              </div>
              <p className="mt-4 text-sm text-white/70">
                {footerData.description}
              </p>

              <p className="mt-6 text-sm font-semibold">
                {footerData.newsletterLabel}
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                <input
                  type="email"
                  placeholder={footerData.newsletterPlaceholder}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
                <Button
                  label={footerData.newsletterCta}
                  size="sm"
                  className="shrink-0"
                  type="button"
                />
              </div>
              <label className="mt-3 flex items-start gap-2 text-xs text-white/60">
                <input
                  type="checkbox"
                  className="mt-1 h-3 w-3 rounded border-white/40 bg-transparent"
                />
                {footerData.newsletterAgreement}
              </label>
            </div>

            <div>
              <p className="text-sm font-semibold">
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

            <div>
              <p className="text-sm font-semibold">
                {footerData.servicesLabel}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {footerData.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold">{footerData.hoursLabel}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {footerData.hours.map((item) => (
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
            {footerData.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
