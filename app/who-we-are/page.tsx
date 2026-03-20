"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUpOnView from "@/components/CountUpOnView";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/GlassCard";
import { FiCheck } from "react-icons/fi";

const meaningPoints = [
  "Deep understanding of clinical trial operations",
  "Calm execution in complex, regulated environments",
  "Clear ownership and reliable delivery",
  "Long term partnerships built on trust",
] as const;

const leadership = [
  {
    name: "Dr. Maya Srinivasan",
    role: "Chief Executive Officer",
    image: "/images/author-1.jpg",
  },
  {
    name: "Rahul Deshmukh",
    role: "Chief Product Officer",
    image: "/images/author-2.jpg",
  },
  {
    name: "Emily Carter",
    role: "Head of Clinical Solutions",
    image: "/images/author-3.jpg",
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

/* ---------------- Page ---------------- */

export default function WhoWeArePage() {
  return (
    <PageTransition>
      {/* ================= HERO ================= */}
      <section className="relative h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover scale-105"
          src="/videos/homePageVideo.mp4"
          autoPlay
          muted
          loop
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
              Experienced people. Thoughtful work. Trusted outcomes.
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
        <div className="relative overflow-hidden rounded-[32px] border border-black/8 bg-linear-to-br from-slate-50 via-white to-orange-50/60 p-6 shadow-[0_24px_80px_rgba(15,36,58,0.08)] md:p-10">
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

          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <ScrollReveal>
              <div className="max-w-xl">
                <Badge>What this means for you</Badge>
                <p className="mt-5 text-3xl font-semibold leading-tight text-black md:text-4xl">
                  Experience that brings clarity and steadiness to complex
                  clinical programs.
                </p>
                <p className="mt-5 text-base leading-8 text-black/65">
                  Our experience and ways of working help research teams move
                  with more confidence across stakeholders, timelines, and
                  regulated workflows.
                </p>
                <p className="mt-4 text-base leading-8 text-black/60">
                  We aim to bring order to environments that are often fast
                  moving and complex, so teams can stay focused on reliable
                  execution and better outcomes.
                </p>

                <div className="mt-8 inline-flex max-w-md items-start gap-3 rounded-2xl border border-black/8 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500" />
                  <p className="text-sm leading-7 text-black/65">
                    We are known for combining operational depth with calm,
                    dependable delivery across real world clinical complexity.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,36,58,0.18)] md:p-8">
                <p className="type-h6 font-semibold uppercase tracking-[0.35em] text-white/55">
                  What We&apos;re Known For
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {meaningPoints.map((point, i) => (
                    <motion.div
                      key={point}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-2xl border border-white/10 bg-white/6 p-5"
                    >
                      <div className="flex items-end gap-4">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-white/80">
                          0{i + 1}
                        </span>
                        <p className="type-h6 leading-7 text-white/78">
                          {point}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      {/* ================= LEADERSHIP ================= */}
      <SectionWrapper id="leadership" fullBleed className="scroll-mt-24">
        <div className="bg-white rounded-3xl p-10">
          <ScrollReveal>
            <Badge>Our Leadership</Badge>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <ScrollReveal delay={80}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                  Leadership In Focus
                </p>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-black/75">
                  Our leadership team brings decades of experience across
                  clinical operations, data management, and large research
                  programs. They set clear standards and lead with
                  accountability, ensuring that quality, reliability, and trust
                  remain central to everything we do.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-black/60">
                  Their priority is to support teams with clarity and direction,
                  making thoughtful decisions that hold up across programs,
                  regions, and real world conditions.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div className="rounded-3xl border border-orange-700 bg-linear-to-br from-orange-50 via-white to-slate-50 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/45">
                  What sets them apart
                </p>
                <p className="mt-3 text-2xl font-semibold leading-tight text-black">
                  Clear standards, calm direction, and decisions teams can rely
                  on.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {leadership.map((m, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <GlassCard image={m.image} height="h-72">
                  <p className="text-white font-semibold">{m.name}</p>
                  <p className="text-white/70 text-sm">{m.role}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-orange-700 bg-linear-to-br from-orange-50 via-white to-slate-50 p-px shadow-lg">
            <div className="rounded-[27px] bg-white p-6">
              <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/45">
                    Principles We Lead By
                  </p>
                  <p className="mt-3 text-sm leading-7 text-black/60">
                    The standards behind our leadership approach across people,
                    programs, and delivery.
                  </p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {leadershipPrinciples.map((principle) => (
                    <li
                      key={principle.title}
                      className="rounded-2xl border border-black/8 bg-gray-50 px-4 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 rounded-full bg-green-500/10 p-2 text-green-600">
                          <FiCheck />
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
                    </li>
                  ))}
                </ul>
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
              A collective of engineers, clinicians, and operators working
              together to improve clinical outcomes through technology.
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
        <div className="bg-primary text-white rounded-3xl p-12 flex justify-between items-center">
          <div>
            <p className="type-h2 text-black font-semibold">
              Want to work with us?
            </p>
            <p className="text-black/80 mt-2">
              Join us in building impactful clinical technology.
            </p>
          </div>

          <Button href="/contact" label="Careers Enquiry" />
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
