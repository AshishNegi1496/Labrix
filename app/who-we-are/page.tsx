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
    <div className="relative w-full py-8 md:py-12">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 h-72 w-72 rounded-full bg-linear-to-r from-sky-200/60 to-cyan-100/45 blur-[90px] animate-pulse md:h-125 md:w-125 md:blur-[110px]" />
        <div className="absolute bottom-1/4 -right-1/4 h-72 w-72 rounded-full bg-linear-to-r from-orange-200/45 to-amber-100/40 blur-[90px] animate-pulse animation-delay-1000 md:h-125 md:w-125 md:blur-[110px]" />
      </div>

      {/* Cards Grid */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-5 px-0 sm:px-4 md:grid-cols-2 md:gap-8">
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
                <div className="relative h-full rounded-3xl bg-blue-800/40 p-6 backdrop-blur-xl sm:p-7 md:p-10">
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
                      className="mb-4 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl"
                    >
                      {point.title}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      className="mb-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg"
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
                className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 md:-right-6 md:-top-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-white to-slate-200 shadow-lg sm:h-12 sm:w-12 md:h-14 md:w-14">
                  <span className="text-xs font-bold text-slate-900 sm:text-sm md:text-base">
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
  const overviewStats = [{ value: "40+", label: "Years in clinical ops" }];

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
          src="/images/about-baner.avif"
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
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-(--color-primary) p-8 shadow-[0_28px_90px_rgba(2,6,23,0.55)] md:p-14">
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
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-orange-300/95">
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
                className="space-y-7 rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl md:p-8"
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
                      <span className="block type-h2 font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
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
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-400/70 text-white ring-1 ring-orange-400/25">
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
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-400"
                  />
                  <p className="text-sm leading-7 text-white/70">
                    We aim to bring{" "}
                    <span className="font-medium text-white italic">
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
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#85a6d2_0%,#eef5ff_48%,#eccb88_100%)] shadow-[0_30px_100px_rgba(148,163,184,0.18)]">
          {/* CINEMATIC BACKGROUND */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_18%_0%,rgba(125,168,255,0.3),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_46%_46%_at_100%_88%,rgba(251,146,60,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_42%_34%_at_52%_18%,rgba(255,255,255,0.82),transparent_72%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage: `linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)`,
              backgroundSize: "72px 72px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-sky-300/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-orange-200/80 to-transparent" />

          {/* FLOATING ORBS */}
          <motion.div
            className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-sky-300/45 blur-[110px]"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-20 bottom-6 h-80 w-80 rounded-full bg-orange-200/55 blur-[120px]"
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

            <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
              {/* MISSION */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative flex-1 lg:flex-[1.4] rounded-2xl border border-white/70 bg-white/58 p-8 md:p-10 backdrop-blur-2xl shadow-[0_18px_50px_rgba(148,163,184,0.14)] transition-all duration-500 hover:border-white hover:bg-white/72 hover:shadow-[0_28px_80px_rgba(148,163,184,0.2)] cursor-default"
              >
                {/* CARD GLOW ON HOVER */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.82),transparent_62%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-sky-500/75 to-transparent" />
                  <span className="type-h6 font-medium uppercase tracking-[0.4em] text-sky-700">
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
                      <span className="block text-2xl font-semibold leading-snug text-slate-950">
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
                  className="mb-6 border-l border-slate-200/90 pl-4 text-sm leading-7 text-slate-600"
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
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 group-hover/item:bg-sky-400/80 transition-colors" />
                      <span className="text-sm italic leading-7 text-slate-500 group-hover/item:text-slate-700 transition-colors">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* VERTICAL DIVIDER */}
              <div className="hidden lg:block w-px bg-slate-200/80 mx-1" />

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
                className="group relative flex-1 lg:flex-[1.2] rounded-2xl border border-white/70 bg-white/58 p-8 md:p-10 backdrop-blur-2xl shadow-[0_18px_50px_rgba(148,163,184,0.14)] transition-all duration-500 hover:border-white hover:bg-white/72 hover:shadow-[0_28px_80px_rgba(148,163,184,0.2)] cursor-default"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.82),transparent_62%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-orange-500/75 to-transparent" />
                  <span className="type-h6 font-medium uppercase tracking-[0.4em] text-orange-600">
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
                        <span className="block text-2xl font-semibold leading-snug text-slate-950">
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
                  className="border-l border-slate-200/90 pl-4 text-sm leading-7 text-slate-600"
                >
                  Clear information, connected ways of working, and dependable
                  support so studies move forward with fewer disruptions —
                  helping research teams{" "}
                  <span className="font-medium text-slate-900">
                    focus on progress instead of process.
                  </span>
                </motion.p>

                {/* DECORATIVE STAT */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-8 flex items-center gap-6 border-t border-slate-200/90 pt-6"
                >
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">
                      100%
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                      Research-focused
                    </p>
                  </div>
                  <div className="h-8 w-px bg-slate-200/90" />
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">
                      Global
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                      Ready
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* VERTICAL DIVIDER */}
              <div className="hidden lg:block w-px bg-slate-200/80 mx-1" />

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
                className="group relative flex-1 rounded-2xl border border-white/70 bg-white/58 p-8 md:p-10 backdrop-blur-2xl shadow-[0_18px_50px_rgba(148,163,184,0.14)] transition-all duration-500 hover:border-white hover:bg-white/72 hover:shadow-[0_28px_80px_rgba(148,163,184,0.2)] cursor-default"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.82),transparent_62%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-emerald-500/75 to-transparent" />
                  <span className="type-h6 font-medium uppercase tracking-[0.4em] text-emerald-600">
                    How We Work
                  </span>
                </div>

                {/* HEADLINE */}
                <div className="overflow-hidden mb-8">
                  {["Structured", "approach", "and consistent"].map(
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
                        <span className="block text-2xl font-semibold leading-snug text-slate-950">
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
                      className="group/item flex items-start gap-3 rounded-xl border border-white/75 bg-white/62 px-4 py-3 transition-all duration-300 hover:border-emerald-200/90 hover:bg-white/85"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/12 ring-1 ring-emerald-500/20">
                        <FiCheck className="h-3 w-3 text-emerald-600" />
                      </span>
                      <span className="text-sm leading-6 text-slate-600 group-hover/item:text-slate-900 transition-colors">
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
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-700/80">
                    Active approach
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <ScrollReveal delay={120}>
          <div className="relative overflow-hidden rounded-3xl bg-[#f4f8fc] p-4 text-slate-950 shadow-[0_28px_80px_rgba(148,163,184,0.16)] sm:p-5 md:rounded-[28px] md:p-8">
            {/* Animated background */}
            <motion.div
              className="pointer-events-none absolute inset-[-10%] opacity-85 sm:inset-[-8%]"
              animate={{
                x: ["0%", "2%", "-1%", "0%"],
                y: ["0%", "3%", "-2%", "0%"],
                scale: [1, 1.04, 0.99, 1],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(96,165,250,0.14),transparent_48%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_78%,rgba(251,146,60,0.12),transparent_44%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_36%,rgba(255,255,255,0.5),transparent_34%)]" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-y-[-4%] right-[-14%] w-[96%] bg-(--primary-color) sm:right-[-10%] sm:w-[84%] md:right-[-6%] md:w-[72%]"
              style={{
                clipPath: "polygon(45% 0%, 100% 0%, 100% 100%, 35% 100%)",
              }}
              animate={{
                x: ["0%", "2%", "0%"],
                scale: [1, 1.015, 1],
                opacity: [0.92, 0.98, 0.92],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="pointer-events-none absolute -left-[18%] top-[-30%] hidden h-[170%] w-[44%] rotate-[14deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] blur-3xl sm:block"
              animate={{
                x: ["0%", "135%", "0%"],
                opacity: [0, 0.38, 0],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="pointer-events-none absolute right-[8%] top-[12%] h-36 w-36 rounded-full border border-white/14 sm:h-48 sm:w-48 md:right-[10%] md:top-[14%] md:h-64 md:w-64"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.2, 0.42, 0.2],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="pointer-events-none absolute right-[11%] top-[15%] h-24 w-24 rounded-full border border-white/10 sm:h-36 sm:w-36 md:right-[13%] md:top-[17%] md:h-48 md:w-48"
              animate={{
                scale: [1, 1.14, 1],
                opacity: [0.12, 0.28, 0.12],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            {/* Grid pattern */}
            <motion.div
              className="pointer-events-none absolute inset-[-3%] bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:18px_18px] sm:bg-[size:20px_20px] md:bg-[size:24px_24px]"
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-[14%] h-px bg-linear-to-r from-transparent via-white/45 to-transparent md:top-[18%]"
              animate={{
                opacity: [0.2, 0.55, 0.2],
                scaleX: [0.92, 1, 0.92],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-sky-200/80 to-transparent sm:inset-x-6 md:inset-x-8" />
            <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-linear-to-r from-transparent via-orange-200/70 to-transparent sm:inset-x-6 md:inset-x-8" />

            <div className="relative z-10">
              <SectionBadge
                className="bg-white/70 text-slate-900 shadow-[0_10px_30px_rgba(148,163,184,0.12)] backdrop-blur-sm"
                borderClassName="border border-orange-300/80"
              >
                What We&lsquo;re Known For
              </SectionBadge>

              <div
                ref={uspsSectionRef}
                className="relative mt-6 md:mt-8"
                style={{
                  minHeight: `${Math.min(meaningPoints.length * 45, 100)}vh`,
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

      {/* ================= CULTURE ================= */}
      {/* Replace your existing SectionWrapper content with this */}
      <SectionWrapper id="culture" fullBleed className="scroll-mt-24">
        <div className="bg-linear-to-r from-black to-blue-200 text-white rounded-3xl overflow-hidden">
          <div className="px-8 pt-8 md:px-8 md:pt-8">
            <SectionBadge>Our Culture</SectionBadge>
          </div>
          <div className="grid lg:grid-cols-2 min-h-150">
            {/* LEFT — sticky graphic panel */}
            <div className="sticky top-24 h-125 lg:h-auto flex flex-col items-center justify-center p-2 border-r border-white/8">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 self-start"
              ></motion.div>

              {/* Dynamic SVG graphic */}
              <div className="w-full h-full lg:w-full lg:h-full">
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
                          ? "text-white/80"
                          : "text-white/50"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold type-h4 ">{c.title}</p>
                        {/* Active indicator */}
                        <motion.div
                          animate={{ scale: activeCultureCard === i ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-1.5 w-1.5 rounded-full bg-orange-500 "
                        />
                      </div>
                      <motion.p
                        animate={{
                          height: activeCultureCard === i ? "auto" : 0,
                          opacity: activeCultureCard === i ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden type-h6 text-white leading-relaxed "
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
            {/* <p className="text-muted-foreground text-lg leading-relaxed">
              Our team brings together product thinkers, clinical specialists,
              engineers, and operators who care deeply about improving how
              trials run. We work closely across disciplines, combining
              practical experience with thoughtful design to build technology
              that stands up in real world research. Every person here
              contributes to making clinical operations clearer, smoother, and
              more reliable—one workflow at a time.
            </p> */}

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
