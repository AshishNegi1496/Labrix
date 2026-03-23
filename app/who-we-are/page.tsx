/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUpOnView from "@/components/CountUpOnView";
import Button from "@/components/ui/Button";
import {
  FiCheck,
  FiEye,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { type RefObject, useRef } from "react";
import { FullScreenCard } from "@/hooks/FullScreenCard";
import { useActiveCard } from "@/hooks/useInView";
import { IconType } from "react-icons";

const meaningPoints = [
  "Deep understanding of clinical trial operations",
  "Calm execution in complex, regulated environments",
  "Clear ownership and reliable delivery",
  "Long term partnerships built on trust",
] as const;

const whatThisMeansPoints = [
  "Stay aligned across teams, sites, and stakeholders",
  "Make decisions with better clarity and visibility",
  "Maintain consistency and readiness across studies",
  "Reduce day to day operational complexity",
] as const;

const leadership = [
  {
    name: "Dr. Maya Srinivasan",
    role: "Chief Executive Officer",
    image: "/images/author-1.jpg",
    summary:
      "Sets the strategic direction for the organization with a strong focus on dependable delivery, and partner trust across complex clinical programs.",
    highlights: ["Strategy & governance", "Operational quality"],
  },
  {
    name: "Rahul Deshmukh",
    role: "Chief Product Officer",
    image: "/images/author-2.jpg",
    summary:
      "Leads product vision and platform decisions around real-world study workflows, scalable architecture, and clear operational usability for trial teams.",
    highlights: ["Product strategy", "Workflow design", "Platform scale"],
  },
  {
    name: "Emily Carter",
    role: "Head of Clinical Solutions",
    image: "/images/author-3.jpg",
    summary:
      "Brings clinical and operational needs into practical solution design, helping sponsors and delivery teams execute with clarity, control, and consistency.",
    highlights: ["Clinical operations", "Solution design", "Execution clarity"],
  },
] as const;

const leadershipPrinciples = [
  {
    title: "Reliability first",
    text: "Stability and consistency are essential.",
  },
  {
    title: "Clarity over complexity",
    text: "Simple, purposeful approaches.",
  },
  {
    title: "Strong follow through",
    text: "Planning and delivery with discipline.",
  },
  {
    title: "Practical innovation",
    text: "Improving how work gets done without unnecessary change.",
  },
] as const;

const missionPoints = [
  "Linking essential workflows into one cohesive operating system",
  "Improving data quality and giving teams better oversight",
  "Designing solutions that scale across programs, phases, and global regions",
] as const;

const howWeWorkPoints = [
  "We listen before we design",
  "We prioritise clarity over speed",
  "We plan carefully and follow through",
  "We take responsibility for outcomes",
] as const;

const culture = [
  {
    title: "Integrity",
    text: "Every decision, workflow, and dataset meets the highest standards of compliance and accuracy.",
  },
  {
    title: "Ownership",
    text: "We take accountability across every layer, ensuring reliability and trust.",
  },
  {
    title: "Innovation",
    text: "We challenge legacy systems and build modern, scalable clinical platforms.",
  },
  {
    title: "Collaboration",
    text: "We operate cross-functionally to deliver intuitive and stable systems.",
  },
  {
    title: "Impact",
    text: "Everything we build ultimately contributes to better patient outcomes.",
  },
] as const;

const teamStats = [
  { value: 40, suffix: "+", label: "Years of Consolidated Experience" },
  { value: 1000, suffix: "+", label: " Clinical Trials Supported" },
  {
    value: 500,
    suffix: "+",
    label: "Clients Catered with IRT and CTSM Services",
  },
] as const;

/* ---------------- UI helpers ---------------- */

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

type StickyCardsProps = {
  iclinrtUsps: readonly string[];
  sectionRef: RefObject<HTMLDivElement | null>;
};

type EnhancedPoint = {
  title: string;
  icon: IconType;
  color: string;
  description: string;
  metrics: string;
};

const StickyCards = ({ iclinrtUsps, sectionRef }: StickyCardsProps) => {
  const iconMap: IconType[] = [FiStar, FiShield, FiTrendingUp, FiUsers];
  const colorMap = [
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-purple-500 to-pink-400",
    "from-orange-500 to-amber-400",
  ];
  const descriptionMap = [
    "Years of specialized expertise in complex trial management",
    "Precision delivery under regulatory scrutiny",
    "End-to-end accountability with measurable results",
    "Collaborative relationships that drive success",
  ];
  const metricsMap = [
    "98% client satisfaction",
    "100% inspection readiness",
    "99.9% on-time delivery",
    "5+ years average partnership",
  ];

  const enhancedPoints: EnhancedPoint[] = iclinrtUsps.map((title, index) => ({
    title,
    icon: iconMap[index % iconMap.length],
    color: colorMap[index % colorMap.length],
    description: descriptionMap[index % descriptionMap.length],
    metrics: metricsMap[index % metricsMap.length],
  }));

  // Predefined deterministic positions for particles
  const getParticlePosition = (index: number, particleIndex: number) => {
    const positions = [
      { x: "15%", y: "25%" },
      { x: "75%", y: "85%" },
      { x: "45%", y: "15%" },
      { x: "85%", y: "45%" },
      { x: "25%", y: "75%" },
      { x: "65%", y: "55%" },
    ];
    return positions[particleIndex % positions.length];
  };

  return (
    <div className="relative w-full py-12">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-125 h-125 rounded-full bg-linear-to-r from-blue-500/20 to-cyan-500/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-125 h-125 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 blur-[100px] animate-pulse animation-delay-1000" />
      </div>

      {/* Cards Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
        {enhancedPoints.map((point, index) => {
          const Icon = point.icon;

          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative"
            >
              <div
                className={`
                  relative overflow-hidden rounded-3xl 
                  bg-linear-to-br ${point.color}
                  p-0.5 shadow-2xl
                  transition-all duration-300
                `}
              >
                <div className="relative rounded-3xl bg-slate-950/90 backdrop-blur-xl p-8 md:p-10 h-full">
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent"
                    animate={{
                      x: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Header with icon and badge */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className={`
                          p-3 rounded-2xl bg-linear-to-br ${point.color}
                          shadow-lg
                        `}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
                    >
                      {point.title}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      className="text-white/70 text-base md:text-lg leading-relaxed mb-6"
                    >
                      {point.description}
                    </motion.p>

                    {/* Animated progress indicator */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.6 }}
                      className="h-[2px] bg-linear-to-r from-white/50 to-white/20 origin-left"
                    />

                    {/* Floating particles effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/20 rounded-full"
                          initial={getParticlePosition(index, i)}
                          animate={{
                            y: [null, -20, 20, -10, 0],
                            x: [null, 10, -10, 5, 0],
                            opacity: [0, 0.5, 0.3, 0.5, 0],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Counter badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.8 }}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6"
              >
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-white to-slate-200 shadow-lg">
                  <span className="text-sm md:text-base font-bold text-slate-900">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

function LeadershipProfileCard({
  leader,
}: {
  leader: (typeof leadership)[number];
}) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-black/8 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-1 hover:border-black/12 hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
      <div className="relative m-3 overflow-hidden rounded-[1.4rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-r from-orange-200/30 via-white/20 to-sky-200/20 opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="relative h-72 overflow-hidden rounded-[1.4rem]">
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/88 via-slate-950/24 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-xl font-semibold text-white">{leader.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-white/65">
              {leader.role}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-black/40">
          Leadership Focus
        </p>
        <p className="mt-4 text-sm leading-7 text-black/62">{leader.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {leader.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-black/8 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-black/55 transition duration-300 group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-700"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
/* ---------------- Page ---------------- */

export default function WhoWeArePage() {
  const uspsSectionRef = useRef<HTMLDivElement | null>(null);
  const knownForCards = meaningPoints.map((point) => ({
    title: point,
    items: [],
  }));

  return (
    <PageTransition>
      {/* ================= HERO ================= */}
      <section className="relative h-screen overflow-hidden">
        {/* <video
          className="absolute inset-0 h-full w-full object-cover scale-105"
          src="/videos/homePageVideo.mp4"
          autoPlay
          muted
          loop
        /> */}
        <Image
          src="/images/about-clinrt.avif" // Replace with your actual image path
          alt="Background"
          fill
          className="object-cover scale-105"
          priority // Add if this is above the fold
          sizes="100vw" // Helps with responsive loading
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/95" />

        {/* animated gradient blobs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 blur-3xl rounded-full"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10 h-full flex items-center section-shell text-white">
          <ScrollReveal>
            <Badge>WHO WE ARE</Badge>

            <p className="mt-6 text-5xl md:text-6xl font-semibold leading-tight max-w-3xl">
              Experienced people.
              <br />
              Thoughtful work.
              <br />
              Trusted outcomes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/65">
                Know more
              </p>
              <Button href="#leadership" label="Leadership" size="sm" />
              <Button href="#culture" label="Culture" size="sm" />
              <Button href="#team" label="Team" size="sm" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= WHAT IT MEANS ================= */}
      <SectionWrapper fullBleed>
        <div className="relative overflow-hidden rounded-4xl border border-black/8 bg-linear-to-br from-slate-50 via-white to-orange-50/60 p-6 shadow-[0_24px_80px_rgba(15,36,58,0.08)] md:p-10">
          <motion.div
            className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
          />
          <motion.div
            className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-sky-200/35 blur-3xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 11, repeat: Infinity }}
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* LEFT SIDE - Animated Overview */}
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Badge>Overview</Badge>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="type-h3 font-semibold leading-tight text-black md:text-3xl lg:text-4xl">
                    We are a team of people who work closely with clinical
                    research teams and understand the realities of running
                    trials. Our background spans clinical operations,
                    technology, and delivery — giving us a practical view of
                    what works and what does not. We believe good work comes
                    from clear thinking, strong ownership, and dependable
                    execution. Our focus is on supporting teams with structure,
                    clarity, and consistency, so they can work with confidence
                    throughout the study lifecycle.
                  </p>
                </motion.div>
              </motion.div>
            </ScrollReveal>

            {/* RIGHT SIDE - What this means for you */}
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Badge>What this means for you</Badge>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-3xl font-semibold leading-tight text-black md:text-4xl"
                >
                  Our experience and ways of working help research teams
                </motion.p>

                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="grid gap-3"
                >
                  {whatThisMeansPoints.map((point) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.62 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 rounded-2xl border border-black/8 bg-white/70 px-4 py-3 shadow-sm backdrop-blur"
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                        <FiCheck className="h-4 w-4" />
                      </span>
                      <p className="text-sm leading-7 text-black/65">{point}</p>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="inline-flex max-w-md items-start gap-3 rounded-2xl border border-black/8 bg-white/80 px-5 py-4 shadow-sm backdrop-blur"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500"
                  />
                  <p className="text-sm leading-7 text-black/65">
                    We aim to bring steadiness and order to environments that
                    are often fast moving and complex.
                  </p>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      {/* <SectionWrapper>
        <ScrollReveal delay={120}>
          <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,36,58,0.18)] md:p-8">
            <Badge>What We&apos;re Known For</Badge>
            <div
              ref={uspsSectionRef}
              className="relative "
              // style={{ height: `${knownForCards.length * 40}vh` }}
              // style={{ height: `60vh` }}
              style={{
                height: `${Math.min(knownForCards.length * 30, 100)}vh`,
              }}
            >
              <StickyCards
                iclinrtUsps={meaningPoints}
                sectionRef={uspsSectionRef}
              />
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper> */}
      <SectionWrapper fullBleed>
        <ScrollReveal delay={120}>
          <div className="relative rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl overflow-hidden md:p-8">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10">
              <Badge>What We&lsquo;re Known For</Badge>

              <div
                ref={uspsSectionRef}
                className="relative mt-8"
                style={{
                  height: `${Math.min(meaningPoints.length * 35, 100)}vh`,
                }}
              >
                <StickyCards
                  iclinrtUsps={meaningPoints}
                  sectionRef={uspsSectionRef}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
      {/* ================= LEADERSHIP ================= */}
      <SectionWrapper id="leadership" fullBleed className="scroll-mt-24">
        <div className="relative overflow-hidden rounded-[2.4rem] border border-black/8 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.16),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)] md:p-10">
          <div className="pointer-events-none absolute -left-10 top-10 h-36 w-36 rounded-full bg-orange-200/45 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-0 h-44 w-44 rounded-full bg-sky-200/35 blur-3xl" />

          <div className="relative">
            <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
              <ScrollReveal>
                <div className="max-w-3xl">
                  <Badge>Our Leadership</Badge>
                  <p className="mt-5 text-3xl font-semibold leading-tight text-black md:text-5xl">
                    Experience That Guides Our Direction
                  </p>
                  <p className="mt-5 text-base leading-8 text-black/65">
                    Our leadership team brings decades of experience across
                    clinical operations, data management, and large research
                    programs. They set clear standards and lead with
                    accountability, ensuring that quality, reliability, and
                    trust remain central to everything we do.
                  </p>
                  <p className="mt-4 text-base leading-8 text-black/58">
                    Their priority is to support teams with clarity and
                    direction, making thoughtful decisions that hold up across
                    programs, regions, and real world conditions.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={140}>
                <div className="rounded-[1.9rem] border border-black/8 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-7">
                  <Badge> Principles We Lead By</Badge>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {leadershipPrinciples.map((principle) => (
                      <div
                        key={principle.title}
                        className="rounded-2xl border border-black/8 bg-slate-50/90 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-black/12 hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                            <FiCheck className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="font-semibold text-black">
                              {principle.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-black/60">
                              {principle.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {leadership.map((m, i) => (
                <ScrollReveal key={m.name} delay={i * 100}>
                  <LeadershipProfileCard leader={m} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-50 via-white to-slate-50 shadow-xl">
          {/* Modern gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-blue-100/20" />

          {/* Animated blur elements */}
          <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-32 right-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl animate-pulse animation-delay-1000" />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative px-6 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-7xl">
              {/* Three blocks in one line */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
                {/* Vision Card - Biggest */}
                <ScrollReveal delay={80} className="flex-1 lg:flex-[1.4]">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8 h-full"
                  >
                    <Badge>Mission</Badge>

                    <p className="text-base leading-relaxed text-slate-600 mt-4">
                      Our mission is to support clinical research teams with
                      practical, dependable ways of working that reflect real
                      world needs. We focus on improving coordination,
                      strengthening visibility, and supporting consistent
                      execution across studies.
                    </p>
                    <div className="grid gap-1">
                      {missionPoints.map((point, idx) => (
                        <div
                          key={idx}
                          // className="flex items-start gap-1 rounded-xl bg-slate-50 p-3 transition-all duration-200 hover:bg-slate-100"
                        >
                          {/* <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> */}
                          <span className="text-sm text-slate-600 italic">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Mission Card - Medium (a little smaller) */}
                <ScrollReveal delay={140} className="flex-1 lg:flex-[1.2]">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7 h-full"
                  >
                    <Badge>Vision</Badge>
                    <p className="mb-6 text-base leading-relaxed text-slate-600 mt-4">
                      Our vision is to make clinical research easier to run and
                      easier to manage. We want teams to have clear information,
                      connected ways of working, and dependable support so
                      studies can move forward with fewer disruptions. By
                      strengthening the foundations behind daily operations, we
                      help research teams focus on progress instead of process.
                    </p>
                  </motion.div>
                </ScrollReveal>

                {/* How We Work Card - Smallest */}
                <ScrollReveal delay={200} className="flex-1 lg:flex-1">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl md:p-6 h-full"
                  >
                    <Badge>How We Work</Badge>

                    <div className="grid gap-2 mt-4">
                      {howWeWorkPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 rounded-xl bg-white/5 p-2.5 transition-all duration-200 hover:bg-white/10"
                        >
                          <FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
                          <span className="text-sm text-black">{point}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ================= CULTURE ================= */}
      <SectionWrapper id="culture" fullBleed className="scroll-mt-24">
        <div className="bg-linear-to-r from-black to-(--color-primary) text-white rounded-3xl p-12">
          <Badge>Our Culture</Badge>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {culture.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <p className="font-semibold type-h3">{c.title}</p>
                <p className="type-h6 mt-2 text-white/70">{c.text}</p>
              </motion.div>
            ))}
          </div>

          <ScrollReveal delay={180}>
            <motion.div
              whileHover={{ y: -4 }}
              className="mt-10 grid gap-6 rounded-[30px] border border-white/12 bg-white/6 p-6 backdrop-blur md:grid-cols-[1.1fr_auto] md:items-center"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
                  Shared Moments
                </p>
                <p className="mt-3 max-w-2xl text-2xl font-semibold leading-tight text-white">
                  Our culture comes alive through shared moments.
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                  Explore the events, celebrations, and team experiences that
                  shape how we work together across ClinRT.
                </p>
              </div>

              <div className="md:justify-self-end">
                <Button
                  href="/whats-new?tab=Moments#content-hub"
                  label="Explore Our Moments"
                />
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* ================= TEAM ================= */}
      <SectionWrapper id="team" className="scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-80">
            <Image
              src="/images/one-team.png"
              fill
              alt="team"
              className="object-cover rounded-2xl"
            />
          </div>

          <div>
            <Badge>Our Team</Badge>

            <p className="mt-4 text-muted-foreground">
              Our team brings together product thinkers, clinical specialists,
              engineers, and operators who care deeply about improving how
              trials run. We work closely across disciplines, combining
              practical experience with thoughtful design to build technology
              that stands up in real world research. Every person here
              contributes to making clinical operations clearer, smoother, and
              more reliable—one workflow at a time.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {teamStats.map((s) => (
                <div key={s.label} className="p-4 border rounded-xl">
                  <CountUpOnView
                    className="type-h3 font-semibold"
                    to={s.value}
                    suffix={s.suffix}
                  />
                  <p className="text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ================= CTA ================= */}
      <SectionWrapper fullBleed>
        <div className=" bg-(--color-orange) rounded-4xl py-16 px-6 md:py-20 md:px-12">
          <div className="flex flex-col md:flex-col md:items-center md:justify-between gap-6">
            <p className="text-white type-h1 md:text-2xl lg:text-3xl font-semibold text-center md:text-left">
              Want to{" "}
              <span className="font-bold italic bg-(--btn-bg) px-2 py-1 rounded-lg">
                work with us
              </span>{" "}
              and create{" "}
              <span className="font-bold italic bg-(--btn-bg) px-2 py-1 rounded-lg">
                real impact
              </span>
              ?
            </p>

            <Button
              href="/whats-new?tab=Moments#content-hub"
              label="Explore now"
            />
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
