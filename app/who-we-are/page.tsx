"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUpOnView from "@/components/CountUpOnView";
import Button from "@/components/ui/Button";
import SectionBadge from "@/components/ui/SectionBadge";
import CultureGraphic from "@/components/CultureGraphic";
import {
  FiCheck,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useRef, useState } from "react";
import { IconType } from "react-icons";
import {
  whoWeAreCulture as culture,
  whoWeAreHowWeWorkPoints as howWeWorkPoints,
  whoWeAreLeadership as leadership,
  whoWeAreLeadershipPrinciples as leadershipPrinciples,
  whoWeAreMeaningPoints as meaningPoints,
  whoWeAreMissionPoints as missionPoints,
  whoWeAreTeamStats as teamStats,
  whoWeAreWhatThisMeansPoints as whatThisMeansPoints,
} from "@/data";

/* ---------------- UI helpers ---------------- */

type StickyCardsProps = {
  iclinrtUsps: readonly string[];
};

type EnhancedPoint = {
  title: string;
  icon: IconType;
  color: string;
  description: string;
  metrics: string;
};

const StickyCards = ({ iclinrtUsps }: StickyCardsProps) => {
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
  const [activeCultureCard, setActiveCultureCard] = useState(0);
  const uspsSectionRef = useRef<HTMLDivElement | null>(null);
  const revealUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  } as const;
  const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const overviewLines = [
    "We are a team",
    "of people who",
    "work closely with",
    "clinical research teams",
  ];
  const impactLines = ["Our experience", "helps research", "teams thrive"];
  const overviewStats = [
    { value: "10+", label: "Years in clinical ops" },
    { value: "3", label: "Disciplines united" },
  ];

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
          src="/images/about-clinrt.avif"
          alt="Background"
          fill
          className="object-cover scale-105"
          priority // Add if this is above the fold
          sizes="100vw" // Helps with responsive loading
        />

        {/* overlay */}
        {/* <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/95" /> */}

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
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#070b13] p-8 shadow-[0_28px_90px_rgba(2,6,23,0.55)] md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_-10%,rgba(125,168,255,0.2),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_85%_85%,rgba(249,115,22,0.12),transparent)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:76px_76px]" />
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/12 to-transparent" />

          <motion.div
            className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-blue-400/15 blur-[90px]"
            animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-14 bottom-0 h-72 w-72 rounded-full bg-orange-400/12 blur-[95px]"
            animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid gap-14 text-white lg:grid-cols-2 lg:items-start">
            <ScrollReveal>
              <motion.div
                {...revealUp}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <SectionBadge>Overview</SectionBadge>
                </motion.div>

                <div className="overflow-hidden">
                  {overviewLines.map((line, index) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, y: 60, skewY: 3 }}
                      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.15 + index * 0.1,
                        ease: cinematicEase,
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="block text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.6rem]">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  {...revealUp}
                  transition={{ duration: 0.7, delay: 0.62 }}
                  className="space-y-4 border-l border-white/12 pl-5"
                >
                  <p className="text-base leading-8 text-white/60">
                    Our background spans clinical operations, technology, and
                    delivery — giving us a practical view of what works and what
                    does not.
                  </p>
                  <p className="text-base leading-8 text-white/60">
                    We believe good work comes from clear thinking, strong
                    ownership, and dependable execution throughout the study
                    lifecycle.
                  </p>
                </motion.div>

                <motion.div
                  {...revealUp}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-wrap items-center gap-8 pt-2"
                >
                  {overviewStats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-3xl font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                  <div className="h-8 w-px bg-white/15" />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-green-300/80">
                      Active
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal>
              <motion.div
                {...revealUp}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="space-y-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8"
              >
                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <SectionBadge>What this means for you</SectionBadge>
                </motion.div>

                <div className="overflow-hidden">
                  {impactLines.map((line, index) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, y: 60, skewY: 3 }}
                      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.28 + index * 0.1,
                        ease: cinematicEase,
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="block text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.ul
                  {...revealUp}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="space-y-2"
                >
                  {whatThisMeansPoints.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.55 + i * 0.08,
                        ease: cinematicEase,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-400/15 text-green-300 ring-1 ring-green-400/25">
                        <FiCheck className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-sm leading-7 text-white/65 transition-colors duration-300 group-hover:text-white/85">
                        {point}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  {...revealUp}
                  transition={{ duration: 0.6, delay: 0.85 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/12 bg-linear-to-br from-white/10 to-white/4 px-5 py-5 backdrop-blur"
                >
                  <motion.span
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-400"
                  />
                  <p className="text-sm leading-7 text-white/70">
                    We aim to bring{" "}
                    <span className="font-medium text-white">
                      steadiness and order
                    </span>{" "}
                    to environments that are often fast moving and complex.
                  </p>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <ScrollReveal delay={120}>
          <div className="relative rounded-[28px] bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl overflow-hidden md:p-8">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10">
              <SectionBadge>What We&lsquo;re Known For</SectionBadge>

              <div
                ref={uspsSectionRef}
                className="relative mt-8"
                style={{
                  height: `${Math.min(meaningPoints.length * 35, 100)}vh`,
                }}
              >
                <StickyCards iclinrtUsps={meaningPoints} />
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
                  <SectionBadge>Our Leadership</SectionBadge>
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
                  <SectionBadge> Principles We Lead By</SectionBadge>
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
        <div className="relative overflow-hidden rounded-3xl bg-[#080c14] shadow-2xl">
          {/* CINEMATIC BACKGROUND */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_0%,rgba(80,100,160,0.15),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_90%_90%,rgba(200,80,40,0.08),transparent)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

          {/* FLOATING ORBS */}
          <motion.div
            className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/8 blur-[100px]"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-orange-500/6 blur-[100px]"
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
            {/* SECTION EYEBROW */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 flex items-center gap-3"
            ></motion.div>

            <div className="flex flex-col lg:flex-row gap-px">
              {/* MISSION */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative flex-1 lg:flex-[1.4] rounded-2xl border border-white/8 bg-white/4 p-8 md:p-10 backdrop-blur transition-all duration-500 hover:border-white/16 hover:bg-white/6 hover:shadow-[0_0_60px_rgba(255,255,255,0.04)] cursor-default"
              >
                {/* CARD GLOW ON HOVER */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.04),transparent_60%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-blue-400/60 to-transparent" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-blue-400/70">
                    Mission
                  </span>
                </div>

                {/* HEADLINE */}
                <div className="overflow-hidden mb-6">
                  {[
                    "Supporting clinical",
                    "research teams with",
                    "practical ways of working",
                  ].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40, skewY: 2 }}
                      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.65,
                        delay: 0.1 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="block text-2xl font-semibold leading-snug text-white">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="text-sm leading-7 text-white/45 mb-6 border-l border-white/10 pl-4"
                >
                  We focus on improving coordination, strengthening visibility,
                  and supporting consistent execution across studies —
                  reflecting real world needs.
                </motion.p>

                {/* POINTS */}
                <div className="space-y-2 mt-auto">
                  {missionPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: 0.5 + idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-start gap-3 group/item"
                    >
                      <span className="mt-2.5 h-1 w-1 rounded-full bg-white/30 shrink-0 group-hover/item:bg-white/60 transition-colors" />
                      <span className="text-sm italic leading-7 text-white/40 group-hover/item:text-white/60 transition-colors">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* VERTICAL DIVIDER */}
              <div className="hidden lg:block w-px bg-white/6 mx-1" />

              {/* VISION */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative flex-1 lg:flex-[1.2] rounded-2xl border border-white/8 bg-white/4 p-8 md:p-10 backdrop-blur transition-all duration-500 hover:border-white/16 hover:bg-white/6 hover:shadow-[0_0_60px_rgba(255,255,255,0.04)] cursor-default"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.04),transparent_60%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-orange-400/60 to-transparent" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-orange-400/70">
                    Vision
                  </span>
                </div>

                {/* HEADLINE */}
                <div className="overflow-hidden mb-6">
                  {["Clinical research,", "easier to run", "and manage"].map(
                    (line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, skewY: 2 }}
                        whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.65,
                          delay: 0.2 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="block text-2xl font-semibold leading-snug text-white">
                          {line}
                        </span>
                      </motion.div>
                    ),
                  )}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="text-sm leading-7 text-white/45 border-l border-white/10 pl-4"
                >
                  Clear information, connected ways of working, and dependable
                  support so studies move forward with fewer disruptions —
                  helping research teams{" "}
                  <span className="text-white/75 font-medium">
                    focus on progress instead of process.
                  </span>
                </motion.p>

                {/* DECORATIVE STAT */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-8 pt-6 border-t border-white/6 flex items-center gap-6"
                >
                  <div>
                    <p className="text-2xl font-semibold text-white">100%</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-0.5">
                      Research-focused
                    </p>
                  </div>
                  <div className="h-8 w-px bg-white/8" />
                  <div>
                    <p className="text-2xl font-semibold text-white">Global</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-0.5">
                      Ready
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* VERTICAL DIVIDER */}
              <div className="hidden lg:block w-px bg-white/6 mx-1" />

              {/* HOW WE WORK */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative flex-1 rounded-2xl border border-white/8 bg-white/4 p-8 md:p-10 backdrop-blur transition-all duration-500 hover:border-white/16 hover:bg-white/6 hover:shadow-[0_0_60px_rgba(255,255,255,0.04)] cursor-default"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.04),transparent_60%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-green-400/60 to-transparent" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-green-400/70">
                    How We Work
                  </span>
                </div>

                {/* HEADLINE */}
                <div className="overflow-hidden mb-8">
                  {["Structured,", "dependable,", "and consistent"].map(
                    (line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, skewY: 2 }}
                        whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.65,
                          delay: 0.3 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="block text-2xl font-semibold leading-snug text-white">
                          {line}
                        </span>
                      </motion.div>
                    ),
                  )}
                </div>

                {/* POINTS */}
                <div className="space-y-2">
                  {howWeWorkPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: 0.55 + idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ x: 4 }}
                      className="group/item flex items-start gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3 transition-all duration-300 hover:border-white/12 hover:bg-white/6"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15 ring-1 ring-green-500/20">
                        <FiCheck className="h-3 w-3 text-green-400" />
                      </span>
                      <span className="text-sm leading-6 text-white/50 group-hover/item:text-white/70 transition-colors">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* LIVE INDICATOR */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 flex items-center gap-2"
                >
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-green-400"
                  />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-green-400/60">
                    Active approach
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      {/* ================= CULTURE ================= */}
      {/* Replace your existing SectionWrapper content with this */}
      <SectionWrapper id="culture" fullBleed className="scroll-mt-24">
        <div className="bg-linear-to-r from-black to-(--color-primary) text-white rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-150">
            {/* LEFT — sticky graphic panel */}
            <div className="sticky top-24 h-125 lg:h-auto flex flex-col items-center justify-center p-12 border-r border-white/8">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10 flex items-center gap-3 self-start"
              >
                <SectionBadge>Our Culture</SectionBadge>
              </motion.div>

              {/* Dynamic SVG graphic */}
              <div className="w-64 h-64 lg:w-80 lg:h-80">
                <CultureGraphic index={activeCultureCard} />
              </div>

              {/* Dot nav */}
              <div className="mt-10 flex items-center gap-2">
                {culture.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCultureCard(i)}
                    className={`transition-all duration-300 rounded-full ${
                      activeCultureCard === i
                        ? "w-6 h-1.5 bg-white"
                        : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — stacked scroll cards */}
            <div className="py-12 px-8 lg:px-12 space-y-4">
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <p className="type-h2 font-semibold leading-tight">
                  Principles that shape how we work
                </p>
              </motion.div>

              {/* Cards */}
              {culture.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  onViewportEnter={() => setActiveCultureCard(i)}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ x: 6 }}
                  onClick={() => setActiveCultureCard(i)}
                  className={`group cursor-pointer rounded-2xl border p-6 transition-all duration-500 ${
                    activeCultureCard === i
                      ? "border-white/30 bg-white/12 shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                      : "border-white/8 bg-white/4 hover:border-white/15 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <span
                      className={`text-[10px] font-medium uppercase tracking-[0.3em] mt-1 transition-colors duration-300 ${
                        activeCultureCard === i
                          ? "text-white/60"
                          : "text-white/25"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold type-h4">{c.title}</p>
                        {/* Active indicator */}
                        <motion.div
                          animate={{ scale: activeCultureCard === i ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-1.5 w-1.5 rounded-full bg-white/60"
                        />
                      </div>
                      <motion.p
                        animate={{
                          height: activeCultureCard === i ? "auto" : 0,
                          opacity: activeCultureCard === i ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden type-h6 text-white/60 leading-relaxed"
                      >
                        <span className="block mt-2">{c.text}</span>
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bottom CTA card */}
              <ScrollReveal delay={180}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="mt-6 grid gap-6 rounded-[30px] border border-white/12 bg-white/6 p-6 backdrop-blur md:grid-cols-[1.1fr_auto] md:items-center"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
                      Shared Moments
                    </p>
                    <p className="mt-3 max-w-2xl text-2xl font-semibold leading-tight text-white">
                      Our culture comes alive through shared moments.
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                      Explore the events, celebrations, and team experiences
                      that shape how we work together across ClinRT.
                    </p>
                  </div>
                  <div className="md:justify-self-end">
                    <Button
                      href="/clinrt-world?tab=Moments#content-hub"
                      label="Explore Our Moments"
                    />
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </SectionWrapper>
      {/* ================= TEAM ================= */}
      <SectionWrapper id="team">
        {/* Heading First */}
        <div className="text-center mb-6">
          <SectionBadge>Our Team</SectionBadge>
          <h2 className="type-h2 mt-4">
            Meet the Experts Behind the Innovation
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A diverse group of professionals united by a common mission
          </p>
        </div>

        {/* Collage of Images - Full Width with Container */}
        <div className="container -mb-40">
          <div className="relative min-h-screen w-full overflow-hidden team-collage">
            {/* Collage Grid */}
            <div className="grid h-full w-full grid-cols-1 gap-2 sm:p-2 md:grid-cols-6 md:grid-rows-4 md:gap-3">
              {/* Large tile */}
              <div className="relative col-span-1 md:col-span-4 md:row-span-4 group team-float">
                <div className="relative h-full w-full rounded-2xl overflow-hidden transition-all duration-500 ease-out ring-1 ring-white/20 shadow-lg group-hover:scale-[1.02] group-hover:z-10 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-white/70">
                  <Image
                    src="/images/one-team.png"
                    fill
                    alt="team background"
                    className="object-cover team-collage-bg"
                    priority
                  />
                </div>
              </div>

              {[
                {
                  image: "/images/service1.png",
                },
                {
                  image: "/images/service2.png",
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="relative col-span-1 md:col-span-2 md:row-span-2  min-h-75 group team-float"
                >
                  <div className="relative h-full w-full rounded-xl overflow-hidden transition-all duration-500 ease-out ring-1 ring-white/20 shadow-lg group-hover:scale-105 group-hover:z-10 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-white/70">
                    <Image
                      src={member.image}
                      fill
                      alt={member.image}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text Content Below */}
        <div className=" -mt-72 ">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our team brings together product thinkers, clinical specialists,
              engineers, and operators who care deeply about improving how
              trials run. We work closely across disciplines, combining
              practical experience with thoughtful design to build technology
              that stands up in real world research. Every person here
              contributes to making clinical operations clearer, smoother, and
              more reliable—one workflow at a time.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12">
              {teamStats.map((s) => (
                <div
                  key={s.label}
                  className="relative p-6 text-center hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Rhombus background */}
                  <div className="absolute inset-0 bg-(--color-primary) border border-indigo-200 skew-x-6 skew-y-2 rounded-sm group-hover:shadow-xl group-hover:from-indigo-100 group-hover:to-blue-200 transition-all duration-300" />

                  {/* Content (counter-skewed to stay straight) */}
                  <div className="relative z-10 -skew-x-6 -skew-y-2">
                    <CountUpOnView
                      className="text-3xl md:text-4xl font-bold text-white"
                      to={s.value}
                      suffix={s.suffix}
                    />
                    <p className="text-sm text-white mt-2">{s.label}</p>
                  </div>
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
              href="/clinrt-world?tab=Moments#content-hub"
              label="Explore now"
            />
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
