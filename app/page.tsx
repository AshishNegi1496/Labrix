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
import SectionBadge from "@/components/ui/SectionBadge";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { FaqModal } from "@/components/FaqModal";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import {
  FaFlask,
  FaCogs,
  FaShieldAlt,
  FaHandshake,
  FaGlobeAmericas,
} from "react-icons/fa";
import {
  homeFaqItems as faqs,
  homeMovingWords,
  homeNewsItems as newsItems,
  homePageTestimonials as testimonials,
  homePosterItems as posterItems,
  homeResearchFields as researchFields,
  homeWhyChoosePoints as whyChoosePoints,
} from "@/data";

const movingTrack = [...homeMovingWords, ...homeMovingWords];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const PREVIEW_COUNT = 5;
  const previewFaqs = faqs.slice(0, PREVIEW_COUNT);

  return (
    <PageTransition>
      <section className="relative overflow-hidden min-h-[90vh] sm:min-h-screen lg:min-h-[110vh] flex items-center">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/home-final.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay */}
        {/* <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/70 to-black/90" /> */}

        <div className="relative z-10 section-shell py-28 md:py-40 text-white">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <ScrollReveal variant="left" className="max-w-3xl mb-1">
              <p className="mt-12 type-h2 md:text-4xl leading-tight font-semibold">
                Powering Smarter Clinical Research
              </p>

              {/* Buttons */}

              {/* Hero Bottom Stats */}
              <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-6 md:gap-10">
                <div className="flex flex-row gap-2">
                  <CountUpOnView
                    to={40}
                    suffix="+"
                    className="text-4xl font-semibold text-white"
                  />
                  <p className="type-h6  text-white/70">
                    Years of
                    <br />
                    Collective Experience
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
                <div className=" flex flex-row gap-2">
                  <CountUpOnView
                    to={500}
                    suffix="+"
                    className="text-4xl font-semibold text-white"
                  />
                  <p className="type-h6 mt-3 text-white/70">Clients</p>
                </div>
              </div>
              <div className="mt-8 ">
                <Button href="/who-we-are" label="Get Started" />
              </div>
            </ScrollReveal>

            {/* RIGHT VIDEO CIRCLE */}
            <div className="hidden lg:flex justify-end">
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
      <SectionWrapper className="py-10">
        <div className="section-shell">
          <div className="grid gap-6 items-start lg:grid-cols-[2fr_1fr] lg:items-stretch">
            <div className="relative min-w-0 rounded-3xl shadow-sm lg:h-full">
              <GlassSlider
                items={posterItems}
                ariaLabel="At a glance posters"
                scrollerClassName="h-full w-full pb-0 pt-0"
                controlsClassName="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 justify-between sm:inset-x-4"
                edgeFadeClassName="from-slate-50/90 via-slate-50/60"
                pageSize={1}
                itemClassName="w-full h-full"
                renderItem={(poster, index) => (
                  <ScrollReveal delay={index * 80}>
                    <Link
                      href={poster.href}
                      className="group relative block w-full h-full overflow-hidden rounded-2xl bg-white transition-all hover:shadow-xl hover:shadow-slate-200/50"
                    >
                      <div className="relative h-full min-h-100 w-full overflow-hidden">
                        <Image
                          src={poster.image}
                          alt={poster.title}
                          fill
                          sizes="100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                        <div className="absolute bottom-0 left-0 w-full p-5">
                          <span className="inline-block rounded-md bg-(--color-orange)/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
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

            <aside className="flex h-full min-h-96 flex-col rounded-3xl border border-slate-200 bg-(--primary-color) p-5 text-black shadow-sm sm:p-6 lg:p-7">
              <SectionBadge>News & Updates</SectionBadge>

              <div className="relative mt-5 min-h-0 flex-1 space-y-3 overflow-y-auto pb-10 pr-2 no-scrollbar sm:mt-6 sm:space-y-4">
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

      {/* key features section */}
      <SectionWrapper fullBleed>
        <div className="mx-auto  px-6 py-20 bg-(--primary-color) rounded-3xl text-(--text-invert)">
          {/* Section Header */}
          <ScrollReveal className="">
            <SectionBadge>Key Features</SectionBadge>
            <div className="mt-2 flex flex-col gap-1 sm:gap-4 lg:gap-8 lg:flex-row lg:items-start lg:justify-between">
              <p className=" type-h3 font-semibold ">
                Leading innovation across critical fields
              </p>

              <p className=" type-h6 mt-4 text-(--text-invert)">
                These features collectively enable streamlined clinical trial
                execution by reducing manual effort, minimizing operational
                risks, and ensuring real‑time control across subjects, supplies,
                and study data. The platform is designed to adapt to complex
                protocol requirements while maintaining strong regulatory
                compliance, transparency, and operational efficiency throughout
                the trial lifecycle.
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
                  glowColor="bg-(--color-orange)"
                  hoverEffect="both"
                  contentClassName="hover:bg-black/80"
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
              <SectionBadge>Why Choose Us</SectionBadge>

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
                        {index === 0 && <FaFlask size={50} />}
                        {index === 1 && <FaCogs size={50} />}
                        {index === 2 && <FaShieldAlt size={50} />}
                        {index === 3 && <FaHandshake size={50} />}
                        {index === 4 && <FaGlobeAmericas size={50} />}
                      </div>
                    </div>

                    {/* content */}
                    <div>
                      <p className="type-h6 font-semibold transition-colors duration-300 group-hover:text-(--color-primary)">
                        {item.title}
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
                <SectionBadge>Our Testimonials</SectionBadge>
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
              onActiveChange={(i) => setActiveIndex(i)}
              renderItem={(item, index) => {
                const isCenter = index === activeIndex;
                const isSide = Math.abs(index - activeIndex) === 1;

                return (
                  <ScrollReveal delay={index * 120}>
                    <div
                      onClick={() => setActiveIndex(index)}
                      className={`
                  w-72 shrink-0 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md
                  transition-all duration-500 cursor-pointer sm:w-80 lg:w-96
                  ${isCenter ? "scale-110 z-10 bg-white/20 shadow-2xl border-white/30" : "scale-95"}
                  ${isSide ? "blur-[1.5px] opacity-70" : ""}
                  ${!isCenter && !isSide ? "blur-[3px] opacity-40" : ""}
                  hover:bg-white/15
                `}
                    >
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
                );
              }}
            />
          </div>
        </section>
      </SectionWrapper>

      {/* FAQs section  */}

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ScrollReveal>
            <SectionBadge>FAQs</SectionBadge>
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
