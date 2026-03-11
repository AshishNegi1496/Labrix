"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUpOnView from "@/components/CountUpOnView";

const leadership = [
  {
    name: "Dr. Maya Srinivasan",
    role: "Chief Executive Officer",
    text: "Leads enterprise strategy and long-term clinical platform direction.",
  },
  {
    name: "Rahul Deshmukh",
    role: "Chief Product Officer",
    text: "Owns product roadmap, delivery standards, and sponsor outcomes.",
  },
  {
    name: "Emily Carter",
    role: "Head of Clinical Solutions",
    text: "Bridges protocol execution with scalable operational systems.",
  },
] as const;

const culture = [
  {
    title: "Integrity",
    text: "Essential for clinical data quality, trust, and compliance.",
  },
  {
    title: "Ownership",
    text: "Accountability in every workflow, handoff, and delivery milestone.",
  },
  {
    title: "Innovation",
    text: "A tech-driven mindset for solving high-complexity trial problems.",
  },
  {
    title: "Collaboration",
    text: "Cross-functional teamwork across clinical, product, and operations.",
  },
  {
    title: "Impact",
    text: "Focused on better patient and research outcomes, not just activity.",
  },
] as const;

const team = [
  {
    name: "Aisha Khan",
    role: "Clinical Program Manager",
    image: "/images/team-1.jpg",
  },
  {
    name: "Noah Bennett",
    role: "Data Operations Lead",
    image: "/images/team-2.jpg",
  },
  {
    name: "Sofia Ramirez",
    role: "Regulatory Specialist",
    image: "/images/team-3.jpg",
  },
  {
    name: "Liam O'Connor",
    role: "Implementation Engineer",
    image: "/images/team-4.jpg",
  },
] as const;
const overviewText =
  "We combine clinical depth with product grade execution. ClinRT is built by specialists in clinical operations digital workflows and quality systems. We partner with study teams to simplify execution reduce operational friction and keep trial delivery aligned to patient and sponsor needs.";
const headlineWords = ["We", "Create", "Impact."] as const;

type WordProps = {
  word: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  range: [number, number];
};

function Word({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="mr-2 inline-block transition-all duration-300 text-white"
    >
      {word}
    </motion.span>
  );
}

export default function WhoWeArePage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const words = overviewText.split(" ");
  return (
    <PageTransition>
      <SectionWrapper className="pt-28 md:pt-36">
        <div className="rounded-3xl bg-(--primary-color) px-6 py-16 text-white md:px-10 md:py-20">
          <p className="text-xs uppercase tracking-[0.35em] text-white/65">
            Who We Are
          </p>
          <div className="mt-5 flex flex-wrap gap-3 md:gap-5">
            {headlineWords.map((word, index) => (
              <ScrollReveal key={word} variant="zoom" delay={index * 120}>
                <span className="inline-block rounded-2xl bg-white/10 px-4 py-2 type-h1 font-semibold text-white">
                  {word}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper fullBleed className="bg-(--primary-color)">
        <section ref={containerRef} className="relative h-[220vh] ">
          <div className="sticky top-0 flex h-screen items-center justify-center px-6">
            <p className="type-h2 gap-2 space-x-2 text-gray-400">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;

                return (
                  <Word
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </p>
          </div>
        </section>
      </SectionWrapper>
      <SectionWrapper fullBleed>
        <div className="mx-auto max-w-7xl rounded-3xl bg-white px-6 py-14 md:px-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              Our Leadership
            </p>
          </ScrollReveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {leadership.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 90}>
                <article className="h-full rounded-2xl border border-slate-200 bg-(--bg-page) p-6">
                  <p className="type-h5 font-semibold">{member.name}</p>
                  <p className="mt-1 text-sm font-medium text-(--primary-color)">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-(--muted-color)">
                    {member.text}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-5 md:grid-cols-2">
          <ScrollReveal className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              Our Vision
            </p>
            <p className="mt-3 type-h4 font-semibold">
              Make clinical execution smarter, more connected, and more human.
            </p>
            <p className="mt-3 text-sm text-(--muted-color)">
              We envision a future where research teams can focus on outcomes
              instead of operational bottlenecks.
            </p>
          </ScrollReveal>
          <ScrollReveal
            delay={120}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              Our Mission
            </p>
            <p className="mt-3 type-h4 font-semibold">
              Build dependable digital systems that help trials run with
              clarity, speed, and confidence.
            </p>
            <p className="mt-3 text-sm text-(--muted-color)">
              Every solution we ship is grounded in accountability, quality, and
              real delivery needs.
            </p>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="mx-auto max-w-7xl rounded-3xl bg-(--color-secondary) px-6 py-16 text-white md:px-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Our Culture
            </p>
            <p className="mt-3 type-h2 font-semibold text-white">
              Values that guide every decision and delivery cycle
            </p>
          </ScrollReveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {culture.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 70}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="type-h5 font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-white/80">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
            Our Team
          </p>
          <h2 className="mt-3 type-h2 font-semibold">
            Specialists across product, clinical operations, and delivery
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 80}>
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-56">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="type-h5 font-semibold">{member.name}</p>
                  <p className="text-sm text-(--muted-color)">{member.role}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <ScrollReveal className="rounded-3xl bg-(--color-accent) p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-(--primary-color)">
            Experience Numbers
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/60 p-6">
              <CountUpOnView
                to={15}
                suffix="+"
                className="text-4xl font-semibold text-(--primary-color)"
              />
              <p className="mt-2 text-sm text-(--primary-color)/80">
                Yrs. of deep domain expertise in clinical systems and compliance
              </p>
            </div>
            <div className="rounded-2xl bg-white/60 p-6">
              <CountUpOnView
                to={80}
                suffix="+"
                className="text-4xl font-semibold text-(--primary-color)"
              />
              <p className="mt-2 text-sm text-(--primary-color)/80">
                Years of collective experience from technologists, creators, and
                problem-solvers
              </p>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
}
