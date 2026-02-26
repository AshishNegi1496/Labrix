import Link from "next/link";
import LogoMark from "@/components/LogoMark";
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
                    <span className="text-white">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center type-h6 text-white/60">
            {footerData.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
