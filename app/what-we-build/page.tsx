"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/GlassCard";
import CountUpOnView from "@/components/CountUpOnView";

const supportAreas = [
  "Coordinated participant and treatment workflows",
  "Reliable Investigational Product Management",
  "Structured Clinical Data Capture",
  "Digital patient and clinician assessment tools",
  "Streamlined operational oversight across sites and teams",
] as const;

const solutionCards = [
  {
    title: "iClinRT",
    text: "Interactive Response Technology for trial operations, allocation logic, and supply coordination.",
    href: "/iclinrt",
    status: "Live Platform",
    image: "/images/why-choose-image.jpg",
  },
  {
    title: "EDC",
    text: "Electronic data capture designed for cleaner inputs, faster review cycles, and better monitoring confidence.",
    href: "/coming-soon",
    status: "Beta Testing",
    image: "/images/case-study-1.jpg",
  },
  {
    title: "CTMS",
    text: "Clinical trial management workflows for timelines, budgets, and cross-functional coordination.",
    href: "/coming-soon",
    status: "In Development",
    image: "/images/case-study-2.jpg",
  },
  {
    title: "eCOA",
    text: "Digital patient outcomes capture with dependable compliance and patient-friendly interaction models.",
    href: "/coming-soon",
    status: "Under Architecture",
    image: "/images/case-study-3.jpg",
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

export default function WhatWeBuildPage() {
  return (
    <PageTransition>
      <section className="relative min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/homePageVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/45 to-black/70" />
        <div className="relative z-10 section-shell flex min-h-screen flex-col justify-center gap-10 px-6 py-20 md:px-10">
          <ScrollReveal className="max-w-3xl text-white">
            {/* <Badge>Our Solutions</Badge> */}
            <p className="mt-10 type-h1 font-semibold text-white">
              Precision That Powers Every Trial
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/contact" label="Request a Demo" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140} className="flex flex-wrap gap-4 text-white">
            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
              <CountUpOnView
                to={15}
                suffix="+"
                className="text-4xl font-semibold"
              />
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/70">
                Years of Consolidated Experience
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
              <CountUpOnView
                to={1000}
                suffix="+"
                className="text-4xl font-semibold"
              />
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/70">
                Clinical Trials Supported
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
              <CountUpOnView
                to={5000}
                suffix="+"
                className="text-4xl font-semibold"
              />
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/70">
                Clients Trust Worldwide
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper fullBleed>
        <div className="grid gap-20 ">
          <div className="rounded-3xl border border-slate-200 bg-background p-6">
            <ScrollReveal delay={120}>
              <Badge>Our Solutions</Badge>

              <p className="mt-3 type-h6 text-(--muted-color)">
                ClinRT delivers a growing suite of purpose-built solutions
                designed to strengthen the operational, logistical, and
                data-driven foundations of clinical research. Our products
                support core study functions — from randomization and treatment
                workflows to data capture, outcome reporting, and site
                operations — ensuring structure, precision, and clarity across
                every stage of the trial lifecycle.
              </p>
            </ScrollReveal>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {solutionCards.map((card, index) => (
                <ScrollReveal key={card.title} delay={index * 90}>
                  <Link href={card.href} className="block">
                    <GlassCard
                      image={card.image}
                      height="h-72 lg:h-80"
                      contentPadding="p-6"
                      overlayOpacity="bg-black/55"
                      hoverEffect="both"
                      borderColor="border-white/20"
                    >
                      <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/70">
                          <span>{card.status}</span>
                          <span className="rounded-full bg-white/25 px-2 py-1 text-[10px]">
                            Explore
                          </span>
                        </div>
                        <p className="mt-4 type-h2 font-semibold text-white">
                          {card.title}
                        </p>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-center gap-3 bg-black/90 px-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                          {card.status}
                        </span>
                        <p className="type-h2 font-semibold">{card.title}</p>
                        <p className="type-h6 text-white/80">{card.text}</p>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                          Explore
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <ScrollReveal>
          <Badge>How We Support</Badge>
          <p className="mt-3 type-h2 font-semibold">
            How we support modern clinical trials
          </p>
          <p className="mt-4 text-(--muted-color)">
            Our technology is built to address the most critical needs of
            today&apos;s studies.
          </p>
          <div className="mt-6 grid gap-6">
            {supportAreas.map((item, index) => (
              <ScrollReveal key={item} delay={index * 80}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-(--primary-color)/10 via-transparent to-(--color-accent)/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10 flex items-start gap-3 type-h6">
                    <span className="relative mt-1 h-3 w-3">
                      <span className="absolute inset-0 rounded-full bg-(--primary-color) opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-hover:animate-ping" />
                      <span className="absolute inset-0.5 rounded-full bg-(--primary-color)" />
                    </span>
                    <span>{item}</span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-white/25 bg-(--color-primary) px-6 py-14 text-white shadow-2xl md:px-10">
          {/* Background Effects */}
          <div className="pointer-events-none absolute -left-20 top-8 h-56 w-56 rounded-full bg-(--color-accent)/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-(--color-orange)/30 blur-3xl" />

          {/* Content */}
          <ScrollReveal className="relative z-10 flex flex-col items-center text-center gap-6">
            <Badge>Execution Pathways</Badge>

            <p className="type-h2 font-semibold text-white ">
              From early-phase programs to global trials, we support teams in
              building stable, compliant, and efficient execution pathways.
            </p>

            <div className="flex justify-center">
              <Button href="/contact" label="Request a Demo" />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
