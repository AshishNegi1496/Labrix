import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import Button from "@/components/ui/Button";
import CountUpOnView from "@/components/CountUpOnView";
import { FaqItem } from "@/components/FaqItem";
import { TestimonialCard } from "@/components/TestimonialCard";

const solutions = [
  {
    title: "iClinRT",
    text: "Real-time trial operations for enrollment, site readiness, and study oversight in a single command center.",
    href: "/what-we-build#iclinrt",
  },
  {
    title: "EDC",
    text: "Electronic data capture workflows that keep every patient record consistent, clean, and inspection-ready.",
    href: "/coming-soon",
  },
  {
    title: "CTMS",
    text: "Clinical trial management controls for timelines, budgets, vendors, and investigator coordination.",
    href: "/coming-soon",
  },
  {
    title: "eCOA",
    text: "Patient-centric digital outcome collection with reliable device support and compliance-focused audit trails.",
    href: "/coming-soon",
  },
] as const;

const featuredWorks = [
  {
    title: "Global Oncology Study Modernization",
    text: "Rebuilt trial monitoring and patient follow-up operations across 22 sites with iClinRT.",
  },
  {
    title: "Rare Disease Program Data Harmonization",
    text: "Unified fragmented operational data into a single live execution layer for sponsors and CRO teams.",
  },
  {
    title: "Remote Site Enablement for Phase III Trial",
    text: "Scaled remote workflows for trial teams while maintaining quality, compliance, and protocol consistency.",
  },
] as const;

const clients = [
  "Novalife Pharma",
  "CoreThera Biologics",
  "Apex Clinical",
  "MediPath Research",
  "Altura CRO",
  "Northbridge Health",
  "Vectra Labs",
  "Asteris Trials",
] as const;

const testimonials = [
  {
    quote:
      "ClinRT gave us real-time operational visibility we never had with disconnected trial tools.",
    name: "Priya Menon",
    role: "VP Clinical Operations",
  },
  {
    quote:
      "We shortened monitoring cycles and improved decision speed without adding process overhead.",
    name: "Daniel Ortiz",
    role: "Program Director, Global Trials",
  },
  {
    quote:
      "The platform made compliance traceability straightforward for our sponsor and partner teams.",
    name: "Hannah Brooks",
    role: "Head of Quality Systems",
  },
] as const;

const faqs = [
  {
    q: "What does ClinRT solve first?",
    a: "ClinRT first centralizes trial operations into one live view so teams can spot delays, risks, and data issues earlier.",
  },
  {
    q: "Can we start with one module and expand later?",
    a: "Yes. Teams typically start with iClinRT and then add EDC, CTMS, or eCOA based on study timelines.",
  },
  {
    q: "Is the platform suitable for global studies?",
    a: "Yes. The architecture is built for multi-site, cross-functional trial programs with strict compliance requirements.",
  },
  {
    q: "How fast can implementation begin?",
    a: "Implementation kickoff can start immediately after discovery and scope alignment.",
  },
] as const;

export default function HomePage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden min-h-[88vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/homePageVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/65 to-black/85" />
        <div className="relative z-10 section-shell py-28 md:py-40 text-white">
          <ScrollReveal className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.45em] text-white/75">
              Introduction Animation Video
            </p>
            <h1 className="mt-6 type-h1 font-semibold text-white">
              ClinRT for modern clinical research operations
            </h1>
            <p className="mt-6 max-w-2xl text-white/85">
              We help research teams move faster with connected workflows,
              transparent operations, and real-time execution intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/what-we-build" label="Explore What We Build" />
              <Button href="/contact" label="Talk to Our Team" />
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className="mt-12 grid max-w-xl grid-cols-2 gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
          >
            <div>
              <CountUpOnView
                to={40}
                suffix="+"
                className="text-3xl font-semibold text-white"
              />
              <p className="text-sm text-white/70">Active trial programs</p>
            </div>
            <div>
              <CountUpOnView
                to={120}
                suffix="+"
                className="text-3xl font-semibold text-white"
              />
              <p className="text-sm text-white/70">Delivery specialists</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper fullBleed className="py-0">
        <div className="bg-(--primary-color) px-6 py-4 text-center text-sm font-medium text-white md:text-base">
          Introducing ClinRT: built for compliant, scalable, and insight-led
          clinical execution.
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <ScrollReveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              About ClinRT
            </p>
            <h2 className="mt-4 type-h2 font-semibold">
              A connected platform for clinical operations teams
            </h2>
            <p className="mt-4 text-(--muted-color)">
              ClinRT unifies trial planning, site activities, data capture
              signals, and operational tracking into one coordinated layer. It
              helps teams reduce handoffs, increase decision confidence, and
              keep study delivery aligned.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-(--muted-color)">
              Designed for sponsors, CROs, and cross-functional teams who need
              speed with reliability.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Single operational view across trial functions</li>
              <li>Execution checkpoints with accountable ownership</li>
              <li>Compliance-aware process design from day one</li>
            </ul>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="mx-auto max-w-7xl rounded-3xl bg-(--color-secondary) px-6 py-16 text-white md:px-10">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                  Key Solutions
                </p>
                <p className="mt-3 type-h2 font-semibold text-white">
                  Built to support the full trial lifecycle
                </p>
              </div>
              <Button href="/what-we-build" label="Go to What We Build" />
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {solutions.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <Link
                  href={item.href}
                  className="group block rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <p className="type-h4 font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-white/80">{item.text}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
                    Learn more
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
                Featured Works
              </p>
              <h2 className="mt-3 type-h2 font-semibold">
                Real delivery outcomes for clinical teams
              </h2>
            </div>
            <Button href="/whats-new#case-studies" label="View Case Studies" />
          </div>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredWorks.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 90}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="type-h5 font-semibold">{item.title}</p>
                <p className="mt-3 text-sm text-(--muted-color)">{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="mx-auto max-w-7xl rounded-3xl bg-white px-6 py-14 md:px-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              Clients
            </p>
            <h2 className="mt-3 type-h3 font-semibold">
              Trusted by sponsors, CROs, and research partners
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((client, index) => (
              <ScrollReveal key={client} delay={index * 60}>
                <div className="rounded-xl border border-slate-200 bg-(--bg-page) px-4 py-3 text-sm font-medium">
                  {client}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="mx-auto max-w-7xl rounded-3xl bg-(--primary-color) px-6 py-16 md:px-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Testimonials
            </p>
            <h2 className="mt-3 type-h2 font-semibold text-white">
              What trial leaders say about working with ClinRT
            </h2>
          </ScrollReveal>
          <div className="mt-10 flex gap-6 overflow-x-auto pb-4">
            {testimonials.map((item, index) => (
              <ScrollReveal key={item.name} delay={index * 80}>
                <TestimonialCard {...item} active />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <ScrollReveal className="rounded-3xl bg-(--color-accent) p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-(--primary-color)">
            Explore What&apos;s Possible
          </p>
          <h2 className="mt-3 type-h2 font-semibold text-(--primary-color)">
            Let&apos;s design a better clinical delivery model together
          </h2>
          <p className="mt-4 max-w-2xl text-(--primary-color)/80">
            Share your trial goals and constraints. We&apos;ll map the right
            ClinRT approach for your timeline, team setup, and quality
            requirements.
          </p>
          <div className="mt-8">
            <Button href="/contact" label="Contact Us" />
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              FAQs
            </p>
            <h2 className="mt-3 type-h2 font-semibold">
              Answers for common delivery and implementation questions
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <ScrollReveal key={item.q} delay={index * 70}>
                <FaqItem q={item.q} a={item.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
