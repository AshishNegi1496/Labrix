"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import CountUpOnView from "@/components/CountUpOnView";
import GlassCard from "@/components/GlassCard";
import Image from "next/image";
import { motion } from "framer-motion";
import { TeamCard } from "../components/ui/TeamCard";
// import { teamMembers } from "./team.data";
import { containerVariants } from "../components/team.motion";

import { FiActivity, FiClipboard, FiBarChart2, FiUsers } from "react-icons/fi";
import { FaqItem } from "@/components/FaqItem";
import { TestimonialCard } from "@/components/TestimonialCard";
const images = {
  hero: "https://picsum.photos/seed/labrix-hero/1600/900",
  feature1: "https://picsum.photos/seed/labrix-feature-1/640/480",
  feature2: "https://picsum.photos/seed/labrix-feature-2/640/480",
  feature3: "https://picsum.photos/seed/labrix-feature-3/640/480",
  feature4: "https://picsum.photos/seed/labrix-feature-4/640/480",
  wide: "https://picsum.photos/seed/labrix-wide/1400/700",
  lab: "https://picsum.photos/seed/labrix-lab/1200/800",
  sample: "https://picsum.photos/seed/labrix-sample/800/600",
};

const featureCards = [
  {
    title: "How does it work",
    text: "From sample intake to reporting, every step is documented and verified.",
    image: images.feature1,
  },
  {
    title: "Clinical diagnostics",
    text: "Validated assays and fast turnaround for patient-critical data.",
    image: images.feature2,
  },
];

const researchCards = [
  {
    title: "Precision analytics",
    text: "Signal processing, high-throughput screening, and deep data analysis.",
    image: images.feature3,
  },
  {
    title: "Cellular systems",
    text: "Human-cell models and controlled environments for repeatable results.",
    image: images.feature4,
  },
  {
    title: "Translational science",
    text: "We bridge discovery with real-world delivery for scaled impact.",
    image: images.feature1,
  },
];

const innovationCards = [
  { title: "Biotech", text: "From discovery to commercialization support." },
  {
    title: "Environment",
    text: "Monitoring and compliance with clear insights.",
  },
  { title: "Testing", text: "Validated, repeatable protocols across labs." },
  { title: "Research", text: "Custom programs tailored to your objectives." },
];

const solutionCards = [
  {
    title: "Analytical testing",
    text: "Precision chemistry and assay development.",
    image: images.feature2,
  },
  {
    title: "Toxicology analysis",
    text: "Safety testing across complex compounds.",
    image: images.feature3,
  },
  {
    title: "Pharmaceutical testing",
    text: "Regulatory-ready data and reporting.",
    image: images.feature4,
  },
];

const faqItems = [
  "How quickly can we start a project?",
  "Do you provide custom research programs?",
  "Can we combine testing and product strategy?",
  "What does onboarding look like?",
];

const blogPosts = [
  {
    title: "What it takes to ship safer diagnostics",
    date: "Feb 12, 2026",
    image: images.feature2,
  },
  {
    title: "Building data pipelines you can trust",
    date: "Jan 26, 2026",
    image: images.feature3,
  },
  {
    title: "Why lab partnerships need clarity early",
    date: "Jan 08, 2026",
    image: images.feature4,
  },
];

const researchFields = [
  {
    title: "Biomedical Research",
    description: "Applying biological systems and organisms",
    image: "/images/service-1.jpg",
    icon: "/images/icon-service-1.svg",
  },
  {
    title: "Materials Science",
    description: "Investigating advanced material properties",
    image: "/images/service-1.jpg",
    icon: "/images/icon-service-2.svg",
  },
  {
    title: "Chemical Safety",
    description: "Assessing substance impact and compliance",
    image: "/images/service-1.jpg",
    icon: "/images/icon-service-3.svg",
  },
  {
    title: "Diagnostic Sciences",
    description: "Scientific methods for diagnostics",
    image: "/images/service-1.jpg",
    icon: "/images/icon-service-4.svg",
  },
];
const whatWeDoData = {
  label: "What We Do",

  title: (
    <>
      Transforming scientific questions <br />
      into real-world results
    </>
  ),

  description:
    "At our core, we are dedicated to advancing scientific understanding through purposeful research tailored to address today’s most pressing challenges.",

  cta: {
    label: "Contact us",
    href: "/contact",
  },

  counter: {
    value: 98,
    suffix: "%",
    title: "Environmental Science",
    text: "Our lab delivers data-driven insights that help protect natural.",
  },

  items: [
    {
      icon: FiActivity,
      title: "Comprehensive Laboratory Testing",
      text: "Advanced testing across scientific disciplines with validated results.",
    },
    {
      icon: FiClipboard,
      title: "Research Design & Methodology",
      text: "Tailored strategies aligned with scientific best practices.",
    },
    {
      icon: FiBarChart2,
      title: "Data Analysis & Interpretation",
      text: "Turning complex datasets into clear, actionable insights.",
    },
    {
      icon: FiUsers,
      title: "Collaborative Partnerships",
      text: "Working with institutions, industry, and government agencies.",
    },
  ],
};

// caseStudies.data.ts
export const caseStudies = [
  {
    title: "Genomic Research Unlocks Drought-Resistant Crop Varieties",
    image: "/images/case-study-1.jpg",
    href: "/case-studies/genomic-research",
  },
  {
    title: "Detecting Water Contaminants Using Advanced Spectroscopy",
    image: "/images/case-study-2.jpg",
    href: "/case-studies/water-contaminants",
  },
  {
    title: "Accelerating Vaccine Development with Rapid Antigen Testing",
    image: "/images/case-study-3.jpg",
    href: "/case-studies/vaccine-development",
  },
];

// faqs.data.ts
export const faqs = [
  {
    q: "What types of research services do you offer?",
    a: "We specialize in laboratory testing, analytical research, custom experiments, and scientific data interpretation.",
  },
  {
    q: "Can I request a custom research project?",
    a: "Yes, we design tailored research projects aligned with your specific goals and requirements.",
  },
  {
    q: "How long does a typical research project take?",
    a: "Project timelines vary based on scope and complexity, but we always provide clear estimates upfront.",
  },
  {
    q: "Are your labs certified or accredited?",
    a: "Yes, our laboratories follow certified procedures and comply with industry accreditation standards.",
  },
  {
    q: "How do I submit a sample or start a project?",
    a: "You can contact us directly or submit a request through our website to begin the process.",
  },
];

// testimonials.data.ts
export const testimonials = [
  {
    name: "Jenny Wilson",
    role: "Research Analyst",
    image: "/images/author-1.jpg",
    quote:
      "You'll meet with our scientific advisors to define your research goals, scope, and budget with complete transparency.",
    video: "https://www.youtube.com/watch?v=Y-x0efG1seA",
  },
  {
    name: "Grace Martin",
    role: "Lab Supervisor",
    image: "/images/author-2.jpg",
    quote:
      "Their analytical depth and scientific rigor helped us accelerate results without compromising accuracy.",
    video: "https://www.youtube.com/watch?v=Y-x0efG1seA",
  },
  {
    name: "Emma Davis",
    role: "Project Coordinator",
    image: "/images/author-3.jpg",
    quote:
      "From planning to execution, the entire experience felt structured, professional, and results-driven.",
    video: "https://www.youtube.com/watch?v=Y-x0efG1seA",
  },
];

export const teamMembers = [
  {
    name: "Darlene Robertson",
    role: "Molecular Biologist",
    image: "/images/team-1.jpg",
  },
  {
    name: "Dr. Olivia Hughes",
    role: "Research Chemist",
    image: "/images/team-2.jpg",
  },
  {
    name: "Cameron Williamson",
    role: "Project Lead",
    image: "/images/team-3.jpg",
  },
  {
    name: "Leslie Alexander",
    role: "Lab Manager",
    image: "/images/team-4.jpg",
  },
];
const Ping = () => (
  <span className="relative h-2.5 w-2.5">
    <span className="absolute inset-0 rounded-full bg-green-300 animate-ping" />
    <span className="absolute inset-0.5 rounded-full bg-green-300" />
  </span>
);

const Badge = ({ children }: { children: ReactNode }) => (
  <p className="inline-flex items-center gap-2 rounded-full border border-black/50 px-4 py-1.5 text-sm">
    <Ping />
    {children}
  </p>
);
export default function Home() {
  return (
    <PageTransition>
      {/* first section with video in bg */}
      <section className="relative overflow-hidden ">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/homePageVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 py-28 text-white md:grid-cols-2">
          <div>
            <p className="flex items-center gap-3 text-sm text-white/80">
              <Ping />
              The Science Behind Smarter Solutions
            </p>

            <p className="mt-4 max-w-xl text-4xl md:text-6xl font-semibold leading-tight text-background">
              Trusted Scientific Solutions for a Smarter, Safer World
            </p>

            <p className="mt-6 max-w-lg text-white/80">
              Accurate testing, custom research, and expert consultation.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/services" className="btn-default">
                Get Started
              </Link>
              <Link href="/contact" className="btn-default ">
                Explore
              </Link>
            </div>

            <div className="mt-8 flex gap-3  text-white">
              <CountUpOnView
                to={16}
                suffix="+"
                className="type-h2 font-semibold text-white"
              />
              years ·
              <CountUpOnView
                to={1200}
                suffix="+"
                className="type-h2 font-semibold text-white"
              />
              clients
            </div>
          </div>
          <a
            href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto w-full max-w-md"
          >
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur transition group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 translate-x-0.5 fill-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </a>
        </div>
      </section>

      <Ticker />
      <SectionWrapper fullBleed>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Badge>About our Laboratory</Badge>

            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              Pioneering scientific research into real-world solutions
            </h2>

            <p className="mt-4 text-(--muted-color)">
              Translating complex science into practical outcomes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {featureCards.map(({ title, text, image }) => (
              <GlassCard
                key={title}
                title={title}
                description={text}
                image={image}
                height="h-64"
                glowColor="bg-emerald-400/20"
                hoverEffect="both"
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper fullBleed>
        <section className="bg-(--color-accent) rounded-2xl py-24">
          <div className="mx-auto max-w-[92%] px-6">
            <div className="mb-16 grid gap-8 md:grid-cols-2">
              <div>
                <Badge>Key Research Fields</Badge>
                <h2 className="mt-4 text-3xl md:text-5xl font-semibold">
                  Leading innovation across <br /> critical research fields
                </h2>
              </div>

              <p className="text-(--text-muted)">
                Each research field is supported by expert teams and
                cutting-edge technologies, ensuring precision, innovation, and
                real-world relevance. our work is rooted in curiosity, driven by
                data, and designed to deliver meaningful impact.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {researchFields.map((f) => (
                <GlassCard key={f.title} {...f} tag="Research" />
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
          <Image
            src="/images/why-choose-body-image.jpg"
            alt=""
            width={600}
            height={700}
            className="rounded-3xl object-cover"
          />

          <div>
            <Badge>Why choose us</Badge>

            <h2 className="mt-4 text-3xl md:text-5xl font-semibold">
              Powered by technology, driven by curiosity
            </h2>

            <p className="mt-4 text-(--muted-color)">
              Accurate, innovative, future-ready research solutions.
            </p>

            <div className="mt-6 grid gap-5">
              {[
                ["Proven Track Record", "Successful studies & outcomes"],
                ["Collaborative Approach", "Clients at every step"],
              ].map(([title, text]) => (
                <div key={title} className="flex gap-4">
                  <span className="h-10 w-10 rounded-full bg-(--primary-color)/10" />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-(--muted-color)">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <section className="bg-(--color-secondary) text-background  rounded-2xl py-24">
          <div className="container mx-auto grid gap-24 lg:grid-cols-2 items-center">
            {/* LEFT */}
            <div>
              <Badge>{whatWeDoData.label}</Badge>

              <p className="mt-4 text-3xl md:text-5xl font-semibold leading-tight text-(--text-invert)">
                {whatWeDoData.title}
              </p>

              <p className="mt-4 max-w-xl text-(--text-invert)">
                {whatWeDoData.description}
              </p>

              <a
                href={whatWeDoData.cta.href}
                className="mt-8 inline-block rounded-full bg-(--primary-color) px-6 py-3 text-sm font-semibold text-white"
              >
                {whatWeDoData.cta.label}
              </a>

              {/* Counter */}
              <div className="mt-10 max-w-sm rounded-2xl bg-white/5 p-6 text-(--text-invert)">
                <CountUpOnView
                  to={whatWeDoData.counter.value}
                  suffix={whatWeDoData.counter.suffix}
                  className="type-h1 font-serif "
                />

                <p className="mt-2 type-h5 border-t-2">
                  {whatWeDoData.counter.title}
                </p>

                <p className="mt-1 type-h6 text-(--text-invert)">
                  {whatWeDoData.counter.text}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid gap-6">
              {whatWeDoData.items.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="group flex gap-4 rounded-2xl bg-white/5 p-5 transition hover:bg-white/10 text-(--text-invert)"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-accent)/10 text-(--text-invert) transition group-hover:scale-110">
                    <Icon size={28} />
                  </div>

                  <div>
                    <p className="type-h5 text-(--text-invert) font-semibold">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-(--text-invert)">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>
      <SectionWrapper>
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            {/* Header */}
            <div className="mb-16 grid gap-8 md:grid-cols-2 items-center">
              <div>
                <Badge>Our Case Studies</Badge>

                <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                  Innovative solutions <br />
                  backed by scientific rigor
                </h2>
              </div>

              <div className="md:text-right">
                <Link href="/case-studies" className="btn-default">
                  Explore All Studies
                </Link>
              </div>
            </div>

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <GlassCard key={study?.title} {...study} />
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <section className="py-24  rounded-2xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
              {/* Left content */}
              <div>
                <Badge>Frequently Asked Questions</Badge>

                <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                  Browse our most <br />
                  asked questions
                </h2>

                <p className="mt-4 text-(--text-description)">
                  We’ve compiled answers to the most common questions about our
                  lab services, research process, and capabilities.
                </p>

                <Link href="/faqs" className="btn-default mt-8 inline-block">
                  View All FAQs
                </Link>
              </div>

              {/* Accordion */}
              <div className="space-y-4 bg-(--color-accent) p-16 rounded-3xl">
                {faqs.map((item) => (
                  <FaqItem key={item.q} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <section className="py-28 text-(--text-invert)  bg-(--color-secondary) rounded-3xl">
          <div className="mx-auto max-w-7xl px-6">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
              <Badge>Our Testimonials</Badge>

              <p className="mt-4 text-3xl md:text-5xl font-semibold text-(--text-invert)">
                What our clients say <br /> about their experience with us
              </p>
            </div>

            {/* Slider */}
            <div className="mt-16 overflow-x-auto">
              <div className="flex gap-6 snap-x snap-mandatory pb-6">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.name} {...t} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper>
        <section className="py-24">
          <div className="container mx-auto px-4">
            {/* Section title */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge>Our Team</Badge>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-3 text-3xl md:text-4xl font-bold"
              >
                The brilliant minds powering our research team
              </motion.h2>
            </div>

            {/* Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teamMembers.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </motion.div>
          </div>
        </section>
      </SectionWrapper>
    </PageTransition>
  );
}
