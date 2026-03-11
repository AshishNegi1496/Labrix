import Link from "next/link";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

const iclinrtCapabilities = [
  "Live trial health dashboards for sponsors and operations teams",
  "Site and milestone tracking with ownership and escalation logic",
  "Protocol-aware workflows that reduce execution drift",
  "Audit-ready activity logs for quality and compliance visibility",
] as const;

const upcomingProducts = [
  {
    title: "EDC",
    text: "Electronic data capture designed for cleaner inputs, faster review cycles, and better monitoring confidence.",
    href: "/coming-soon",
  },
  {
    title: "CTMS",
    text: "Clinical trial management workflows for timelines, budgets, and cross-functional coordination.",
    href: "/coming-soon",
  },
  {
    title: "eCOA",
    text: "Digital patient outcomes capture with dependable compliance and patient-friendly interaction models.",
    href: "/coming-soon",
  },
] as const;

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
export default function WhatWeBuildPage() {
  return (
    <PageTransition>
      <SectionWrapper className="pt-28 md:pt-36" fullBleed>
        <div className="grid gap-10 rounded-3xl bg-(--primary-color) px-6 py-16 text-white md:px-10 lg:grid-cols-[1.1fr_1fr]">
          <ScrollReveal>
            <Badge>What We Build</Badge>
            <p className="mt-4 type-h1 font-semibold text-white">
              Clinical technology built for real-world execution
            </p>
            <p className="mt-5 max-w-xl text-white/80">
              We create focused software products that help research teams run
              studies with clarity, speed, and operational control.
            </p>
          </ScrollReveal>

          <ScrollReveal
            delay={140}
            className="relative min-h-72 overflow-hidden rounded-2xl border border-white/20 bg-white/5"
          >
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-56 w-56">
                <span className="absolute inset-0 rounded-full border border-(--color-accent)/70 animate-ping" />
                <span className="absolute inset-5 rounded-full border border-white/40 animate-[spin_18s_linear_infinite]" />
                <span className="absolute inset-12 rounded-full border border-(--color-accent) animate-[spin_12s_linear_infinite_reverse]" />
                <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent)" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-xs tracking-[0.2em] text-white/80 backdrop-blur">
              Tech Animation
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <SectionWrapper id="iclinrt">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <ScrollReveal>
            <Badge>iClinRT</Badge>
            <h2 className="mt-3 type-h2 font-semibold">
              The core platform for connected trial operations
            </h2>
            <p className="mt-4 text-(--muted-color)">
              iClinRT gives trial teams one operational source of truth. It
              links planning, site execution, risks, and outcomes so teams can
              move faster without losing control of compliance and quality.
            </p>
            <div className="mt-8">
              <Button href="/contact" label="Request iClinRT Demo" />
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {iclinrtCapabilities.map((capability, index) => (
              <ScrollReveal key={capability} delay={index * 80}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-(--text-body)">{capability}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="mx-auto  rounded-3xl bg-white px-6 py-14 md:px-10">
          <ScrollReveal>
            <Badge>Expanding Platform</Badge>
            <h2 className="mt-3 type-h2 font-semibold">
              EDC, CTMS, and eCOA are launching soon
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {upcomingProducts.map((product, index) => (
              <ScrollReveal key={product.title} delay={index * 90}>
                <Link
                  href={product.href}
                  className="group block h-full rounded-2xl border border-slate-200 bg-(--bg-page) p-6 transition hover:-translate-y-1 hover:border-(--primary-color)/30"
                >
                  <p className="type-h4 font-semibold">{product.title}</p>
                  <p className="mt-3 text-sm text-(--muted-color)">
                    {product.text}
                  </p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-(--primary-color)">
                    Coming soon
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
