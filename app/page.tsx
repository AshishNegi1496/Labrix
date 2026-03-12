import Link from "next/link";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import CountUpOnView from "@/components/CountUpOnView";
import { FaqItem } from "@/components/FaqItem";
import { TestimonialCard } from "@/components/TestimonialCard";
import Clients from "@/components/ui/Clients";
import GlassCard from "@/components/GlassCard";
import Image from "next/image";

const whyChoosePoints = [
  {
    title: "•	Domain-Focused Expertise",
    text: "Strong experience in clinical trial systems, operational workflows, and regulatory expectations",
  },
  {
    title: "•	Structured Technology Approach",
    text: "Solutions designed to align with real-world study processes and protocol requirements",
  },
  {
    title: "•	Commitment to Reliability",
    text: "Emphasis on system stability, operational continuity, and long-term performance",
  },
  {
    title: "•	Collaborative Implementation Model",
    text: "Close engagement with sponsors and CROs throughout system configuration and deployment",
  },
  {
    title: "•	Global Clinical Trial Exposure",
    text: "Experience supporting multi-regional studies across therapeutic areas.",
  },
];
const researchFields = [
  {
    title: "Precision Randomization & Treatment Control",
    description:
      "Balanced allocation across arms and cohorts, with safeguarded emergency unblinding",
    image: "/images/service-1.jpg",
  },
  {
    title: "Integrated IP Supply & Kit Operations",
    description:
      "Unified oversight of inventory, resupply, kit assignment, barcoding, expiry, transfers, and temperature mapping",
    image: "/images/service2.png",
  },
  {
    title: "Full Chain of Custody Accountability",
    description:
      "Complete traceability of every kit from creation to final reconciliation and destruction",
    image: "/images/service3.png",
  },

  {
    title: ". Streamlined Participant & Visit Workflow",
    description:
      "Protocol aligned configuration for screening, enrolment, and visit execution across all sites",
    image: "/images/service3.png",
  },

  {
    title: "Real Time Operational Intelligence",
    description:
      "Dynamic dashboards, detailed reports, and event driven alerts for confident oversight",
    image: "/images/service3.png",
  },

  {
    title: ". Compliance Ready, Connected, and Scalable",
    description:
      "Aligned with global regulations and seamlessly integrated with CTMS/EDC for multi region, multi phase trials",
    image: "/images/service3.png",
  },
];
const featuredWorks = [
  {
    title: "Build Digital Foundations for Clinical Operations",
    text: "We create dependable, protocol aligned systems that support the operational backbone of clinical trials — enabling teams to run studies with structure, reliability, and control",
  },
  {
    title: "Enable Connected, Harmonized Trial Ecosystems",
    text: "We help sponsors, CROs, and sites work from unified workflows and shared data environments, reducing fragmentation and improving coordination across study functions.",
  },
  {
    title: "Strengthen Data Integrity Across the Trial Lifecycle",
    text: "We design technology that supports clean, consistent, audit ready data — from enrollment to close out — aligned with clinical research standards and regulatory expectations.",
  },
  {
    title: "Support Scalable, Real World Clinical Execution",
    text: "We build systems that flex with protocol changes, multi country footprints, complex study designs, and evolving operational needs without disrupting execution.",
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
    name: "Grace Martin",
    role: "Lab Supervisor",
    text: "ClinRT helped us streamline trial logistics and maintain full oversight across multiple study sites.",
    image: "/images/author-2.jpg",
  },
  {
    name: "Emma Davis",
    role: "Project Coordinator",
    text: "The platform simplified our coordination between research teams and improved operational clarity.",
    image: "/images/author-3.jpg",
  },
  {
    name: "Jenny Wilson",
    role: "Research Analyst",
    text: "From planning to execution, the tools allowed us to track every stage of our trials confidently.",
    image: "/images/author-1.jpg",
  },
  {
    name: "Ashish Sharma",
    role: "Research Analyst",
    text: "From planning to execution, the tools allowed us to track every stage of our trials confidently.",
    image: "/images/author-1.jpg",
  },
  {
    name: "Dennis Levi",
    role: "Research Analyst",
    text: "From planning to execution, the tools allowed us to track every stage of our trials confidently.",
    image: "/images/author-1.jpg",
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
    <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping" />
    <span className="absolute inset-0.5 rounded-full bg-orange-500" />
  </span>
);
const Badge = ({ children }: { children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2 rounded-full border border-orange-500 px-4 py-1.5 text-sm">
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
            <ScrollReveal variant="left" className="max-w-3xl">
              <p className="mt-6 type-h2 md:text-6xl leading-tight font-semibold">
                Smarter Clinical Technology <br />
                for a More Connected <br />
                Research World
              </p>

              <p className="mt-6 max-w-2xl type-h6 text-white/80 type-h6 ">
                A unified digital ecosystem bringing precision, automation, and
                intelligence to every stage of the clinical journey. Built on
                disciplined engineering and deep domain insight, our platform
                unifies critical clinical processes into a seamless digital
                continuum—clarifying data, orchestrating operations, and
                sustaining performance at scale. From startup to closeout, we
                bring order to complexity, strengthen oversight, and empower
                teams to advance studies with precision, pace, and confidence.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 border-b p-8">
                <Button href="/what-we-build" label="Get Started" />
                <Button href="/contact" label="What we Build" />
              </div>

              {/* Hero Bottom Stats */}
              <div className="mt-12 flex items-center gap-10 ">
                <div>
                  <p className="type-h4 text-white/70">Years of Experience</p>

                  <CountUpOnView
                    to={40}
                    suffix="+"
                    className="type-h4 font-semibold text-white"
                  />
                  <p className="type-h4 text-white/70">
                    Years of Collective Experience
                  </p>
                </div>

                {/* Client avatars */}
                <Clients
                  avatars={[
                    { src: "/images/author-1.jpg" },
                    { src: "/images/author-2.jpg" },
                    { src: "/images/author-3.jpg" },
                    { src: "/images/author-2.jpg" },
                  ]}
                  label="Trusted By"
                  title="5k+ Clients Worldwide"
                  className="ml-6"
                />
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

      {/* About clinRT */}
      <SectionWrapper>
        <ScrollReveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Badge>About ClinRT</Badge>
            <ScrollReveal variant="left" delay={200}>
              <p className="mt-4 type-h1 font-semibold">
                Enabling Resilient Tech for Next Gen Clinical Studies
              </p>
              <p className="mt-4 text-(--muted-color)">
                ClinRT is a clinical research technology company focused on
                developing dependable and well-structured digital solutions for
                modern clinical trial environments. Headquartered in Pune,
                India, we support Sponsors and Contract Research Organizations
                (CROs) by providing configurable systems aligned with
                operational workflows, regulatory expectations, and study
                coordination requirements. Our approach emphasizes system
                stability, usability, and process alignment to ensure consistent
                and reliable trial execution.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="right" delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ">
              <p className="text-sm text-(--muted-color)">
                Designed for sponsors, CROs, and cross-functional teams who need
                speed with reliability.
              </p>
              <ul className="mt-4 space-y-2 type-h6 mb-4 ">
                <li>Single operational view across trial functions</li>
                <li>Execution checkpoints with accountable ownership</li>
                <li>Compliance-aware process design from day one</li>
              </ul>
              <Clients
                avatars={[
                  { src: "/images/author-1.jpg" },
                  { src: "/images/author-2.jpg" },
                  { src: "/images/author-3.jpg" },
                  { src: "/images/author-2.jpg" },
                ]}
                label="Trusted By"
                title="5k+ Clients"
                className="ml-6"
              />
            </div>
          </ScrollReveal>
        </ScrollReveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal variant="left">
            <GlassCard
              image="/images/service-1.jpg"
              tag="Trial Management"
              title="Operational Trial Visibility"
              description="Monitor clinical trial activities, site performance, and progress through a unified operational dashboard."
            />
          </ScrollReveal>

          <ScrollReveal variant="up" delay={150}>
            <GlassCard
              image="/images/case-study-1.jpg"
              tag="Workflow Automation"
              title="Smart Process Automation"
              description="Automate manual operational steps and reduce delays through intelligent workflow coordination."
            />
          </ScrollReveal>

          <ScrollReveal variant="right" delay={300}>
            <GlassCard
              image="/images/case-study-2.jpg"
              tag="Data Intelligence"
              title="Real-Time Decision Signals"
              description="Turn operational data into real-time insights that support faster and more confident clinical decisions."
            />
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* key features section */}
      <SectionWrapper fullBleed>
        <div className="mx-auto  px-6 py-20 bg-(--primary-color) rounded-3xl text-(--text-invert)">
          {/* Section Header */}
          <ScrollReveal className="">
            <Badge>Key Features</Badge>
            <div className="mt-6 flex flex-col gap-24 lg:flex-row lg:items-start lg:justify-between">
              <p className="mt-4 type-h2 font-semibold ">
                Leading innovation across critical fields
              </p>

              <p className="mt-4 type-h6 text-(--text-invert)">
                Each research field is supported by expert teams and modern
                technologies, ensuring precision, innovation, and real-world
                impact across clinical research programs.
              </p>
            </div>
          </ScrollReveal>

          {/* Glass Cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchFields.map((field, i) => (
              <ScrollReveal key={field.title} delay={i * 120}>
                <GlassCard
                  image={field.image}
                  title={field.title}
                  description={field.description}
                  height="h-80"
                  glowColor="bg-emerald-400/20"
                  hoverEffect="both"
                />
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Button */}
          <ScrollReveal delay={300}>
            <div className="mt-14 flex justify-center">
              <Button href="/what-we-build" label="See What We Build" />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Why choose ClinRT section */}
      <SectionWrapper>
        <div className="grid gap-14 lg:grid-cols-2 items-center">
          {/* LEFT IMAGE */}
          <ScrollReveal>
            <div className="relative">
              <Image
                src="/images/why-choose-image.jpg"
                alt=" 	Why ClinRT"
                width={520}
                height={620}
                className="rounded-2xl object-cover"
              />

              {/* Floating client badge */}
              <div className="absolute -bottom-6 left-6 rounded-xl bg-black/30 shadow-lg px-5 py-3 text-white">
                <p className="text-sm font-semibold text-white">
                  Your Partner for Proven, Practical, and High Performance
                  Technology
                </p>
                <Clients
                  avatars={[
                    { src: "/images/author-1.jpg" },
                    { src: "/images/author-2.jpg" },
                    { src: "/images/author-3.jpg" },
                    { src: "/images/author-2.jpg" },
                  ]}
                  label="Trusted By"
                  title="5k+ Clients"
                  className="ml-6"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT CONTENT */}
          <div>
            <ScrollReveal>
              <Badge>Why Choose Us</Badge>

              <p className="mt-4 type-h2 font-semibold">
                Powered by technology and clinical expertise
              </p>

              <p className="mt-4 type-h6 text-(--muted-color)">
                Our platform and delivery teams help research organizations
                streamline trial execution, improve coordination, and maintain
                compliance across the full clinical lifecycle.
              </p>
            </ScrollReveal>

            {/* POINTS */}
            <div className="mt-8 space-y-6">
              {whyChoosePoints.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 120}>
                  <div className="flex gap-4">
                    {/* icon */}
                    <div className="mt-1 h-10 w-10 flex items-center justify-center rounded-lg bg-(--color-primary)/80 text-(--text-invert)">
                      ✓
                    </div>

                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-(--muted-color)">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* BUTTON */}
            <ScrollReveal delay={300}>
              <div className="mt-10">
                <Button href="/contact" label="Contact Us" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      {/* What we do section */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Badge>What we Do</Badge>

              <p className="mt-3 type-h2 font-semibold">
                At our core, we build digital systems that help clinical teams
                manage studies with greater structure, transparency, and
                confidence. Our focus is on creating technology that supports
                real world execution across sites, subjects, and supply
                chains—making complex trials easier to run and easier to oversee
              </p>
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

      {/* Our clients section */}
      <SectionWrapper fullBleed>
        <div className="mx-auto rounded-3xl bg-white px-6 py-14 md:px-10">
          <ScrollReveal>
            <Badge> Our Clients</Badge>

            <p className="mt-3 type-h2 font-semibold">
              Collaborating With Clinical Leaders to Advance Global Research
              Excellence
            </p>

            <p className="mt-3 type-h6 font-semibold">
              Collaborating With Clinical Leaders to Advance Global Research
              Excellence
            </p>
          </ScrollReveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((client, index) => (
              <ScrollReveal key={client} delay={index * 60}>
                <div className="rounded-xl border border-slate-200 bg-background px-4 py-3 text-sm font-medium">
                  {client}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials section */}
      <SectionWrapper fullBleed>
        <section className="relative overflow-hidden bg-(--primary-color) rounded-3xl text-white">
          {/* PARALLAX BACKGROUND */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/images/pattern-bg.jpg')" }}
          />

          <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10">
            {/* HEADING */}
            <div className="text-center max-w-3xl mx-auto">
              <ScrollReveal>
                <Badge>Our Testimonials</Badge>

                <p className="mt-4 type-h2 font-semibold text-white">
                  Recognized for Providing Operational Transparency and Reliable
                  Platform Performance
                </p>
              </ScrollReveal>
            </div>

            {/* SLIDER */}
            <div className="mt-16 flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory">
              {testimonials.map((item, index) => (
                <ScrollReveal key={item.name} delay={index * 120}>
                  <div className=" snap-start rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 hover:bg-white/15 transition">
                    {/* IMAGE */}
                    <div className="relative mb-6 w-20 h-20">
                      <Image
                        width={140}
                        height={120}
                        src={item.image}
                        alt={item.name}
                        className="rounded-full object-cover"
                      />

                      {/* PLAY BUTTON */}
                      <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-(--color-orange)">
                        ▶
                      </div>
                    </div>

                    {/* QUOTE */}
                    <p className="text-white/80 text-sm leading-relaxed">
                      {item.text}
                    </p>

                    {/* AUTHOR */}
                    <div className="mt-6">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-white/60">{item.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* FAQs section  */}

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ScrollReveal>
            <Badge>FAQs</Badge>
            <p className="mt-3 type-h2 font-semibold">
              Clear Answers. Confident Decisions.
            </p>
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
