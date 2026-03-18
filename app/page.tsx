"use client";
import { useState } from "react";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import CountUpOnView from "@/components/CountUpOnView";
import { FaqItem } from "@/components/FaqItem";
import Clients from "@/components/ui/Clients";
import GlassCard from "@/components/GlassCard";
import GlassSlider from "@/components/GlassSlider";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { FaqModal } from "@/components/FaqModal";
import { FiArrowRight, FiChevronDown, FiPlay } from "react-icons/fi";
import {
  FaFlask,
  FaCogs,
  FaShieldAlt,
  FaHandshake,
  FaGlobeAmericas,
} from "react-icons/fa";

const whyChoosePoints = [
  {
    title: "Domain-Focused Expertise",
    text: "Strong experience in clinical trial systems, operational workflows, and regulatory expectations",
  },
  {
    title: "	Structured Technology Approach",
    text: "Solutions designed to align with real-world study processes and protocol requirements",
  },
  {
    title: "	Commitment to Reliability",
    text: "Emphasis on system stability, operational continuity, and long-term performance",
  },
  {
    title: "	Collaborative Implementation Model",
    text: "Close engagement with sponsors and CROs throughout system configuration and deployment",
  },
  {
    title: "	Global Clinical Trial Exposure",
    text: "Experience supporting multi-regional studies across therapeutic areas.",
  },
];
const researchFields = [
  {
    title: "Precision Randomization & Treatment Control",
    description:
      "Balanced allocation across arms and cohorts, with safeguarded emergency unblinding",
    image: "/images/treatment.avif",
  },
  {
    title: "Integrated IP Supply & Kit Operations",
    description:
      "Unified oversight of inventory, resupply, kit assignment, barcoding, expiry, transfers, and temperature mapping",
    image: "/images/kit-ops.avif",
  },
  {
    title: "Full Chain of Custody Accountability",
    description:
      "Complete traceability of every kit from creation to final reconciliation and destruction",
    image: "/images/custody.avif",
  },

  {
    title: " Streamlined Participant & Visit Workflow",
    description:
      "Protocol aligned configuration for screening, enrolment, and visit execution across all sites",
    image: "/images/workflow.avif",
  },

  {
    title: "Real Time Operational Intelligence",
    description:
      "Dynamic dashboards, detailed reports, and event driven alerts for confident oversight",
    image: "/images/operations.avif",
  },

  {
    title: "Compliance Ready, Connected, and Scalable",
    description:
      "Aligned with global regulations and seamlessly integrated with CTMS/EDC for multi region, multi phase trials",
    image: "/images/complaince.avif",
  },
];
const featuredWorks = [
  {
    title: "Build Digital Foundations for Clinical Operations",
    text: "We create dependable, protocol aligned systems that support the operational backbone of clinical trials - enabling teams to run studies with structure, reliability, and control.",
  },
  {
    title: "Enable Connected, Harmonized Trial Ecosystems",
    text: "We help sponsors, CROs, and sites work from unified workflows and shared data environments, reducing fragmentation and improving coordination across study functions.",
  },
  {
    title: "Strengthen Data Integrity Across the Trial Lifecycle",
    text: "We design technology that supports clean, consistent, audit ready data - from enrollment to close out - aligned with clinical research standards and regulatory expectations.",
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

const movingWords = [
  "Interactive Response Technology",
  "Randomization & Trial Supply Management",
  "Subject Management",
  "Drug Supply Management",
  "Auto Shipments",
  "Kit Management",
  "Drug Accountability",
  "Subject Unblinding",
  "Visit Schedule Management",
  "Inventory Tracking",
  "Dynamic Dashboards",
  "Real-Time Reporting",
  "Notifications & Alerts",
  "Supply Prediction Engine",
  "Buffer Stock Strategy",
  "Retention Sample Management",
  "Kit Expiry Tracking",
  "Cohort & Strata-Based Randomization",
  "Adaptive Trial Support",
  "Regulatory-Compliant Workflows",
] as const;

const movingTrack = [...movingWords, ...movingWords];

const posterItems = [
  {
    title: "Protocol-Ready IRT Stack",
    tag: "Launch",
    image: "/images/case-study-1.jpg",
    href: "/what-we-build",
  },
  {
    title: "Supply Forecasting Console",
    tag: "Update",
    image: "/images/case-study-2.jpg",
    href: "/whats-new",
  },
  {
    title: "Live Trial Dashboards",
    tag: "Insight",
    image: "/images/case-study-3.jpg",
    href: "/whats-new",
  },
  {
    title: "Demo at Home",
    tag: "Insight",
    image: "/images/case-study-3.jpg",
    href: "/whats-new",
  },
  {
    title: "Trial at Lab",
    tag: "Research",
    image: "/images/case-study-3.jpg",
    href: "/whats-new",
  },
] as const;

const newsItems = [
  {
    title: "Adaptive randomization workflows now supported across cohorts.",
    date: "Mar 2026",
  },
  {
    title: "Auto-shipments and buffer stock logic expanded to global depots.",
    date: "Feb 2026",
  },
  {
    title: "Real-time alerts refreshed for site-specific thresholds.",
    date: "Jan 2026",
  },
  {
    title: " for site-specific thresholds.",
    date: "Jan 2021",
  },
  {
    title: "Real-time alerts refreshed for .",
    date: "Jan 2022",
  },
  {
    title: "Real-time .",
    date: "Jan 2023",
  },
  {
    title: "Real-time alerts refreshed for site.",
    date: "Jan 2024",
  },
  {
    title: "Real-time alerts refreshed for site-specific .",
    date: "Jan 2025",
  },
] as const;

const faqs = [
  {
    q: "What is iClinRT?",
    a: "iClinRT is our configurable Interactive Response Technology platform that supports clinical trials with subject management, randomization, drug supply oversight, real-time dashboards, automated alerts, and end-to-end kit tracking. ItÃ¢â‚¬â„¢s built to handle complex study designs and streamline day-to-day trial execution.",
  },
  {
    q: "How long does it take to set up an IRT system for a new study?",
    a: "Our standard build-to-go-live timeline is approximately 4 weeks, even for complex randomization and supply requirements. This includes configuration, validation, training, and study readiness.",
  },
  {
    q: "Does iClinRT support complex randomization designs?",
    a: "Yes. iClinRT is built to support stratified, cohort-based, site-based, block, and multi-arm randomization approaches. It can adapt to protocol amendments and can manage subject subgroups and complex visit schedules.",
  },
  {
    q: "Can iClinRT manage drug supplies and auto-shipments?",
    a: "Absolutely. The system tracks kits from origin to destruction, handles expiry updates, supports cold-chain and temperature excursion assessment, and automates shipments based on predefined triggers and predictive logic. It also manages site-to-site transfers and retention samples.",
  },
  {
    q: "Is emergency unblinding supported?",
    a: "Yes. iClinRT provides a secure, audit-ready emergency unblinding process for use during medical emergencies or safety concerns. Access is controlled and fully traceable.",
  },
  {
    q: "What kind of reports and dashboards does iClinRT provide?",
    a: "The platform offers real-time dashboards and configurable reports covering enrollment, randomization, subject visits, supply status, compliance, site performance, and more. Reports can be filtered by country, site, depot, or user role.",
  },
  {
    q: "How does iClinRT maintain data integrity and compliance?",
    a: "iClinRT complies with 21 CFR Part 11, GCP requirements, and global data privacy standards like GDPR and HIPAA. It maintains full audit trails, access controls, encryption, and complete validation documentation.",
  },
  {
    q: " Can iClinRT integrate with EDC, CTMS, or other systems?",
    a: "Yes. iClinRT can integrate with external clinical systems such as EDC and CTMS to support seamless data flow and reduce operational duplication.",
  },
  {
    q: "What kind of support does ClinRT offer?",
    a: "We offer 24Ãƒâ€”7 helpdesk support, backed by domain experts in IRT and clinical trial supply management. Our team assists with technical troubleshooting, protocol queries, site support, and ongoing study monitoring.",
  },
  {
    q: "Can the system handle protocol amendments?",
    a: "Yes. iClinRT is built to accommodate changes such as visit schedule updates, randomization modifications, and supply logic adjustments without disrupting ongoing study activities.",
  },
  {
    q: "Does iClinRT support global, multi-site trials?",
    a: "Yes. The platform is designed for global scalability across programs, phases, and regions. It handles multi-country supply logic, depot structures, time-zone alignment, and role-based access for global teams.",
  },
  {
    q: "What distinguishes ClinRT from other IRT providers?",
    a: "We combine a highly configurable platform with deep domain expertiseÃ¢â‚¬â€over 50 years of leadership experience, support for 1000+ trials, and 500+ global clients. Our strength lies in fast deployment, strong supply chain capabilities, and 24Ãƒâ€”7 expert support.",
  },
  {
    q: " How secure is my study data?",
    a: "All study data is encrypted, access-controlled, and fully audit-tracked. We follow secure architecture practices and jurisdiction specific data protection requirements to ensure privacy and compliance.",
  },
  {
    q: "Do you offer demos or consultations?",
    a: "Yes. You can request a live demo through our enquiry form, and our team will walk you through the platform, discuss your protocol needs, and address any questions.",
  },
  {
    q: "How do I get started?",
    a: "Simply submit an enquiry or request a demo. Our team will gather your study details, propose a configuration plan, and guide you through the build, validation, training, and go-live process.",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const PREVIEW_COUNT = 5;
  const previewFaqs = faqs.slice(0, PREVIEW_COUNT);
  return (
    <PageTransition>
      <section className="relative overflow-hidden min-h-[90vh] sm:min-h-screen lg:min-h-[110vh] flex items-center">
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
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <ScrollReveal variant="left" className="max-w-3xl mb-1">
              <p className="mt-12 type-h2 md:text-4xl leading-tight font-semibold">
                Smarter Clinical Technology <br />
                for a More Connected <br />
                Research World
              </p>

              <p className="mt-6 max-w-2xl type-h6 text-white/80">
                Built on rigorous engineering and deep domain expertise, our
                platform integrates critical processes into a seamless digital
                continuum‚ streamlining data, orchestrating operations, and
                sustaining performance at scale. From startup to closeout, we
                simplify complexity and enhance oversight, empowering teams to
                advance studies with confidence and pace.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 border-b p-4 sm:p-6 lg:p-8">
                <Button href="/who-we-are" label="Get Started" />
                <Button href="/what-we-build" label="What we Build" />
              </div>

              {/* Hero Bottom Stats */}
              <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-6 md:gap-10">
                <div className="flex-row">
                  <CountUpOnView
                    to={40}
                    suffix="+"
                    className="text-4xl font-semibold text-white"
                  />
                  <p className="type-h6 text-white/70">
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
                  label=""
                  // title="5000+ Clients Worldwide"
                  className="ml-6"
                />
                <div className="flex-row">
                  <CountUpOnView
                    to={500}
                    suffix="+"
                    className="text-4xl font-semibold text-white"
                  />
                  <p className="type-h6 text-white/70">Clients</p>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT VIDEO CIRCLE */}
            <div className="hidden lg:flex justify-center">
              <a
                href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                className="relative flex items-center justify-center h-40 w-40 rounded-full border border-white/80 backdrop-blur-md hover:scale-110 transition"
              >
                <div className="absolute inset-0 rounded-full border border-white/80 animate-ping"></div>
                <span className=" type-h6 tracking-wider">▶ Play</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Moving words */}
      <SectionWrapper fullBleed className="py-0">
        <div className="bg-(--primary-color) text-white rounded-2xl">
          <div className="section-shell py-2 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 overflow-hidden">
                <div className="ticker-track text-white/80">
                  {movingTrack.map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className="inline-flex items-center gap-3 type-h6 font-semibold uppercase tracking-[0.50 em]"
                    >
                      <span className="h-2 w-2 rounded-full bg-white/50" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Posters + News */}
      <SectionWrapper fullBleed className="py-10 sm:py-12 lg:py-14">
        <div className="section-shell px-4 sm:px-6 md:px-10">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr] items-start">
            <div className="relative min-w-0 rounded-3xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6 lg:p-8 shadow-sm">
              {/* Header Section */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
                <div className="space-y-1">
                  <Badge>At a Glance</Badge>
                </div>
              </div>

              {/* Slider Section */}
              <GlassSlider
                items={posterItems}
                ariaLabel="At a glance posters"
                scrollerClassName="gap-6 w-full"
                controlsClassName="mt-2 justify-end"
                edgeFadeClassName="from-slate-50/90 via-slate-50/60"
                pageSize={2}
                itemClassName="w-full sm:w-[calc(50%-12px)]"
                renderItem={(poster, index) => (
                  <ScrollReveal delay={index * 80}>
                    <Link
                      href={poster.href}
                      className="group relative block w-full overflow-hidden rounded-2xl bg-white transition-all hover:shadow-xl hover:shadow-slate-200/50"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-4/5 w-full overflow-hidden">
                        <Image
                          src={poster.image}
                          alt={poster.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Soft Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                        {/* Floating Content (Bottom-aligned) */}
                        <div className="absolute bottom-0 left-0 w-full p-5">
                          <span className="inline-block rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                            {poster.tag}
                          </span>
                          <p className="mt-3 type-h4 font-medium leading-snug text-white">
                            {poster.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                )}
              />
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-(--primary-color) p-5 sm:p-6 lg:p-7 text-black shadow-sm max-h-155 lg:max-h-155 sm:max-h-140 flex flex-col">
              <Badge>News & Updates</Badge>
              <p className="mt-3 sm:mt-4 text-sm text-black/80">
                Small updates and launches from the ClinRT product studio.
              </p>
              <div className="relative mt-5 sm:mt-6 space-y-3 sm:space-y-4 overflow-y-auto pr-2 pb-10 no-scrollbar">
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-(--color-primary) via-(--color-primary)/70 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute bottom-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-black/80 backdrop-blur-sm animate-bounce"
                  aria-hidden="true"
                >
                  <FiChevronDown className="h-4 w-4 text-orange-500" />
                </div>
                {newsItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/15 bg-white/5 p-4"
                  >
                    <p className="text-sm font-semibold text-black">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-black/60">
                      {item.date}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </SectionWrapper>

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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 mt-10 shadow-sm ">
              <p className="type-h6 text-(--muted-color)">
                Designed for sponsors, CROs, and cross-functional teams who need
                speed with reliability.
              </p>
              <ul className="mt-4 mb-4 space-y-2 list-disc list-inside type-h6">
                <li>Single operational view across trial functions</li>
                <li>Execution checkpoints with accountable ownership</li>
                <li>Compliance-aware process design from day one</li>
              </ul>
              <Clients
                avatars={[
                  { src: "/images/about.avif" },
                  { src: "/images/author-2.jpg" },
                  { src: "/images/author-3.jpg" },
                  { src: "/images/author-2.jpg" },
                ]}
                label="Trusted By"
                title="500+ Clients"
                className="ml-6"
              />
            </div>
          </ScrollReveal>
        </ScrollReveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-12 lg:items-stretch">
          <ScrollReveal variant="left" className="lg:col-span-3 lg:min-h-65">
            <GlassCard image="/images/about.avif">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur">
                <FiPlay className="h-6 w-6 translate-x-px" />
              </span>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal
            variant="up"
            delay={150}
            className="lg:col-span-4 lg:min-h-65"
          >
            <GlassCard
              image="/images/about.avif"
              tag="Workflow Automation"
              title="1000+ Global Trial Engagements"
              description="Partnering with sponsors, CROs, and research teams across phases, regions, and therapeutic areas. "
            />
          </ScrollReveal>

          <ScrollReveal
            variant="right"
            delay={300}
            className="md:col-span-2 lg:col-span-5 lg:min-h-[260px]"
          >
            <GlassCard image="/images/about.avif">
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                <span className="rounded-full border border-white/15 bg-white/10 px-5 py-3">
                  Unified Trial Operations
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-5 py-3">
                  Protocol Driven Accuracy
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-5 py-3">
                  Real Time Clinical Intelligence
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-5 py-3">
                  Trusted Compliance &amp; Data Integrity
                </span>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* key features section */}
      <SectionWrapper fullBleed>
        <div className="mx-auto  px-6 py-20 bg-(--primary-color) rounded-3xl text-(--text-invert)">
          {/* Section Header */}
          <ScrollReveal className="">
            <Badge>Key Features</Badge>
            <div className="mt-6 flex flex-col gap-10 sm:gap-16 lg:gap-56 lg:flex-row lg:items-start lg:justify-between">
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
                  height="h-64 sm:h-72 lg:h-80"
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
                src="/images/why-choose-us.avif"
                alt=" 	Why ClinRT"
                width={520}
                height={920}
                className="rounded-2xl object-cover"
              />

              {/* Floating client badge */}
              <div className="absolute -bottom-6 left-6 rounded-xl bg-black/30 shadow-lg px-5 py-3 text-white animate-bounce ">
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
                  <div className="group flex gap-4 cursor-pointer">
                    {/* icon */}
                    <div
                      className="mt-1 h-15 w-15 flex items-center justify-center rounded-lg 
          bg-(--color-primary)/80 text-(--text-invert)
          transition-all duration-300 ease-out
          group-hover:scale-110 group-hover:rotate-3
          group-hover:shadow-lg group-hover:shadow-indigo-400/40"
                    >
                      <div className="transition-transform duration-300 group-hover:scale-125">
                        {index === 0 && <FaFlask size={30} />}
                        {index === 1 && <FaCogs size={30} />}
                        {index === 2 && <FaShieldAlt size={30} />}
                        {index === 3 && <FaHandshake size={30} />}
                        {index === 4 && <FaGlobeAmericas size={30} />}
                      </div>
                    </div>

                    {/* content */}
                    <div>
                      <p className="type-h5 font-semibold transition-colors duration-300 group-hover:text-(--color-primary)">
                        {item.title}
                      </p>
                      <p className="type-h6 text-(--muted-color)">
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
      <SectionWrapper fullBleed>
        <div className="relative overflow-hidden rounded-3xl bg-(--primary-color) text-white">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-(--color-accent)/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-6 h-64 w-64 rounded-full bg-(--color-orange)/20 blur-3xl" />

          <div className="relative grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <ScrollReveal>
              <Badge>What we Do</Badge>

              <p className="mt-4 type-h2 font-semibold ">
                Bringing operational clarity to modern clinical trials
              </p>
              <p className="mt-4 text-white/80">
                At our core, we build digital systems that help clinical teams
                manage studies with greater structure, transparency, and
                confidence. Our focus is on creating technology that supports
                real world execution across sites, subjects, and supply chains -
                making complex trials easier to run and easier to oversee.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  href="/whats-new#case-studies"
                  label="View Case Studies"
                />
              </div>
              <div className="mt-8">
                <CountUpOnView
                  to={98}
                  suffix="%"
                  className="type-h1 font-semibold "
                />
              </div>
              <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="mt-2 type-h5 uppercase tracking-[0.3em] text-white/70">
                  Operational Reliability
                </p>
                <p className="mt-2 type-h6 text-white/75">
                  Our platforms help maintain consistent, protocol aligned
                  execution across global studies.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4">
              {featuredWorks.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 90}>
                  <article className="flex gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-sm font-semibold text-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="type-h5 font-semibold">{item.title}</p>
                      <p className="mt-2 type-h6 text-white/75">{item.text}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
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
            <GlassSlider
              items={testimonials}
              ariaLabel="Testimonials"
              scrollerClassName="gap-8"
              controlsClassName="mt-4 justify-center"
              edgeFadeClassName="from-[var(--color-primary)]/90 via-[var(--color-primary)]/60"
              renderItem={(item, index) => (
                <ScrollReveal delay={index * 120}>
                  <div className="w-72 shrink-0 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 sm:w-80 lg:w-96">
                    {/* IMAGE */}
                    <div className="relative mb-6 h-20 w-20">
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
              )}
            />
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

            {/* Using your custom Button component */}
            <div className="mt-6">
              <Button
                label={`Read More`}
                onClick={() => setIsModalOpen(true)}
                size="md"
                icon={FiArrowRight} // Swapping default icon if you want a horizontal arrow
                className="bg-transparent text-[#0f243a] border border-[#0f243a]/20 hover:bg-[#0f243a] hover:text-white transition-all duration-300"
              />
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {previewFaqs.map((item, index) => (
              <ScrollReveal key={item.q} delay={index * 70}>
                <FaqItem q={item.q} a={item.a} />
              </ScrollReveal>
            ))}

            {faqs.length > PREVIEW_COUNT && (
              <div className="pt-4 text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm font-medium text-[#0f243a]/60 hover:text-[#0f243a] transition-colors"
                >
                  + Show {faqs.length - PREVIEW_COUNT} more
                </button>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <FaqModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              allFaqs={faqs}
            />
          )}
        </AnimatePresence>
      </SectionWrapper>
    </PageTransition>
  );
}
