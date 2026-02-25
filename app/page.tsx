"use client";

import type { ReactNode } from "react";
import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import CountUpOnView from "@/components/CountUpOnView";
import GlassCard from "@/components/GlassCard";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { TeamCard } from "../components/ui/TeamCard";
import { containerVariants } from "../components/team.motion";
import { FaqItem } from "@/components/FaqItem";
import { TestimonialCard } from "@/components/TestimonialCard";
import {
  caseStudies,
  faqs,
  featureCards,
  homeAbout,
  homeCaseStudies,
  homeFaq,
  homeHero,
  homeResearch,
  homeTeam,
  homeTestimonials,
  homeWhyChoose,
  researchFields,
  teamMembers,
  testimonials,
  whatWeDoData,
} from "@/data";
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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={homeHero.videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:py-24 md:py-28 text-white md:grid-cols-2">
          <div>
            <p className="flex items-center gap-3 text-sm text-white/80">
              <Ping /> {homeHero.eyebrow}
            </p>
            <p className="mt-4 max-w-xl text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight text-background">
              {homeHero.title}
            </p>
            <p className="mt-6 max-w-lg text-white/80">
              {homeHero.description}
            </p>
            <div className="mt-8 flex gap-4">
              <Button
                href={homeHero.primaryCta.href}
                label={homeHero.primaryCta.label}
              />
              <Button
                href={homeHero.secondaryCta.href}
                label={homeHero.secondaryCta.label}
              />
            </div>
            <div className="mt-8 flex gap-3 text-white">
              <CountUpOnView
                to={homeHero.stats[0].value}
                suffix={homeHero.stats[0].suffix}
                className="type-h2 font-semibold text-white"
              />{" "}
              {homeHero.stats[0].label} {homeHero.statsSeparator}
              <CountUpOnView
                to={homeHero.stats[1].value}
                suffix={homeHero.stats[1].suffix}
                className="type-h2 font-semibold text-white"
              />{" "}
              {homeHero.stats[1].label}
            </div>
          </div>
          <a
            href={homeHero.videoUrl}
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

      {/* About Section */}
      <SectionWrapper fullBleed>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Badge>{homeAbout.badge}</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              {homeAbout.title}
            </h2>
            <p className="mt-4 text-(--muted-color)">{homeAbout.description}</p>
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

      {/* Research Fields */}
      <SectionWrapper fullBleed>
        <section className="bg-(--color-accent) rounded-2xl py-24 px-6">
          <div className="mx-auto max-w-[92%]">
            <div className="mb-16 grid gap-8 md:grid-cols-2">
              <div>
                <Badge>{homeResearch.badge}</Badge>
                <h2 className="mt-4 text-3xl md:text-5xl font-semibold">
                  {homeResearch.title} <br /> {homeResearch.titleEmphasis}
                </h2>
              </div>
              <p className="text-(--text-muted)">{homeResearch.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {researchFields.map((f) => (
                <GlassCard key={f.title} {...f} tag="Research" />
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
          <Image
            src={homeWhyChoose.image}
            alt=""
            width={600}
            height={700}
            className="rounded-3xl object-cover"
          />
          <div>
            <Badge>{homeWhyChoose.badge}</Badge>
            <p className="mt-4 type-h2 md:text-5xl font-semibold">
              {homeWhyChoose.title}
            </p>
            <p className="mt-4 text-(--muted-color)">
              {homeWhyChoose.description}
            </p>
            <div className="mt-6 grid gap-5">
              {homeWhyChoose.items.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div>
                    <p className="type-h5 font-semibold">{item.title}</p>
                    <p className="text-sm text-(--muted-color)">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* What We Do */}
      <SectionWrapper fullBleed>
        <section className="bg-(--color-secondary) text-background rounded-2xl py-24">
          <div className="container mx-auto grid gap-24 lg:grid-cols-2 items-center px-4">
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
            <div className="grid gap-6">
              {whatWeDoData.items.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="group flex gap-4 rounded-2xl bg-white/5 p-5 transition hover:bg-white/10 text-(--text-invert)"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-accent)/10 transition group-hover:scale-110">
                    <Icon size={28} />
                  </div>
                  <div>
                    <p className="type-h5 font-semibold">{title}</p>
                    <p className="mt-1 text-sm">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Case Studies */}
      <SectionWrapper>
        <div className="mb-16 flex flex-wrap justify-between items-center gap-8">
          <div>
            <Badge>{homeCaseStudies.badge}</Badge>
            <p className="mt-4 type-h2 md:text-5xl font-semibold">
              {homeCaseStudies.title}
            </p>
          </div>
          <Button
            href={homeCaseStudies.cta.href}
            label={homeCaseStudies.cta.label}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <GlassCard key={study.title} {...study} />
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper fullBleed>
        <div className="mx-auto max-w-7xl px-6 py-24 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Badge>{homeFaq.badge}</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              {homeFaq.title}
            </h2>
            <p className="mt-4 text-(--text-description)">
              {homeFaq.description}
            </p>
            <Button
              href={homeFaq.cta.href}
              label={homeFaq.cta.label}
              className="mt-8"
            />
          </div>
          <div className="space-y-4 bg-(--color-accent) p-8 md:p-16 rounded-3xl">
            {faqs.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper fullBleed>
        <section className="py-28 text-(--text-invert) bg-(--color-secondary) rounded-3xl text-center">
          <Badge>{homeTestimonials.badge}</Badge>
          <p className="mt-4 text-3xl md:text-5xl font-semibold mb-16">
            {homeTestimonials.title}
          </p>
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* Team Section */}
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge>{homeTeam.badge}</Badge>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-3xl md:text-4xl font-bold"
          >
            {homeTeam.title}
          </motion.h2>
        </div>
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
      </SectionWrapper>
    </PageTransition>
  );
}
