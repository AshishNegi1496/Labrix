import Link from "next/link";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import CountUpOnView from "@/components/CountUpOnView";
import { FaqItem } from "@/components/FaqItem";
import { TestimonialCard } from "@/components/TestimonialCard";
import Image from "next/image";

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
export default function HomePage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden min-h-[110vh] flex items-center">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/homePageVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/90" />

        <div className="relative z-10 section-shell py-28 md:py-40 text-white">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                Introduction Animation Video
              </p>

              <p className="mt-6 text-4xl md:text-6xl leading-tight font-semibold">
                ClinRT for modern <br />
                clinical research <br />
                operations
              </p>

              <p className="mt-6 max-w-2xl text-white/80 text-lg">
                ClinRT Global Services is a technology-driven provider of
                Interactive Response Technology (IRT) solutions. We help
                sponsors efficiently manage clinical trials across all phases
                and geographies. Headquartered in Pune, India, we are trusted by
                global pharmaceutical and biotech companies
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/what-we-build" label="Get Started" />
                <Button href="/contact" label="What we Build" />
              </div>

              {/* Hero Bottom Stats */}
              <div className="mt-12 flex items-center gap-10 border-t">
                <div>
                  <CountUpOnView
                    to={40}
                    suffix="+"
                    className="text-3xl font-semibold text-white"
                  />
                  <p className="text-sm text-white/70">Years of Experience</p>
                </div>

                {/* Client avatars */}
                <div className="flex items-center gap-3 ml-6">
                  <div className="flex -space-x-3">
                    <Image
                      src="/images/author-1.jpg"
                      alt="client"
                      width={32}
                      height={32}
                      className="rounded-full border border-white"
                    />
                    <Image
                      src="/images/author-2.jpg"
                      alt="client"
                      width={32}
                      height={32}
                      className="rounded-full border border-white"
                    />
                    <Image
                      src="/images/author-3.jpg"
                      alt="client"
                      width={32}
                      height={32}
                      className="rounded-full border border-white"
                    />
                    <Image
                      src="/images/author-2.jpg"
                      alt="client"
                      width={32}
                      height={32}
                      className="rounded-full border border-white"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-white/70">Trusted By</p>
                    <p className="text-sm font-semibold">5k+ Clients</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT VIDEO CIRCLE */}
            <div className="hidden lg:flex justify-center">
              <a
                href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                className="relative flex items-center justify-center h-40 w-40 rounded-full border border-white/50 backdrop-blur-md hover:scale-105 transition"
              >
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping"></div>
                <span className="text-white text-sm tracking-wider">
                  ▶ Play
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <SectionWrapper fullBleed className="py-0">
        <div className="bg-(--primary-color) px-6 py-4 text-center text-sm font-medium text-white md:text-base">
          Introducing ClinRT: built for compliant, scalable, and insight-led
          clinical execution.
        </div>
      </SectionWrapper> */}

      <SectionWrapper>
        <ScrollReveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {/* <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)"> */}
            <Badge>About ClinRT</Badge>
            {/* </p> */}
            <p className="mt-4 type-h1 font-semibold">
              A connected platform for clinical operations teams
            </p>
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
        <div className="mx-auto  rounded-3xl bg-(--color-secondary) px-6 py-16 text-white md:px-10">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Badge>Key Solutions</Badge>

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
              <Badge>Featured Works</Badge>

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
        <div className="mx-auto rounded-3xl bg-white px-6 py-14 md:px-10">
          <ScrollReveal>
            <Badge>Clients</Badge>

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
        <div className="mx-auto  rounded-3xl bg-(--primary-color) text-white px-6 py-16 md:px-10">
          <ScrollReveal>
            <Badge>Testimonials</Badge>

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

      <SectionWrapper fullBleed>
        <ScrollReveal className="rounded-3xl bg-(--color-accent) p-8 md:p-12">
          <Badge>Explore What&apos;s Possible</Badge>
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
            <Badge>FAQs</Badge>
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
