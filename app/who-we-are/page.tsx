"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUpOnView from "@/components/CountUpOnView";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/GlassCard";
import { FiCheck } from "react-icons/fi";

const overviewText =
  "We build the digital foundations that help modern clinical research operate with structure, clarity, and pace. Through thoughtful design and disciplined engineering, we unify critical workflows, elevate data quality, and enable confident decision making across studies of every scale.";

const meaningPoints = [
  "Seamless orchestration across stakeholders and sites",
  "Clear, timely insight to guide operational decisions",
  "Consistent, audit-ready execution throughout the clinical journey",
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
  "Reliability first: stability, security, and continuity as non-negotiables",
  "Clarity over complexity: purposeful design that removes friction",
  "Delivery with discipline: on time, compliant, and field-tested",
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
  { value: 40, suffix: "+", label: "Years of Experience" },
  { value: 1000, suffix: "+", label: "Trials Supported" },
  { value: 500, suffix: "+", label: "Clients Served" },
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
              Engineering the Digital Backbone of Clinical Research
            </p>

            <p className="mt-6 text-white/80 max-w-2xl">{overviewText}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= WHAT IT MEANS ================= */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-10">
          <ScrollReveal>
            <Badge>What this means for you </Badge>
            <p className="mt-4 text-muted-foreground">
              Real-world impact that simplifies operations and improves clarity.
            </p>
          </ScrollReveal>

          <div className="grid gap-4">
            {meaningPoints.map((point, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-white border shadow-sm flex gap-3"
                >
                  <FiCheck className="text-green-500 mt-1" />
                  <p>{point}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ================= LEADERSHIP ================= */}
      <SectionWrapper fullBleed>
        <div className="bg-white rounded-3xl p-10">
          <ScrollReveal>
            <Badge>Our Leadership</Badge>
          </ScrollReveal>

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

          <div className="mt-10 bg-gray-50 p-6 rounded-xl">
            <p className="text-sm font-semibold uppercase">
              Principles we lead by
            </p>
            <ul className="mt-4 space-y-2">
              {leadershipPrinciples.map((p) => (
                <li key={p} className="flex gap-2">
                  <FiCheck /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* ================= CULTURE ================= */}
      <SectionWrapper fullBleed>
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
        </div>
      </SectionWrapper>

      {/* ================= TEAM ================= */}
      <SectionWrapper>
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
